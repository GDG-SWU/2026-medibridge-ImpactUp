import React, {useState} from 'react';
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
import {useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'RecommendMedicine'>;

type RecommendMedicineRouteProp = RouteProp<
  RootStackParamList,
  'RecommendMedicine'
>;

const arrowBack = require('../../assets/images/arrow_back.png');
const arrowNext = require('../../assets/images/arrow_next.png');

type TabType = 'medicine' | 'pharmacy';

const RecommendedMedicineScreen = ({navigation}: Props) => {
  const route = useRoute<RecommendMedicineRouteProp>();
  const {diagnoseResult} = route.params;

  console.log('약 추천 화면에서 받은 진단 결과:', diagnoseResult);

  const recommendedMedications = diagnoseResult.recommendedMedications ?? [];

  const notice =
    diagnoseResult.notice ??
    diagnoseResult.summary ??
    '薬剤師に相談して、安全な薬を確認してください。';
    const [activeTab, setActiveTab] = useState<TabType>('medicine');

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

          <Text style={styles.title}>おすすめの処方</Text>
          <Text style={styles.subtitle}>あなたに安全な薬と近くの薬局</Text>

          <View style={styles.tabs}>
            <Pressable
              style={styles.tabButton}
              onPress={() => setActiveTab('medicine')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'medicine' && styles.tabTextActive,
                ]}>
                安全な薬 {recommendedMedications.length}
              </Text>
              {activeTab === 'medicine' && <View style={styles.tabLine} />}
            </Pressable>

            <Pressable
              style={styles.tabButton}
              onPress={() => setActiveTab('pharmacy')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'pharmacy' && styles.tabTextActive,
                ]}>
                近くの薬局 4
              </Text>
              {activeTab === 'pharmacy' && <View style={styles.tabLine} />}
            </Pressable>
          </View>
        </View>

        <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {activeTab === 'medicine' ? (
                <>
                <View style={styles.warningBox}>
                    <Text style={styles.warningText}>
                    {notice}
                    </Text>
                </View>
                  {recommendedMedications.length > 0 ? (
                    recommendedMedications.map((medicine, index) => (
                      <MedicineCard
                        key={index}
                        category="推奨薬"
                        name={medicine}
                        description="服用前に薬剤師へ確認してください。"
                      />
                    ))
                  ) : (
                    <View style={styles.emptyMedicineBox}>
                      <Text style={styles.emptyMedicineText}>
                        現在おすすめの薬情報がありません。薬剤師に相談してください。
                      </Text>
                    </View>
                  )}
                </>
            ) : (
                <>
                <PharmacyCard
                    name="明洞 健康薬局"
                    address="ソウル特別市 中区 明洞8キル 27"
                    status="営業中"
                    time="本日 9:00 - 22:00"
                />

                <PharmacyCard
                    name="江南セントラル薬局"
                    address="ソウル特別市 江南区 テヘラン路 152"
                    status="営業時間外"
                    time="本日 10:00 - 20:00"
                    closed
                />

                <PharmacyCard
                    name="24時間 弘大薬局"
                    address="ソウル特別市 麻浦区 楊花路 156"
                    status="営業中"
                    time="24時間営業（年中無休）"
                />

                <PharmacyCard
                    name="明洞 中央薬局"
                    address="ソウル特別市 中区 明洞8キル 27"
                    status="営業中"
                    time="本日 9:00 - 21:00"
                />
                </>
            )}
            </ScrollView>
        <View style={styles.bottomArea}>
          <Pressable
            style={styles.bottomButton}
            onPress={() => {
              navigation.navigate('CommunicationCard');
            }}>
            <Text style={styles.bottomButtonText}>会話カードを表示</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

type MedicineCardProps = {
  category: string;
  name: string;
  description: string;
};

const MedicineCard = ({category, name, description}: MedicineCardProps) => {
  return (
    <View style={styles.medicineCard}>
      <Text style={styles.cardCategory}>{category}</Text>
      <Text style={styles.cardName}>{name}</Text>
      <Text style={styles.cardDescription}>{description}</Text>

      <View style={styles.badgeRow}>
        <View style={styles.greenBadge}>
          <Text style={styles.greenBadgeText}>✓ 血圧の薬と安全</Text>
        </View>
        <View style={styles.greenBadge}>
          <Text style={styles.greenBadgeText}>✓ アレルギー成分なし</Text>
        </View>
      </View>
    </View>
  );
};

type PharmacyCardProps = {
  name: string;
  address: string;
  status: string;
  time: string;
  closed?: boolean;
};

const PharmacyCard = ({
  name,
  address,
  status,
  time,
  closed = false,
}: PharmacyCardProps) => {
  return (
    <Pressable style={styles.pharmacyCard}>
      <View style={styles.pharmacyTextArea}>
        <Text style={styles.pharmacyAddress}>{address}</Text>
        <Text style={styles.pharmacyName}>{name}</Text>

        <View style={styles.pharmacyInfoRow}>
          <View style={[styles.statusBadge, closed && styles.statusBadgeClosed]}>
            <Text
              style={[
                styles.statusBadgeText,
                closed && styles.statusBadgeTextClosed,
              ]}>
              {status}
            </Text>
          </View>
          <Text style={styles.pharmacyTime}>{time}</Text>
        </View>
      </View>

      <Image source={arrowNext} style={styles.nextIcon} />
    </Pressable>
  );
};

export default RecommendedMedicineScreen;

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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '700',
    color: '#000000',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    color: '#454545',
  },

  tabs: {
    flexDirection: 'row',
    marginTop: 30,
  },
  tabButton: {
    height: 32,
    marginRight: 34,
    justifyContent: 'flex-start',
  },
  tabText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
    color: '#737373',
  },
  tabTextActive: {
    color: '#222222',
  },
  tabLine: {
    height: 1.5,
    backgroundColor: '#222222',
    marginTop: 9,
    width: '100%',
  },

  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 180,
  },

  warningBox: {
    backgroundColor: '#FFE9E9',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 16,
  },
  warningText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
    color: '#FF4949',
  },

  emptyMedicineBox: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  paddingHorizontal: 20,
  paddingVertical: 24,
  borderWidth: 1,
  borderColor: '#E9E9F3',
},

emptyMedicineText: {
  fontSize: 14,
  lineHeight: 21,
  fontWeight: '400',
  color: '#454545',
},

  medicineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E9E9F3',
  },
  cardCategory: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: 'rgba(55, 56, 60, 0.61)',
    marginBottom: 4,
  },
  cardName: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    color: '#2E2F33',
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenBadge: {
    height: 24,
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0, 179, 106, 0.12)',
    justifyContent: 'center',
    marginRight: 12,
  },
  greenBadgeText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    color: '#008B3A',
  },

  pharmacyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E9E9F3',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pharmacyTextArea: {
    flex: 1,
  },
  pharmacyAddress: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: 'rgba(55, 56, 60, 0.61)',
    marginBottom: 4,
  },
  pharmacyName: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 14,
  },
  pharmacyInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    height: 24,
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0, 179, 106, 0.12)',
    justifyContent: 'center',
    marginRight: 12,
  },
  statusBadgeClosed: {
    backgroundColor: '#FFE9E9',
  },
  statusBadgeText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    color: '#008B3A',
  },
  statusBadgeTextClosed: {
    color: '#FF4949',
  },
  pharmacyTime: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    color: '#454545',
  },
  nextIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 10,
  },

    bottomArea: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 64,
    },
    bottomButton: {
    height: 64,
    borderRadius: 10,
    backgroundColor: '#00B386',
    alignItems: 'center',
    justifyContent: 'center',
    },
  bottomButtonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});