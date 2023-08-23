import { Back, Label, SafeAreaViewProvider } from 'components';
import { t } from 'i18next';
import React, { memo, useCallback, useRef, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from 'selectors/app';
import { IUser } from 'types/app';
import { updateUser } from 'store/app';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const Subscription = memo(() => {
  const user = useSelector(getUserInfo) as unknown as IUser;
  const subscriptionPlan = user?.subscriptionPlan;
  const dispatch = useDispatch();

  const [editable, setEditable] = useState(false);

  return (
    <View style={styles.container}>
      <Back />
      <Label style={styles.title}>Subscription Plan</Label>
      <TouchableOpacity
        style={styles.edit}
        onPress={() => setEditable((_prev) => !_prev)}
      >
        <AntDesign name="edit" color="white" size={24} />
      </TouchableOpacity>
      <ScrollView>
        <Label style={[styles.subtitle, { marginBottom: 0 }]}>Status</Label>
        <Label
          style={{
            color: Colors.success,
            fontFamily: Fonts.semibold,
            fontSize: 24,
            alignSelf: 'center',
            marginBottom: 20,
            bottom: 20,
          }}
        >
          Active
        </Label>
        <Label style={styles.subtitle}>Subscription Plan</Label>
        <View
          style={[
            styles.row,
            { justifyContent: 'space-between', flex: 1, marginBottom: 10 },
          ]}
        >
          <TouchableOpacity
            disabled={!editable}
            style={[
              styles.planContainer,
              subscriptionPlan === 'month' && styles.planSelect,
              { marginRight: 10 },
            ]}
            onPress={() =>
              dispatch(updateUser({ ...user, subscriptionPlan: 'month' }))
            }
          >
            <View style={{ height: 26, width: 26, top: 5 }}>
              {subscriptionPlan === 'month' ? (
                <AntDesign name="checkcircle" color={'white'} size={24} />
              ) : null}
            </View>
            <Label
              style={[
                styles.label,
                {
                  fontFamily: Fonts.medium,
                  textAlign: 'center',
                  lineHeight: 32,
                },
                subscriptionPlan === 'month' && styles.planSelectTxt,
              ]}
            >
              Monthly{'\n'}$9.99/month{'\n'}Goal BMI{'\n'}Food Tracking{'\n'}
              Progress Report{'\n'}-
            </Label>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!editable}
            style={[
              styles.planContainer,
              subscriptionPlan === 'year' && styles.planSelect,
            ]}
            onPress={() =>
              dispatch(updateUser({ ...user, subscriptionPlan: 'year' }))
            }
          >
            <View style={{ height: 26, width: 26, top: 5 }}>
              {subscriptionPlan === 'year' ? (
                <AntDesign name="checkcircle" color={'white'} size={24} />
              ) : null}
            </View>
            <Label
              style={[
                styles.label,
                {
                  fontFamily: Fonts.medium,
                  textAlign: 'center',
                  lineHeight: 32,
                },
                subscriptionPlan === 'year' && styles.planSelectTxt,
              ]}
            >
              Yearly{'\n'}$99.9/year{'\n'}Goal BMI{'\n'}Food Tracking{'\n'}
              Progress Report{'\n'}
              <Label
                style={{
                  color: Colors.neonViolet,
                  fontFamily: Fonts.semibold,
                  fontSize: 18,
                  textDecorationLine: 'underline',
                }}
              >
                DNA Report
              </Label>
            </Label>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <Label
            style={{
              fontSize: 16,
              fontFamily: Fonts.medium,
            }}
          >
            Pause Subscription
          </Label>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
});
