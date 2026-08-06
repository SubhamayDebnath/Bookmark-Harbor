import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = 'theme-storage';
const getInitialTheme = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

const applyTheme = (theme: Theme, animate = false) => {
  const root = document.documentElement;

  if (animate) root.classList.add('theme-transitioning');

  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;

  if (animate) {
    window.setTimeout(() => root.classList.remove('theme-transitioning'), 200);
  }
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),
      hydrated: false,

      setHydrated: (value) => set({ hydrated: value }),

      setTheme: (theme) => {
        applyTheme(theme, true);
        set({ theme });
      },

      toggleTheme: () => {
        const next: Theme = get().theme === 'dark' ? 'light' : 'dark';
        applyTheme(next, true);
        set({ theme: next });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        applyTheme(state.theme, false);
        state.setHydrated(true);
      },
    },
  ),
);
