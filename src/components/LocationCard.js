import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

export default function LocationCard({ location, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: location.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{location.category}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>{location.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{location.description}</Text>
        <View style={styles.footer}>
          <View style={styles.meta}>
            <Ionicons name="time-outline" size={13} color={colors.textLight} />
            <Text style={styles.metaText}>{location.visitTime}</Text>
          </View>
          <View style={[styles.diffBadge, { backgroundColor: colors.difficultyColors[location.difficulty] + '22' }]}>
            <Text style={[styles.diffText, { color: colors.difficultyColors[location.difficulty] }]}>
              {location.difficulty}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.primary + 'DD',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  body: {
    padding: 14,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 19,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.textLight,
  },
  diffBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  diffText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
