import React from 'react';

import { View } from 'react-native';
import pokeball from '../../../../../assets/pokeball-gray.jpg';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  ContentInfo,
  ContentImage,
  IconBall,
  IconPokemon,
  Type,
  ContentType
} from './styles';
import Text from '../../../../components/Text';
import { PokemonEntity } from '../../../../services/pokemons/types';
import { POKEMON_TYPE_COLORS } from '../../../../constants/';
interface Props {
  pokemon: PokemonEntity;
}
const Card = ({ pokemon }: Props) => {
  const navigation = useNavigation();
  // console.log('pokemon', pokemon.types[0].type.name.toLowerCase());
  return (
    <Container
      key={pokemon.id}
      backgroundColor={
        POKEMON_TYPE_COLORS[pokemon.types[0].type.name.toLowerCase()]
      }
      onPress={() => navigation.navigate('Detail')}
    >
      <ContentInfo>
        <Text variant="caption"> #{pokemon.id}</Text>
        <Text variant="body1" bold color="white">
          {pokemon.name}
        </Text>
        <ContentType style={{ marginTop: 5 }}>
          <Type style={{}}>
            <Text textAlign="center" color="white" variant="caption">
              Bug
            </Text>
          </Type>
        </ContentType>
      </ContentInfo>

      <ContentImage>
        <IconBall source={pokeball} />
        <IconPokemon
          source={{
            uri: pokemon.image
          }}
        />
      </ContentImage>
    </Container>
  );
};

export default Card;
