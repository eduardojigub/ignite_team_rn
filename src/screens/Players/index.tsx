import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Alert, FlatList } from 'react-native';

import { Header } from '@components/Header';
import { ButtonIcon } from '@components/ButtonIcon';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCards';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { AppError } from '@utils/AppError';
import { addPlayersByGroup } from '@storage/players/addPlayersByGroup';
import { getPlayersByGroup } from '@storage/players/getPlayersByGroup';

type RouteParams = {
  group: string;
};

export const Players = () => {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time a');
  const [players, setPlayers] = useState([]);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Adicionar pessoa', 'Informe o nome da pessoa.');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await addPlayersByGroup(newPlayer, group);
      const players = await getPlayersByGroup(group);
      console.log(players);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Adicionar pessoa', error.message);
      } else {
        Alert.alert(
          'Adicionar pessoa',
          'Ocorreu um erro ao adicionar a pessoa.'
        );
        console.log(error);
      }
    }
  }

  const route = useRoute();
  const { group } = route.params as RouteParams;
  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera e separe os times" />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
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
      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          !players.length && { flex: 1 },
        ]}
      />

      <Button title="Remover Turma" type="SECONDARY" />
    </Container>
  );
};
function playersAddByGroup(
  group: string,
  newPlayer: { name: string; team: string }
) {
  throw new Error('Function not implemented.');
}

