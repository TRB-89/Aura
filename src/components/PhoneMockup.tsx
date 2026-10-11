import React, { useState } from 'react';
import { Orb } from './Orb';
import { MessageSquare, Mic, BookOpen, Wind, Compass, Sparkles, Send, ShieldCheck } from 'lucide-react';

interface PhoneMockupProps {
  initialScreen?: 'chat' | 'voice' | 'journal' | 'insights' | 'breathing';
  onNavigateApp?: (route: 'chat' | 'voice' | 'journal' | 'reset' | 'insights') => void;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  initialScreen = 'chat',
  onNavigateApp,
}) => {
  const [screen, setScreen] = useState<'chat' | 'voice' | 'journal' | 'insights' | 'breathing'>(initialScreen);
  const [userReply, setUserReply] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', sender: 'user', text: 'Today was honestly awful.' },
    { id: '2', sender: 'ai', text: 'Yeah? What happened?' },
    { id: '3', sender: 'user', text: 'My presentation went badly.' },
    { id: '4', sender: 'ai', text: 'Oh. What went wrong?' },
  ]);

  const handleSendMock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReply.trim()) return;
    const newMsg = { id: Date.now().toString(), sender: 'user', text: userReply };
    setMessages((prev) => [...prev, newMsg]);
    setUserReply('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "Yeah... that sounds really heavy. Was it something specific today, or has it just been piling up?",
        },
      ]);
    }, 900);
  };

  return (
    <div className="phone-mockup">
      {/* Top speaker notch */}
      <div className="phone-speaker-notch">
        <div className="phone-camera-lens" />
      </div>

      <div
        className="phone-screen"
        style={{
          backgroundColor: screen === 'voice' ? '#1F1915' : 'var(--color-cream-primary)',
          color: screen === 'voice' ? 'var(--color-white-cream)' : 'var(--color-brown-dark)',
        }}
      >
        {/* Status Bar */}
        <div
          style={{
            padding: '16px 20px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.7rem',
            fontWeight: 600,
            opacity: 0.7,
            zIndex: 10,
          }}
        >
          <span>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={11} color="var(--color-bronze)" />
            <span>Private</span>
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 18px', display: 'flex', flexDirection: 'column' }}>
          {screen === 'chat' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'center', marginBottom: 12 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.15rem',
                    fontStyle: 'italic',
                    color: 'var(--color-taupe-muted)',
                  }}
                >
                  Evening check-in
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1, overflowY: 'auto' }}>
                {messages.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '82%',
                      background: m.sender === 'user' ? 'var(--color-beige-soft)' : 'transparent',
                      color: 'var(--color-brown-dark)',
                      padding: m.sender === 'user' ? '10px 14px' : '4px 2px',
                      borderRadius: m.sender === 'user' ? '16px 16px 4px 16px' : 0,
                      fontSize: '0.85rem',
                      lineHeight: 1.45,
                    }}
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMock} style={{ marginTop: 12 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'var(--color-white-cream)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 9999,
                    padding: '6px 10px 6px 14px',
                    gap: 8,
                  }}
                >
                  <input
                    type="text"
                    placeholder="Tell me what's on your mind..."
                    value={userReply}
                    onChange={(e) => setUserReply(e.target.value)}
                    style={{
                      flex: 1,
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '0.8rem',
                      color: 'var(--color-brown-dark)',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'var(--color-brown-dark)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Send size={11} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {screen === 'voice' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
                padding: '16px 0',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'var(--color-sand-warm)',
                  }}
                >
                  Live Voice Companion
                </span>
              </div>

              <Orb stateText="I'm listening." size="compact" isListening={true} />

              <div style={{ textAlign: 'center', maxWidth: 220 }}>
                <p style={{ fontSize: '0.78rem', color: 'rgba(232, 220, 203, 0.75)', fontStyle: 'italic' }}>
                  "Take your time... I can hear you clearly."
                </p>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    marginTop: 8,
                    fontSize: '0.68rem',
                    color: 'var(--color-sand-warm)',
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#48bb78' }} />
                  <span>Interrupt anytime</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 14 }}>
                <button
                  style={{
                    padding: '8px 16px',
                    borderRadius: 9999,
                    background: 'rgba(255, 248, 240, 0.1)',
                    color: '#fff',
                    fontSize: '0.75rem',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                  }}
                >
                  Mute
                </button>
                <button
                  style={{
                    padding: '8px 16px',
                    borderRadius: 9999,
                    background: 'rgba(201, 155, 100, 0.25)',
                    color: 'var(--color-sand-warm)',
                    fontSize: '0.75rem',
                    border: '1px solid var(--color-bronze)',
                  }}
                >
                  Text Mode
                </button>
              </div>
            </div>
          )}

          {screen === 'journal' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-taupe-muted)' }}>Oct 10, 2026</span>
                <span
                  style={{
                    fontSize: '0.68rem',
                    padding: '2px 8px',
                    borderRadius: 9999,
                    background: 'var(--color-beige-soft)',
                    color: 'var(--color-brown-dark)',
                  }}
                >
                  Heavy
                </span>
              </div>

              <div
                style={{
                  background: '#FCF9F4',
                  borderRadius: 12,
                  padding: 14,
                  border: '1px solid rgba(65, 50, 40, 0.08)',
                  flex: 1,
                }}
              >
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', marginBottom: 8 }}>
                  The weight of deadlines
                </h4>
                <p style={{ fontSize: '0.78rem', lineHeight: 1.5, color: 'var(--color-brown-dark)' }}>
                  Woke up before my alarm with my chest feeling tight. I took five minutes on the balcony just watching the wind move the leaves. It helped a little.
                </p>

                <div
                  style={{
                    marginTop: 12,
                    padding: 10,
                    background: 'rgba(212, 184, 146, 0.15)',
                    borderRadius: 8,
                    borderLeft: '2px solid var(--color-bronze)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                    <Sparkles size={10} color="var(--color-bronze)" />
                    <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-bronze)' }}>
                      AI Reflection
                    </span>
                  </div>
                  <p style={{ fontSize: '0.72rem', fontStyle: 'italic', color: 'var(--color-brown-dark)' }}>
                    Stepping onto the balcony was an intentional pause—your natural instinct to find quiet ground.
                  </p>
                </div>
              </div>
            </div>
          )}

          {screen === 'insights' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 12 }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-bronze)' }}>
                Weekly Patterns
              </span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem' }}>
                Observational Notes
              </h4>

              <div
                style={{
                  background: 'var(--color-white-cream)',
                  borderRadius: 14,
                  padding: 14,
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <span style={{ fontSize: '0.7rem', color: 'var(--color-bronze)', fontWeight: 600 }}>Check-in Timing</span>
                <p style={{ fontSize: '0.78rem', marginTop: 4, color: 'var(--color-brown-dark)' }}>
                  You tend to check in more during late evenings between 8:30 PM and 11:00 PM.
                </p>
              </div>

              <div
                style={{
                  background: 'var(--color-white-cream)',
                  borderRadius: 14,
                  padding: 14,
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <span style={{ fontSize: '0.7rem', color: 'var(--color-olive-soft)', fontWeight: 600 }}>Helpful Shifts</span>
                <p style={{ fontSize: '0.78rem', marginTop: 4, color: 'var(--color-brown-dark)' }}>
                  Leaving devices behind during evening walks created the clearest reflections this week.
                </p>
              </div>
            </div>
          )}

          {screen === 'breathing' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-bronze)', marginBottom: 12 }}>
                60-Second Reset
              </span>
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  border: '1px solid var(--color-sand-warm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'radial-gradient(circle, rgba(201, 155, 100, 0.2) 0%, transparent 70%)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-brown-dark)' }}>
                  Inhale
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-taupe-muted)', marginTop: 14 }}>
                Follow the gentle rhythm
              </p>
            </div>
          )}
        </div>

        {/* Bottom App Navigation inside Phone */}
        <div
          style={{
            padding: '10px 16px 14px',
            borderTop: screen === 'voice' ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--border-subtle)',
            background: screen === 'voice' ? 'rgba(30, 24, 20, 0.85)' : 'var(--color-white-cream)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => setScreen('chat')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              color: screen === 'chat' ? 'var(--color-bronze)' : 'var(--color-taupe-muted)',
            }}
          >
            <MessageSquare size={16} />
            <span style={{ fontSize: '0.62rem' }}>Talk</span>
          </button>

          <button
            onClick={() => setScreen('voice')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              color: screen === 'voice' ? 'var(--color-sand-warm)' : 'var(--color-taupe-muted)',
            }}
          >
            <Mic size={16} />
            <span style={{ fontSize: '0.62rem' }}>Voice</span>
          </button>

          <button
            onClick={() => setScreen('journal')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              color: screen === 'journal' ? 'var(--color-bronze)' : 'var(--color-taupe-muted)',
            }}
          >
            <BookOpen size={16} />
            <span style={{ fontSize: '0.62rem' }}>Journal</span>
          </button>

          <button
            onClick={() => setScreen('breathing')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              color: screen === 'breathing' ? 'var(--color-bronze)' : 'var(--color-taupe-muted)',
            }}
          >
            <Wind size={16} />
            <span style={{ fontSize: '0.62rem' }}>Reset</span>
          </button>

          <button
            onClick={() => setScreen('insights')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              color: screen === 'insights' ? 'var(--color-bronze)' : 'var(--color-taupe-muted)',
            }}
          >
            <Compass size={16} />
            <span style={{ fontSize: '0.62rem' }}>Insights</span>
          </button>
        </div>
      </div>
    </div>
  );
};
