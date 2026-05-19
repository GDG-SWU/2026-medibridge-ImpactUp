import React, {useState} from 'react';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const [isOnboardingFinished, setIsOnboardingFinished] = useState(false);

  if (!isSplashFinished) {
    return <SplashScreen onFinish={() => setIsSplashFinished(true)} />;
  }

  if (!isOnboardingFinished) {
    return <OnboardingScreen onFinish={() => setIsOnboardingFinished(true)} />;
  }

  return <RootNavigator />;
};

export default App;