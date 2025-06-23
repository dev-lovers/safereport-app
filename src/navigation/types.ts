import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  HomeScreen: undefined;
};

export type ReportStackParamList = {
  ReportScreen: undefined;
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  SettingsScreen: undefined;
};

export type RootTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  ReportStack: NavigatorScreenParams<ReportStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList>;
  AuthScreen: undefined;
};
