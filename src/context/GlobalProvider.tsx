import React, { ReactNode } from 'react';
import { AppProvider, AuthProvider, PreferencesProvider, ReportProvider } from './index';

export default function GlobalProvider({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <AuthProvider>
        <PreferencesProvider>
          <ReportProvider>{children}</ReportProvider>
        </PreferencesProvider>
      </AuthProvider>
    </AppProvider>
  );
}
