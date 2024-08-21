import React, { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Language, useLanguage } from '../../contexts/LanguageContext';
import { useIsLargeScreen } from '../../hooks/useIsLargeScreen';
import { ScrollView, View } from 'react-native';
import UnderNav from '@/src/components/UnderNav';
import { Drawer } from 'expo-router/drawer';
import { colorScheme } from '@/src/hooks/useColorScheme';
import Navbar from '@/src/components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function LayoutContent() {
  const isLargeScreen = useIsLargeScreen();
  const [loaded] = useFonts({
    SpaceMono: require('../../../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

      const handleRedirect = async () => {
        const urlLanguage = (pathname.split('/')[1] as Language) || 'en';

        // Validate and set the language
        const validLanguages: Language[] = ['en', 'fr'];
        if (validLanguages.includes(urlLanguage)) {
          setLanguage(urlLanguage);
          await AsyncStorage.setItem('lastValidLanguage', urlLanguage);
        } else {
          const lastValidLanguage = await AsyncStorage.getItem('lastValidLanguage');
          if (lastValidLanguage) {
            router.push(`/${lastValidLanguage}`);
          } else {
            router.push('/en');
          }
        }
      };

      handleRedirect();
    }
  }, [loaded, pathname, language, setLanguage, router]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        {isLargeScreen ? (
          <View style={{ flex: 1 }}>
            <View style={{ zIndex: 1 }}>
              <Navbar />
            </View>
            <ScrollView>
              <UnderNav />
              <Slot />
            </ScrollView>
          </View>
        ) : (
          <Drawer />
        )}
      </View>
    </NavigationThemeProvider>
  );
}

export default function LanguageLayout() {
  return <LayoutContent />;
}
