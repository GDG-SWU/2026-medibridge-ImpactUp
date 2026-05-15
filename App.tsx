import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';


const App = () => {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const [isOnboardingFinished, setIsOnboardingFinished] = useState(false);

  if (!isSplashFinished) {
    return <SplashScreen onFinish={() => setIsSplashFinished(true)} />;
  }

  if (!isOnboardingFinished) {
    return <OnboardingScreen onFinish={() => setIsOnboardingFinished(true)} />;
  }

  return (
  <View style={styles.container}>
    <Text style={styles.text}>홈 화면 들어갈 자리</Text>
  </View>
);
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
  },
});