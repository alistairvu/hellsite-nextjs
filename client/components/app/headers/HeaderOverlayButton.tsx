import { useContext } from 'react';
import Link from 'next/link';
import HeaderContext from './HeaderContext';

interface HeaderOverlayButtonProps {
  icon?: JSX.Element;
  title: string;
  link: string;
}

const HeaderOverlayButton: React.FC<HeaderOverlayButtonProps> = ({
  icon,
  title,
  link,
}) => {
  const { setIsMenuOpen } = useContext(HeaderContext);

  return (
    <Link href={link} passHref>
      <button
        className="flex w-full p-2 space-x-3 rounded-md hover:bg-gray-100 btn-focus"
        onClick={() => setIsMenuOpen(false)}
        type="button"
      >
        {icon && <div className="w-8 h-8 p-1 text-red-500">{icon}</div>}
        <h2 className="text-2xl font-bold text-red-500">{title}</h2>
      </button>
    </Link>
  );
};

export default HeaderOverlayButton;
