import React from 'react';
import HerdForm from './HerdForm'; // Adjust path if necessary

/**
 * View component for creating a new livestock herd.
 * Utilizes the shared HerdForm component.
 */
const HerdAdd: React.FC = () => {
  return <HerdForm title="Add New Herd" />;
};

export default HerdAdd;