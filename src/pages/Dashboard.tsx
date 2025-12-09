export default function Dashboard() {
  // Temporary fake data
  const boards = [
    { id: '1', name: 'Lobby Board', status: 'offline' },
    { id: '2', name: 'Studio Board', status: 'online' },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Your Boards</h1>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {boards.map((board) => (
          <li
            key={board.id}
            style={{
              padding: 16,
              marginBottom: 12,
              border: '1px solid #ccc',
              borderRadius: 6,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>{board.name}</span>
            <span
              style={{
                color: board.status === 'online' ? 'green' : 'gray',
                fontWeight: 'bold',
              }}
            >
              {board.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
