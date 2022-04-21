import React, { useCallback, useMemo, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Button,
  ActivityIndicator,
  ListRenderItemInfo
} from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from 'rn-placeholder';
import usePaginationList from '../../services/pokemons/';
import Header from './components/Header';
import Title from './components/Title';
import Card from './components/Card';

import { Container, Content, List, ContentLoading } from './styles';
import { PokemonEntity } from '../../services/pokemons/types';

const Home = () => {
  const [offset, setOffset] = useState(8);
  const {
    pokemons,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = usePaginationList();

  const skeletons = Array.from(Array(20));

  const renderItem = ({ item, index }) => {
    if (isLoading) {
      return (
        <ContentLoading key={index}>
          {skeletons.map((_) => (
            <Placeholder
              style={{ marginBottom: 20 }}
              Animation={Fade}
              Right={() => (
                <PlaceholderMedia
                  style={{ marginRight: 15 }}
                  size={60}
                  isRound
                />
              )}
            >
              <PlaceholderLine width={40} />
              <PlaceholderLine width={40} />
              <PlaceholderLine width={25} />
            </Placeholder>
          ))}
        </ContentLoading>
      );
    }
    return <Card key={item.id} pokemon={item} />;
  };

  const loadMorePosts = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage({ pageParam: { offset: offset } });
      setOffset((prev) => prev + 8);
    }
  }, [offset, fetchNextPage, isFetchingNextPage, hasNextPage]);

  const loadingPosts = () => {
    if (!isFetchingNextPage) return null;
    return <ActivityIndicator style={{ marginBottom: 20 }} color={'#000'} />;
  };

  return (
    <Container>
      <Header />
      <Content>
        <Title />
        <List
          data={!isLoading ? pokemons : skeletons}
          renderItem={renderItem}
          keyExtractor={(item: PokemonEntity) => item?.id.toString()}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.3}
          ListFooterComponent={loadingPosts}
        />
      </Content>
    </Container>
  );
};

export default Home;
