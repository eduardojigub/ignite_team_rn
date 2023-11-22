import { useState } from 'react';

import { Header } from '@components/Header';
import { Container, Content, Icon } from './styles';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { createGroup } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';

export function NewGroups() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleCreateGroup() {
    try {
      if (!group) throw new AppError('Informe o nome do grupo.');
      await createGroup(group);
      navigation.navigate('players', { group: group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo grupo', error.message);
      } else {
        Alert.alert('Novo grupo', 'Ocorreu um erro ao criar o grupo.');
        console.log(error);
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova Turma"
          subtitle="Convide seus amigos e familiares para um novo grupo."
        />
        <Input placeholder="Nome da Turma" onChangeText={setGroup} />
        <Button
          title="Criar Turma"
          style={{ marginTop: 20 }}
          onPress={handleCreateGroup}
        />
      </Content>
    </Container>
  );
}
