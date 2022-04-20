import React from "react";
import { Text } from "react-native";
// import { SlideProps } from "../tabs";

import Effectiveness from "./Effectiveness";
import { Stat, StatGraph, StatLine, StatValue } from "./styles";

const BaseStats = ({ pokemon }) => {
  return (
    <>
      {pokemon.stats.map((stat) => (
        <Stat key={stat.url}>
          <Text color="grey" style={{ width: 100 }}>
            {stat.name}
          </Text>

          <StatGraph>
            <Text style={{ width: 30, textAlign: "right", fontWeight: "bold" }}>
              {stat.base_stat}
            </Text>

            <StatLine>
              <StatValue width={stat.base_stat} />
            </StatLine>
          </StatGraph>
        </Stat>
      ))}

      <Effectiveness pokemon={pokemon} />
    </>
  );
};

export default BaseStats;
