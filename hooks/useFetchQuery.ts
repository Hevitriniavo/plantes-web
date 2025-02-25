import { wait } from '@/utils';
import { useQuery } from '@tanstack/react-query';

const ENDPOINT = 'https://plantes-api-production.up.railway.app';

export function useFetchQuery(path: string) {
    return useQuery({
        queryKey: [path],
        queryFn: async () => {
            await wait(1)
            return fetch(`${ENDPOINT}${path}`)
                .then(response => {
                    if (!response.ok) {
                        return Promise.reject(new Error(`Failed to fetch: ${response.statusText}`));
                    }
                    return response.json();
                })
                .catch(error => {
                    return Promise.reject(new Error(`Fetch error: ${error instanceof Error ? error.message : 'Unknown error'}`));
                });
        }
    });
}
