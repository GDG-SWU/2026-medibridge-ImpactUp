import React, {useState} from 'react';
import LanguageSelectScreen from './LanguageSelectScreen';
import ConditionSelectScreen from './ConditionSelectScreen';
import AllergySelectScreen from './AllergySelectScreen';
import MedicineSelectScreen from './MedicineSelectScreen';

type OnboardingScreenProps = {
  onFinish?: () => void;
};

type OnboardingStep = 'language' | 'condition' | 'allergy' | 'medicine';

const OnboardingScreen = ({onFinish}: OnboardingScreenProps) => {
  const [step, setStep] = useState<OnboardingStep>('language');

  if (step === 'language') {
    return <LanguageSelectScreen onNext={() => setStep('condition')} />;
  }

  if (step === 'condition') {
    return (
      <ConditionSelectScreen
        onBack={() => setStep('language')}
        onNext={() => setStep('allergy')}
      />
    );
  }

  if (step === 'allergy') {
    return (
      <AllergySelectScreen
        onBack={() => setStep('condition')}
        onNext={() => setStep('medicine')}
      />
    );
  }

  return (
    <MedicineSelectScreen
      onBack={() => setStep('allergy')}
      onNext={onFinish}
    />
  );
};

export default OnboardingScreen;