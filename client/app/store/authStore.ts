import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
    id: number;
    email: string;
    username: string;
    avatar: string | null;
    isVerified: boolean;
}

interface AuthStore {
    accessToken: string | null;
    user: User | null;
    setAccessToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
    logout: () => void;
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      _hasHydrated: false, 
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      setAccessToken: (token) => set({ accessToken: token }),
      setUser: (user) => set({ user }),
      logout: () => set({ accessToken: null, user: null }),
    }),
    {
      name: "user-session",
      storage: createJSONStorage(() => localStorage), 
      onRehydrateStorage: (state) =>{
        return () => state?.setHasHydrated(true);
      }
    }
  )
);
