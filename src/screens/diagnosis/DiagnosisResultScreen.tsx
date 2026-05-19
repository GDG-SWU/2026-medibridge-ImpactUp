import React, {useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Animated,
  PanResponder,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../types/navigation';
import {useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';

type DiagnosisResultRouteProp = RouteProp<
  RootStackParamList,
  'DiagnosisResult'
>;

type Props = NativeStackScreenProps<RootStackParamList, 'DiagnosisResult'>;

const arrowBack = require('../../assets/images/arrow_back.png');
const arrowNext = require('../../assets/images/arrow_next.png');

const SHEET_HEIGHT = 440;
const OPEN_Y = 0;
const INITIAL_Y = 100;
const CLOSED_Y = 245;

const DiagnosisResultScreen = ({navigation}: Props) => {
  const route = useRoute<DiagnosisResultRouteProp>();
  const {diagnoseResult} = route.params;

  console.log('결과 화면에서 받은 진단 결과:', diagnoseResult);

  const condition =
  diagnoseResult.possibleCondition ??
  diagnoseResult.suspectedCondition ??
  '診断結果なし';

  const severity =
    diagnoseResult.severity ??
    diagnoseResult.triageLevel ??
    'moderate';

  const summary =
    diagnoseResult.summary ??
    diagnoseResult.notice ??
    '症状を確認しました。';

  const reasons = diagnoseResult.reason ?? [];

  const recommendedOption =
    diagnoseResult.recommendedOption ??
    diagnoseResult.triageLevel ??
    'pharmacy';

  const sheetY = useRef(new Animated.Value(INITIAL_Y)).current;
  const currentY = useRef(INITIAL_Y);

  const severityLabel =
  severity === 'mild' || severity === 'self_care'
    ? '軽度'
    : severity === 'moderate' || severity === 'pharmacy'
    ? '中'
    : severity === 'severe' || severity === 'hospital' || severity === 'clinic'
    ? '高'
    : severity === 'emergency' || severity === 'emergency-room' || severity === 'er_now'
    ? '緊急'
    : '中';

const recommendedLabel =
  recommendedOption === 'self-care' || recommendedOption === 'self_care'
    ? 'セルフケアをおすすめします'
    : recommendedOption === 'pharmacy'
    ? '薬局訪問をおすすめします'
    : recommendedOption === 'hospital' || recommendedOption === 'clinic'
    ? '病院訪問をおすすめします'
    : recommendedOption === 'emergency-room' || recommendedOption === 'er_now'
    ? '救急室への訪問をおすすめします'
    : '薬局訪問をおすすめします';

  const snapTo = (toValue: number) => {
    currentY.current = toValue;

    Animated.spring(sheetY, {
      toValue,
      useNativeDriver: true,
      tension: 80,
      friction: 14,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 6;
      },
      onPanResponderMove: (_, gestureState) => {
        const nextY = Math.min(
          CLOSED_Y,
          Math.max(OPEN_Y, currentY.current + gestureState.dy),
        );

        sheetY.setValue(nextY);
      },
      onPanResponderRelease: (_, gestureState) => {
        const nextY = currentY.current + gestureState.dy;

        if (gestureState.vy < -0.7) {
          snapTo(OPEN_Y);
          return;
        }

        if (gestureState.vy > 0.7) {
          snapTo(CLOSED_Y);
          return;
        }

        if (nextY < 70) {
          snapTo(OPEN_Y);
        } else if (nextY < 175) {
          snapTo(INITIAL_Y);
        } else {
          snapTo(CLOSED_Y);
        }
      },
    }),
  ).current;

  return (
    
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F5F8" />

      <View style={styles.container}>
        <View style={styles.content}>
          <Pressable
            style={styles.backButton}
            hitSlop={10}
            onPress={() => navigation.goBack()}>
            <Image source={arrowBack} style={styles.backIcon} />
          </Pressable>

          <View style={styles.diagnosisCard}>
            <View style={styles.topRow}>
              <Text style={styles.label}>推定される症状</Text>

              <View style={styles.riskBadge}>
                <Text style={styles.riskText}>危険度：{severityLabel}</Text>
              </View>
            </View>

            <Text style={styles.title}>{condition}</Text>
            <Text style={styles.subtitle}>
              {summary}
            </Text>

            <View style={styles.divider} />

            <View style={styles.reasonBox}>
              <Text style={styles.reasonTitle}>判断の根拠</Text>
                <Text style={styles.reasonText}>
                  {reasons.length > 0
                    ? reasons.map(reason => `・${reason}`).join('\n')
                    : '・判断の根拠がありません。'}
                </Text>
            </View>

            <View style={styles.noticeBox}>
              <Text style={styles.noticeTitle}>お知らせ</Text>
                <Text style={styles.noticeText}>{recommendedLabel}</Text>
            </View>
          </View>
        </View>


        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{translateY: sheetY}],
            },
          ]}>
          <View style={styles.dragArea} {...panResponder.panHandlers}>
            <View style={styles.handle} />
          </View>

          <Text style={styles.sheetTitle}>
            推奨される対処・どれかを選んでください
          </Text>

          <OptionCard
            icon="🏠"
            title="自己ケア"
            description="気にならない程度"
            onPress={() => {}}
          />

          <OptionCard
            icon="💊"
            title="薬局へ"
            description="薬剤師に相談・OTC薬で対応可能"
            recommended
            onPress={() => {
              navigation.navigate('RecommendMedicine', {
                diagnoseResult,
              });
            }}
          />

          <OptionCard
            icon="🏥"
            title="病院へ"
            description="診察を受ける・念のため受診"
            onPress={() => {}}
          />

          <OptionCard
            icon="🚨"
            title="救急室へ"
            description="今すぐ・緊急の場合"
            isLast
            onPress={() => {}}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

