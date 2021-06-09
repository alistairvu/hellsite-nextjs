import Link from 'next/link';
import { IconButton, Icon } from '@chakra-ui/react';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface HeaderLargeButtonProps {
  icon: any;
  link?: string;
  title: string;
  isRed?: boolean;
}

const HeaderLargeButton: React.FC<HeaderLargeButtonProps> = ({
  icon,
  link = '/',
  title,
  isRed,
}) => (
  <Link href={link} passHref>
    <IconButton
      type="button"
      colorScheme="red"
      variant={isRed ? 'solid' : 'ghost'}
      aria-label={title}
      icon={<Icon as={icon} />}
    />
  </Link>
);

export default HeaderLargeButton;
