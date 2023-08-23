import {
  Back,
  BackgroundImage,
  Label,
  ModalDelelteProfile,
  SafeAreaViewProvider,
} from 'components';
import { t } from 'i18next';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  Image,
  TouchableHighlight,
} from 'react-native';
import { styles } from './style';
import Svg, { Circle, Path } from 'react-native-svg';
import { scaleWidth, width } from 'utils';
import { Colors, Fonts } from 'theme';
import { NavigationService, Routes } from 'navigation';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getBMI, getUserInfo } from 'selectors/app';
import { IUser } from 'types/app';
import { dispatch } from 'store/store';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { toggleMenu, updateActivityLevelFactor, updateUser } from 'store/app';
import { Images } from 'assets';
import { Button, Menu, Provider } from 'react-native-paper';
import Tooltip from 'react-native-walkthrough-tooltip';
import _ from 'lodash';

export const Profile = memo(() => {
  const dispatch = useDispatch();
  const user = useSelector(getUserInfo) as unknown as IUser;
  const userBMI = useSelector(getBMI);
  const activityLevelFactor = user.activityLevelFactor;

  const subscriptionPlan = user.subscriptionPlan;

  const [editable, setEditable] = useState([false, false, false]);

  const [modalDelete, setModalDelete] = useState(false);
  const [menuActivity, setMenuActivity] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Email is not valid!')
      .required('Email is required!'),
    username: yup.string().required('Please input username!'),
    weight: yup.string().required('Please input weight!'),
    height: yup.string().required('Please input height!'),
  });

  const activityLevelLavel = (number: string) => {
    return number === `1`
      ? 'Sedentary'
      : number === `2`
      ? 'Lightly active'
      : number === `3`
      ? 'Moderately active'
      : 'Very active';
  };

  const formik = useFormik({
    initialValues: {
      email: user.email,
      username: user.username,
      age: `${user.age}`,
      weight: `${user.weight}`,
      height: `${user.height}`,
      gender: user.gender,
      shippingAddress: user.shippingAddress ?? 'No information',
      network: 'Binance',
      walletAddress: '0x123654896745698745698',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updateUser(values));
      NavigationService.goBack();
    },
  });

  return (
    <View style={styles.container}>
      <BackgroundImage />
      <Back />
      <Label style={styles.title}>{user.username}</Label>
      <TouchableOpacity
        onPress={() => {
          dispatch(updateUser(null));
          NavigationService.goBack();
        }}
        style={{ position: 'absolute', top: 10, right: 0, paddingRight: 20 }}
      >
        <SimpleLineIcons name="logout" color="red" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignSelf: 'flex-end' }}
        onPress={() => formik.handleSubmit()}
      >
        <Label style={{ fontFamily: Fonts.medium, fontSize: 16 }}>Submit</Label>
      </TouchableOpacity>
      <ScrollView
        style={{ marginTop: 10 }}
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { marginTop: 20 }]}>
          <Image
            source={Images.sampleAvatar}
            style={{
              width: 100,
              height: 100,
              resizeMode: 'cover',
              borderRadius: 50,
              alignSelf: 'center',
            }}
          />
          <Label style={styles.subtitle}>{user.username}</Label>
        </View>
        <View style={[styles.card]}>
          <TouchableOpacity
            style={styles.submit}
            onPress={() =>
              setEditable((_prev) =>
                _prev.map((item, index) =>
                  index === 0 ? (item = !item) : false,
                ),
              )
            }
          >
            <AntDesign
              name={!editable[0] ? 'edit' : 'checksquareo'}
              color="white"
              size={24}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // alignSelf: 'stretch',
              flex: 1,
            }}
          >
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Label style={styles.subtitle}>Age</Label>
              <TextInput
                keyboardType="numeric"
                maxLength={3}
                editable={editable[0]}
                style={[
                  styles.input,
                  editable[0] ? styles.inputActive : styles.inputDeactive,
                ]}
                value={formik.values.age}
                onChangeText={formik.handleChange('age')}
              />
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Label style={styles.subtitle}>Weight</Label>
              <View style={styles.row}>
                <TextInput
                  keyboardType="numeric"
                  maxLength={3}
                  editable={editable[0]}
                  style={[
                    styles.input,
                    editable[0] ? styles.inputActive : styles.inputDeactive,
                  ]}
                  value={formik.values.weight}
                  onChangeText={formik.handleChange('weight')}
                />
                <Label style={styles.unit}>lb</Label>
              </View>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Label style={styles.subtitle}>Height</Label>
              <View style={styles.row}>
                <TextInput
                  keyboardType="numeric"
                  maxLength={3}
                  editable={editable[0]}
                  style={[
                    styles.input,
                    editable[0] ? styles.inputActive : styles.inputDeactive,
                  ]}
                  value={formik.values.height}
                  onChangeText={formik.handleChange('height')}
                />
                <Label style={styles.unit}>cm</Label>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.row,
              {
                justifyContent: 'space-around',
                alignSelf: 'stretch',
                marginTop: 10,
              },
            ]}
          >
            {!editable[0] ? (
              <View style={{ alignItems: 'center' }}>
                <Label
                  style={{
                    fontFamily: Fonts.medium,
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  Current BMI
                </Label>
                <Label style={{ fontFamily: Fonts.medium, fontSize: 16 }}>
                  {userBMI}
                </Label>
              </View>
            ) : null}
            <Tooltip
              isVisible={menuActivity}
              arrowSize={{ width: 8, height: 4 }}
              displayInsets={{ top: 30, bottom: 30, left: 30, right: 30 }}
              arrowStyle={{}}
              content={
                <View style={{}}>
                  {_.range(1, 5).map((item) => (
                    <TouchableOpacity
                      key={`active-${item}`}
                      onPress={() => {
                        dispatch(updateActivityLevelFactor(`${item}`));
                        setMenuActivity(false);
                      }}
                      style={{ marginBottom: item < 4 ? 8 : 0 }}
                    >
                      <Label style={{ color: 'black' }}>
                        {activityLevelLavel(`${item}`)}
                      </Label>
                    </TouchableOpacity>
                  ))}
                </View>
              }
              placement="bottom"
              onClose={() => setMenuActivity(false)}
            >
              <View style={{ alignItems: 'center' }}>
                <Label
                  style={{
                    fontFamily: Fonts.medium,
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  Activity Level
                </Label>
                {editable[0] ? (
                  <TouchableOpacity
                    onPress={() => setMenuActivity(true)}
                    style={[
                      styles.input,
                      editable[0] ? styles.inputActive : styles.inputDeactive,
                    ]}
                  >
                    <Label>
                      {activityLevelFactor === `1`
                        ? 'Sedentary'
                        : activityLevelFactor === `2`
                        ? 'Lightly active'
                        : activityLevelFactor === `3`
                        ? 'Moderately active'
                        : 'Very active'}
                    </Label>
                  </TouchableOpacity>
                ) : (
                  <Label style={{ fontFamily: Fonts.medium, fontSize: 16 }}>
                    {activityLevelFactor === `1`
                      ? 'Sedentary'
                      : activityLevelFactor === `2`
                      ? 'Lightly active'
                      : activityLevelFactor === `3`
                      ? 'Moderately active'
                      : 'Very active'}
                  </Label>
                )}
              </View>
            </Tooltip>
          </View>
        </View>
        <View style={[styles.card]}>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => {
              setEditable((_prev) =>
                _prev.map((item, index) =>
                  index === 1 ? (item = !item) : false,
                ),
              );
            }}
          >
            <AntDesign
              name={!editable[1] ? 'edit' : 'checksquareo'}
              color="white"
              size={24}
            />
          </TouchableOpacity>
          {/* <Label style={styles.label}>Shipping Address</Label>
          <TextInput
            editable={editable[1]}
            style={[
              styles.input,
              editable[1] ? styles.inputActive : styles.inputDeactive,
            ]}
            value={formik.values.shippingAddress}
            onChangeText={formik.handleChange('shippingAddress')}
          /> */}
          <Label style={styles.label}>Blockchain Network</Label>
          <TextInput
            editable={editable[1]}
            style={[
              styles.input,
              editable[1] ? styles.inputActive : styles.inputDeactive,
            ]}
            value={formik.values.network}
            onChangeText={formik.handleChange('network')}
          />
          <Label style={styles.label}>Wallet Address</Label>
          <TextInput
            editable={editable[1]}
            style={[
              styles.input,
              editable[1] ? styles.inputActive : styles.inputDeactive,
            ]}
            value={formik.values.walletAddress}
            onChangeText={formik.handleChange('walletAddress')}
          />
        </View>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => {
              setEditable((_prev) =>
                _prev.map((item, index) =>
                  index === 2 ? (item = !item) : false,
                ),
              );
            }}
          >
            <AntDesign
              name={!editable[2] ? 'edit' : 'checksquareo'}
              color="white"
              size={24}
            />
          </TouchableOpacity>
          <Label style={[styles.subtitle]}>Subscription</Label>
          <Label
            style={{
              color: Colors.success,
              fontFamily: Fonts.semibold,
              fontSize: 24,
              alignSelf: 'center',
              marginBottom: 20,
            }}
          >
            Active
          </Label>
          <View
            style={[
              styles.row,
              { justifyContent: 'space-between', flex: 1, marginBottom: 10 },
            ]}
          >
            <TouchableOpacity
              disabled={!editable[2]}
              style={[
                styles.planContainer,
                subscriptionPlan === 'month' && styles.planSelect,
              ]}
              onPress={() =>
                dispatch(updateUser({ ...user, subscriptionPlan: 'month' }))
              }
            >
              <View style={{ height: 26, width: 26, top: 5 }}>
                {subscriptionPlan === 'month' ? (
                  <AntDesign
                    name="checkcircle"
                    color={Colors.success}
                    size={24}
                  />
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
            <View
              style={{
                borderWidth: 1,
                height: '78%',
                width: 1,
                borderColor: 'white',
                opacity: 0.5,
                borderStyle: 'dashed',
                marginHorizontal: 10,
              }}
            />
            <TouchableOpacity
              disabled={!editable[2]}
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
          <TouchableOpacity disabled={!editable[2]} style={styles.button}>
            <Label
              style={{
                fontSize: 16,
                fontFamily: Fonts.medium,
              }}
            >
              Pause Subscription
            </Label>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ alignSelf: 'center', marginTop: 10 }}
          onPress={() => setModalDelete(true)}
        >
          <Label style={{ color: 'red' }}>Delete Account</Label>
        </TouchableOpacity>
      </ScrollView>
      <ModalDelelteProfile
        visible={modalDelete}
        close={() => setModalDelete(false)}
        callback={(action) => setModalDelete(false)}
      />
    </View>
  );
});
