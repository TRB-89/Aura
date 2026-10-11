import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage, ActiveRoute } from '../../types';
import { INITIAL_CHAT_MESSAGES } from '../../data/mockData';
import { geminiProvider } from '../../lib/ai/geminiProvider';
import { SUPPORT_MODES } from '../../lib/ai/modes';
import { SupportMode, ChatTurn } from '../../lib/ai/types';
import { buildGeminiContext } from '../../lib/ai/requestBuilder';
import { SafetyLayer } from '../../lib/ai/safety';
import { realtimeSession } from '../../lib/voice/realtimeSession';
import {
  Send,
  Sparkles,
  Shield,
  Trash2,
  ArrowLeft,
  Mic,
  Clock,
  Key,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

interface ChatViewProps {
  onRouteChange: (route: ActiveRoute) => void;
  onOpenSafety: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ onRouteChange, onOpenSafety }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('aura_chat_messages');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentMode, setCurrentMode] = useState<SupportMode>('listen');
  const [isTemporary, setIsTemporary] = useState(false);
  const [streamBuffer, setStreamBuffer] = useState('');
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Check pending thought from dashboard
  useEffect(() => {
    const pending = localStorage.getItem('aura_pending_thought');
    if (pending) {
      localStorage.removeItem('aura_pending_thought');
      handleUserSend(pending);
    }
  }, []);

  useEffect(() => {
    if (!isTemporary) {
      localStorage.setItem('aura_chat_messages', JSON.stringify(messages));
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamBuffer, isTyping, isTemporary]);

  const handleUserSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userText = text.trim();
    setErrorMessage(null);
    setLastFailedMessage(null);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    setStreamBuffer('');

    // Safety Layer Check
    const safetyEval = await geminiProvider.evaluateSafety(userText);
    if (safetyEval.requiresIntervention) {
      onOpenSafety();
      const calmMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: SafetyLayer.getCalmDeescalationMessage(safetyEval.state),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, calmMsg]);
      setIsTyping(false);
      return;
    }

    // Build structured Gemini context through decoupled request builder
    const historyTurns: ChatTurn[] = messages.slice(-8).map((m) => ({
      id: m.id,
      role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
      content: m.text,
      timestamp: m.timestamp,
    }));

    // Retrieve approved memories if not in temporary mode
    let approvedMemory: string[] = [];
    if (!isTemporary) {
      try {
        const stored = localStorage.getItem('aura_memory_items');
        if (stored) {
          const parsed = JSON.parse(stored);
          approvedMemory = parsed.filter((item: any) => item.approvedByUser).map((item: any) => item.content);
        }
      } catch {
        // fallback empty
      }
    }

    const { promptContext } = buildGeminiContext({
      userMessage: userText,
      recentMessages: historyTurns,
      supportMode: currentMode,
      safetyState: safetyEval.state,
      approvedMemory,
      medium: 'text',
    });

    realtimeSession.updateContext(promptContext);
    realtimeSession.addTurn({
      id: userMsg.id,
      role: 'user',
      content: userText,
      timestamp: userMsg.timestamp,
      isTemporary,
    });

    if (geminiProvider.isConfigured()) {
      await geminiProvider.streamText(userText, promptContext, historyTurns, {
        onChunk: (chunk) => {
          setStreamBuffer((prev) => prev + chunk);
        },
        onComplete: (fullText) => {
          if (!fullText.trim()) {
            setErrorMessage('Received an empty response from Gemini. Please tap retry.');
            setLastFailedMessage(userText);
            setStreamBuffer('');
            setIsTyping(false);
            return;
          }

          const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: fullText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, aiMsg]);
          realtimeSession.addTurn({
            id: aiMsg.id,
            role: 'model',
            content: fullText,
            timestamp: aiMsg.timestamp,
            isTemporary,
          });
          setStreamBuffer('');
          setIsTyping(false);
        },
        onError: (err) => {
          console.warn('Gemini stream error:', err);
          let friendlyError = 'Gemini connection interrupted. Please tap retry.';
          if (err.message.includes('429') || err.message.includes('quota') || err.message.includes('Quota')) {
            friendlyError = 'Gemini API free-tier quota limit reached (HTTP 429). Please check your Google AI Studio quota or supply a new key in Settings.';
          } else if (err.message.includes('404')) {
            friendlyError = 'Gemini model unavailable. Please update model or check connection.';
          }

          setErrorMessage(friendlyError);
          setLastFailedMessage(userText);
          setStreamBuffer('');
          setIsTyping(false);
        },
      });
    } else {
      setErrorMessage('Gemini API key is not connected. Please connect your key in Settings.');
      setLastFailedMessage(userText);
      setIsTyping(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      // Remove last user message from state so it gets re-sent cleanly
      setMessages((prev) => prev.slice(0, -1));
      handleUserSend(lastFailedMessage);
    }
  };

  const clearConversation = () => {
    setMessages([]);
    localStorage.removeItem('aura_chat_messages');
    realtimeSession.clearTurns();
    setErrorMessage(null);
  };

  return (
    <div
      style={{
        paddingTop: 96,
        paddingBottom: 40,
        minHeight: '100vh',
        backgroundColor: 'var(--color-cream-primary)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="container" style={{ maxWidth: 780, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 16,
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: 20,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => onRouteChange('dashboard')}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--color-beige-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-brown-dark)',
              }}
              title="Return to Dashboard"
            >
              <ArrowLeft size={16} />
            </button>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="navbar-brand-dot" />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem' }}>Aura Companion</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: 'var(--color-taupe-muted)' }}>
                <span>
                  {geminiProvider.isConfigured() ? 'Gemini Active' : 'Waiting for Gemini Key'}
                </span>
                <span>•</span>
                <span style={{ color: isTemporary ? 'var(--color-sand-warm)' : undefined }}>
                  {isTemporary ? 'Temporary Session' : 'Memory Active'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {!geminiProvider.isConfigured() && (
              <button
                onClick={() => onRouteChange('settings')}
                className="btn-pill"
                style={{
                  padding: '5px 12px',
                  fontSize: '0.75rem',
                  background: 'rgba(212, 184, 146, 0.2)',
                  border: '1px solid var(--color-sand-warm)',
                  color: 'var(--color-brown-dark)',
                }}
              >
                <Key size={12} color="var(--color-bronze)" />
                <span>Connect Gemini</span>
              </button>
            )}

            <button
              onClick={() => onRouteChange('voice')}
              className="btn-pill btn-secondary"
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
              title="Switch to Voice Mode (keeps context)"
            >
              <Mic size={13} />
              <span>Voice</span>
            </button>

            <button
              onClick={() => setIsTemporary(!isTemporary)}
              style={{
                padding: '6px 10px',
                borderRadius: 9999,
                background: isTemporary ? 'var(--color-sand-warm)' : 'transparent',
                border: '1px solid var(--border-subtle)',
                color: isTemporary ? '#fff' : 'var(--color-taupe-muted)',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
              title="Toggle Temporary Chat (wiped on exit)"
            >
              <Clock size={12} />
              <span>Temp</span>
            </button>

            <button
              onClick={clearConversation}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'transparent',
                border: '1px solid var(--border-subtle)',
                color: 'var(--color-taupe-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Clear Conversation"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        {/* Support Mode Selector Bar */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            marginBottom: 20,
            overflowX: 'auto',
            paddingBottom: 4,
          }}
        >
          {(['listen', 'reflect', 'help_think', 'reset'] as SupportMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setCurrentMode(mode)}
              style={{
                padding: '4px 12px',
                borderRadius: 9999,
                fontSize: '0.78rem',
                fontWeight: currentMode === mode ? 600 : 400,
                background: currentMode === mode ? 'var(--color-brown-dark)' : 'var(--color-beige-soft)',
                color: currentMode === mode ? '#fff' : 'var(--color-brown-dark)',
                border: 'none',
                whiteSpace: 'nowrap',
                transition: 'var(--transition-smooth)',
              }}
            >
              {SUPPORT_MODES[mode].name}
            </button>
          ))}
        </div>

        {/* Messages Stream */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto', marginBottom: 20 }}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: m.sender === 'user' ? '82%' : '88%',
              }}
            >
              {m.sender === 'user' ? (
                <div
                  style={{
                    background: 'var(--color-beige-soft)',
                    color: 'var(--color-brown-dark)',
                    borderRadius: '24px 24px 4px 24px',
                    padding: '14px 20px',
                    fontSize: '1rem',
                    lineHeight: 1.55,
                    boxShadow: 'var(--shadow-subtle)',
                  }}
                >
                  {m.text}
                </div>
              ) : (
                <div
                  style={{
                    color: 'var(--color-brown-dark)',
                    padding: '6px 4px',
                    fontSize: '1.15rem',
                    fontFamily: 'var(--font-serif)',
                    lineHeight: 1.6,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {m.text}
                </div>
              )}
              <span
                style={{
                  display: 'block',
                  fontSize: '0.7rem',
                  color: 'var(--color-taupe-muted)',
                  marginTop: 4,
                  textAlign: m.sender === 'user' ? 'right' : 'left',
                  opacity: 0.7,
                }}
              >
                {m.timestamp}
              </span>
            </motion.div>
          ))}

          {/* Streaming Chunk Output */}
          {streamBuffer && (
            <div style={{ alignSelf: 'flex-start', maxWidth: '88%', padding: '6px 4px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  color: 'var(--color-brown-dark)',
                  lineHeight: 1.6,
                }}
              >
                {streamBuffer}
              </p>
            </div>
          )}

          {isTyping && !streamBuffer && (
            <div style={{ alignSelf: 'flex-start', padding: '6px 4px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: 'var(--color-sand-warm)',
                }}
              >
                Aura is listening...
              </span>
            </div>
          )}

          {/* Honest Error State with Retry Button */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(212, 184, 146, 0.15)',
                border: '1px solid rgba(169, 122, 77, 0.3)',
                borderRadius: 16,
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <AlertCircle size={18} color="var(--color-bronze)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--color-brown-dark)' }}>
                  {errorMessage}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {lastFailedMessage && (
                  <button
                    onClick={handleRetry}
                    className="btn-pill btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                  >
                    <RotateCcw size={12} />
                    <span>Retry</span>
                  </button>
                )}
                <button
                  onClick={() => onRouteChange('settings')}
                  className="btn-pill btn-primary"
                  style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                >
                  <span>Settings</span>
                </button>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserSend(inputValue);
          }}
        >
          <div className="chat-composer">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tell me what's on your mind..."
              autoFocus
              disabled={isTyping}
            />
            <button
              type="submit"
              className="btn-pill btn-primary"
              style={{
                width: 40,
                height: 40,
                padding: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 8, fontSize: '0.75rem', color: 'var(--color-taupe-muted)' }}>
            <Shield size={11} color="var(--color-sand-warm)" />
            <span>Private dialogue • Mode: {SUPPORT_MODES[currentMode].name}</span>
          </div>
        </form>
      </div>
    </div>
  );
};
