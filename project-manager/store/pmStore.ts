import { create } from 'zustand';

interface PmState {
  language: 'en' | 'it';
  setLanguage: (lang: 'en' | 'it') => void;
  
  // Auth state
  isAuthenticated: boolean;
  is2faPending: boolean;
  loginError: string | null;
  
  // Auth actions
  loginPM: (email: string, pass: string) => Promise<void>;
  verify2fa: (code: string) => boolean;
}

export const usePmStore = create<PmState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),

  isAuthenticated: false,
  is2faPending: false,
  loginError: null,

  loginPM: async (email, pass) => {
    // Mock login logic
    if (email && pass) {
      set({ is2faPending: true, loginError: null });
    } else {
      set({ loginError: "Invalid credentials" });
    }
  },

  verify2fa: (code) => {
    // Mock 2FA logic
    if (code.length === 6) {
      set({ isAuthenticated: true, is2faPending: false, loginError: null });
      return true;
    }
    set({ loginError: "Invalid 2FA code" });
    return false;
  }
}));
