import React, { useState } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useOrientation } from '@/hooks/useOrientation';
import { Colors } from '@/constants/Colors';
import { PlanteCard } from '@/components/PlanteCard';
import { RootView } from '@/components/RootView';
import SearchBar from '@/components/SearchBar';
import TopScreen from '@/components/TopScreen';
import EmptyListMessage from '@/components/EmptyListMessage';
import { useApiQuery } from '@/hooks/useApiQuery';
import withRedirectAuth from '@/hocs/withRedirectAuth';
import useAuthStore from '@/hooks/useAuthStore';

function Home() {
  const header = useAuthStore.use.getAuthorization()
  const { data: plantes, isLoading } = useApiQuery("/plantes", {}, {
    ...header()
  });
  const [searchValue, setSearchValue] = useState('');

  const filteredPlantes = plantes && searchValue ?
    plantes.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    : plantes;

  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
  const cardColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

  const { orientation } = useOrientation();

  if (isLoading) {
    return (
      <RootView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </RootView>
    );
  }

  const numColumns = Math.floor(Dimensions.get('window').width / 150);

  const key = `grid-${numColumns}`;

  return (
    <RootView>
      <TopScreen />
      <SearchBar
        value={searchValue}
        onChange={setSearchValue}
      />
      <FlatList
        style={styles.contentContainer}
        data={filteredPlantes}
        numColumns={numColumns}
        key={key}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlanteCard
            imageUrl={item.imageUrl}
            name={item.name}
            id={item.id}
            description={item.description}
            cardColor={cardColor}
            textColor={textColor}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyListMessage
            searchValue={searchValue}
            textColor={textColor}
          />
        )}
      />
    </RootView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});

export default withRedirectAuth(Home)