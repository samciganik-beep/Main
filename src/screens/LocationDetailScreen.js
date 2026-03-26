import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFavorites } from '../context/FavoritesContext';
import colors from '../theme/colors';

export default function LocationDetailScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { location } = route.params;
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const saved = isFavorite(location.id);

  const toggleFavorite = () => {
    if (saved) {
      removeFavorite(location.id);
    } else {
      addFavorite(location.id);
    }
  };

  const openInMaps = () => {
    const label = encodeURIComponent(location.name);
    const { latitude, longitude } = location;
    const url = Platform.select({
      ios: `maps:?q=${label}&ll=${latitude},${longitude}`,
      android: `geo:${latitude},${longitude}?q=${label}`,
      default: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    });
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        }
        const googleUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        return Linking.openURL(googleUrl);
      })
      .catch(() => Alert.alert('Error', 'Could not open maps app.'));
  };

  const diffColor = colors.difficultyColors[location.difficulty] || colors.primary;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces>
        {/* Hero image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: location.image }} style={styles.image} resizeMode="cover" />
          <View style={styles.imageOverlay} />

          {/* Back button */}
          <TouchableOpacity
            style={[styles.backBtn, { top: insets.top + 12 }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color={colors.white} />
          </TouchableOpacity>

          {/* Favorite button */}
          <TouchableOpacity
            style={[styles.favoriteBtn, { top: insets.top + 12 }]}
            onPress={toggleFavorite}
          >
            <Ionicons
              name={saved ? 'heart' : 'heart-outline'}
              size={22}
              color={saved ? '#E74C3C' : colors.white}
            />
          </TouchableOpacity>

          {/* Category + name overlay */}
          <View style={styles.heroTextContainer}>
            <View style={[styles.categoryBadge, { backgroundColor: colors.categoryColors[location.category] }]}>
              <Text style={styles.categoryBadgeText}>{location.category}</Text>
            </View>
            <Text style={styles.locationName}>{location.name}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Quick stats row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={[styles.difficultyBadge, { backgroundColor: diffColor + '22' }]}>
                <Ionicons name="fitness" size={14} color={diffColor} />
                <Text style={[styles.difficultyText, { color: diffColor }]}>{location.difficulty}</Text>
              </View>
            </View>
            <View style={[styles.statDivider]} />
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={16} color={colors.textLight} />
              <Text style={styles.statText}>{location.visitTime}</Text>
            </View>
            <View style={[styles.statDivider]} />
            <View style={styles.statItem}>
              <Ionicons name="location-outline" size={16} color={colors.textLight} />
              <Text style={styles.statText} numberOfLines={1}>
                {location.latitude.toFixed(4)}°N
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{location.description}</Text>
          </View>

          {/* Info cards */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Practical Info</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <View style={[styles.infoIcon, { backgroundColor: colors.primary + '18' }]}>
                  <Ionicons name="car-outline" size={18} color={colors.primary} />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>Parking</Text>
                  <Text style={styles.infoValue}>{location.parkingInfo}</Text>
                </View>
              </View>
              <View style={styles.infoSep} />
              <View style={styles.infoRow}>
                <View style={[styles.infoIcon, { backgroundColor: colors.secondary + '18' }]}>
                  <Ionicons name="navigate-outline" size={18} color={colors.secondary} />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>GPS Coordinates</Text>
                  <Text style={styles.infoValue}>
                    {location.latitude.toFixed(5)}°N, {location.longitude.toFixed(5)}°E
                  </Text>
                </View>
              </View>
              <View style={styles.infoSep} />
              <View style={styles.infoRow}>
                <View style={[styles.infoIcon, { backgroundColor: '#E67E2218' }]}>
                  <Ionicons name="time-outline" size={18} color="#E67E22" />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>Estimated Visit Time</Text>
                  <Text style={styles.infoValue}>{location.visitTime}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.mapsBtn} onPress={openInMaps} activeOpacity={0.85}>
              <Ionicons name="map" size={18} color={colors.white} />
              <Text style={styles.mapsBtnText}>Open in Google Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.favBtn, saved && styles.favBtnActive]}
              onPress={toggleFavorite}
              activeOpacity={0.85}
            >
              <Ionicons
                name={saved ? 'heart' : 'heart-outline'}
                size={18}
                color={saved ? '#E74C3C' : colors.primary}
              />
              <Text style={[styles.favBtnText, saved && styles.favBtnTextActive]}>
                {saved ? 'Saved' : 'Save to Favorites'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={{ height: insets.bottom }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    position: 'relative',
    height: 340,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteBtn: {
    position: 'absolute',
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 24,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  categoryBadgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  locationName: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 34,
  },
  content: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statText: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 14,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  infoSep: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 14,
  },
  actions: {
    gap: 12,
    marginBottom: 16,
  },
  mapsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
  },
  mapsBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  favBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  favBtnActive: {
    borderColor: '#E74C3C',
    backgroundColor: '#FDF0F0',
  },
  favBtnText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  favBtnTextActive: {
    color: '#E74C3C',
  },
});
