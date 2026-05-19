import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Pressable,
  useWindowDimensions,
} from 'react-native';

type LanguageSelectScreenProps = {
  onNext: () => void;
};


const BASE_WIDTH = 412;
const BASE_HEIGHT = 917;

const LanguageSelectScreen = ({onNext}: LanguageSelectScreenProps) => {
  const {width, height} = useWindowDimensions();

  const sx = (value: number) => (width / BASE_WIDTH) * value;
  const sy = (value: number) => (height / BASE_HEIGHT) * value;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Text
        style={[
          styles.title,
          {
            left: sx(16),
            top: sy(132),
            width: sx(380),
            minHeight: sy(135),
            fontSize: sx(26),
            lineHeight: sx(39),
          },
        ]}>
        こんにちは{'\n'}
        使用する言語を選択{'\n'}
        してください。
      </Text>

      <Text
        style={[
          styles.description,
          {
            left: sx(16),
            top: sy(291),
            width: sx(380),
            height: sy(48),
            fontSize: sx(16),
            lineHeight: sx(24),
          },
        ]}>
        システム言語は日本語です。{'\n'}
        他の言語に変更できます。
      </Text>

      <View
        style={[
          styles.languageCard,
          {
            left: sx(79),
            top: sy(395),
            width: sx(254),
            height: sy(246),
            borderRadius: sx(18),
          },
        ]}>
        <Image
          source={require('../../assets/images/japan_flag.png')}
          style={[
            styles.flag,
            {
              top: sy(36),
              width: sx(184),
              height: sy(103),
            },
          ]}
          resizeMode="contain"
        />

        <Text
          style={[
            styles.languageText,
            {
              top: sy(164),
              width: sx(72),
              height: sy(33),
              fontSize: sx(22),
              lineHeight: sx(33),
            },
          ]}>
          日本語
        </Text>
      </View>

      <Pressable
  style={[
    styles.changeButton,
    {
      left: sx(166),
      top: sy(680),
      width: sx(80),
      height: sy(28),
    },
  ]}>
  <Text
    allowFontScaling={false}
    style={[
      styles.changeText,
      {
        fontSize: sx(16),
        lineHeight: sx(24),
      },
    ]}>
    変更
  </Text>
  </Pressable>
  

      <Pressable
        style={[
          styles.startButton,
          {
            left: sx(16),
            top: sy(771),
            width: sx(380),
            height: sy(64),
            borderRadius: sx(18),
          },
        ]}
        onPress={onNext}>
        <Text
          style={[
            styles.startButtonText,
            {
              fontSize: sx(16),
              lineHeight: sx(24),
            },
          ]}>
          はじめる
        </Text>
      </Pressable>
    </View>
  );
};

export default LanguageSelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  title: {
  position: 'absolute',
  fontFamily: 'GoogleSans-Bold',
  letterSpacing: 0,
  color: '#000000',
},
description: {
  position: 'absolute',
  fontFamily: 'GoogleSans-Regular',
  letterSpacing: 0,
  color: '#545454',
},


  languageCard: {
    position: 'absolute',
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
  },

  flag: {
    position: 'absolute',
  },

 languageText: {
  position: 'absolute',
  fontFamily: 'GoogleSans-Medium',
  letterSpacing: 0,
  color: '#222222',
  textAlign: 'center',
},

changeText: {
  fontFamily: 'GoogleSans-Regular',
  color: '#545454',
  textDecorationLine: 'underline',
},

startButtonText: {
  fontFamily: 'GoogleSans-Bold',
  color: '#FFFFFF',
  textAlign: 'center',
},

  changeButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },



  startButton: {
    position: 'absolute',
    backgroundColor: '#00B386',
    alignItems: 'center',
    justifyContent: 'center',
  },

});