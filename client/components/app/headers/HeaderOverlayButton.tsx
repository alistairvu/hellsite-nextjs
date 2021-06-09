import { useContext, SVGProps } from 'react';
import { Button, Heading, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import HeaderContext from './HeaderContext';

interface HeaderOverlayButtonProps {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
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

  return (
    <Link href={link} passHref>
      <Button
        leftIcon={<Icon as={icon || null} w={6} h={6} />}
        colorScheme="red"
        variant={isRed ? 'solid' : 'ghost'}
        onClick={() => setIsMenuOpen(false)}
        w="100%"
        py={6}
        textAlign="left"
      >
        <Heading size="xl">{title}</Heading>
      </Button>
    </Link>
  );
};

export default HeaderOverlayButton;
