import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import locations from '../data/locations';
import LocationCard from '../components/LocationCard';
import colors from '../theme/colors';

const { width } = Dimensions.get('window');

const CATEGORY_TILES = [
  { label: 'Lakes', icon: '🏞', color: colors.categoryColors.Lakes },
  { label: 'Fjords', icon: '⛰', color: colors.categoryColors.Fjords },
  { label: 'Hiking', icon: '🥾', color: colors.categoryColors.Hiking },
  { label: 'Photo Spots', icon: '📷', color: colors.categoryColors['Photo Spots'] },
  { label: 'Waterfalls', icon: '💧', color: colors.categoryColors.Waterfalls },
  { label: 'Villages', icon: '🏡', color: colors.categoryColors.Villages },
];

const featured = locations.filter((l) => l.featured);

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const onCategoryPress = (category) => {
    navigation.navigate('Explore', { category });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />

      {/* Hero */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80' }}
        style={[styles.hero, { paddingTop: insets.top + 20 }]}
        resizeMode="cover"
      >
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroEyebrow}>NORWAY · WESTERN FJORDS</Text>
          <Text style={styles.heroTitle}>Discover{'\n'}Nordfjord</Text>
          <Text style={styles.heroSubtitle}>15 stunning places to explore</Text>
          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => navigation.navigate('Explore')}
            activeOpacity={0.85}
          >
            <Text style={styles.heroButtonText}>Start Exploring</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse by Category</Text>
        <View style={styles.categoryGrid}>
          {CATEGORY_TILES.map((cat) => (
            <TouchableOpacity
              key={cat.label}
              style={[styles.categoryTile, { backgroundColor: cat.color }]}
              onPress={() => onCategoryPress(cat.label)}
              activeOpacity={0.8}
            >
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Places</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={featured}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
          renderItem={({ item }) => (
            <LocationCard
              location={item}
              style={styles.featuredCard}
              onPress={() => navigation.navigate('LocationDetail', { location: item })}
            />
          )}
        />
      </View>

      {/* Quick tip */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.tipBanner}
          onPress={() => navigation.navigate('Tips')}
          activeOpacity={0.85}
        >
          <Ionicons name="information-circle" size={28} color={colors.white} />
          <View style={styles.tipText}>
            <Text style={styles.tipTitle}>Travel Tips for Norway</Text>
            <Text style={styles.tipSub}>Weather, driving rules, ferries & more</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    height: 440,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
  },
  heroContent: {
    padding: 28,
    paddingBottom: 36,
  },
  heroEyebrow: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 42,
    fontWeight: '800',
    lineHeight: 46,
    marginBottom: 8,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginBottom: 24,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 28,
  },
  heroButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  section: {
    paddingTop: 28,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primaryLight,
    fontWeight: '600',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryTile: {
    width: (width - 50) / 3,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  categoryIcon: {
    fontSize: 26,
  },
  categoryLabel: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  featuredList: {
    paddingRight: 20,
    gap: 14,
  },
  featuredCard: {
    width: width * 0.72,
  },
  tipBanner: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  tipText: {
    flex: 1,
  },
  tipTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
  },
  tipSub: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
  },
});
