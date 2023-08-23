import { Label } from 'components';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { getUserInfo } from 'selectors/app';
import { Colors, Fonts } from 'theme';
import { IModalCustom } from 'types/app';
import SelectDropdown from 'react-native-select-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { isSetGoalAlready } from 'selectors/goal';

export const ModalInput = (props: IModalCustom) => {
  const isSetAlready = useSelector(isSetGoalAlready);
  const userInfo = useSelector(getUserInfo);
  const initData: {
    weight: string;
    activeLevel: string;
    rate: string;
    goalType: string;
  } = props.extraData;

  const [targetWeight, setTargetWeight] = useState('');
  const [targetWeightChange, setTargetWeightChange] = useState('');
  const [activeLevel, setActiveLevel] = useState('1.2');
  const [highlight, setHighlight] = useState(-1);
  const [goalType, setGoalType] = useState('');

  const [error, setError] = useState('');

  const suggestWeight = [
    (Math.pow(userInfo?.height / 100, 2) * 18.5 * 2.205).toFixed(0) + ' lbs',
    (Math.pow(userInfo?.height / 100, 2) * 25 * 2.205).toFixed(0) + ' lbs',
  ];
  const suggestWeightChange = [
    (
      Math.pow(userInfo?.height / 100, 2) * 18.5 * 2.205 -
      userInfo?.weight
    ).toFixed(0) + ' lbs',
    (
      Math.pow(userInfo?.height / 100, 2) * 25 * 2.205 -
      userInfo?.weight
    ).toFixed(0) + ' lbs',
  ];

  const resetData = useCallback(() => {
    setError('');
    setTargetWeight(initData.weight);
    setActiveLevel(`${initData.activeLevel}`);
    setTargetWeightChange(initData.rate);
    setGoalType(
      initData.goalType.toLowerCase().includes('gain')
        ? 'Weight Gain'
        : initData.goalType.toLowerCase().includes('loss')
        ? 'Weight Loss'
        : 'Weight Maintance',
    );
    console.log(initData);
  }, [initData]);

  const submit = useCallback(() => {
    if (!targetWeight || !targetWeightChange || activeLevel === '') {
      setError('Please input required (*) fields!');
    } else {
      setError(null);
      props.callback &&
        props.callback({
          goalType,
          weight: targetWeight,
          rate: targetWeightChange,
          activeLevel: parseFloat(activeLevel).toFixed(3),
        });
    }
  }, [targetWeight, targetWeightChange, activeLevel, goalType]);

  useEffect(() => {
    if (props.visible) {
      resetData();
    }
  }, [props.visible]);

  useEffect(() => {
    if (targetWeight && activeLevel.length > 1 && targetWeightChange) {
      setError('');
    }
  }, [targetWeight, activeLevel, targetWeightChange]);

  return (
    <Modal
      isVisible={props.visible}
      onBackdropPress={Keyboard.dismiss}
      backdropOpacity={0.5}
      hideModalContentWhileAnimating
      style={{
        justifyContent: 'center',
        margin: 0,
      }}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {isSetAlready && (
              <TouchableOpacity
                onPress={props.close}
                style={{
                  alignSelf: 'flex-end',
                  bottom: 30,
                }}
              >
                <AntDesign name="closecircle" color="black" size={24} />
              </TouchableOpacity>
            )}
            <Label style={styles.title}>Target Weight</Label>
            <TouchableOpacity
              onPress={resetData}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
                bottom: 30,
              }}
            >
              <Entypo name="back-in-time" color="black" size={24} />
              <Label style={{ fontFamily: Fonts.medium, color: 'black' }}>
                Reset
              </Label>
            </TouchableOpacity>
            <Label style={styles.label}>
              Input target weight <Label style={{ color: 'red' }}>(*)</Label>
            </Label>
            <Label style={styles.suggest}>
              Suggest: {`${suggestWeight[0]} to ${suggestWeight[1]}`}
            </Label>
            <TextInput
              maxLength={3}
              keyboardType="numeric"
              value={targetWeight}
              onChangeText={setTargetWeight}
              style={styles.input}
              placeholder={`${suggestWeight[0]} to ${suggestWeight[1]}`}
              placeholderTextColor={Colors.LightGray}
            />
            <Label style={styles.label}>
              Input rate of weight change (lbs per week)
              <Label style={{ color: 'red' }}> (*)</Label>
            </Label>
            {/* <Label style={styles.suggest}>
              Suggest:{' '}
              {`${suggestWeightChange[0]} to ${suggestWeightChange[1]}`}
            </Label> */}
            <TextInput
              maxLength={3}
              keyboardType="numeric"
              value={targetWeightChange}
              onChangeText={setTargetWeightChange}
              style={styles.input}
              placeholder={'Above 1 lbs'}
              placeholderTextColor={Colors.LightGray}
            />
            <Label style={styles.label}>
              Select activity level <Label style={{ color: 'red' }}>(*)</Label>
            </Label>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {_.range(1, 6).map((item, index) => (
                <TouchableOpacity
                  key={`item-${item}`}
                  style={styles.activeButton}
                  onPress={() => {
                    console.log('result: ', (1.2 + index * 0.175).toFixed(3));
                    setActiveLevel((1.2 + index * 0.175).toFixed(3));
                    setHighlight(index);
                  }}
                  activeOpacity={0.5}
                >
                  <Label
                    style={{
                      fontSize: 11,
                      color: highlight === index ? Colors.highlight : 'white',
                    }}
                  >
                    {item === 1
                      ? 'Sedentary'
                      : item === 2
                      ? 'Light'
                      : item === 3
                      ? 'Moderate'
                      : item === 4
                      ? 'High'
                      : 'Extra'}
                  </Label>
                </TouchableOpacity>
              ))}
            </View>
            <Label style={[styles.label, { marginTop: 10 }]}>
              Goal type <Label style={{ color: 'red' }}>(*)</Label>
            </Label>
            <SelectDropdown
              data={['Weight Gain', 'Weight Loss', 'Weight Maintance']}
              onSelect={(item, index) => {
                setGoalType(
                  index === 0 ? 'gain' : index === 1 ? 'loss' : 'maintaince',
                );
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              defaultValue={goalType}
              buttonStyle={{
                borderRadius: 12,
                width: '100%',
                paddingVertical: 10,
                borderWidth: 2,
                borderColor: Colors.neonViolet,
                backgroundColor: Colors.main,
              }}
              buttonTextStyle={{
                color: 'white',
                fontFamily: Fonts.regular,
                fontSize: 14,
              }}
            />
            <Label style={styles.error}>{error}</Label>
            <TouchableOpacity
              style={styles.submit}
              activeOpacity={0.5}
              onPress={submit}
            >
              <Label>Submit</Label>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 24,
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'black',
    fontFamily: Fonts.medium,
    fontSize: 24,
    marginBottom: 10,
    bottom: 15,
  },
  label: {
    color: 'black',
    marginBottom: 5,
    fontFamily: Fonts.medium,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: Colors.neonViolet,
    borderRadius: 12,
    backgroundColor: Colors.main,
    color: 'white',
    marginBottom: 5,
  },
  activeButton: {
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: Colors.neonViolet,
    backgroundColor: Colors.main,
    borderRadius: 12,
  },
  submit: {
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: Colors.main,
    marginTop: 30,
    paddingVertical: 10,
  },
  suggest: {
    color: 'black',
    fontSize: 12,
    marginBottom: 5,
    marginTop: -5,
    fontStyle: 'italic',
  },
  error: {
    color: 'red',
    marginTop: 5,
    marginBottom: -5,
  },
});
