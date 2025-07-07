import React from 'react';
import DateAndTime from './DateAndTime';
import Search from './Search';
// import './Metrics.css'; // Réutilisé ici aussi
import './Header.css';

type HeaderProps = {
  onSearch: (city: string) => void;
};

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="header-container">
      <DateAndTime />
      <Search onSearch={onSearch} />
      {/* <Search onCoordinatesFound={function (_latitude: number, _longitude: number, _cityName: string): void {
              throw new Error('Function not implemented.');
          } } /> */}
    </header>
  );
};

export default Header;
