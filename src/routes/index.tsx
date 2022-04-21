import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import Detail from '../pages/Detail';
import { PokemonEntity } from '../services/pokemons/types';

export type RootStackParamList = {
  Home: undefined;
  Detail: { pokemon: PokemonEntity };
};

const Routes = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
