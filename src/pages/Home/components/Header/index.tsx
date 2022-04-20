import React from 'react';
import { View, Image, Text } from 'react-native';
import pokeball from '../../../../../assets/pokeball-transparent.jpg';
import { IconBall } from './styles';

const Header = () => {
  return (
    <View
      style={{
        height: 100
      }}
    >
      <IconBall source={pokeball} resizeMode="cover" />
    </View>
  );
};

export default Header;
