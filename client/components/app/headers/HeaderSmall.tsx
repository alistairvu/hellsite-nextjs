import { useContext } from 'react';
import { XIcon, MenuIcon, SearchIcon } from '@heroicons/react/solid';
import HeaderOverlay from './HeaderOverlay';
import HeaderContext from './HeaderContext';

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
