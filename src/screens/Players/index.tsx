import { useState } from 'react';
import { FlatList } from 'react-native';

import { Header } from '@components/Header';
import { ButtonIcon } from '@components/ButtonIcon';
import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';

export const Players = () => {
  const [team, setTeam] = useState('Time a');
  const [players, setPlayers] = useState(['Bruno', 'João', 'Maria']);

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
      <HeaderList>
        <FlatList
          data={['Time a', 'Time b']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
    </Container>
  );
};
