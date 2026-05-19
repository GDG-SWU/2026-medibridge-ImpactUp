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

type Props = NativeStackScreenProps<RootStackParamList, 'SymptomStep4'>;

const arrowBack = require('../../assets/images/arrow_back.png');

const DURATION_OPTIONS = [
  {
    code: '<1h',
    title: '1時間以内',
    desc: 'within 1 hour',
  },
  {
    code: '1~6',
    title: '1〜6時間',
    desc: '1 to 6 hours',
  },
  {
    code: '6~24',
    title: '6〜24時間',
    desc: '6 to 24 hours',
  },
  {
    code: '1d+',
    title: '1日以上',
    desc: 'more than a day',
  },
];

const SymptomStep4Screen = ({navigation, route}: Props) => {
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  const isActive = selectedDuration !== null;

    const handleNext = () => {
    if (selectedDuration === null) {
        return;
    }

    navigation.navigate('SymptomStep5', {
        selectedParts: route.params.selectedParts,
        abdomenParts: route.params.abdomenParts,
        painLevel: route.params.painLevel,
        duration: selectedDuration,
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
          <View style={styles.progressActive} />
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
        </View>

        <View style={styles.titleArea}>
          <Text style={styles.stepText}>SYMPTOM · STEP 4</Text>
          <Text style={styles.title}>いつから痛いですか？</Text>
          <Text style={styles.description}>
            痛み始めた時期を選んでください。
          </Text>
        </View>

        <View style={styles.optionList}>
          {DURATION_OPTIONS.map(item => {
            const checked = selectedDuration === item.code;

            return (
              <Pressable
                key={item.code}
                style={[
                  styles.optionCard,
                  checked && styles.optionCardActive,
                ]}
                onPress={() => setSelectedDuration(item.code)}>
                <View style={styles.leftContent}>
                  <View style={styles.codeBox}>
                    <Text style={styles.codeText}>{item.code}</Text>
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.optionTitle,
                        checked && styles.optionTitleActive,
                      ]}>
                      {item.title}
                    </Text>
                    <Text style={styles.optionDesc}>{item.desc}</Text>
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
            痛み始めた時期の選択完了
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SymptomStep4Screen;

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
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
    color: '#00694F',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'sans-serif-medium',
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
  optionList: {
    width: '100%',
  },
  optionCard: {
    width: '100%',
    height: 88,
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
  optionCardActive: {
    borderColor: '#00B386',
    backgroundColor: '#E6F7F2',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#F4F4F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  codeText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 13,
    fontWeight: '700',
    color: '#00A982',
  },
  optionTitle: {
    fontFamily: 'sans-serif-medium',
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 3,
  },
  optionTitleActive: {
    color: '#008C70',
  },
  optionDesc: {
    fontFamily: 'sans-serif',
    fontSize: 12,
    lineHeight: 17,
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