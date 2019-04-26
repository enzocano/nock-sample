import { get } from 'request-promise-native';

export class RedditClient {
    public async best(): Promise<string[]> {
        const uri: string = 'https://www.reddit.com/r/best.json';
        const response: IData = await get(uri, { json: true });
        return response.data.children.map(i => i.data.title);
    }

    public async argentina(): Promise<string[]> {
        const uri: string = 'https://www.reddit.com/r/argentina.json';
        const response: IData = await get(uri, { json: true });
        return response.data.children.map(i => i.data.title);
    }
}

interface IData {
    data: {
        children: {
            data: {
                title: string
            }
        }[]
    }
}