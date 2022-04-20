import api from '../api';
import axios from 'axios';
import {
  Ability,
  Pokemon,
  PokemonApiResult,
  PokemonEntity,
  PokemonSpecie,
  Stat,
  Type
} from './types';
import { capitalizeFirstLetter } from '../../utils';

class PokemonClient {
  getPaginationPokemon = async (
    offset = 0,
    limit = 8
  ): Promise<PokemonEntity[]> => {
    const getPagination = await api
      .get<PokemonApiResult>(`/pokemon?offset=${offset}&limit=${limit}`)
      .then((data) => data.data);

    const pokemons = getPagination.results.map(async (item) => {
      //detalhe do pokemon
      const pokemonData = await axios
        .get<Pokemon>(item.url)
        .then((data) => data.data);

      const pokemonSpecieData = await axios
        .get<PokemonSpecie>(pokemonData.species.url)
        .then((data) => data.data);

      const pokemonNameIndex = pokemonSpecieData.names.findIndex(
        (name) => name.language.name === 'en'
      );

      const pokemonFlavorTextIndex =
        pokemonSpecieData.flavor_text_entries.findIndex(
          (text) =>
            text.version.name === 'ruby' ||
            text.version.name === 'platinum' ||
            text.version.name === 'soulsilver'
        );

      const pokemonGeneraIndex = pokemonSpecieData.genera.findIndex(
        (genera) => genera.language.name === 'en'
      );

      const pokemonTypesFormatted = pokemonData.types.map(({ type }) => {
        return {
          type: {
            name: capitalizeFirstLetter(type.name),
            url: type.url
          }
        } as Type;
      });

      const pokemonStatsFormatted = pokemonData.stats.map((stat) => {
        let name = '';

        if (stat.stat.name === 'hp') {
          name = 'HP';
        } else if (stat.stat.name === 'attack') {
          name = 'Attack';
        } else if (stat.stat.name === 'defense') {
          name = 'Defense';
        } else if (stat.stat.name === 'special-attack') {
          name = 'Sp. Atk';
        } else if (stat.stat.name === 'special-defense') {
          name = 'Sp. Def';
        } else if (stat.stat.name === 'speed') {
          name = 'Speed';
        }

        return {
          base_stat: stat.base_stat,
          stat: {
            name,
            url: stat.stat.url
          }
        } as Stat;
      });

      const pokemonAbilityFormatted = pokemonData.abilities.map(
        ({ ability }) => {
          return {
            ability: {
              name: capitalizeFirstLetter(ability.name),
              url: ability.url
            }
          } as Ability;
        }
      );

      const eggGroupsFormatted = pokemonSpecieData.egg_groups.map(
        (egg_group) => {
          return {
            name: capitalizeFirstLetter(egg_group.name),
            url: egg_group.url
          };
        }
      );

      return {
        id: pokemonData.id,
        name: pokemonSpecieData.names[pokemonNameIndex].name,
        description:
          pokemonSpecieData.flavor_text_entries[pokemonFlavorTextIndex]
            .flavor_text,
        image: pokemonData.sprites.other['official-artwork'].front_default,
        genera: pokemonSpecieData.genera[pokemonGeneraIndex].genus,
        pokedex_number: pokemonData.id.toString().padStart(3, '0'),
        base_experience: pokemonData.base_experience,
        types: pokemonTypesFormatted as Type[],
        stats: pokemonStatsFormatted as Stat[],
        height: pokemonData.height,
        weight: pokemonData.weight,
        abilites: pokemonAbilityFormatted as Ability[],
        gender_rate: pokemonSpecieData.gender_rate,
        egg_groups: eggGroupsFormatted
      } as PokemonEntity;
    });

    return await Promise.all(pokemons);
  };
}
export { PokemonClient };
