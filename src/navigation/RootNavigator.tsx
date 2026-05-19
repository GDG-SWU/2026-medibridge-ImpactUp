import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/home/HomeScreen';
import SymptomStep1Screen from '../screens/symptom/SymptomStep1Screen';
import SymptomStep2Screen from '../screens/symptom/SymptomStep2Screen';
import SymptomStep3Screen from '../screens/symptom/SymptomStep3Screen';
import SymptomStep4Screen from '../screens/symptom/SymptomStep4Screen';
import SymptomStep5Screen from '../screens/symptom/SymptomStep5Screen';
import SymptomStep6Screen from '../screens/symptom/SymptomStep6Screen';
import DiagnosisLoadingScreen from '../screens/diagnosis/DiagnosisLoadingScreen';
import DiagnosisResultScreen from '../screens/diagnosis/DiagnosisResultScreen';
import RecommendedMedicineScreen from '../screens/diagnosis/RecommendedMedicineScreen';
import CommunicationCardScreen from '../screens/diagnosis/CommunicationCardScreen';

import type {RootStackParamList} from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SymptomStep1" component={SymptomStep1Screen} />
        <Stack.Screen name="SymptomStep2" component={SymptomStep2Screen} />
        <Stack.Screen name="SymptomStep3" component={SymptomStep3Screen} />
        <Stack.Screen name="SymptomStep4" component={SymptomStep4Screen} />
        <Stack.Screen name="SymptomStep5" component={SymptomStep5Screen} />
        <Stack.Screen name="SymptomStep6" component={SymptomStep6Screen} />
        <Stack.Screen name="DiagnosisLoading" component={DiagnosisLoadingScreen} />
        <Stack.Screen name="DiagnosisResult" component={DiagnosisResultScreen} />
        <Stack.Screen name="RecommendMedicine"  component={RecommendedMedicineScreen}/>
        <Stack.Screen name="CommunicationCard" component={CommunicationCardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;