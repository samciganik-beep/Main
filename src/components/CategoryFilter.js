import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import colors from '../theme/colors';

const CATEGORY_ICONS = {
  All: '🗺',
  Lakes: '🏞',
  Fjords: '⛰',
  Hiking: '🥾',
  'Photo Spots': '📷',
  Waterfalls: '💧',
  Villages: '🏡',
};

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => {
        const isActive = cat === selected;
        return (
          <TouchableOpacity
            key={cat}
            style={[styles.pill, isActive && styles.pillActive]}
            onPress={() => onSelect(cat)}
            activeOpacity={0.75}
          >
            <Text style={styles.icon}>{CATEGORY_ICONS[cat] || '📍'}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>{cat}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  pillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  icon: {
    fontSize: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  labelActive: {
    color: colors.white,
  },
});
