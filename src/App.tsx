import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabaseClient';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadInitialSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!isMounted) return;
        setSession(session ?? null);
      } catch (err) {
        console.error('Error loading Supabase session:', err);
      } finally {
        if (isMounted) {
          setCheckingSession(false);
        }
      }
    }

    loadInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession ?? null);
      }
    );

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (checkingSession) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#05060a',
          color: '#f5f5f5',
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div style={{ fontSize: 14, opacity: 0.8 }}>
          Warming up the flaps...
        </div>
      </div>
    );
  }

  if (!session) {
    return <AuthPage onAuthSuccess={() => { /* handled by listener */ }} />;
  }

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  }

  return <Dashboard onSignOut={handleSignOut} />;
}

export default App;
