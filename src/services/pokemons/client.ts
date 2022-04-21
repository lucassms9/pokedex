import api from '../api';
import axios from 'axios';
import {
  Ability,
  EvolutionChain,
  Pokemon,
  PokemonApiResult,
  PokemonEntity,
  PokemonSpecie,
  Stat,
  Type
} from './types';
import { capitalizeFirstLetter } from '../../utils';

interface ItemEvolution {
  name: string;
  url: string;
  min_level?: number;
  image: string;
}
export interface EvolutionResponse {
  base_form: ItemEvolution;
  first_evolution: ItemEvolution;
  second_evolution: ItemEvolution;
}

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

  getEvolution = async (id: number): Promise<EvolutionResponse> => {
    const { data: pokemonSpecieData } = await api.get<PokemonSpecie>(
      `/pokemon-species/${id}`
    );

    const pokemonIdInEvolutionChain = this.getPokemonIdByUrl(
      pokemonSpecieData.evolution_chain.url
    );

    const { data: evolutionChain } = await api.get<EvolutionChain>(
      `/evolution-chain/${pokemonIdInEvolutionChain}`
    );

    const evolutionFormatted = evolutionChain.chain.evolves_to.map(
      (evolves) => {
        const { name: baseFormName, url: baseFormUrl } =
          evolutionChain.chain.species;

        const base_form: ItemEvolution = {
          name: capitalizeFirstLetter(baseFormName),
          url: evolutionChain.chain.species.url,
          image: this.getPokemonImageById(this.getPokemonIdByUrl(baseFormUrl))
        };

        let second_evolution: ItemEvolution;

        if (evolves.evolves_to.length !== 0) {
          evolves.evolves_to.map((secondEvolves) => {
            const secondEvolutionPokemonId = this.getPokemonIdByUrl(
              secondEvolves.species.url
            );

            second_evolution = {
              name: capitalizeFirstLetter(secondEvolves.species.name),
              url: secondEvolves.species.url,
              min_level: secondEvolves.evolution_details[0].min_level,
              image: this.getPokemonImageById(secondEvolutionPokemonId)
            };

            return second_evolution;
          });
        }

        const firstEvolutionPokemonId = this.getPokemonIdByUrl(
          evolves.species.url
        );

        const first_evolution: ItemEvolution = {
          name: capitalizeFirstLetter(evolves.species.name),
          url: evolves.species.url,
          min_level: evolves.evolution_details[0].min_level,
          image: this.getPokemonImageById(firstEvolutionPokemonId)
        };

        return {
          base_form,
          first_evolution,
          second_evolution
        } as EvolutionResponse;
      }
    );

    return evolutionFormatted[0] as EvolutionResponse;
  };
  getPokemonIdByUrl = (url: string): string => url.split('/')[6];
  getPokemonImageById = (id: string): string =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
export { PokemonClient };
