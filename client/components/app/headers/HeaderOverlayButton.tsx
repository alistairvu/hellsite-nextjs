import { useContext } from 'react';
import Link from 'next/link';
import HeaderContext from './HeaderContext';

interface HeaderOverlayButtonProps {
  icon?: JSX.Element;
  title: string;
  link: string;
  isRed?: boolean;
}

const HeaderOverlayButton: React.FC<HeaderOverlayButtonProps> = ({
  icon,
  title,
  link,
  isRed,
}) => {
  const { setIsMenuOpen } = useContext(HeaderContext);

  const getClassNames = () => {
    if (isRed) {
      return {
        buttonClassName: 'bg-red-500 hover:bg-red-600',
        textClassName: 'text-white',
      };
    }

    return {
      buttonClassName: 'hover:bg-gray-100',
      textClassName: 'text-red-500',
    };
  };

  const classNames = getClassNames();

  return (
    <Link href={link} passHref>
      <button
        className={`flex w-full p-2 space-x-3 rounded-md ${classNames.buttonClassName} btn-focus`}
        onClick={() => setIsMenuOpen(false)}
        type="button"
      >
        {icon && (
          <div className={`w-8 h-8 p-1 ${classNames.textClassName}`}>
            {icon}
          </div>
        )}
        <h2 className={`text-2xl font-bold ${classNames.textClassName}`}>
          {title}
        </h2>
      </button>
    </Link>
  );
};

export default HeaderOverlayButton;
