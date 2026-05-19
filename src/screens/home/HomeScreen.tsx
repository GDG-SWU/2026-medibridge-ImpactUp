import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../types/navigation';

const mainLogo = require('../../assets/images/main_text_black.png');
const iconBell = require('../../assets/images/icon_bell.png');

const tabMedicalOn = require('../../assets/images/tab_medical_on.png');
const tabMapOff = require('../../assets/images/tab_map_off.png');
const tabRecordOff = require('../../assets/images/tab_record_off.png');
const tabMyOff = require('../../assets/images/tab_my_off.png');

type HomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();

  const handleSymptomPress = () => {
    navigation.navigate('SymptomStep1');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F1FFFC" />

      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.header}>
            <Image source={mainLogo} style={styles.logo} resizeMode="contain" />

            <Pressable hitSlop={10}>
              <Image source={iconBell} style={styles.bellIcon} resizeMode="contain" />
            </Pressable>
          </View>

          <View style={styles.alertArea}>
            <Text style={styles.alertLabel}>夏の韓国 · SEASONAL ALERT</Text>
            <Text style={styles.alertTitle}>食中毒・腸炎にご注意ください</Text>
            <Text style={styles.alertDesc}>
              気温と湿度が高いため、 食中毒の発生が全国的に増加しています。
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.healthCard}>
            <Pressable style={styles.editButton}>
                <Text style={styles.editText}>編集</Text>
            </Pressable>

            <Text style={styles.healthLabel}>MY HEALTH CARD</Text>
            <Text style={styles.healthTitle}>あなたの健康プロフィール</Text>
            </View>

          <View style={styles.symptomCard}>
            <Text style={styles.symptomTitle}>体調が悪いですか？</Text>

            <Text style={styles.symptomDesc}>
              6つの簡単な質問に答えるだけで、あなたに合った対処法をご案内します。
            </Text>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>⏱ 約1分</Text>
              <Text style={styles.metaText}>🔒 ローカル保存のみ</Text>
            </View>

            <Pressable style={styles.symptomButton} onPress={handleSymptomPress}>
              <Text style={styles.symptomButtonText}>症状を入力する</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.tabBar}>
          <Pressable style={styles.tabItem}>
            <Image source={tabMedicalOn} style={styles.tabIcon} resizeMode="contain" />
            <Text style={[styles.tabText, styles.tabTextActive]}>医療</Text>
          </Pressable>

          <Pressable style={styles.tabItem}>
            <Image source={tabMapOff} style={styles.tabIcon} resizeMode="contain" />
            <Text style={styles.tabText}>マップ</Text>
          </Pressable>

          <Pressable style={styles.tabItem}>
            <Image source={tabRecordOff} style={styles.tabIcon} resizeMode="contain" />
            <Text style={styles.tabText}>記録</Text>
          </Pressable>

          <Pressable style={styles.tabItem}>
            <Image source={tabMyOff} style={styles.tabIcon} resizeMode="contain" />
            <Text style={styles.tabText}>マイ</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1FFFC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F5F6',
  },

  topSection: {
    backgroundColor: '#F1FFFC',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 28,
  },
  header: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  logo: {
    width: 132,
    height: 32,
  },
  bellIcon: {
    width: 24,
    height: 24,
  },

  alertArea: {
    width: '100%',
  },
  alertLabel: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 12,
    lineHeight: 18,
    color: '#FF4949',
    marginBottom: 4,
  },
  alertTitle: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#171719',
    marginBottom: 4,
  },
  alertDesc: {
    width: 260,
    fontFamily: 'GoogleSans-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#545454',
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 90,
  },

    healthCard: {
    width: '100%',
    height: 243,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#00B386',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 16,
    },
    healthLabel: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.9,
    color: '#00694F',
    includeFontPadding: false,
    },
    editButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 56,
    height: 37,
    borderRadius: 20,
    backgroundColor: '#CFFFF3',
    alignItems: 'center',
    justifyContent: 'center',
    },

    editText: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 14,
    lineHeight: 18,
    color: '#00B386',
    includeFontPadding: false,
    textAlignVertical: 'center',
    paddingTop: 1,
    },
    healthTitle: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#222222',
    marginTop: 8,
    includeFontPadding: false,
    },

  symptomCard: {
    width: '100%',
    height: 244,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingTop: 23,
    paddingBottom: 22,
  },
  symptomTitle: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 21,
    lineHeight: 30,
    color: '#000000',
    marginBottom: 8,
  },
  symptomDesc: {
    width: 260,
    fontFamily: 'GoogleSans-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#47383C',
    marginBottom: 22,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 22,
  },
  metaText: {
    fontFamily: 'GoogleSans-Regular',
    fontSize: 11,
    lineHeight: 16,
    color: '#545454',
  },
  symptomButton: {
    height: 64,
    borderRadius: 18,
    backgroundColor: '#00B386',
    alignItems: 'center',
    justifyContent: 'center',
  },
  symptomButtonText: {
  fontFamily: 'GoogleSans-Bold',
  fontSize: 16,
  lineHeight: 20,
  color: '#FFFFFF',
  includeFontPadding: false,
  textAlignVertical: 'center', 
  paddingTop: 1,
},

  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 76,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabIcon: {
    width: 28,
    height: 28,
    marginBottom: 4,
  },
  tabText: {
    fontFamily: 'GoogleSans-Regular',
    fontSize: 11,
    color: '#B8B8B8',
  },
  tabTextActive: {
    fontFamily: 'GoogleSans-Bold',
    color: '#00694F',
  },
});