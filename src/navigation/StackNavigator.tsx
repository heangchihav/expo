// src/screens/HomeScreen.tsx
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Sports from '../app/[lang]/(games)/sport_lobby';
import Casino from '../app/[lang]/(games)/casino_lobby';
import Slots from '../app/[lang]/(games)/sport_lobby';
import FishingLayout from '../app/[lang]/(games)/(slots_finsh)/_layout';
import NumberLobby from '../app/[lang]/(games)/number_lobby';
import Poker from '../app/[lang]/(games)/poker_lobby';
import Lottery from '../app/[lang]/(games)/lott_lobby';
import Cock from '../app/[lang]/(games)/cock_lobby';
import Promotion from '../app/[lang]/promotion';

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