import { Back, BackgroundImage, Label, SafeAreaViewProvider } from 'components';
import { t } from 'i18next';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { styles } from './style';
import Svg, { Circle, Path } from 'react-native-svg';
import { scaleWidth } from 'utils';
import { Colors, Fonts } from 'theme';
import { NavigationService, Routes } from 'navigation';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { IUser } from 'types/app';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Tooltip from 'react-native-walkthrough-tooltip';
import { ModalInput } from './ModalInput';
import { getBMI, getUserInfo } from 'selectors/app';
import {
  getGoalType,
  getRateWeightChange,
  getSelectOption,
  getSubmitGoalDate,
  getTargetWeight,
  isSetGoalAlready,
} from 'selectors/goal';
import goal, {
  setGoalStatus,
  setSubmitDate,
  updateDayOption,
  updateGoalType,
  updateRateOfWeightChange,
  updateTargetWeight,
} from 'store/goal';
import { updateActivityLevelFactor } from 'store/app';
import moment from 'moment';

enum EnumBMI {
  UNDER_WEIGHT = 0,
  HEALTH_WEIGHT,
  OVER_WEIGHT,
  OBESE,
}

export const GoalSetting = memo(() => {
  const dispatch = useDispatch();

  // Using
  const userInfo = useSelector(getUserInfo) as IUser;
  const isAlreadySetGoal = useSelector(isSetGoalAlready);
  const userBMI = parseFloat(useSelector(getBMI));
  const activityLevelFactor = userInfo.activityLevelFactor;
  const _activityLevelFactor = parseFloat(activityLevelFactor);
  // sedentary:1.2, lightty active:1.375, moderately active:1.55, very active: 1.725, extra:1.9

  const targetWeight = useSelector(getTargetWeight);
  const rateWeightChange = useSelector(getRateWeightChange);
  const goalType = useSelector(getGoalType);
  const selectOption = useSelector(getSelectOption) ?? 0;
  const submitDate = useSelector(getSubmitGoalDate);

  const [modalFirstTime, setModalFirstTime] = useState(!isAlreadySetGoal);

  const bmiAnalysis = useMemo(() => {
    if (userBMI < 18.5) {
      return { content: 'Underweight', color: Colors.yellow };
    } else if (userBMI >= 18.5 && userBMI <= 24.9) {
      return { content: 'Healthy', color: Colors.success };
    } else if (userBMI >= 25 && userBMI <= 29.9) {
      return { content: 'Overweight', color: Colors.warning };
    } else {
      return { content: 'Underweight', color: 'red' };
    }
  }, [userBMI]);

  const targetBMI = useMemo(() => {
    return (
      parseFloat(targetWeight) /
      2.205 /
      Math.pow(userInfo.height / 100, 2)
    ).toFixed(1);
  }, [targetWeight, userInfo.height]);

  const minimumDays = useMemo(() => {
    let weightChangeValue;
    if (goalType === 'loss') {
      weightChangeValue = userInfo.weight - parseFloat(targetWeight);
    } else {
      weightChangeValue = parseFloat(targetWeight) - userInfo.weight;
    }
    const daysToChangeWeight =
      weightChangeValue / (parseFloat(rateWeightChange) * 0.45359237 * 7);
    return Math.ceil(daysToChangeWeight);
  }, [goalType, targetWeight, rateWeightChange]);

  const daysLeft = useMemo(() => {
    let moment1;
    const moment2 = moment();
    if (selectOption === 0) {
      moment1 = moment(`${submitDate} 00:00:00`).add(
        Math.round(minimumDays),
        'days',
      );
    } else if (selectOption === 1) {
      moment1 = moment(`${submitDate} 00:00:00`).add(
        Math.round(minimumDays * 1.5),
        'days',
      );
    } else {
      moment1 = moment(`${submitDate} 00:00:00`).add(
        Math.round(minimumDays * 3),
        'days',
      );
    }

    const diff = moment1.diff(moment2, 'days');
    return diff;
  }, [minimumDays, selectOption, submitDate]);

  const caloriesIntake = useMemo(() => {
    console.log({ activityLevelFactor });
    const genderFactor = userInfo.gender === 'Male' ? 1.0 : 0.9;
    const activityFactor = parseFloat(activityLevelFactor);
    const basalMetabolicRate =
      genderFactor *
      (10 * userInfo.weight +
        6.25 * (userInfo.height / 100) -
        5 * userInfo.age +
        5);
    let caloriesNeeded;
    if (goalType === 'loss') {
      caloriesNeeded = Math.round(
        basalMetabolicRate * activityFactor - parseInt(rateWeightChange) * 3500,
      );
    } else {
      caloriesNeeded = Math.round(
        basalMetabolicRate * activityFactor + parseInt(rateWeightChange) * 3500,
      );
    }
    return caloriesNeeded;
  }, [rateWeightChange, userInfo, activityLevelFactor, goalType]);

  useEffect(() => {
    // dispatch(setGoalStatus(false));
    // console.log({ activityLevelFactor });
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundImage />
      <Back />
      <Label style={styles.title}>Set Goal</Label>
      <TouchableOpacity
        onPress={() => setModalFirstTime(true)}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          paddingRight: 20,
          paddingTop: 12,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <FontAwesome name="edit" color="white" size={24} />
      </TouchableOpacity>
      <View style={[styles.rowSpace, { marginBottom: 10, marginTop: -20 }]}>
        {/* <TouchableOpacity
          activeOpacity={0.5}
          style={styles.swap}
          onPress={() => dispatch(swapWeightUnit())}
        >
          <Label>{weightUnit ?? 'kg'}</Label>
          <AntDesign name="swap" color="white" size={24} />
          <Label>{weightUnit === 'lbs' ? 'kg' : 'lbs'}</Label>
        </TouchableOpacity> */}
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <View style={[styles.card, { alignItems: 'center' }]}>
          <Label style={{}}>Explaination</Label>
          <Label style={{}}>Coming soon...</Label>
        </View>
        <View style={[styles.card]}>
          <Label
            style={{
              alignSelf: 'center',
              fontFamily: Fonts.medium,
              fontSize: 16,
            }}
          >
            Current
          </Label>
          <View style={[styles.rowSpace]}>
            <View style={styles.column}>
              <Label style={styles.label}>Age</Label>
              <Label style={styles.label}>{userInfo.age}</Label>
            </View>
            <View style={[styles.column, { alignItems: 'flex-end' }]}>
              <Label style={styles.label}>Gender</Label>
              <View style={[styles.row, { alignItems: 'flex-end' }]}>
                <Label style={styles.label}>{userInfo.gender}</Label>
                <FontAwesome
                  name={userInfo.gender === 'Male' ? 'male' : 'female'}
                  color="white"
                  size={24}
                  style={{ marginLeft: 3, bottom: 2 }}
                />
              </View>
            </View>
          </View>
          <View style={[styles.rowSpace, { marginTop: 10 }]}>
            <View style={styles.column}>
              <Label style={styles.label}>Height</Label>
              <Label style={styles.label}>
                {userInfo.height}
                <Label style={{ fontSize: 12 }}>(cm)</Label>
              </Label>
            </View>
            <View style={[styles.column, { alignItems: 'flex-end' }]}>
              <Label style={styles.label}>Weight</Label>
              <Label style={[styles.label, { textAlign: 'right' }]}>
                {userInfo.weight}
                <Label style={{ fontSize: 12 }}>(lbs)</Label>
              </Label>
            </View>
          </View>
          <View style={[styles.row, { justifyContent: 'space-evenly' }]}>
            <Label style={styles.bmiText}>Current BMI:</Label>
            <Label
              style={[
                {
                  color: bmiAnalysis.color,
                  alignSelf: 'center',
                },
                styles.bmiText,
              ]}
            >
              {userBMI} - {bmiAnalysis.content}
            </Label>
          </View>
        </View>
        <View style={[styles.card]}>
          <Label
            style={{
              alignSelf: 'center',
              fontFamily: Fonts.medium,
              fontSize: 16,
            }}
          >
            Target
          </Label>
          <View style={styles.rowSpace}>
            <View style={styles.column}>
              <Label style={styles.label}>Target Weight</Label>
              <Label style={styles.label}>{targetWeight}(lbs)</Label>
            </View>
            <View style={[styles.column, { alignItems: 'flex-end' }]}>
              <Label style={[styles.label, { textAlign: 'right' }]}>
                Activity Level
              </Label>
              <Label
                style={[
                  styles.label,
                  {
                    textAlign: 'right',
                    fontSize: 15,
                    color:
                      _activityLevelFactor === 1.2
                        ? Colors.lowest
                        : _activityLevelFactor === 1.375
                        ? Colors.low
                        : _activityLevelFactor === 1.55
                        ? Colors.medium
                        : _activityLevelFactor === 1.725
                        ? Colors.high
                        : Colors.extra,
                  },
                ]}
              >
                {_activityLevelFactor === 1.2
                  ? 'Sedentary'
                  : _activityLevelFactor === 1.375
                  ? 'Lighty Active'
                  : _activityLevelFactor === 1.55
                  ? 'Moderately Active'
                  : _activityLevelFactor === 1.725
                  ? 'Very Active'
                  : 'Extra Active'}
              </Label>
            </View>
          </View>
          <View style={styles.rowSpace}>
            <View style={styles.column}>
              <Label style={styles.label}>Rate (lbs per week)</Label>
              <Label style={styles.label}>{rateWeightChange}(lbs)</Label>
            </View>
            <View style={[styles.column, { alignItems: 'flex-end' }]}>
              <Label style={styles.label}>Goal Type</Label>
              <View style={styles.row}>
                <Label style={styles.label}>
                  {goalType === 'gain'
                    ? 'Weight Gain'
                    : goalType === 'loss'
                    ? 'Weight Loss'
                    : 'Weight Maintain'}
                </Label>
                {goalType === 'gain' || goalType === 'loss' ? (
                  <FontAwesome
                    name={goalType === 'gain' ? 'level-up' : 'level-down'}
                    color="white"
                    size={24}
                    style={{ marginLeft: 3 }}
                  />
                ) : null}
              </View>
            </View>
          </View>
          <View style={[styles.row, { justifyContent: 'space-evenly' }]}>
            <Label style={styles.bmiText}>Target BMI:</Label>
            <Label
              style={[
                {
                  alignSelf: 'center',
                },
                styles.bmiText,
              ]}
            >
              {targetBMI}
            </Label>
          </View>
        </View>
        {goalType === 'gain' || goalType === 'loss' ? (
          <View style={styles.rowSpace}>
            <TouchableOpacity
              onPress={() => dispatch(updateDayOption(0))}
              style={[
                styles.card,
                { alignItems: 'center', paddingHorizontal: 20 },
              ]}
              activeOpacity={0.5}
            >
              <Label
                style={{
                  color: selectOption === 0 ? Colors.highlight : 'white',
                }}
              >
                Short
              </Label>
              <Label
                style={{
                  color: selectOption === 0 ? Colors.highlight : 'white',
                }}
              >
                {minimumDays} (day{Math.round(minimumDays) > 1 ? 's' : ''})
              </Label>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(updateDayOption(1))}
              style={[
                styles.card,
                { alignItems: 'center', paddingHorizontal: 20 },
              ]}
              activeOpacity={0.5}
            >
              <Label
                style={{
                  color: selectOption === 1 ? Colors.highlight : 'white',
                }}
              >
                Medium
              </Label>
              <Label
                style={{
                  color: selectOption === 1 ? Colors.highlight : 'white',
                }}
              >
                {minimumDays * 1.5} (day
                {Math.round(minimumDays * 1.5) > 1 ? 's' : ''})
              </Label>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(updateDayOption(2))}
              style={[
                styles.card,
                { alignItems: 'center', paddingHorizontal: 20 },
              ]}
              activeOpacity={0.5}
            >
              <Label
                style={{
                  color: selectOption === 2 ? Colors.highlight : 'white',
                }}
              >
                Long
              </Label>
              <Label
                style={{
                  color: selectOption === 2 ? Colors.highlight : 'white',
                }}
              >
                {minimumDays * 3} (day
                {Math.round(minimumDays * 3) > 1 ? 's' : ''})
              </Label>
            </TouchableOpacity>
          </View>
        ) : null}
        {goalType !== 'gain' && goalType !== 'loss' ? (
          <View style={[styles.card]}>
            <View style={styles.rowSpace}>
              <Label style={styles.label}>Daily Calories Intake</Label>
              <Label style={styles.label}>{caloriesIntake} (kcal)</Label>
            </View>
            <TouchableOpacity style={styles.confirmMaintain}>
              <Label style={{ fontFamily: Fonts.medium, fontSize: 16 }}>
                Confirm
              </Label>
              <AntDesign
                name="checkcircleo"
                color="white"
                size={24}
                style={{ marginLeft: 5, bottom: 3 }}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
      <View style={styles.rowSpace}>
        <Label>Saved at: {submitDate}</Label>
        <Label>{daysLeft} day(s) left</Label>
      </View>
      <ModalInput
        visible={modalFirstTime}
        close={() => setModalFirstTime(false)}
        callback={({ weight, activeLevel, rate, goalType }) => {
          console.log(activeLevel);
          setModalFirstTime(false);
          dispatch(setGoalStatus(true));
          dispatch(updateActivityLevelFactor(activeLevel));
          dispatch(updateTargetWeight(weight));
          dispatch(updateRateOfWeightChange(rate));
          dispatch(updateGoalType(goalType));
          dispatch(setSubmitDate(moment().format('YYYY-MM-DD')));
        }}
        extraData={{
          weight: targetWeight,
          activeLevel: activityLevelFactor,
          rate: rateWeightChange,
          goalType,
        }}
      />
    </View>
  );
});
