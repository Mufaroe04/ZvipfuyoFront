const handleToggle = () => {
  // We pass the CURRENT status so the slice knows what to roll back to
  dispatch(toggleTaskOptimistic({ 
    id: task.id, 
    currentStatus: task.is_completed 
  }));
};

return (
  <input 
    type="checkbox" 
    checked={task.is_completed} 
    onChange={handleToggle} 
  />
);