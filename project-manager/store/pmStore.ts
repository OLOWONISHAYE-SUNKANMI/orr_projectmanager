import { create } from 'zustand';

export interface PMOnboardingData {
  // Step 2: Org Info
  companyName: string;
  industry: string;
  companySize: string;
  hqLocation: string;
  isMultinational: string;
  
  // Step 3: Project Overview
  projectName: string;
  projectDescription: string;
  businessChallenge: string;
  objectives: string;
  startDate: string;
  completionTimeline: string;

  // Step 4: Service Selection
  selectedService: string;
  desiredOutcomes: string[];

  // Step 5: Business Assessment
  biggestChallenges: string;
  complianceReqs: string;
  previousConsultants: string;
  currentSystemsAssessment: string;
  painPoints: string;

  // Step 6: Project Scope
  departments: string;
  deliverables: string;
  successCriteria: string;
  risks: string;
  budget: string;
  priority: string;

  // Step 7: Team
  sponsor: string;
  primaryContact: string;
  internalPM: string;
  stakeholders: string[];
  teamMembers: string[];
  responsibilities: string;

  // Step 8: IT Conditional
  currentTechStack: string;
  integrations: string;
  workflowAutomation: string;
  cloudInfrastructure: string;
  cybersecurity: string;
  legacySystems: string;

  // Step 9: Compliance Conditional
  regulatoryFrameworks: string;
  governanceDev: string;
  existingPolicies: string;
  recentAssessments: string;
  expectedAudits: string;
  governanceImprovements: string;

  // Step 10: Comms
  communicationMethod: string;
  updateFrequency: string;
  reportRecipients: string;

  // Step 11: Documents
  uploadedDocuments: any[];

  // Step 12: Dash Preferences
  dashboardWidgets: string[];
}

interface PmState {
  language: 'en' | 'it';
  setLanguage: (lang: 'en' | 'it') => void;
  
  // Auth state
  isAuthenticated: boolean;
  is2faPending: boolean;
  loginError: string | null;
  isOnboardingComplete: boolean;
  
  // Auth actions
  loginPM: (email: string, pass: string) => Promise<void>;
  verify2fa: (code: string) => boolean;
  completeOnboarding: (data: PMOnboardingData) => void;
}

export const usePmStore = create<PmState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),

  isAuthenticated: false,
  is2faPending: false,
  loginError: null,
  isOnboardingComplete: false,

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
  },

  completeOnboarding: (data) => {
    set({ isOnboardingComplete: true });
    // In a real app, send data to API
    console.log("Onboarding completed with data:", data);
  }
}));
