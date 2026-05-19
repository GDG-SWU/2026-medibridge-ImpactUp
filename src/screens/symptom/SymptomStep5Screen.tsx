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

type Props = NativeStackScreenProps<RootStackParamList, 'SymptomStep5'>;

const arrowBack = require('../../assets/images/arrow_back.png');

const SYMPTOM_OPTIONS = [
  {code: 'fever', label: '🌡️  発熱'},
  {code: 'vomiting', label: '🤮  嘔吐'},
  {code: 'nausea', label: '🤢  吐き気'},
  {code: 'diarrhea', label: '💧  下痢'},
  {code: 'blood_stool', label: '🩸  血便'},
  {code: 'chills', label: '🥶  寒気'},
  {code: 'cold_sweat', label: '💦  冷や汗'},
  {code: 'jaundice', label: '🟡  黄疸'},
  {code: 'none', label: '該当なし'},
];

const SymptomStep5Screen = ({navigation, route}: Props) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const isActive = selectedSymptoms.length > 0;

  const toggleSymptom = (code: string) => {
    setSelectedSymptoms(prev => {
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

  const handleNext = () => {
    if (!isActive) {
        return;
    }

    navigation.navigate('SymptomStep6', {
        selectedParts: route.params.selectedParts,
        abdomenParts: route.params.abdomenParts,
        painLevel: route.params.painLevel,
        duration: route.params.duration,
        symptoms: selectedSymptoms,
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
          <View style={styles.progressActive} />
          <View style={styles.progressInactive} />
        </View>

        <View style={styles.titleArea}>
          <Text style={styles.stepText}>SYMPTOM · STEP 5</Text>
          <Text style={styles.title}>一緒にある症状は？</Text>
          <Text style={styles.description}>当てはまるものをすべて選択（複数可）</Text>
        </View>

        <View style={styles.optionGrid}>
          {SYMPTOM_OPTIONS.map((item, index) => {
            const checked = selectedSymptoms.includes(item.code);
            const isFullWidth = item.code === 'none';

            return (
              <Pressable
                key={item.code}
                style={[
                  styles.optionCard,
                  isFullWidth && styles.optionCardFull,
                  checked && styles.optionCardActive,
                ]}
                onPress={() => toggleSymptom(item.code)}>
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
          onPress={handleNext}
          style={[styles.bottomButton, isActive && styles.bottomButtonActive]}>
          <Text
            style={[
              styles.bottomButtonText,
              isActive && styles.bottomButtonTextActive,
            ]}>
            伴う症状の選択完了
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SymptomStep5Screen;

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
  optionGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '47.4%',
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
  optionCardFull: {
    width: '100%',
  },
  optionCardActive: {
    borderColor: '#00B386',
    backgroundColor: '#E6F7F2',
  },
  optionText: {
    flex: 1,
    fontFamily: 'sans-serif',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: '#000000',
    marginRight: 8,
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