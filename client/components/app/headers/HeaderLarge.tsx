import { HomeIcon, BookmarkIcon, PencilIcon } from '@heroicons/react/solid';
import { HStack, Flex } from '@chakra-ui/react';
import { HellsiteSmallLogo } from '../../icons';
import HeaderLargeButton from './HeaderLargeButton';

const HeaderLarge: React.FC = () => (
  <Flex shadow="base" p={2} items="center" justify="between">
    <Flex w={8} h={8} px={1} items="center">
      <HellsiteSmallLogo />
    </Flex>
    <HStack align="center" spacing={4}>
      <HeaderLargeButton icon={<HomeIcon />} title="home" />
      <HeaderLargeButton icon={<BookmarkIcon />} title="bookmark" />
      <HeaderLargeButton icon={<PencilIcon />} title="create" isRed />
    </HStack>
  </Flex>
);

export default HeaderLarge;
