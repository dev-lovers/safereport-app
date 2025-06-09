import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { ReportContextData, ReportDraft } from '../types';

const ReportContext = createContext<ReportContextData>({} as ReportContextData);

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [reportDraft, setReportDraft] = useState<ReportDraft | null>(null);

  useEffect(() => {
    const loadDraft = async () => {
      const stored = await AsyncStorage.getItem('reportDraft');
      if (stored) setReportDraft(JSON.parse(stored));
    };
    loadDraft();
  }, []);

  const updateReportDraft = async (data: Partial<ReportDraft>) => {
    const updated: ReportDraft = {
      title: data.title ?? reportDraft?.title ?? '',
      description: data.description ?? reportDraft?.description ?? '',
      mediaUri: data.mediaUri ?? reportDraft?.mediaUri,
      location: data.location ?? reportDraft?.location,
      timestamp: new Date().toISOString(),
    };
    setReportDraft(updated);
    await AsyncStorage.setItem('reportDraft', JSON.stringify(updated));
  };

  const clearReportDraft = async () => {
    setReportDraft(null);
    await AsyncStorage.removeItem('reportDraft');
  };

  return (
    <ReportContext.Provider value={{ reportDraft, updateReportDraft, clearReportDraft }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => useContext(ReportContext);
