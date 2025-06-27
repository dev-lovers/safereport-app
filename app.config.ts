import { ConfigContext, ExpoConfig } from '@expo/config';
import * as dotenv from 'dotenv';

dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'SafeReport',
  slug: 'safereport-app',
  version: '1.0.0',
  description:
    'Aplicativo de denúncias anônimas e seguras com geolocalização e criptografia de ponta a ponta.',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  scheme: 'safereport',
  icon: './assets/icons/icon.png',
  splash: {
    image: './assets/icons/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#FFFFFF',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  newArchEnabled: true,
  ios: {
    ...config.ios,
    supportsTablet: true,
    entitlements: {
      'com.apple.developer.networking.wifi-info': true,
    },
  },
  android: {
    ...config.android,
    adaptiveIcon: {
      foregroundImage: './assets/icons/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    config: {
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    },
    edgeToEdgeEnabled: true,
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    package: 'com.devlovers.team.safereportapp',
    permissions: [
      'android.permission.CAMERA',
      'android.permission.RECORD_AUDIO',
      'android.permission.ACCESS_COARSE_LOCATION',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.ACCESS_MEDIA_LOCATION',
    ],
  },
  web: {
    ...config.web,
    favicon: './assets/icons/favicon.png',
  },
  plugins: [
    [
      'expo-camera',
      {
        cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
        microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone',
        recordAudioAndroid: true,
      },
    ],
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
      },
    ],
    [
      'expo-secure-store',
      {
        configureAndroidBackup: true,
        faceIDPermission: 'Allow $(PRODUCT_NAME) to access your Face ID biometric data.',
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission: 'The app accesses your photos to let you share them with your friends.',
      },
    ],
    [
      'expo-media-library',
      {
        photosPermission: 'Allow $(PRODUCT_NAME) to access your photos.',
        savePhotosPermission: 'Allow $(PRODUCT_NAME) to save photos.',
        isAccessMediaLocationEnabled: true,
      },
    ],
    [
      'expo-font',
      {
        android: {
          fonts: [
            {
              fontFamily: 'Poppins',
              fontDefinitions: [
                { path: './assets/fonts/Poppins-Regular.ttf', weight: 400 },
                { path: './assets/fonts/Poppins-Medium.ttf', weight: 500 },
                { path: './assets/fonts/Poppins-SemiBold.ttf', weight: 600 },
                { path: './assets/fonts/Poppins-Bold.ttf', weight: 700 },
              ],
            },
          ],
        },
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          compileSdkVersion: 35,
          targetSdkVersion: 35,
          buildToolsVersion: '35.0.0',
        },
        ios: {
          deploymentTarget: '15.1',
        },
      },
    ],
  ],
  extra: {
    ...config.extra,
    eas: {
      projectId: '0689a068-dfea-44dc-a861-7900a8d0a5b6',
    },
    CROSSFIRE_API_EMAIL: process.env.CROSSFIRE_API_EMAIL,
    CROSSFIRE_API_PASSWORD: process.env.CROSSFIRE_API_PASSWORD,
    OPENCAGE_API_KEY: process.env.OPENCAGE_API_KEY,
    EXPO_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
});
