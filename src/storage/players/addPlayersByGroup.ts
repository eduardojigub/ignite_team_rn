import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError';
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { PlayerStorageDTO } from './PlayerStorageDTO';
import { getPlayersByGroup } from './getPlayersByGroup';


export async function addPlayersByGroup(newPlayer: PlayerStorageDTO, group: string) {
    try {
        const storedPlayers = await getPlayersByGroup(group);

        const playerAlreadyExist = storedPlayers.filter((player: PlayerStorageDTO) => player.name === newPlayer.name);
        if (playerAlreadyExist.length > 0) {
            throw new AppError('This person is already added to a team');
        }
        
        const storage = JSON.stringify([...storedPlayers, newPlayer]);
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
    } catch (error) {
        throw error;
    }
}