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

type Props = NativeStackScreenProps<RootStackParamList, 'SymptomStep1'>;

const arrowBack = require('../../assets/images/arrow_back.png');

const OPTIONS = [
  '頭(あたま)',
  '顔(目/鼻/口/耳)',
  '首・喉',
  '肩・腕・手',
  '胸',
  'お腹',
  '背中・腰',
  '脚・足',
  '皮膚',
  '全身・発熱',
];

const SymptomStep1Screen = ({navigation}: Props) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (item: string) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(v => v !== item) : [...prev, item],
    );
  };

  const isActive = selected.length > 0;
  
  const handleNext = () => {
    navigation.navigate('SymptomStep2', {
      selectedParts: selected,
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
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
        </View>

        <View style={styles.titleArea}>
          <Text style={styles.stepText}>SYMPTOM · STEP 1</Text>
          <Text style={styles.title}>どの部位が痛みますか？</Text>
          <Text style={styles.description}>複数の部位を選択できます。</Text>
        </View>

        <View style={styles.optionGrid}>
          {OPTIONS.map((item, index) => {
            const checked = selected.includes(item);
            const isLeft = index % 2 === 0;

            return (
              <Pressable
                key={item}
                style={[
                    styles.optionCard,
                    checked && styles.optionCardActive,
                  ]}
                onPress={() => toggleOption(item)}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.optionText,
                    checked && styles.optionTextActive,
                  ]}>
                  {item}
                </Text>

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
            部位の選択完了
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SymptomStep1Screen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
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
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '47.8%',
    height: 60,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionCardActive: {
    borderColor: '#00B386',
    backgroundColor: '#E6F7F2',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
    color: '#000000',
    marginRight: 8,
  },
  optionTextActive: {
    color: '#008C70',
    fontWeight: '700',
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
    left: 18,
    right: 18,
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
    fontSize: 16,
    fontWeight: '700',
    color: '#BFBFC1',
  },
  bottomButtonTextActive: {
    color: '#FFFFFF',
  },
});