import { HomeIcon, BookmarkIcon, PencilIcon } from '@heroicons/react/solid';
import { HellsiteSmallLogo } from '../../icons';
import HeaderLargeButton from './HeaderLargeButton';

const HeaderLarge: React.FC = () => (
  <div className="p-2 shadow-sm">
    <div className="container flex items-center justify-between">
      <div className="flex items-center w-8 h-8 px-1 cursor-pointer">
        <HellsiteSmallLogo />
      </div>
      <div className="flex items-center space-x-2">
        <HeaderLargeButton icon={<HomeIcon />} title="home" />
        <HeaderLargeButton icon={<BookmarkIcon />} title="bookmark" />
        <HeaderLargeButton icon={<PencilIcon />} title="create" isRed />
      </div>
    </div>
  </div>
);

export default HeaderLarge;
