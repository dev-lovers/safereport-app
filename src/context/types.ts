export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface AppContextData {
  isLoading: boolean;
  userLocation: UserLocation | null;
  setUserLocation: (location: UserLocation) => void;
  fetchUserLocation: () => Promise<void>;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  authToken: string | null;
  loading: boolean;
  signIn: (token: string, user: User) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface NotificationContextData {
  expoPushToken: string | null;
  requestPermission: () => Promise<boolean>;
  scheduleNotification: (title: string, body: string, data?: Record<string, any>) => Promise<void>;
  lastNotification: import('expo-notifications').Notification | null;
  notificationsEnabled: boolean;
  toggleNotifications: () => Promise<void>;
}

export type AppTheme = 'light' | 'dark';

export interface PreferencesContextData {
  theme: AppTheme;
  toggleTheme: () => void;
}

export interface ReportDraft {
  title: string;
  description: string;
  mediaUri?: string;
  location?: UserLocation;
  timestamp: string;
}

export interface ReportContextData {
  reportDraft: ReportDraft | null;
  updateReportDraft: (data: Partial<ReportDraft>) => void;
  clearReportDraft: () => void;
}
