import { wait } from "@/utils";
import { API, ENDPOINT } from "@/utils/type";
import { useQuery } from "@tanstack/react-query";


export function useApiQuery<T extends keyof API>(
    path: T,
    params?: Record<string, string | string[] | number>,
    headers?: Record<string, string>
) {
    let localUrl: string = ENDPOINT + path;

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            const stringValue = Array.isArray(value) ? value.join(',') : String(value);
            localUrl = localUrl.replace(`[${key}]`, stringValue);
        });
    }

    return useQuery({
        queryKey: [localUrl],
        queryFn: async () => {
            await wait(1);
            const response = await fetch(localUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }
            return response.json() as Promise<API[T]>;
        },
    });
}


