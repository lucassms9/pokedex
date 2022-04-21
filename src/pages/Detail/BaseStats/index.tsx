import React from 'react';
import Text from '../../../components/Text';
import { POKEMON_TYPE_COLORS } from '../../../constants';
import { PokemonEntity } from '../../../services/pokemons/types';

import { Stat, StatGraph, StatLine, StatValue, Title } from './styles';

interface Props {
  pokemon: PokemonEntity;
}
const BaseStats = ({ pokemon }: Props) => {
  return (
    <>
      <Title
        bold
        color={POKEMON_TYPE_COLORS[pokemon.types[0].type.name.toLowerCase()]}
      >
        Estatísticas
      </Title>
      {pokemon.stats.map((stat) => (
        <Stat key={stat.stat.url}>
          <Text bold style={{ width: 100 }}>
            {stat.stat.name}
          </Text>

          <StatGraph>
            <Text variant="body3">{stat.base_stat}</Text>

            <StatLine>
              <StatValue
                width={stat.base_stat}
                backgroundColor={
                  POKEMON_TYPE_COLORS[pokemon.types[0].type.name.toLowerCase()]
                }
              />
            </StatLine>
          </StatGraph>
        </Stat>
      ))}
    </>
  );
};

export default BaseStats;
