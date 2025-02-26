import { createSelectors } from '@/utils/createSelectors'
import { create } from 'zustand'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist, combine } from 'zustand/middleware'

const useAuthStore = create(
    persist(
        combine({
            token: null as string | null
        }, (set, get) => ({
            login:  async (newToken: string) => set({ token: newToken }),
            logout: async () => set({ token: null }),
            getAuthorization:  () => ({
                Authorization: `Bearer ${get().token}`
            }),
        })),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )

);
export default createSelectors(useAuthStore)