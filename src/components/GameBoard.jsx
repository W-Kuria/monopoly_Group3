const GameBoard = ({ position }) => {
  // Define the spaces we're focusing on
  const spaces = [
    { id: 0, name: "GO", description: "Collect $200" },
    { id: 10, name: "Jail", description: "Just visiting" },
    { id: 30, name: "Go To Jail", description: "Go directly to Jail" }
  ];
  
  // Find the current space (if it's one of our focus spaces)
  const currentSpace = spaces.find(space => space.id === position);
  
  return (
    <div className="game-board">
      <h3>Game Board</h3>
      <div className="board-spaces">
        {spaces.map(space => (
          <div 
            key={space.id} 
            className={`board-space ${position === space.id ? 'current' : ''}`}
          >
            <h4>{space.name}</h4>
            <p>{space.description}</p>
          </div>
        ))}
      </div>
      <div className="current-position">
        <p>
          <strong>Current Position:</strong> {position} 
          {currentSpace ? ` - ${currentSpace.name}` : ''}
        </p>
      </div>
    </div>
  );
};

export default GameBoard;