import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Pressable,
  TextInput,
  useWindowDimensions,
} from 'react-native';

type AllergySelectScreenProps = {
  onBack: () => void;
  onNext?: () => void;
};

const BASE_WIDTH = 412;
const BASE_HEIGHT = 917;

const ALLERGIES = [
  'アスピリン',
  'イブプロフェン',
  'ペニシリン',
  'サルファ剤',
  '抗けいれん薬',
  '造影剤',
  '局所麻酔薬',
  'なし',
];

const AllergySelectScreen = ({onBack, onNext}: AllergySelectScreenProps) => {
  const {width, height} = useWindowDimensions();

  const sx = (value: number) => (width / BASE_WIDTH) * value;
  const sy = (value: number) => (height / BASE_HEIGHT) * value;

  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const isButtonActive = selectedAllergies.length > 0;

  const handleSelect = (option: string) => {
    if (option === 'なし') {
      setSelectedAllergies(prev => (prev.includes('なし') ? [] : ['なし']));
      return;
    }

    setSelectedAllergies(prev => {
      const withoutNone = prev.filter(item => item !== 'なし');

      if (withoutNone.includes(option)) {
        return withoutNone.filter(item => item !== option);
      }

      return [...withoutNone, option];
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View
        style={[
          styles.header,
          {
            marginTop: sy(52),
            paddingHorizontal: sx(16),
          },
        ]}>
        <Pressable
          onPress={onBack}
          style={[
            styles.backButton,
            {
              width: sx(24),
              height: sx(24),
              marginBottom: sy(42),
            },
          ]}>
          <Image
            source={require('../../assets/images/arrow_back.png')}
            style={{
              width: sx(24),
              height: sx(24),
            }}
            resizeMode="contain"
          />
        </Pressable>

        <Text
          allowFontScaling={false}
          style={[
            styles.title,
            {
              fontSize: sx(26),
              lineHeight: sx(39),
              marginBottom: sy(20),
            },
          ]}>
          普段持っている{'\n'}
          薬のアレルギーはありますか？
        </Text>

        <Text
          allowFontScaling={false}
          style={[
            styles.description,
            {
              fontSize: sx(16),
              lineHeight: sx(24),
            },
          ]}>
          複数の薬のアレルギーを選択できます。
        </Text>
      </View>

      <View
        style={[
          styles.searchBox,
          {
            marginTop: sy(24),
            marginHorizontal: sx(16),
            height: sy(48),
            borderRadius: sx(113),
            paddingHorizontal: sx(18),
          },
        ]}>
        <Text
          allowFontScaling={false}
          style={[
            styles.searchIcon,
            {
              fontSize: sx(16),
              lineHeight: sx(20),
              marginRight: sx(8),
            },
          ]}>
          ⌕
        </Text>

        <TextInput
          editable={false}
          allowFontScaling={false}
          placeholder="薬のアレルギーを検索してください。"
          placeholderTextColor="#B1B5C3"
          style={[
            styles.searchInput,
            {
              fontSize: sx(16),
            },
          ]}
        />
      </View>

      <View
        style={[
          styles.chipArea,
          {
            marginTop: sy(24),
            paddingHorizontal: sx(16),
          },
        ]}>
        {ALLERGIES.map(option => {
          const selected = selectedAllergies.includes(option);

          return (
            <Pressable
              key={option}
              onPress={() => handleSelect(option)}
              style={[
                styles.chip,
                option === 'なし' && !selected && styles.noneChip,
                {
                  minHeight: sy(33),
                  borderRadius: sx(113),
                  paddingHorizontal: sx(20),
                  paddingVertical: sy(3),
                  marginRight: sx(10),
                  marginBottom: sy(12),
                },
                selected && styles.chipSelected,
              ]}>
              <Text
                allowFontScaling={false}
                style={[
                  styles.chipText,
                  {
                    fontSize: sx(18),
                    lineHeight: sx(25),
                  },
                  selected && styles.chipTextSelected,
                ]}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        disabled={!isButtonActive}
        onPress={onNext}
        style={[
          styles.nextButton,
          {
            left: sx(16),
            bottom: sy(82),
            width: sx(380),
            height: sy(64),
            borderRadius: sx(18),
          },
          isButtonActive ? styles.nextButtonActive : styles.nextButtonDisabled,
        ]}>
        <Text
          allowFontScaling={false}
          style={[
            styles.nextButtonText,
            {
              fontSize: sx(18),
              lineHeight: sx(25),
            },
            isButtonActive
              ? styles.nextButtonTextActive
              : styles.nextButtonTextDisabled,
          ]}>
          薬のアレルギー選択完了
        </Text>
      </Pressable>
    </View>
  );
};

export default AllergySelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {},

  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontFamily: 'GoogleSans-Bold',
    color: '#000000',
    letterSpacing: 0,
  },

  description: {
    fontFamily: 'GoogleSans-Regular',
    color: '#545454',
    letterSpacing: 0,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F5',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },

  searchIcon: {
    fontFamily: 'GoogleSans-Regular',
    color: '#B1B5C3',
  },

  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: 'GoogleSans-Medium',
    color: '#545454',
    paddingHorizontal: 0,
    paddingVertical: 0,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },

  chipArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  chip: {
    backgroundColor: '#F4F4F5',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  noneChip: {
    backgroundColor: '#E3E4E5',
    borderColor: '#D1D1D1',
  },

  chipSelected: {
    backgroundColor: '#E6FFF6',
    borderColor: '#00B386',
  },

  chipText: {
    fontFamily: 'GoogleSans-Regular',
    color: '#6B7280',
    letterSpacing: -0.2,
  },

  chipTextSelected: {
    fontFamily: 'GoogleSans-Bold',
    color: '#00B386',
  },

  nextButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nextButtonActive: {
    backgroundColor: '#00B386',
  },

  nextButtonDisabled: {
    backgroundColor: '#F4F4F5',
  },

  nextButtonText: {
    textAlign: 'center',
    letterSpacing: -0.2,
  },

  nextButtonTextActive: {
    fontFamily: 'GoogleSans-Bold',
    color: '#FFFFFF',
  },

  nextButtonTextDisabled: {
    fontFamily: 'GoogleSans-Bold',
    color: '#BFBFC1',
  },
});