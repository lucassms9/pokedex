import React from 'react';
import Text from '../../../components/Text';

import { ActivityIndicator } from 'react-native';
import EvolutionSection from './EvolutionSection';
import { Content, Title } from './styles';
import { PokemonEntity } from '../../../services/pokemons/types';
import { useEvolution } from '../../../services/pokemons/useEvolution';
import { POKEMON_TYPE_COLORS } from '../../../constants';
interface Props {
  pokemon: PokemonEntity;
}
const Evolution = ({ pokemon }: Props) => {
  const { evolutions, isLoading } = useEvolution(pokemon.id);

  return (
    <>
      <Title
        bold
        color={POKEMON_TYPE_COLORS[pokemon.types[0].type.name.toLowerCase()]}
      >
        Evolução
      </Title>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {evolutions?.first_evolution || evolutions?.second_evolution ? (
            <Content>
              {evolutions.first_evolution && (
                <EvolutionSection
                  firstImage={evolutions.base_form.image}
                  firstName={evolutions.base_form.name}
                  secondName={evolutions.first_evolution.name}
                  secondImage={evolutions.first_evolution.image}
                  minLevel={evolutions.first_evolution.min_level}
                />
              )}

              {evolutions?.second_evolution && (
                <EvolutionSection
                  firstImage={evolutions.first_evolution.image}
                  firstName={evolutions.first_evolution.name}
                  secondName={evolutions.second_evolution.name}
                  secondImage={evolutions.second_evolution.image}
                  minLevel={evolutions.second_evolution.min_level}
                />
              )}
            </Content>
          ) : (
            <Content>
              <Text color="grey">No evolutions</Text>;
            </Content>
          )}
        </>
      )}
    </>
  );
};

export default Evolution;
