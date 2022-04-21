import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect
} from 'react';
import { Animated, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Text from '../../components/Text';
import pokeballIcon from '../../../assets/pokeball-transparent.jpg';
import { tabs } from './tabs';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Tabs,
  TabButton,
  SlideWrapper,
  ImageBall,
  ContentInfo,
  ContentType,
  Type,
  SectionAbout
} from './styles';
import { lighten } from 'polished';
import { Props } from './types';
import { POKEMON_TYPE_COLORS } from '../../constants';

const Detail = ({ route }: Props) => {
  const {
    params: { pokemon }
  } = route;

  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation();

  const [tabActive, setTabActive] = useState(0);
  const { width } = Dimensions.get('window');

  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -30,
          duration: 1000,
          delay: 0,
          useNativeDriver: false
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false
        })
      ]),
      {
        iterations: 100
      }
    ).start();
  }, []);

  const handleChangeSlide = useCallback((index: number) => {
    setTabActive(index);
    console.log('index', index);
    console.log('width * index', width * index);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: width * index,
        animated: true
      });
    }
  }, []);

  return (
    <SafeAreaView>
      <LinearGradient
        start={{ x: 0.8, y: 0.2 }}
        colors={[
          lighten(
            0.2,
            POKEMON_TYPE_COLORS[pokemon.types[0].type.name.toLowerCase()]
          ),
          POKEMON_TYPE_COLORS[pokemon.types[0].type.name.toLowerCase()]
        ]}
        style={{ height: 300 }}
      >
        <SectionAbout>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              marginLeft: 20
            }}
          >
            <Animated.Image
              style={{ height: 120, width: 120, top: translateY }}
              source={{
                uri: pokemon.image
              }}
            />

            <ContentInfo>
              <Text variant="caption"> #{pokemon.id}</Text>
              <Text variant="body1" bold color="white">
                {pokemon.name}
              </Text>
              <ContentType horizontal>
                {pokemon.types.map((type) => (
                  <Type
                    backgroundColor={
                      POKEMON_TYPE_COLORS[type.type.name.toLowerCase()]
                    }
                  >
                    <Text color="white" variant="caption">
                      {type.type.name}
                    </Text>
                  </Type>
                ))}
              </ContentType>
            </ContentInfo>
          </View>
        </SectionAbout>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 20
          }}
        >
          <Tabs style={{}}>
            {tabs.map((tab, index) => {
              return (
                <TabButton key={index} onPress={() => handleChangeSlide(index)}>
                  {tabActive === index && <ImageBall source={pokeballIcon} />}
                  <Text style={{ color: '#fff', fontWeight: '700' }}>
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
