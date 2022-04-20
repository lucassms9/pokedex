import React, { useCallback, useRef, useMemo, useState } from "react";
import { Animated, Dimensions, ScrollView } from "react-native";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Header } from "./styles";
import { LinearGradient } from "expo-linear-gradient";

import pokeballIcon from "../../../assets/pokeball-transparent.jpg";
import { tabs, TAB_BUTTON_WIDTH } from "./tabs";

import {
  Container,
  Tabs,
  TabButton,
  SelectedIndicator,
  SlideWrapper,
  ImageBall,
} from "./styles";

const Detail = ({ navigation }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [tabActive, setTabActive] = useState(0);
  const { width } = Dimensions.get("window");

  const translateX = useMemo(() => new Animated.Value(0), []);

  const handleChangeSlide = useCallback((index: number) => {
    setTabActive(index);
    console.log("index", index);
    console.log("width * index", width * index);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: width * index,
        animated: true,
      });
    }
  }, []);

  // const containerStyle = {
  //   transform: [
  //     {
  //       translateY: translateY.interpolate({
  //         inputRange: [-POKEMON_SUMMARY_HEIGHT, 0],
  //         outputRange: [0, -32],
  //         extrapolate: 'clamp',
  //       }),
  //     },
  //   ],

  const pokemon = {
    id: 1,
    name: "Bulbasaur",
    description:
      "BULBASAUR can be seen napping in\nbright sunlight.\nThere is a seed on its back.\fBy soaking up the sun’s rays, the seed\ngrows progressively larger.",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    genera: "Seed Pokémon",
    pokedex_number: "001",
    base_experience: 64,
    types: [
      {
        name: "Grass",
        url: "https://pokeapi.co/api/v2/type/12/",
      },
      {
        name: "Poison",
        url: "https://pokeapi.co/api/v2/type/4/",
      },
    ],
    stats: [
      {
        base_stat: 45,
        name: "HP",
        url: "https://pokeapi.co/api/v2/stat/1/",
      },
      {
        base_stat: 49,
        name: "Attack",
        url: "https://pokeapi.co/api/v2/stat/2/",
      },
      {
        base_stat: 49,
        name: "Defense",
        url: "https://pokeapi.co/api/v2/stat/3/",
      },
      {
        base_stat: 65,
        name: "Sp. Atk",
        url: "https://pokeapi.co/api/v2/stat/4/",
      },
      {
        base_stat: 65,
        name: "Sp. Def",
        url: "https://pokeapi.co/api/v2/stat/5/",
      },
      {
        base_stat: 45,
        name: "Speed",
        url: "https://pokeapi.co/api/v2/stat/6/",
      },
    ],
    height: 7,
    weight: 69,
    abilites: [
      {
        name: "Overgrow",
        url: "https://pokeapi.co/api/v2/ability/65/",
      },
      {
        name: "Chlorophyll",
        url: "https://pokeapi.co/api/v2/ability/34/",
      },
    ],
    gender_rate: 1,
    egg_groups: [
      {
        name: "Monster",
        url: "https://pokeapi.co/api/v2/egg-group/1/",
      },
      {
        name: "Plant",
        url: "https://pokeapi.co/api/v2/egg-group/7/",
      },
    ],
  };

  const selectedIndicatorStyle = {
    transform: [
      {
        translateX: translateX.interpolate({
          inputRange: tabs.map((_, index) => width * index),
          outputRange: tabs.map((_, index) => TAB_BUTTON_WIDTH * index),
          extrapolate: "clamp",
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        start={{ x: 0.7, y: 0 }}
        // end={{ x: 0, y: 1 }}
        colors={["#6aa857", "#8bd674"]}
        style={{ height: 300 }}
      >
        <View style={{ marginHorizontal: 30, marginTop: 30 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              marginLeft: 20,
            }}
          >
            <Image
              style={{ height: 120, width: 120 }}
              source={{
                uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png",
              }}
            />

            <View style={{}}>
              <Text style={{ fontSize: 12 }}>#014</Text>
              <Text style={{ fontSize: 22, color: "#fff", fontWeight: "800" }}>
                Kakuna
              </Text>
              <View style={{ marginTop: 5 }}>
                <View
                  style={{
                    backgroundColor: "#8cb331",
                    width: 40,
                    padding: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{ fontSize: 12, color: "#fff", textAlign: "center" }}
                  >
                    Bug
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <Tabs style={{}}>
            {tabs.map((tab, index) => {
              return (
                <TabButton key={index} onPress={() => handleChangeSlide(index)}>
                  {tabActive === index && <ImageBall source={pokeballIcon} />}
                  <Text style={{ color: "#fff", fontWeight: "700" }}>
                    {tab.name}
                  </Text>
                </TabButton>
              );
            })}
          </Tabs>
        </View>
      </LinearGradient>

      <Container style={{}}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          decelerationRate="fast"
          bounces={false}
        >
          {tabs.map(({ slide: Slide }, index) => (
            <SlideWrapper key={index}>
              <Slide pokemon={pokemon} />
            </SlideWrapper>
          ))}
        </Animated.ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default Detail;
