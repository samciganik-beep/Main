import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import locations from '../data/locations';
import colors from '../theme/colors';

const { width } = Dimensions.get('window');

const NORDFJORD_REGION = {
  latitude: 61.89,
  longitude: 6.78,
  latitudeDelta: 0.65,
  longitudeDelta: 0.9,
};

const CATEGORY_ICONS = {
  Lakes: 'water',
  Fjords: 'boat',
  Hiking: 'trail-sign',
  'Photo Spots': 'camera',
  Waterfalls: 'rainy',
  Villages: 'home',
};

export default function MapScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const mapRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Lakes', 'Fjords', 'Hiking', 'Photo Spots', 'Waterfalls', 'Villages'];

  const filtered =
    selectedCategory === 'All'
      ? locations
      : locations.filter((l) => l.category === selectedCategory);

  const markerColor = (category) =>
    colors.categoryColors[category] || colors.primary;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={NORDFJORD_REGION}
        showsUserLocation
        showsCompass
      >
        {filtered.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
            pinColor={markerColor(loc.category)}
          >
            <Callout
              tooltip
              onPress={() => navigation.navigate('LocationDetail', { location: loc })}
            >
              <View style={styles.callout}>
                <View style={[styles.calloutDot, { backgroundColor: markerColor(loc.category) }]} />
                <View style={styles.calloutBody}>
                  <Text style={styles.calloutName}>{loc.name}</Text>
                  <Text style={styles.calloutCat}>{loc.category}</Text>
                  <TouchableOpacity
                    style={[styles.calloutBtn, { backgroundColor: markerColor(loc.category) }]}
                    onPress={() => navigation.navigate('LocationDetail', { location: loc })}
                  >
                    <Text style={styles.calloutBtnText}>View Details</Text>
                    <Ionicons name="arrow-forward" size={12} color={colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>Map</Text>
        <TouchableOpacity
          style={styles.resetBtn}
          onPress={() => mapRef.current?.animateToRegion(NORDFJORD_REGION, 600)}
        >
          <Ionicons name="locate" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Category filter */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          {categories.map((cat) => {
            const active = cat === selectedCategory;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.filterPill, active && styles.filterPillActive]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.75}
              >
                {cat !== 'All' && (
                  <Ionicons
                    name={CATEGORY_ICONS[cat]}
                    size={13}
                    color={active ? colors.white : colors.text}
                  />
                )}
                <Text style={[styles.filterLabel, active && styles.filterLabelActive]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Count badge */}
      <View style={[styles.countBadge, { bottom: insets.bottom + 20 }]}>
        <Ionicons name="location" size={14} color={colors.white} />
        <Text style={styles.countText}>{filtered.length} places shown</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.96)',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  resetBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  filterBar: {
    position: 'absolute',
    top: 88,
    left: 0,
    right: 0,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  filterPillActive: {
    backgroundColor: colors.primary,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  filterLabelActive: {
    color: colors.white,
  },
  callout: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    width: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    gap: 12,
  },
  calloutDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 5,
  },
  calloutBody: {
    flex: 1,
  },
  calloutName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  calloutCat: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 10,
  },
  calloutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  calloutBtnText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  countBadge: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary + 'EE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  countText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
});
