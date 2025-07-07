import React, { useEffect, useState } from 'react';

const DateAndTime: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const day = days[time.getDay()];
  const hour = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return <div>{`${day} - ${hour}`}</div>;
};

export default DateAndTime;
