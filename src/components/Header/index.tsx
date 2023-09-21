import { Container, Logo, BackButton } from './styles';

import logoImg from '@assets/logo.png';

export function Header() {
  return (
    <Container>
      <BackButton />
      <Logo source={logoImg} />
    </Container>
  );
}
