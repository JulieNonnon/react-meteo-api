import React from 'react';

type MetricsCardProps = {
  label: string;
  value: string;
  icon: string;
};

const MetricsCard: React.FC<MetricsCardProps> = ({ label, value, icon }) => {
  return (
    <div className="metrics-card">

      <div className="icon">{icon}</div>
      <div className="info">
        <p><strong>{label}</strong></p>
        <p>{value}</p>
      </div>

    </div>
  );
};

export default MetricsCard;
