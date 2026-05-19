import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'SymptomStep3'>;

const arrowBack = require('../../assets/images/arrow_back.png');

const PAIN_LEVELS = [
  {
    level: 1,
    title: 'とても弱い',
    desc: '気にならない程度',
    color: '#00A905',
    bg: '#CEF7D0',
  },
  {
    level: 2,
    title: '弱い',
    desc: '少し気になる',
    color: '#97C102',
    bg: '#ECF7C7',
  },
  {
    level: 3,
    title: '普通',
    desc: '我慢できる',
    color: '#FFC233',
    bg: '#FFF0CD',
  },
  {
    level: 4,
    title: '強い',
    desc: '集中できない',
    color: '#FF8400',
    bg: '#FFE7CE',
  },
  {
    level: 5,
    title: '耐えられない',
    desc: '何もできない',
    color: '#FF2929',
    bg: '#FFD9D9',
  },
];

const SymptomStep3Screen = ({navigation, route}: Props) => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const isActive = selectedLevel !== null;

    const handleNext = () => {
        if (selectedLevel === null) {
            return;
        }

        navigation.navigate('SymptomStep4', {
            selectedParts: route.params.selectedParts,
            abdomenParts: route.params.abdomenParts,
            painLevel: selectedLevel,
        });
    };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        <Pressable
          style={styles.backButton}
          hitSlop={10}
          onPress={() => navigation.goBack()}>
          <Image source={arrowBack} style={styles.backIcon} />
        </Pressable>

        <View style={styles.progressContainer}>
          <View style={styles.progressActive} />
          <View style={styles.progressActive} />
          <View style={styles.progressActive} />
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
        </View>

        <View style={styles.titleArea}>
          <Text style={styles.stepText}>SYMPTOM · STEP 3</Text>
          <Text style={styles.title}>どのくらい痛いですか？</Text>
          <Text style={styles.description}>1〜5の中から選んでください。</Text>
        </View>

        <View style={styles.levelList}>
          {PAIN_LEVELS.map(item => {
            const checked = selectedLevel === item.level;

            return (
              <Pressable
                key={item.level}
                style={[
                  styles.levelCard,
                  checked && {
                    borderColor: '#00B386',
                    backgroundColor: '#E6F7F2',
                  },
                ]}
                onPress={() => setSelectedLevel(item.level)}>
                <View style={styles.leftContent}>
                  <View
                    style={[
                      styles.levelCircle,
                      {
                        borderColor: item.color,
                        backgroundColor: item.bg,
                      },
                    ]}>
                    <Text style={[styles.levelNumber, {color: item.color}]}>
                      {item.level}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.levelTitle,
                        checked && styles.levelTitleActive,
                      ]}>
                      {item.title}
                    </Text>
                    <Text style={styles.levelDesc}>{item.desc}</Text>
                  </View>
                </View>

                <View style={[styles.checkbox, checked && styles.checkboxActive]}>
                  {checked && <Text style={styles.checkText}>✓</Text>}
                </View>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          disabled={!isActive}
          onPress={handleNext}
          style={[styles.bottomButton, isActive && styles.bottomButtonActive]}>
          <Text
            style={[
              styles.bottomButtonText,
              isActive && styles.bottomButtonTextActive,
            ]}>
            痛みレベルの選択完了
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SymptomStep3Screen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 0,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 11,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  progressContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 4,
    marginBottom: 36,
  },
  progressActive: {
    flex: 1,
    height: 4,
    backgroundColor: '#00B386',
    borderRadius: 999,
    marginRight: 5,
  },
  progressInactive: {
    flex: 1,
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 999,
    marginRight: 5,
  },
  titleArea: {
    marginBottom: 24,
  },
  stepText: {
    fontFamily: 'sans-serif-bold',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
    color: '#00694F',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'sans-serif-bold',
    fontSize: 26,
    lineHeight: 31,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 18,
  },
  description: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
    color: '#545454',
  },
  levelList: {
    width: '100%',
  },
  levelCard: {
    width: '100%',
    height: 75,
    borderWidth: 1,
    borderColor: '#E0E0E2',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelCircle: {
    width: 36,
    height: 36,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  levelNumber: {
    fontFamily: 'sans-serif-medium',
    fontSize: 18,
    fontWeight: '500',
  },
  levelTitle: {
    fontFamily: 'sans-serif-medium',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 3,
  },
  levelTitleActive: {
    color: '#008C70',
  },
  levelDesc: {
    fontFamily: 'sans-serif',
    fontSize: 12,
    lineHeight: 18,
    color: '#777777',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#00A982',
    borderColor: '#00A982',
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 16,
  },
  bottomButton: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: '#F4F4F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonActive: {
    backgroundColor: '#00B386',
  },
  bottomButtonText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 16,
    fontWeight: '700',
    color: '#BFBFC1',
  },
  bottomButtonTextActive: {
    color: '#FFFFFF',
  },
});