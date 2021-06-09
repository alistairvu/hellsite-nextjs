import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import HeaderLarge from './headers/HeaderLarge';
import HeaderSmall from './headers/HeaderSmall';
import HeaderContext from './headers/HeaderContext';

const AppHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeaderContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      <Box
        as="header"
        position="sticky"
        zIndex={40}
        w="100%"
        background="white"
      >
        <Box display={{ base: 'none', md: 'block' }}>
          <HeaderLarge />
        </Box>

        <Box display={{ base: 'block', md: 'none' }}>
          <HeaderSmall />
        </Box>
      </Box>
    </HeaderContext.Provider>
  );
};

export default AppHeader;
