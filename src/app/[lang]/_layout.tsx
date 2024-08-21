import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { Language, LanguageProvider, useLanguage } from '../../contexts/LanguageContext';
import { useIsLargeScreen } from '../../hooks/useIsLargeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, View } from 'react-native';
import ModalComponent from '@/src/components/Modal';
import UnderNav from '@/src/components/UnderNav';
import Navbar from '@/src/components/Navbar';
import { Drawer } from 'expo-router/drawer'
import { colorScheme } from '@/src/hooks/useColorScheme';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function LayoutContent() {

  const isLargeScreen = useIsLargeScreen();
  const [loaded] = useFonts({
    SpaceMono: require('../../../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const pathname = usePathname();
  const language = pathname.split('/')[1] as Language; // Extract language from pathname
  const { setLanguage } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function initialize() {
      const hasVisited = await AsyncStorage.getItem('hasVisited');
      if (!hasVisited) {
        setModalVisible(true);
        await AsyncStorage.setItem('hasVisited', 'true');
      }
    }
    if (loaded) {
      SplashScreen.hideAsync();
      setLanguage(language); // Set language based on pathname
      initialize();
    }
  }, [loaded, language]);
  if (!loaded) {
    return null;
  }
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
        <ModalComponent
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <LayoutContent />
    </LanguageProvider>
  );
}
