import { Back, BackgroundImage, Label, SafeAreaViewProvider } from 'components';
import { t } from 'i18next';
import React, { memo } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { styles } from './style';
import Svg, { Circle, Path } from 'react-native-svg';
import { scaleWidth } from 'utils';
import { Colors, Fonts } from 'theme';
import { NavigationService, Routes } from 'navigation';

export const AboutUs = memo(() => {
  return (
    <View style={styles.container}>
      <BackgroundImage />
      <Back />
      <Label style={styles.title}>About Us</Label>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        style={{
          borderWidth: 2,
          padding: 20,
          borderColor: Colors.neonViolet,
          borderRadius: 12,
          backgroundColor: Colors.card,
          marginBottom: 20,
        }}
      >
        <Label style={[styles.pagagraph]}>
          Welcome to our revolutionary dietary app! We are a team of experts in
          nutrition, technology, and genetics, dedicated to helping people make
          informed choices about their diet and live healthier lives. Our app is
          designed to empower you to take control of your health by providing
          you with a comprehensive analysis of the food you eat and personalized
          recommendations based on your unique genetic profile.
        </Label>
        <Label style={styles.pagagraph}>
          Our app uses advanced technology to scan processed food products and
          analyze their nutrition facts and ingredients. By doing so, we help
          you identify any toxic ingredients that may be lurking in your food
          and provide a Nutri-score to help you make better choices. We also let
          you set goals and keep track of your eating habits, so you can monitor
          your progress and stay on track with your dietary goals.
        </Label>
        <Label style={styles.pagagraph}>
          But what sets our app apart is our use of genetic analysis. By
          analyzing your DNA report, we can provide you with personalized
          recommendations that take into account your unique genetic makeup.
          This means that we can help you avoid problematic foods from the food
          supply and provide you with the best solution for your individual
          needs. Our app is not a one-size-fits-all solution; it is tailored to
          your specific genetic profile to help you achieve your dietary goals
          and optimize your health.
        </Label>
        <Label style={styles.pagagraph}>
          We believe that everyone has the right to access accurate and reliable
          information about their diet. With our app, you can make informed
          choices about the food you eat and take control of your health. Our
          app is designed to be easy to use, intuitive, and accessible to
          everyone. Whether you are a seasoned health enthusiast or just
          starting your journey toward a healthier lifestyle, our app has
          something for you.
        </Label>
        <Label style={styles.pagagraph}>
          We are committed to helping you achieve your goals and providing you
          with the best possible experience. Join us on this journey towards
          better health and discover the power of personalized nutrition advice.
        </Label>
      </ScrollView>
    </View>
  );
});
