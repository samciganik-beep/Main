import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFavorites } from '../context/FavoritesContext';
import locations from '../data/locations';
import LocationCard from '../components/LocationCard';
import colors from '../theme/colors';

export default function FavoritesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { favorites } = useFavorites();
  const savedLocations = locations.filter((l) => favorites.includes(l.id));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        {savedLocations.length > 0 && (
          <Text style={styles.headerSub}>{savedLocations.length} saved places</Text>
        )}
      </View>

      <FlatList
        data={savedLocations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <LocationCard
            location={item}
            onPress={() => navigation.navigate('LocationDetail', { location: item })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🤍</Text>
            <Text style={styles.emptyText}>No favorites yet</Text>
            <Text style={styles.emptySub}>
              Tap the heart icon on any location to save it here
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  headerSub: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
  },
  list: {
    padding: 20,
    paddingTop: 12,
    gap: 16,
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 52,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 15,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
});
