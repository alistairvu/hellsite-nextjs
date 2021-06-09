import { useContext } from 'react';
import { IconButton, Icon, Flex } from '@chakra-ui/react';
import { XIcon, MenuIcon, SearchIcon } from '@heroicons/react/solid';
import HeaderOverlay from './HeaderOverlay';
import HeaderContext from './HeaderContext';
import { HellsiteFullLogo } from '../../icons';

const HeaderSmall: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(HeaderContext);

  return (
    <>
      <Flex align="center" justify="space-between" p={2} shadow="base">
        <IconButton
          aria-label="Menu"
          p={1}
          icon={<Icon as={isMenuOpen ? XIcon : MenuIcon} w={8} h={8} />}
          onClick={() => setIsMenuOpen((prev: boolean) => !prev)}
          type="button"
          colorScheme="red"
          variant="ghost"
        />

        <Flex w={32} h={10} px={4} items="center">
          <HellsiteFullLogo />
        </Flex>

        <IconButton
          aria-label="Menu"
          p={1}
          icon={<Icon as={SearchIcon} w={8} h={8} />}
          type="button"
          colorScheme="red"
          variant="ghost"
        />
      </Flex>

      <HeaderOverlay />
    </>
  );
};

export default HeaderSmall;
