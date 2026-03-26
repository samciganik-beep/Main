import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tips from '../data/tips';
import colors from '../theme/colors';

const TIP_COLORS = ['#2E86C1', '#27AE60', '#1A5276', '#8E44AD', '#E67E22', '#3498DB'];

function TipCard({ tip, color, index }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <TouchableOpacity
      style={[styles.card, expanded && styles.cardExpanded]}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.85}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconBox, { backgroundColor: color + '22' }]}>
          <Ionicons name={tip.icon} size={22} color={color} />
        </View>
        <View style={styles.cardTitles}>
          <Text style={styles.cardTitle}>{tip.title}</Text>
          <Text style={styles.cardSubtitle}>{tip.subtitle}</Text>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.textLight}
        />
      </View>
      {expanded && (
        <View style={styles.cardBody}>
          <View style={[styles.divider, { backgroundColor: color + '33' }]} />
          {tip.body.map((point, i) => (
            <View key={i} style={styles.bulletRow}>
              <View style={[styles.bullet, { backgroundColor: color }]} />
              <Text style={styles.bulletText}>{point}</Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function TipsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Travel Tips</Text>
        <Text style={styles.headerSub}>Essential info for visiting Norway</Text>
      </View>

      {/* Emergency callout */}
      <View style={styles.emergency}>
        <Ionicons name="call" size={18} color={colors.error} />
        <Text style={styles.emergencyText}>
          Emergency numbers: <Text style={styles.emergencyBold}>112</Text> Police ·{' '}
          <Text style={styles.emergencyBold}>113</Text> Medical ·{' '}
          <Text style={styles.emergencyBold}>110</Text> Fire
        </Text>
      </View>

      <View style={styles.list}>
        {tips.map((tip, i) => (
          <TipCard key={tip.id} tip={tip} color={TIP_COLORS[i % TIP_COLORS.length]} index={i} />
        ))}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  headerSub: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 3,
  },
  emergency: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#FDEDEC',
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 14,
    borderRadius: 10,
  },
  emergencyText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    lineHeight: 19,
  },
  emergencyBold: {
    fontWeight: '700',
    color: colors.error,
  },
  list: {
    paddingHorizontal: 20,
    gap: 12,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardExpanded: {
    shadowOpacity: 0.1,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitles: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  cardBody: {
    marginTop: 12,
  },
  divider: {
    height: 1,
    marginBottom: 14,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    flexShrink: 0,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    lineHeight: 20,
  },
});
