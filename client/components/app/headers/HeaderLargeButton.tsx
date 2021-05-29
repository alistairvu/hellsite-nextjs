import Link from 'next/link';

interface HeaderLargeButtonProps {
  icon: JSX.Element;
  link?: string;
  title: string;
  isRed?: boolean;
}

const HeaderLargeButton: React.FC<HeaderLargeButtonProps> = ({
  icon,
  link = '/',
  title,
  isRed,
}) => {
  const getClassNames = () => {
    if (isRed) {
      return {
        iconClassName: 'text-white',
        buttonClassName:
          'w-8 h-8 p-1 bg-red-500 hover:bg-red-600 rounded btn-focus',
      };
    }

    return {
      iconClassName: 'text-red-500',
      buttonClassName:
        'w-8 h-8 p-1 bg-white hover:bg-gray-100 rounded btn-focus',
    };
  };

  const classNames = getClassNames();

  return (
    <Link href={link} passHref>
      <button
        type="button"
        className={classNames.buttonClassName}
        aria-label={title}
      >
        <span className={classNames.iconClassName}>{icon}</span>
      </button>
    </Link>
  );
};

export default HeaderLargeButton;
