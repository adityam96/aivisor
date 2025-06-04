import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define types for our auth state
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'creator' | 'admin';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Create the auth store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: (user, token) => set({
        user,
        token,
        isAuthenticated: true,
        error: null,
      }),
      
      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
      }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage', // unique name for localStorage
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);

// Tool comparison store
interface ComparisonState {
  toolIds: string[];
  addTool: (id: string) => void;
  removeTool: (id: string) => void;
  clearTools: () => void;
  isToolInComparison: (id: string) => boolean;
}

export const useComparisonStore = create<ComparisonState>((set, get) => ({
  toolIds: [],
  
  addTool: (id) => set((state) => {
    // Limit to 4 tools maximum for comparison
    if (state.toolIds.length >= 4) return state;
    if (state.toolIds.includes(id)) return state;
    return { toolIds: [...state.toolIds, id] };
  }),
  
  removeTool: (id) => set((state) => ({
    toolIds: state.toolIds.filter((toolId) => toolId !== id),
  })),
  
  clearTools: () => set({ toolIds: [] }),
  
  isToolInComparison: (id) => get().toolIds.includes(id),
}));

// Survey store
interface SurveyState {
  answers: Record<string, any>;
  currentStep: number;
  totalSteps: number;
  surveyId: string | null;
  setAnswers: (questionId: string, answer: any) => void;
  setCurrentStep: (step: number) => void;
  setTotalSteps: (total: number) => void;
  setSurveyId: (id: string) => void;
  resetSurvey: () => void;
}

export const useSurveyStore = create<SurveyState>((set) => ({
  answers: {},
  currentStep: 0,
  totalSteps: 0,
  surveyId: null,
  
  setAnswers: (questionId, answer) => set((state) => ({
    answers: { ...state.answers, [questionId]: answer },
  })),
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  setTotalSteps: (total) => set({ totalSteps: total }),
  
  setSurveyId: (id) => set({ surveyId: id }),
  
  resetSurvey: () => set({
    answers: {},
    currentStep: 0,
    surveyId: null,
  }),
}));

// UI state store
interface UIState {
  isMobileMenuOpen: boolean;
  isComparisonModalOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleComparisonModal: () => void;
  closeComparisonModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isComparisonModalOpen: false,
  
  toggleMobileMenu: () => set((state) => ({
    isMobileMenuOpen: !state.isMobileMenuOpen,
  })),
  
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  
  toggleComparisonModal: () => set((state) => ({
    isComparisonModalOpen: !state.isComparisonModalOpen,
  })),
  
  closeComparisonModal: () => set({ isComparisonModalOpen: false }),
}));
