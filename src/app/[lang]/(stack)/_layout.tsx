// src/screens/HomeScreen.tsx
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Sports from '../(games)/sport_lobby';
import Casino from '../(games)/casino_lobby';
import Slots from '../(games)/sport_lobby';
import FishingLayout from '../(games)/(slots_finsh)/_layout';
import NumberLobby from '../(games)/number_lobby';
import Poker from '../(games)/poker_lobby';
import Lottery from '../(games)/lott_lobby';
import Cock from '../(games)/cock_lobby';
import Promotion from '../(tabs)/promotion';

const Stack = createStackNavigator();

export const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Sport" component={Sports} />
    <Stack.Screen name="Live Casino" component={Casino} />
    <Stack.Screen name="Slots" component={Slots} />
    <Stack.Screen name="Fishing Games" component={FishingLayout} />
    <Stack.Screen name="Number" component={NumberLobby} />
    <Stack.Screen name="Poker" component={Poker} />
    <Stack.Screen name="Lottery" component={Lottery} />
    <Stack.Screen name="Cockfight" component={Cock} />
    <Stack.Screen name="Promotion" component={Promotion} />
  </Stack.Navigator>
);