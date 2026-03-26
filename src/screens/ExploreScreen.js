import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import locations, { CATEGORIES } from '../data/locations';
import LocationCard from '../components/LocationCard';
import CategoryFilter from '../components/CategoryFilter';
import colors from '../theme/colors';

export default function ExploreScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const initialCategory = route?.params?.category || 'All';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (route?.params?.category) {
      setSelectedCategory(route.params.category);
    }
  }, [route?.params?.category]);

  const filtered = locations.filter((loc) => {
    const matchCat = selectedCategory === 'All' || loc.category === selectedCategory;
    const matchQuery =
      query.trim() === '' ||
      loc.name.toLowerCase().includes(query.toLowerCase()) ||
      loc.description.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <Text style={styles.headerSub}>{filtered.length} places found</Text>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <Ionicons name="search" size={18} color={colors.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search places..."
          placeholderTextColor={colors.textLight}
          value={query}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Category filter */}
      <CategoryFilter
        categories={CATEGORIES}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* List */}
      <FlatList
        data={filtered}
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
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>No places found</Text>
            <Text style={styles.emptySub}>Try a different category or search term</Text>
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
    paddingBottom: 4,
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    marginHorizontal: 20,
    marginTop: 14,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 46,
    fontSize: 15,
    color: colors.text,
  },
  list: {
    padding: 20,
    paddingTop: 4,
    gap: 16,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },
});
