import { useContext } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from '@chakra-ui/react';
import { HomeIcon, BookmarkIcon, PencilIcon } from '@heroicons/react/solid';
import HeaderContext from './HeaderContext';
import HeaderOverlayButton from './HeaderOverlayButton';

const HeaderOverlay: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(HeaderContext);

  return (
    <Drawer
      colorScheme="white"
      isOpen={isMenuOpen}
      onClose={() => setIsMenuOpen(false)}
      placement="left"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <DrawerCloseButton colorScheme="red" />
        </DrawerHeader>

        <DrawerBody mt={2}>
          <VStack space={4}>
            <HeaderOverlayButton
              link="/"
              title="Create"
              icon={PencilIcon}
              isRed
            />
            <HeaderOverlayButton link="/" title="Dashboard" icon={HomeIcon} />
            <HeaderOverlayButton
              link="/"
              title="Bookmarks"
              icon={BookmarkIcon}
            />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default HeaderOverlay;
