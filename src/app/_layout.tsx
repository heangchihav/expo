// src/app/_layout.tsx
import React, { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider, useLanguage, Language } from '../contexts/LanguageContext';
import { colorScheme } from '../hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
function LayoutContent() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const pathname = usePathname();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const { setLanguage } = useLanguage();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setIsReady(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (isReady) {
      const language: Language = (pathname?.split('/')[1] as Language) || 'en';
      setLanguage(language);

      // Redirect to default language if pathname is '/'
      if (pathname === '/') {
        router.push('/en'); // Redirect to default language
      }
    }
  }, [isReady, pathname]);

  if (!isReady) {
    return null;
  }

  const currentTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationThemeProvider value={currentTheme}>
      <Stack>
        <Stack.Screen name="[lang]" options={{ headerShown: false }} />
      </Stack>
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <LayoutContent />
      </ThemeProvider>

    </LanguageProvider>
  );
}
