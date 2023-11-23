import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { PlayerStorageDTO } from './PlayerStorageDTO';
import { getPlayersByGroup } from './getPlayersByGroup';

export async function getPlayersByGroupAndTeam(group: string, team: string) {
    try {
        const storage = await getPlayersByGroup(group);
        const players = storage.filter((player: PlayerStorageDTO) => player.team === team);
        return players;
    } catch (error) {
        throw (error);
    }
}