import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Foundation as Icon } from '@expo/vector-icons';

import Text from '../../../components/Text';

import {
  convertValues,
  getPokemonGenderStats,
  replaceString
} from '../../../utils';

import {
  Section,
  SectionTitle,
  SectionContent,
  SectionSubtitle,
  SectionText,
  SectionItem,
  Container
} from './styles';
import { POKEMON_TYPE_COLORS } from '../../../constants';
import { PokemonEntity } from '../../../services/pokemons/types';

interface Props {
  pokemon: PokemonEntity;
}

const About = ({ pokemon }: Props) => {
  const pokemonFormatted = useMemo(() => {
    return {
      ...pokemon,
      descriptionWithNoBreakLine: replaceString(pokemon.description),
      heightInMeters: convertValues.decimeterToMeter(pokemon.height),
      heightInFeet: convertValues.decimeterToFeet(pokemon.height),
      weightInKilograms: convertValues.hectogramsToKilograms(pokemon.weight),
      weightInPounds: convertValues.hectogramsToPounds(pokemon.weight),
      abilitesFormatted: pokemon.abilites.map((item) => item.ability.name)
    };
  }, [pokemon]);

  const pokemonGendersRate = getPokemonGenderStats(pokemon.gender_rate);

  console.log('pokemonFormatted', pokemonFormatted.abilites);
  return (
    <Container>
      <Section>
        <Text>{pokemonFormatted.descriptionWithNoBreakLine}</Text>
      </Section>

      <Section>
        <SectionTitle
          color={POKEMON_TYPE_COLORS[pokemon.types[0].type.name.toLowerCase()]}
        >
          Pokédex Dados
        </SectionTitle>

        <SectionItem>
          <SectionSubtitle>
            <Text bold>Altura</Text>
          </SectionSubtitle>
          <Text textAlign="left">
            {pokemonFormatted.heightInMeters} m ({pokemonFormatted.heightInFeet}
            ft)
          </Text>
        </SectionItem>
        <SectionItem>
          <SectionSubtitle>
            <Text bold>Peso</Text>
          </SectionSubtitle>
          <Text>
            {pokemonFormatted.weightInKilograms} kg (
            {pokemonFormatted.weightInPounds}
            lbs)
          </Text>
        </SectionItem>
        <SectionItem>
          <SectionSubtitle>
            <Text bold>Abilidades</Text>
          </SectionSubtitle>
          <Text>{pokemonFormatted.abilitesFormatted.join(',')}</Text>
        </SectionItem>
      </Section>

      <Section>
        <SectionTitle
          color={POKEMON_TYPE_COLORS[pokemon.types[0].type.name.toLowerCase()]}
        >
          Training
        </SectionTitle>

        <SectionContent>
          <SectionSubtitle>
            <Text bold>Base EXP</Text>
          </SectionSubtitle>

          <SectionText>{pokemon.base_experience}</SectionText>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle
          color={POKEMON_TYPE_COLORS[pokemon.types[0].type.name.toLowerCase()]}
        >
          Reprodução
        </SectionTitle>

        <SectionContent>
          <SectionSubtitle>
            <Text bold>Gênero</Text>
          </SectionSubtitle>

          {pokemonGendersRate.map((gender) => (
            <SectionText key={gender.gender} style={{ marginRight: 16 }}>
              {gender.gender === 'genderless' ? (
                <Text style={{ fontWeight: 'bold' }}>sem sexo</Text>
              ) : (
                <>
                  <Icon
                    name={
                      gender.gender === 'male' ? 'male-symbol' : 'female-symbol'
                    }
                    color={gender.gender === 'male' ? '#6890F0' : '#EE99AC'}
                    size={16}
                  />
                  {'  '}
                  {gender.rate}%
                </>
              )}
            </SectionText>
          ))}
        </SectionContent>

        <SectionContent>
          <SectionSubtitle>
            <Text bold>Egg Groups</Text>
          </SectionSubtitle>

          {pokemon.egg_groups.map((egg_group) => (
            <SectionText key={egg_group.url} style={{ marginRight: 8 }}>
              {egg_group.name}
            </SectionText>
          ))}
        </SectionContent>
      </Section>
    </Container>
  );
};

export default About;
