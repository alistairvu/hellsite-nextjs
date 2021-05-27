import { useState } from 'react';
import HeaderLarge from './headers/HeaderLarge';
import HeaderSmall from './headers/HeaderSmall';
import HeaderContext from './headers/HeaderContext';

const AppHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeaderContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      <header className="sticky top-0 z-40">
        <div className="hidden md:block">
          <HeaderLarge />
        </div>

        <div className="block md:hidden">
          <HeaderSmall />
        </div>
      </header>
    </HeaderContext.Provider>
  );
};

export default AppHeader;
