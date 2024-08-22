import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '@/src/components/navigation/CustomDrawerContent';
import { Colors } from '@/src/constants/Colors';
import { ThemeContext } from '@/src/contexts/ThemeContext';
import Slots from '../(games)/slots';
const DrawerGroup = () => {
  const Drawer = createDrawerNavigator();
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  return (

    <Drawer.Navigator drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerActiveBackgroundColor: isDarkMode ? Colors.dark.tabIconSelected : Colors.light.tabIconSelected,
        drawerActiveTintColor: isDarkMode ? Colors.dark.text : Colors.light.text,
        drawerStyle: {
          backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background
        }
      }}>
      <Drawer.Screen name='slot' component={Slots} />
    </Drawer.Navigator>
  )
}

export default DrawerGroup