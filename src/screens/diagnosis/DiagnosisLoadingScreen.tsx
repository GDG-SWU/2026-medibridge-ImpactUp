import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../types/navigation';
import type {RouteProp} from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type DiagnosisLoadingRouteProp = RouteProp<
  RootStackParamList,
  'DiagnosisLoading'
>;

type DiagnosisLoadingNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DiagnosisLoading'
>;

const DiagnosisLoadingScreen = () => {
  const navigation = useNavigation<DiagnosisLoadingNavigationProp>();
  const route = useRoute<DiagnosisLoadingRouteProp>();

  const {diagnoseResult} = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('DiagnosisResult', {
        diagnoseResult,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, diagnoseResult]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        <Image
          source={require('../../assets/images/cross_logo.png')}
          style={styles.icon}
          resizeMode="contain"
        />

        <Text style={styles.title}>分析中</Text>

        <Text style={styles.description}>
          症状と一致する条件を検索中...
        </Text>
      </View>
    </View>
  );
};

export default DiagnosisLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 272,
  },
  icon: {
    width: 180,
    height: 180,
  },
  title: {
    marginTop: 43,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
  description: {
    marginTop: 17,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    color: 'rgba(55, 56, 60, 0.61)',
    textAlign: 'center',
  },
});