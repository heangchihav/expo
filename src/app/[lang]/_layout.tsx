import React, { useContext, useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Language, useLanguage } from '../../contexts/LanguageContext';
import { useIsLargeScreen } from '../../hooks/useIsLargeScreen';
import { ScrollView, View } from 'react-native';
import UnderNav from '@/src/components/UnderNav';
import Navbar from '@/src/components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalComponent from '@/src/components/Modal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeContext } from '@/src/contexts/ThemeContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DrawerGroup from './(drawer)/_layout';
import ContactPage from './(tabs)/contact';
import Promotion from './(tabs)/promotion';

// Prevent the splash screen from auto-hiding before asset loading is complete.
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
          <Tab.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
            <Tab.Screen name='home' component={DrawerGroup} />
            <Tab.Screen name='contact' component={ContactPage} />
            <Tab.Screen name='promotion' component={Promotion} />
          </Tab.Navigator>
        )}
      </View>
      <ModalComponent
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </NavigationThemeProvider>
  );
}
export default function LanguageLayout() {
  return <LayoutContent />;
}
