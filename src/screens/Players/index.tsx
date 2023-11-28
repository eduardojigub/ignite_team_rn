import { useState, useEffect, useRef } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert, FlatList, TextInput } from 'react-native';

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
import { getPlayersByGroupAndTeam } from '@storage/players/getPlayersByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/players/PlayerStorageDTO';
import { removePlayerByGroup } from '@storage/players/removePlayerByGroup';
import { groupRemoveByName } from '@storage/group/groupDeleteByName';

type RouteParams = {
  group: string;
};

export const Players = () => {
  const route = useRoute();
  const { group } = route.params as RouteParams;
  const navigation = useNavigation();
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time a');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const newPlayerNameInputRef = useRef<TextInput>(null);

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

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');
      fetchPlayersByTeam();
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

  async function fetchPlayersByTeam() {
    try {
      const playerByTeam = await getPlayersByGroupAndTeam(group, team);
      setPlayers(playerByTeam);
    } catch (error) {
      Alert.alert('Buscar pessoas', 'Ocorreu um erro ao buscar as pessoas.');
      console.log(error);
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await removePlayerByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert('Remover pessoa', 'Ocorreu um erro ao remover a pessoa.');
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');
    } catch (e) {
      console.log(e);
      Alert.alert('Remover turma', 'Ocorreu um erro ao remover a turma.');
    }
  }

  async function handleRemoveGroup() {
    Alert.alert('Remover turma', 'Deseja realmente remover o grupo?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => groupRemove(),
      },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera e separe os times" />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
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

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
};