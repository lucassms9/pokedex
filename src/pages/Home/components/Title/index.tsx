import React from 'react';

import Text from '../../../../components/Text';
import { Container } from './styles';
const Title = () => {
  return (
    <Container>
      <Text bold variant="title">
        Pokédex
      </Text>
      <Text>Encontre seu pokemon favorito pela pokedex.</Text>
    </Container>
  );
};

export default Title;
