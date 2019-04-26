import { get } from 'request-promise-native';

export class GithubClient {
    public async repositories(user: string): Promise<string[]> {
        const uri: string = `https://api.github.com/users/${user}/repos`;
        const response: IData[] = await get(uri, { json: true });
        return response.map(r => r.name);
    }
}

interface IData {
    name: string
}