type OptionCardProps = {
  icon: string;
  title: string;
  description: string;
  recommended?: boolean;
  isLast?: boolean;
  onPress: () => void;
};

const OptionCard = ({
  icon,
  title,
  description,
  recommended = false,
  isLast = false,
  onPress,
}: OptionCardProps) => {
  return (
    <Pressable
      style={[
        styles.optionCard,
        recommended && styles.optionCardRecommended,
        isLast && styles.optionCardLast,
      ]}
      onPress={onPress}>
      <View style={styles.optionIconBox}>
        <Text style={styles.optionIcon}>{icon}</Text>
      </View>

      <View style={styles.optionTextArea}>
        <View style={styles.optionTitleRow}>
          <Text style={styles.optionTitle}>{title}</Text>

          {recommended && (
            <View style={styles.recommendBadge}>
              <Text style={styles.recommendText}>おすすめ</Text>
            </View>
          )}
        </View>

        <Text style={styles.optionDescription}>{description}</Text>
      </View>

      <Image source={arrowNext} style={styles.nextIcon} />
    </Pressable>
  );
};

export default DiagnosisResultScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F5F8',
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F5F8',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
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

  diagnosisCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    color: '#454545',
  },
  riskBadge: {
    width: 106,
    height: 30,
    borderRadius: 100,
    backgroundColor: '#FFE9E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  riskText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    color: '#FF4949',
  },
  title: {
    marginTop: 14,
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '700',
    color: '#000000',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    color: '#454545',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E2',
    marginTop: 14,
    marginBottom: 14,
  },
  reasonBox: {
    backgroundColor: '#F7F7F8',
    borderRadius: 14,
    paddingTop: 16,
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 20,
  },
  reasonTitle: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400',
    color: '#454545',
    marginBottom: 8,
  },
  reasonText: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: '400',
    color: '#454545',
  },
  noticeBox: {
    backgroundColor: '#E6FBF6',
    borderRadius: 14,
    paddingTop: 16,
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 20,
    marginTop: 14,
  },
  noticeTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#006AC6',
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: '700',
    color: '#00B386',
  },

  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: SHEET_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  dragArea: {
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handle: {
    width: 34,
    height: 4,
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
  },
  sheetTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },

  optionCard: {
    width: '100%',
    height: 75,
    borderWidth: 1,
    borderColor: '#E0E0E2',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionCardRecommended: {
    borderColor: '#00B386',
  },
  optionCardLast: {
    marginBottom: 0,
  },
  optionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F7F7F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionIcon: {
    fontSize: 22,
  },
  optionTextArea: {
    flex: 1,
  },
  optionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: '#000000',
  },
  recommendBadge: {
    height: 22,
    paddingHorizontal: 10,
    borderRadius: 100,
    backgroundColor: '#00B386',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  recommendText: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  optionDescription: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: 'rgba(55, 56, 60, 0.61)',
  },
  nextIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 8,
  },
});