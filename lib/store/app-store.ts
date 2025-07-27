import { create } from "zustand";

export interface AppError {
  id: string;
  message: string;
  code?: string;
  timestamp: Date;
  isDismissed: boolean;
}

export interface AppState {
  isLoading: boolean;
  errors: AppError[];
  globalLoading: boolean;
  maintenanceMode: boolean;
}

export interface AppStore extends AppState {
  // Loading actions
  setLoading: (loading: boolean) => void;
  setGlobalLoading: (loading: boolean) => void;

  // Error actions
  addError: (error: Omit<AppError, "id" | "timestamp" | "isDismissed">) => void;
  removeError: (id: string) => void;
  dismissError: (id: string) => void;
  clearErrors: () => void;

  // App state actions
  setMaintenanceMode: (enabled: boolean) => void;
  resetAppState: () => void;
}

const initialState: AppState = {
  isLoading: false,
  errors: [],
  globalLoading: false,
  maintenanceMode: false,
};

export const useAppStore = create<AppStore>()((set) => ({
  ...initialState,

  // Loading actions
  setLoading: (isLoading) => set({ isLoading }),
  setGlobalLoading: (globalLoading) => set({ globalLoading }),

  // Error actions
  addError: (error) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newError: AppError = {
      ...error,
      id,
      timestamp: new Date(),
      isDismissed: false,
    };
    set((state) => ({
      errors: [...state.errors, newError],
    }));
  },
  removeError: (id) => {
    set((state) => ({
      errors: state.errors.filter((e) => e.id !== id),
    }));
  },
  dismissError: (id) => {
    set((state) => ({
      errors: state.errors.map((e) =>
        e.id === id ? { ...e, isDismissed: true } : e
      ),
    }));
  },
  clearErrors: () => set({ errors: [] }),

  // App state actions
  setMaintenanceMode: (maintenanceMode) => set({ maintenanceMode }),
  resetAppState: () => set(initialState),
}));
