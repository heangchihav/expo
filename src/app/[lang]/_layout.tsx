import React, { useContext, useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Language, useLanguage } from '../../contexts/LanguageContext';
import { useIsLargeScreen } from '../../hooks/useIsLargeScreen';
import { View } from 'react-native';
import Navbar from '@/src/components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalComponent from '@/src/components/Modal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeContext } from '@/src/contexts/ThemeContext';
import ContactPage from '../../screens/menus/contact';
import PromotionPage from '../../screens/menus/promotion';
import { StackNavigator } from '@/src/navigation/StackNavigator';
import SmallScreenNav from '@/src/components/SmallScreenNav';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LayoutContent = () => {
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
        // Check the current URL's language segment
        const urlLanguage = (pathname.split('/')[1] as Language) || 'en';
        const validLanguages: Language[] = ['en', 'fr'];

        if (validLanguages.includes(urlLanguage)) {
          setLanguage(urlLanguage);
          await AsyncStorage.setItem('language', urlLanguage);
        } else {
          // Redirect to the last valid language or default
          const lastValidLanguage = await AsyncStorage.getItem('language');
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
          <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ zIndex: 1 }}>
              <Navbar />
            </View>
            <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={StackNavigator} />
              <Stack.Screen name="Contact" component={ContactPage} />
              <Stack.Screen name="Promotion" component={PromotionPage} />
            </Stack.Navigator>
          </GestureHandlerRootView>
        ) : (
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={{ zIndex: 1 }}>
                <SmallScreenNav />
              </View>
              <View style={{ flex: 1 }}>
                <Tab.Navigator
                  initialRouteName='Home'
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Tab.Screen name="Home" component={StackNavigator} />
                  <Tab.Screen name="Contact" component={ContactPage} />
                  <Tab.Screen name="Promotion" component={PromotionPage} />
                </Tab.Navigator>
              </View>
            </SafeAreaView>
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

export default LayoutContent;
