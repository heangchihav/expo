import React, { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider, useLanguage, Language } from '../contexts/LanguageContext';
import { colorScheme } from '../hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function LayoutContent() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const pathname = usePathname();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setIsReady(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const handleRedirect = async () => {
      if (isReady) {
        // Extract the language code from the pathname
        const newLanguage = (pathname.split('/')[1] as Language) || 'en';

        // Validate language
        const validLanguages: Language[] = ['en', 'fr'];
        if (validLanguages.includes(newLanguage)) {
          // Set valid language
          setLanguage(newLanguage);
          await AsyncStorage.setItem('lastValidLanguage', newLanguage);
        } else {
          // Redirect to the last valid language
          const lastValidLanguage = await AsyncStorage.getItem('lastValidLanguage');
          if (lastValidLanguage) {
            router.push(`/${lastValidLanguage}`); // Redirect to last valid language
          } else {
            router.push('/en'); // Fallback to default language if no valid language is found
          }
        }

        // Redirect from root to the current language path
        if (pathname === '/') {
          router.push(`/${language}`); // Redirect to the current language path
        }
      }
    };

    handleRedirect();
  }, [isReady, pathname, setLanguage, router, language]);

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
