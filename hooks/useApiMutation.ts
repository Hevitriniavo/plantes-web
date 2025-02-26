import { wait } from "@/utils";
import { API, ENDPOINT } from "@/utils/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useApiMutation<T extends keyof API>(
    path: T,
    method: 'POST' | 'PUT' | 'DELETE' | 'PATCH',
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

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            await wait(1);
            const response = await fetch(localUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers, 
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.statusText}`);
            }
            return response.json()  as Promise<API[T]>;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [localUrl] });
        },
    });
}
