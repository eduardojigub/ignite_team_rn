import { useState } from 'react';

import { Header } from '@components/Header';
import { Container, Content, Icon } from './styles';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { createGroup } from '@storage/group/groupCreate';

export function NewGroups() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleCreateGroup() {
    try {
      await createGroup(group);
      navigation.navigate('players', { group: group });
    } catch (error) {
      console.log(error);
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
