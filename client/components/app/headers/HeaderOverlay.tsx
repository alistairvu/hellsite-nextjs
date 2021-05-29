import { HomeIcon, BookmarkIcon, PencilIcon } from '@heroicons/react/solid';
import HeaderOverlayButton from './HeaderOverlayButton';

const HeaderOverlay: React.FC = () => (
  <div className="container absolute z-20 w-screen h-screen p-4 space-y-2 bg-white shadow-sm md:hidden">
    <HeaderOverlayButton link="/" title="Create" icon={<PencilIcon />} isRed />
    <HeaderOverlayButton link="/" title="Dashboard" icon={<HomeIcon />} />
    <HeaderOverlayButton link="/" title="Bookmarks" icon={<BookmarkIcon />} />
  </div>
);

export default HeaderOverlay;
