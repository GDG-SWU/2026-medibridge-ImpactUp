import React, {useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from 'react-native';

type SplashScreenProps = {
  onFinish?: () => void;
};

const BASE_WIDTH = 412;
const BASE_HEIGHT = 917;

const SplashScreen = ({onFinish}: SplashScreenProps) => {
  const {width, height} = useWindowDimensions();

  const sx = (value: number) => (width / BASE_WIDTH) * value;
  const sy = (value: number) => (height / BASE_HEIGHT) * value;

  useEffect(() => {

    const timer = setTimeout(() => {
      onFinish?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FFFC" />

      <Image
        source={require('../assets/images/main_logo.png')}
        style={[
          styles.logo,
          {
            
            left: sx(159),
            top: sy(337),
            width: sx(96),
            height: sx(96),
          },
        ]}
        resizeMode="contain"
      />

      <Image
        source={require('../assets/images/main_text.png')}
        style={[
          styles.mainText,
          {
            left: sx(74),
            top: sy(499),
            width: sx(265),
            height: sy(39),
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FFFC',
  },

  logo: {
    position: 'absolute',
  },

  mainText: {
    position: 'absolute',
  },
});