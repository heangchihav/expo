// // src/navigation/BottomTabsNavigator.tsx
// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { View, Text } from 'react-native';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// const SettingsScreen = () => <View><Text>Settings</Text></View>;
// const ServiceScreen = () => <View><Text>Service</Text></View>;
// const PromotionScreen = () => <View><Text>Promotion</Text></View>;

// const BottomTabs = () => (
//   <Tab.Navigator>
//     <Tab.Screen name="Settings" component={SettingsScreen} />
//     <Tab.Screen name="Service" component={ServiceScreen} />
//     <Tab.Screen name="Promotion" component={PromotionScreen} />
//   </Tab.Navigator>
// );

// export const MainStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Tabs" component={BottomTabs} options={{ headerShown: false }} />
//     {/* Add more stack screens if needed */}
//   </Stack.Navigator>
// );
