import { Header } from '@components/Header';
import { Container, Content, Icon } from './styles';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';

export function NewGroups() {
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova Turma"
          subtitle="Convide seus amigos e familiares para um novo grupo."
        />
        <Button title="Criar Turma" />
      </Content>
    </Container>
  );
}
