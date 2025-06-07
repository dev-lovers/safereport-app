import { NavigatorScreenParams } from '@react-navigation/native';

export type RootTabParamList = {
  HomeStack: undefined;
  ReportStack: undefined;
  ProfileStack: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList>;
};
