import { Header } from '@components/Header';
import { ButtonIcon } from '@components/ButtonIcon';
import { Container, Form } from './styles';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

export const Players = () => {
  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title="Nome da Turma"
        subtitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>
    </Container>
  );
};
