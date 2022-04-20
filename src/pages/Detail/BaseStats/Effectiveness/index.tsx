import React, { useEffect, useState } from "react";

import { Text, ScrollView, View } from "react-native";

import api from "../../../../services/api";
import { getColorByPokemonType } from "../../../../utils";
// import { SlideProps } from '../../tabs';

import {
  Container,
  Header,
  EffectivenessList,
  EffectivenessItem,
} from "./styles";

type EffectivenessType = {
  multiplier: string;
  type: string;
};

export default function Effectiveness({ pokemon }) {
  const [effectiveness, setEffectiveness] = useState<EffectivenessType[]>([]);
  const [loading, setLoading] = useState(true);

  const pokemonPrimaryType = pokemon.types[0].name.toLowerCase();

  useEffect(() => {
    async function loadPokemonEffectiveness() {
      const response = await api.get(`effectiveness/${pokemonPrimaryType}`);

      setEffectiveness(response.data);
      setLoading(false);
    }

    loadPokemonEffectiveness();
  }, [pokemonPrimaryType]);

  return (
    <Container>
      {loading ? (
        <Text>is loading</Text>
      ) : (
        <>
          <Header>
            <Text variant="body1" bold>
              Type defenses
            </Text>
            <Text color="grey" style={{ marginTop: 8 }}>
              The effectiveness of each type on {pokemon.name}.
            </Text>
          </Header>
          <View style={{ height: 180 }}>
            <ScrollView>
              <EffectivenessList>
                {effectiveness.map((effect) => {
                  const backgroundColor = getColorByPokemonType(effect.type);

                  return (
                    <EffectivenessItem
                      key={effect.type}
                      style={{ backgroundColor: `${backgroundColor}30` }}
                    >
                      <Text
                        variant="caption"
                        bold
                        style={{ color: backgroundColor }}
                      >
                        {effect.type} {effect.multiplier}
                      </Text>
                    </EffectivenessItem>
                  );
                })}
              </EffectivenessList>
            </ScrollView>
          </View>
        </>
      )}
    </Container>
  );
}
