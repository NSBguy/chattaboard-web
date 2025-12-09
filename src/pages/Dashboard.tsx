type DashboardProps = {
  onSignOut: () => void;
};

export default function Dashboard({ onSignOut }: DashboardProps) {
  const boards = [
    { id: '1', name: 'Lobby Board', status: 'offline' },
    { id: '2', name: 'Studio Board', status: 'online' },
    { id: '3', name: 'Bar Back Wall', status: 'online' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#05060a',
        color: '#f5f5f5',
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background:
            'radial-gradient(circle at top left, #343bff 0, transparent 45%), #05060a',
        }}
      >
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Chattaboard</div>
          <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>
            Your Boards
          </div>
        </div>

        <button
          onClick={onSignOut}
          style={{
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '6px 12px',
            fontSize: 12,
            background: 'transparent',
            color: '#f5f5f5',
            cursor: 'pointer',
          }}
        >
          Sign out
        </button>
      </header>

      <main style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
        <section style={{ marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>
            Your Boards
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: 13, opacity: 0.8 }}>
            This is a placeholder dashboard. We’ll load your real boards from
            Supabase next.
          </p>
        </section>

        <section>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {boards.map((board) => (
              <div
                key={board.id}
                style={{
                  padding: 16,
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.04), transparent)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 100,
                }}
              >
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>
                    {board.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      opacity: 0.75,
                      marginTop: 2,
                    }}
                  >
                    Chattaboard v0.1 • Split-flap simulator
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 12,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: '50%',
                        background:
                          board.status === 'online' ? '#4ade80' : '#9ca3af',
                      }}
                    />
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.08,
                        color:
                          board.status === 'online' ? '#a7f3d0' : '#9ca3af',
                      }}
                    >
                      {board.status}
                    </span>
                  </div>

                  <button
                    style={{
                      borderRadius: 999,
                      border: '1px solid rgba(255,255,255,0.2)',
                      padding: '4px 10px',
                      fontSize: 11,
                      background: 'rgba(0,0,0,0.2)',
                      color: '#f5f5f5',
                      cursor: 'pointer',
                    }}
                  >
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
