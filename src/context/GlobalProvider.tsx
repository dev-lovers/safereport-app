import React, { ReactNode } from 'react';

import {
  AppProvider,
  AuthProvider,
  NotificationsProvider,
  PreferencesProvider,
  ReportProvider,
} from './index';

export default function GlobalProvider({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <AuthProvider>
        <NotificationsProvider>
          <PreferencesProvider>
            <ReportProvider>{children}</ReportProvider>
          </PreferencesProvider>
        </NotificationsProvider>
      </AuthProvider>
    </AppProvider>
  );
}
