import { useContext } from 'react';
import { XIcon, MenuIcon, SearchIcon } from '@heroicons/react/solid';
import HeaderOverlay from './HeaderOverlay';
import HeaderContext from './HeaderContext';
import { HellsiteFullLogo } from '../../icons';

const HeaderSmall: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(HeaderContext);

  return (
    <>
      <div className="flex items-center justify-between p-2 shadow-sm">
        <button
          className="w-10 h-10 p-1 btn-focus btn-inverse-red"
          onClick={() => setIsMenuOpen((prev: boolean) => !prev)}
          type="button"
        >
          {isMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>

        <div className="flex items-center w-32 h-10 px-4 cursor-pointer">
          <HellsiteFullLogo />
        </div>

        <button
          className="w-10 h-10 p-1 btn-focus btn-inverse-red"
          type="button"
        >
          <SearchIcon />
        </button>
      </div>

      {isMenuOpen && <HeaderOverlay />}
    </>
  );
};

export default HeaderSmall;
