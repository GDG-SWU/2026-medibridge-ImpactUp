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

type Props = NativeStackScreenProps<RootStackParamList, 'SymptomStep2'>;

const arrowBack = require('../../assets/images/arrow_back.png');
const abdomenBase = require('../../assets/images/abdomen_base.png');

const ABDOMEN_PARTS = [
  '右上腹部',
  'みぞおち',
  '左上腹部',
  '右腹腹',
  'おへそ\nの周り',
  '左腹腹',
  '右下腹部',
  '下腹部',
  '左下腹部',
];

const SymptomStep2Screen = ({navigation, route}: Props) => {
  const [selected, setSelected] = useState<string[]>([]);

  const togglePart = (part: string) => {
    setSelected(prev =>
      prev.includes(part) ? prev.filter(item => item !== part) : [...prev, part],
    );
  };

  const isActive = selected.length > 0;

  const handleNext = () => {
    navigation.navigate('SymptomStep3', {
      selectedParts: route.params.selectedParts,
      abdomenParts: selected,
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
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
        </View>

        <View style={styles.titleArea}>
          <Text style={styles.stepText}>SYMPTOM · STEP 2</Text>
          <Text style={styles.title}>どこが痛いですか？</Text>
          <Text style={styles.description}>
            イラストの該当部分をタップしてください
          </Text>
        </View>

        <View style={styles.illustrationBox}>
            <View style={styles.abdomenLayer}>
                <Image source={abdomenBase} style={styles.abdomenImage} />

                <View style={styles.regionGrid}>
                {ABDOMEN_PARTS.map(part => {
                    const checked = selected.includes(part);

                    return (
                    <Pressable
                        key={part}
                        style={[styles.regionCard, checked && styles.regionCardActive]}
                        onPress={() => togglePart(part)}>
                        <Text
                        style={[
                            styles.regionText,
                            checked && styles.regionTextActive,
                        ]}>
                        {part}
                        </Text>
                    </Pressable>
                    );
                })}
                </View>
            </View>
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
            痛む部位の選択完了
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SymptomStep2Screen;

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
  illustrationBox: {
    width: '100%',
    height: 439,
    borderRadius: 23,
    backgroundColor: '#E0E0E1',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
    abdomenLayer: {
    width: 313,
    height: 385,
    alignItems: 'center',
    justifyContent: 'center',
    },

    abdomenImage: {
    width: 313,
    height: 385,
    resizeMode: 'contain',
    },
  regionGrid: {
    position: 'absolute',
    width: 219,
    height: 301,
    top: 45,
    left: 47,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  regionCard: {
    width: 69,
    height: 95,
    borderRadius: 10,
    backgroundColor: '#CCAB91',
    alignItems: 'center',
    justifyContent: 'center',
  },
  regionCardActive: {
    backgroundColor: '#432913',
  },
  regionText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  regionTextActive: {
    color: '#FFFFFF',
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
    fontFamily: 'sans-serif-medium',
    fontSize: 16,
    fontWeight: '700',
    color: '#BFBFC1',
  },
  bottomButtonTextActive: {
    color: '#FFFFFF',
  },
});