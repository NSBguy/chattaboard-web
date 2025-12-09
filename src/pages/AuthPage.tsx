import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { AuthError } from '@supabase/supabase-js';

type AuthPageProps = {
  onAuthSuccess: () => void;
};

export default function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      let authError: AuthError | null = null;

      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        authError = error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        authError = error;
      }

      if (authError) {
        console.error(authError);
        setErrorMessage(authError.message);
        return;
      }

      onAuthSuccess();
    } catch (err) {
      console.error(err);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(circle at top left, #343bff22 0, transparent 45%), #05060a',
        color: '#f5f5f5',
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 520, // a bit wider so it doesn’t feel like a tiny phone view
          display: 'flex',
          gap: 24,
          alignItems: 'stretch',
        }}
      >
        {/* Left “hero” panel (hidden naturally on narrow screens because of flex wrapping) */}
        <div
          style={{
            flex: 1.1,
            borderRadius: 16,
            padding: '20px 22px',
            border: '1px solid rgba(255,255,255,0.05)',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(0,0,0,0.7))',
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Chattaboard
          </div>
          <div
            style={{
              fontSize: 13,
              opacity: 0.85,
              marginBottom: 16,
            }}
          >
            Control your split-flap style boards from anywhere. Log in to see
            and manage all of your boards on one screen.
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: 16,
              fontSize: 12,
              opacity: 0.85,
              lineHeight: 1.6,
            }}
          >
            <li>View all of your boards at a glance.</li>
            <li>Pair a physical Chattaboard to your account.</li>
            <li>Coming soon: live text updates and patterns.</li>
          </ul>
        </div>

        {/* Right form card */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: '#11131a',
            borderRadius: 16,
            padding: '22px 24px 26px',
            boxShadow: '0 18px 45px rgba(0,0,0,0.45)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>
              {mode === 'signin' ? 'Sign in' : 'Create your account'}
            </h1>
            <p
              style={{
                margin: '6px 0 0',
                fontSize: 13,
                opacity: 0.8,
              }}
            >
              {mode === 'signin'
                ? 'Enter your email and password to access your boards.'
                : 'Use email and password to get started with Chattaboard.'}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              marginBottom: 18,
              borderRadius: 999,
              background: '#181a23',
              padding: 4,
            }}
          >
            <button
              type="button"
              onClick={() => setMode('signin')}
              style={{
                flex: 1,
                border: 'none',
                borderRadius: 999,
                padding: '8px 0',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
                background: mode === 'signin' ? '#f5f5f5' : 'transparent',
                color: mode === 'signin' ? '#11131a' : '#f5f5f5',
                transition: 'background 0.15s ease, color 0.15s ease',
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              style={{
                flex: 1,
                border: 'none',
                borderRadius: 999,
                padding: '8px 0',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
                background: mode === 'signup' ? '#f5f5f5' : 'transparent',
                color: mode === 'signup' ? '#11131a' : '#f5f5f5',
                transition: 'background 0.15s ease, color 0.15s ease',
              }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label
                htmlFor="email"
                style={{ display: 'block', fontSize: 12, marginBottom: 4 }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: '1px solid #262938',
                  background: '#0b0c10',
                  color: '#f5f5f5',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="password"
                style={{ display: 'block', fontSize: 12, marginBottom: 4 }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: '1px solid #262938',
                  background: '#0b0c10',
                  color: '#f5f5f5',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
            </div>

            {errorMessage && (
              <div
                style={{
                  marginBottom: 12,
                  fontSize: 12,
                  color: '#ff6b81',
                }}
              >
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px 0',
                borderRadius: 999,
                border: 'none',
                cursor: loading ? 'default' : 'pointer',
                background: loading ? '#4f566b' : '#f5f5f5',
                color: '#11131a',
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              {loading
                ? mode === 'signin'
                  ? 'Signing in...'
                  : 'Creating account...'
                : mode === 'signin'
                  ? 'Sign In'
                  : 'Sign Up'}
            </button>

            <p
              style={{
                fontSize: 11,
                opacity: 0.7,
                marginTop: 10,
                textAlign: 'center',
              }}
            >
              By continuing, you agree not to spin your boards fast enough to
              launch the flaps into orbit.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
