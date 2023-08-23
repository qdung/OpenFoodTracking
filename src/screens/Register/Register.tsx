import { Back, BackgroundImage, Label } from 'components';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { Fonts } from 'theme';
import { NavigationService, Routes } from 'navigation';
import _ from 'lodash';
import { ModalDNA, BasicInfo, BMIInfo, PaymentInfo } from './widget';
import { useDispatch } from 'react-redux';
import { updateUser } from 'store/app';
import { useAuth } from 'context';
import { useNavigation } from '@react-navigation/native';

export const Register = memo(() => {
  const [step, setStep] = useState(0);

  const dispatch = useDispatch();

  const [step1Data, setStep1Data] = useState<any>(null);
  const [step2Data, setStep2Data] = useState<any>(null);
  const [step3Data, setStep3Data] = useState<any>(null);
  const [pressSubmit, setPressSubmit] = useState(false);

  const [buttonTitle, setButtonTitle] = useState('Next');
  const navigation = useNavigation();

  const onPressSubmit = useCallback(() => {
    setPressSubmit(true);
  }, [pressSubmit, step, step3Data]);

  useEffect(() => {
    if (pressSubmit) {
      setPressSubmit(false);
      if (step === 2) {
        // console.log({ ...step1Data, ...step2Data, ...step3Data });
        if (step3Data) {
          // dispatch(updateUser({ ...step1Data, ...step2Data, ...step3Data }));
        }
      }
    }
  }, [pressSubmit, step, step3Data]);

  useEffect(() => {
    setStep(0);
    setPressSubmit(false);
    setStep1Data(null);
    setStep2Data(null);
    setStep3Data(null);
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundImage />
      <View style={{ paddingHorizontal: 20 }}>
        <Back />
        <Label
          style={{
            alignSelf: 'center',
            bottom: 25,
            fontFamily: Fonts.semibold,
            fontSize: 20,
          }}
        >
          Step {step + 1}/3
        </Label>
      </View>
      <View>
        {step === 0 ? (
          <BasicInfo
            callback={(data) => {
              setStep1Data(data);
              setStep(1);
            }}
            isSubmit={pressSubmit}
          />
        ) : step === 1 ? (
          <BMIInfo
            callback={(data) => {
              setStep2Data(data);
              setStep(2);
            }}
            isSubmit={pressSubmit}
          />
        ) : (
          <PaymentInfo
            callback={(data) => {
              dispatch(updateUser({ ...step1Data, ...step2Data, ...data }));
              NavigationService.reset(Routes.ScanBarcode);
            }}
            isSubmit={pressSubmit}
            changeButtonTitle={(title) => setButtonTitle(title)}
          />
        )}
      </View>
      <View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {step > 0 ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setStep((_step) => (_step > 0 ? _step - 1 : _step))}
          >
            <Label style={{ fontFamily: Fonts.medium, fontSize: 16 }}>
              Back
            </Label>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={[styles.button, { marginLeft: 10 }]}
          onPress={onPressSubmit}
        >
          <Label style={{ fontFamily: Fonts.medium, fontSize: 16 }}>
            {buttonTitle}
          </Label>
        </TouchableOpacity>
      </View>
    </View>
  );
});
