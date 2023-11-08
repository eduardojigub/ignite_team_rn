import { Header } from '@components/Header';
import { Container, Content, Icon } from './styles';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

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
        <Input placeholder="Nome da Turma" />
        <Button title="Criar Turma" style={{ marginTop: 20 }} />
      </Content>
    </Container>
  );
}
