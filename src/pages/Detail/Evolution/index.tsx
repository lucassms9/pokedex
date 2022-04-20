import React, { useEffect, useMemo, useState } from 'react';

import { Text } from 'react-native';
// import Loading from '../../../../components/Loading';
import api from '../../../services/api';
import { EvolutionChain } from '../../../../types';
// import { SlideProps } from "../tabs";

import EvolutionSection from './EvolutionSection';
import { Content } from './styles';

const Evolution = ({ pokemon }) => {
  const [evolutions, setEvolutions] = useState({} as EvolutionChain);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPokemonEvolutions() {
      const response = await api.get(`evolutions/${pokemon.id}`);

      setEvolutions(response.data);
      setLoading(false);
    }

    loadPokemonEvolutions();
  }, [pokemon.id]);

  const noResponseContent = useMemo(() => {
    if (loading) {
      return <Text>loading</Text>;
    }

    return <Text styles={{ color: 'gray' }}>No evolutions.</Text>;
  }, [loading]);

  return (
    <>
      <Text styles={{ fontWeight: 'bold' }}>Evolution Chain</Text>

      {evolutions.first_evolution || evolutions.second_evolution ? (
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

          {evolutions.second_evolution && (
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
        <Content>{noResponseContent}</Content>
      )}
    </>
  );
};

export default Evolution;
