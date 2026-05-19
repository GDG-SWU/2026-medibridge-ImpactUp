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
import {mediBridgeApi} from '../../api/mediBridgeApi';

type Props = NativeStackScreenProps<RootStackParamList, 'SymptomStep6'>;

const arrowBack = require('../../assets/images/arrow_back.png');

const EMERGENCY_OPTIONS = [
  {code: 'unable_to_walk', label: '歩けないほどの痛み'},
  {code: 'pregnancy', label: '妊娠の可能性'},
  {code: 'confused', label: '意識がぼんやりする'},
  {code: 'none', label: '該当なし'},
];

const SymptomStep6Screen = ({navigation, route}: Props) => {
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);

  const isActive = selectedFlags.length > 0;

  const toggleFlag = (code: string) => {
    setSelectedFlags(prev => {
      if (code === 'none') {
        return prev.includes('none') ? [] : ['none'];
      }

      const removedNone = prev.filter(item => item !== 'none');

      if (removedNone.includes(code)) {
        return removedNone.filter(item => item !== code);
      }

      return [...removedNone, code];
    });
  };

  const handleAnalyze = async () => {
    if (!isActive) {
      return;
    }

    const symptomPayload = {
      selectedParts: route.params.selectedParts,
      abdomenParts: route.params.abdomenParts,
      painLevel: route.params.painLevel,
      duration: route.params.duration,
      symptoms: route.params.symptoms,
      emergencyFlags: selectedFlags,
    };

    console.log('최종 증상 입력 데이터:', symptomPayload);

    try {
      const result = await mediBridgeApi.diagnose({
        userId: 'user123',
        bodyPart: 'abdomen',
        detailLocation: route.params.abdomenParts?.[0] ?? 'umbilical',
        painLevel: route.params.painLevel ?? 3,
        duration: route.params.duration ?? 'h1_6',
        symptoms: route.params.symptoms ?? [],
        specialConditions: selectedFlags.includes('none') ? ['none'] : selectedFlags,
        conditions: ['고혈압'],
        allergens: ['이부프로펜'],
        medications: ['혈압약'],
      });

      console.log('✅ 실제 진단 결과:', result);

      navigation.navigate('DiagnosisLoading', {
        diagnoseResult: result,
      });
    } catch (error) {
      console.log('❌ 진단 API 실패:', error);
    }
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
          <View style={styles.progressActive} />
          <View style={styles.progressActive} />
        </View>

        <View style={styles.titleArea}>
          <Text style={styles.stepText}>SYMPTOM · STEP 6</Text>
          <Text style={styles.title}>当てはまるものは？</Text>
          <Text style={styles.description}>緊急度を判断する重要な質問です</Text>
        </View>

        <View style={styles.optionList}>
          {EMERGENCY_OPTIONS.map(item => {
            const checked = selectedFlags.includes(item.code);

            return (
              <Pressable
                key={item.code}
                style={[
                  styles.optionCard,
                  checked && styles.optionCardActive,
                ]}
                onPress={() => toggleFlag(item.code)}>
                <Text
                  style={[
                    styles.optionText,
                    checked && styles.optionTextActive,
                  ]}>
                  {item.label}
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
          onPress={handleAnalyze}
          style={[styles.bottomButton, isActive && styles.bottomButtonActive]}>
          <Text
            style={[
              styles.bottomButtonText,
              isActive && styles.bottomButtonTextActive,
            ]}>
            分析を開始
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};


export default SymptomStep6Screen;

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
    height: 60,
    borderWidth: 1,
    borderColor: '#E0E0E2',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
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
    fontFamily: 'sans-serif',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: '#000000',
  },
  optionTextActive: {
    fontFamily: 'sans-serif-medium',
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