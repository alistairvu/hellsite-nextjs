import Link from 'next/link';
import { IconButton, Icon } from '@chakra-ui/react';
import { SVGProps } from 'react';

interface HeaderLargeButtonProps {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
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
      p={1}
      colorScheme="red"
      variant={isRed ? 'solid' : 'ghost'}
      aria-label={title}
      icon={<Icon as={icon} w={6} h={6} />}
    />
  </Link>
);

export default HeaderLargeButton;
