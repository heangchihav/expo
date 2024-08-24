import React, { useContext, useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Language, useLanguage } from '../../contexts/LanguageContext';
import { useIsLargeScreen } from '../../hooks/useIsLargeScreen';
import { Button, ScrollView, View } from 'react-native';
import UnderNav from '@/src/components/UnderNav';
import Navbar from '@/src/components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalComponent from '@/src/components/Modal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeContext } from '@/src/contexts/ThemeContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactPage from './contact';
import SlideInModal from '@/src/components/SlideInModal';
import HomePage from '.';
import PromotionPage from './promotion';
import { StackNavigator } from '@/src/navigation/StackNavigator';
import SmallScreenNav from '@/src/components/SmallScreenNav';
import BottomTab from '@/src/components/BottomTab';

SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();

function LayoutContent() {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  const isLargeScreen = useIsLargeScreen();
  const [loaded] = useFonts({
    SpaceMono: require('../../../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const [newsModalVisible, setNewsModalVisible] = useState(false);

  useEffect(() => {
    async function initialize() {
      const hasVisited = await AsyncStorage.getItem('hasVisited');
      if (!hasVisited) {
        setNewsModalVisible(true);
        await AsyncStorage.setItem('hasVisited', 'true');
      }
    }

    if (loaded) {
      SplashScreen.hideAsync();

      const handleRedirect = async () => {
        const urlLanguage = (pathname.split('/')[1] as Language) || 'en';
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
      initialize();
    }
  }, [loaded, pathname, language, setLanguage, router]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
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
          <GestureHandlerRootView style={{ flex: 1 }}>

            <View style={{ flex: 1 }}>
              {/* <View style={{ zIndex: 1 }}>
                <Navbar />
              </View> */}
              <ScrollView>
                <SmallScreenNav />
                <Slot />
              </ScrollView>
              <BottomTab />
            </View>
          </GestureHandlerRootView>
        )}
      </View>
      <ModalComponent
        visible={newsModalVisible}
        onClose={() => setNewsModalVisible(false)}
      />
    </NavigationThemeProvider>
  );
}

export default function LanguageLayout() {
  return <LayoutContent />;
}
