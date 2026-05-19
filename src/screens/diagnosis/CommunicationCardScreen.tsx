import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CommunicationCard'>;

const arrowBack = require('../../assets/images/arrow_back.png');

const CommunicationCardScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F5F8" />

      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            hitSlop={10}
            onPress={() => navigation.goBack()}>
            <Image source={arrowBack} style={styles.backIcon} />
          </Pressable>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.topGreenTitle}>의료 소통 카드</Text>

          <Text style={styles.mainTitle}>薬剤師に見せてください</Text>

          <Text style={styles.subTitle}>SHOW THIS TO PHARMACIST</Text>

          <View style={styles.warningBox}>
            <Text style={styles.warningKo}>
              아래 정보를 고려해 안전한 약을 추천해 주세요.
            </Text>
            <Text style={styles.warningJa}>
              記の情報を考慮して、安全な薬をおすすめください。
            </Text>
          </View>

          <View style={styles.symptomBox}>
            <Text style={styles.symptomLabelKo}>의심 증상・疑われる症状</Text>
            <Text style={styles.symptomMainKo}>
              식중독 의심 (上腹部痛, 嘔吐)
            </Text>
            <Text style={styles.symptomSubJa}>
              食中毒の疑い（上腹部の痛み・嘔吐）
            </Text>
          </View>

          <View style={styles.infoCard}>
            <InfoRow
              labelKo="환자 정보"
              labelJa="患者情報"
              valueKo="일본인 / 일본어 사용자"
              valueJa="日本人 / 日本語"
            />

            <InfoRow
              labelKo="알레르기"
              labelJa="アレルギー"
              valueKo="이부프로펜"
              valueJa="イブプロフェン"
            />

            <InfoRow
              labelKo="복용 중인 약"
              labelJa="服用中の薬"
              valueKo="없음"
              valueJa="なし"
            />

            <InfoRow
              labelKo="지속 시간"
              labelJa="持続時間"
              valueKo="1~6시간"
              valueJa="1〜6時間"
              isLast
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

type InfoRowProps = {
  labelKo: string;
  labelJa: string;
  valueKo: string;
  valueJa: string;
  isLast?: boolean;
};

const InfoRow = ({
  labelKo,
  labelJa,
  valueKo,
  valueJa,
  isLast = false,
}: InfoRowProps) => {
  return (
    <View style={[styles.infoRow, isLast && styles.infoRowLast]}>
      <View style={styles.infoLabelArea}>
        <Text style={styles.infoLabelKo}>{labelKo}</Text>
        <Text style={styles.infoLabelJa}>{labelJa}</Text>
      </View>

      <View style={styles.infoValueArea}>
        <Text style={styles.infoValueKo}>{valueKo}</Text>
        <Text style={styles.infoValueJa}>{valueJa}</Text>
      </View>
    </View>
  );
};

export default CommunicationCardScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F5F8',
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F5F8',
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 36,
  },

  topGreenTitle: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#00B386',
    textAlign: 'center',
    marginTop: 2,
  },
  mainTitle: {
    fontFamily: 'GoogleSans-Bold',
    marginTop: 8,
    fontSize: 24,
    lineHeight: 34,
    color: '#000000',
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: 'GoogleSans-Regular',
    marginTop: 4,
    fontSize: 14,
    lineHeight: 21,
    color: '#454545',
    textAlign: 'center',
  },

warningBox: {
  marginTop: 26,
  backgroundColor: '#FFE9E9',
  borderRadius: 14,
  paddingHorizontal: 20,
  paddingVertical: 14,
  alignItems: 'stretch',
},

warningKo: {
  width: '100%',
  fontFamily: 'GoogleSans-Bold',
  fontSize: 13,
  lineHeight: 20,
  color: '#FF4949',
  textAlign: 'left',
},

warningJa: {
  width: '100%',
  fontFamily: 'GoogleSans-Regular',
  marginTop: 2,
  fontSize: 13,
  lineHeight: 20,
  color: '#FF4949',
  textAlign: 'left',
},

symptomBox: {
  width: '100%',
  alignSelf: 'stretch',
  marginTop: 30,
  backgroundColor: '#E6FBF6',
  borderWidth: 1,
  borderColor: '#00B386',
  borderRadius: 14,
  paddingHorizontal: 20,
  paddingVertical: 20,
  alignItems: 'stretch',
},

symptomLabelKo: {
  width: '100%',
  fontFamily: 'GoogleSans-Bold',
  fontSize: 13,
  lineHeight: 20,
  color: '#FF4949',
  marginBottom: 8,
  textAlign: 'left',
},

symptomMainKo: {
  width: '100%',
  fontFamily: 'GoogleSans-Bold',
  fontSize: 20,
  lineHeight: 30,
  color: '#000000',
  textAlign: 'left',
},

symptomSubJa: {
  width: '100%',
  fontFamily: 'GoogleSans-Regular',
  marginTop: 8,
  fontSize: 14,
  lineHeight: 21,
  color: '#454545',
  textAlign: 'left',
},

  infoCard: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoLabelArea: {
    width: 124,
  },
  infoLabelKo: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 14,
    lineHeight: 21,
    color: '#006AC6',
  },
  infoLabelJa: {
    fontFamily: 'GoogleSans-Regular',
    marginTop: 2,
    fontSize: 13,
    lineHeight: 19,
    color: '#454545',
  },
  infoValueArea: {
    flex: 1,
  },
  infoValueKo: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 14,
    lineHeight: 21,
    color: '#000000',
  },
  infoValueJa: {
    fontFamily: 'GoogleSans-Regular',
    marginTop: 2,
    fontSize: 13,
    lineHeight: 19,
    color: '#454545',
  },
});