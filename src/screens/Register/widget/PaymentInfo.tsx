import { Label } from 'components';
import React, { memo, useEffect, useState } from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Colors, Fonts } from 'theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import _ from 'lodash';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { styles } from '../style';
import { NavigationService, Routes } from 'navigation';
import { useNavigation } from '@react-navigation/native';

export const PaymentInfo = memo(
  ({
    callback,
    isSubmit,
    changeButtonTitle,
  }: {
    callback: (info: any) => void;
    isSubmit: boolean;
    changeButtonTitle: (title: string) => void;
  }) => {
    const [stage, setStage] = useState(0);

    const validationSchema = yup.object({
      // weight: yup.string().required('Please input your weight!'),
      // height: yup.string().required('Please input your height!'),
    });

    const formik = useFormik({
      initialValues: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States',
        walletAddress: '',
        subscriptionPlan: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) =>
        callback({
          shippingAddress: {
            address1: values.address1,
            address2: values.address2,
            city: values.city,
            state: values.state,
            zip: values.zip,
            country: values.country,
          },
          walletAddress: values.walletAddress,
          subscriptionPlan: values.subscriptionPlan,
        }),
    });

    useEffect(() => {
      if (isSubmit) {
        if (formik.values.subscriptionPlan === 'month') {
          formik.handleSubmit();
        } else if (formik.values.subscriptionPlan === 'year') {
          if (stage === 2) {
            formik.handleSubmit();
          } else {
            setStage(2); // Stage == 1 => for 'month', Stage == 2 => for 'year', render display wallet or shipping address
            changeButtonTitle('Submit');
          }
        } else {
        }
      }
    }, [isSubmit]);

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 150,
              paddingHorizontal: 20,
            }}
          >
            <Label style={styles.subtitle}>Subscription Plan</Label>
            <View
              style={[
                styles.row,
                { justifyContent: 'space-between', flex: 1, marginBottom: 10 },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.planContainer,
                  styles.shadow,
                  formik.values.subscriptionPlan === 'month' &&
                    styles.planSelect,
                  { marginRight: 10 },
                ]}
                onPress={() => {
                  formik.setFieldValue('subscriptionPlan', 'month');
                  setStage(1);
                  changeButtonTitle('Submit');
                }}
              >
                <View style={{ height: 26, width: 26, top: 5 }}>
                  {formik.values.subscriptionPlan === 'month' ? (
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
                    formik.values.subscriptionPlan === 'month' &&
                      styles.planSelectTxt,
                  ]}
                >
                  Monthly{'\n'}$9.99/month{'\n'}Goal BMI{'\n'}Food Tracking
                  {'\n'}Progress Report{'\n'}-
                </Label>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.planContainer,
                  styles.shadow,
                  formik.values.subscriptionPlan === 'year' &&
                    styles.planSelect,
                ]}
                onPress={() => {
                  formik.setFieldValue('subscriptionPlan', 'year');
                  setStage(0);
                  changeButtonTitle('Next');
                }}
              >
                <View style={{ height: 26, width: 26, top: 5 }}>
                  {formik.values.subscriptionPlan === 'year' ? (
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
                    formik.values.subscriptionPlan === 'year' &&
                      styles.planSelectTxt,
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
            {/* <Label style={styles.subtitle}>Shipping Address</Label>
            <View style={styles.row}>
              <TextInput
                autoCapitalize="none"
                placeholder="Shipping Address"
                placeholderTextColor={Colors.grey_600}
                style={styles.input}
                value={formik.values.shippingAddress}
                
                onChangeText={formik.handleChange('shippingAddress')}
              />
            </View> */}
            {stage > 1 ? (
              <>
                <Label style={styles.subtitle}>Address Line 1</Label>
                <View style={styles.row}>
                  <TextInput
                    placeholder="Street address, P.O. box, company name, etc"
                    placeholderTextColor={Colors.grey_600}
                    style={styles.input}
                    value={formik.values.address1}
                    onChangeText={formik.handleChange('address1')}
                  />
                </View>
                <Label style={styles.subtitle}>Address Line 2</Label>
                <View style={styles.row}>
                  <TextInput
                    placeholder="Apartment, suite, unit, building, floor, etc"
                    placeholderTextColor={Colors.grey_600}
                    style={styles.input}
                    value={formik.values.address2}
                    onChangeText={formik.handleChange('address2')}
                  />
                </View>
                <Label style={styles.subtitle}>City</Label>
                <View style={styles.row}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="City"
                    placeholderTextColor={Colors.grey_600}
                    style={styles.input}
                    value={formik.values.city}
                    onChangeText={formik.handleChange('city')}
                  />
                </View>
                <Label style={styles.subtitle}>State/Province/Region</Label>
                <View style={styles.row}>
                  <TextInput
                    placeholder="State/Province/Region"
                    placeholderTextColor={Colors.grey_600}
                    style={styles.input}
                    value={formik.values.state}
                    onChangeText={formik.handleChange('state')}
                  />
                </View>
                <Label style={styles.subtitle}>ZIP</Label>
                <View style={styles.row}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="ZIP"
                    placeholderTextColor={Colors.grey_600}
                    style={styles.input}
                    value={formik.values.zip}
                    onChangeText={formik.handleChange('zip')}
                  />
                </View>
                <Label style={styles.subtitle}>Country</Label>
                <View style={styles.row}>
                  <TextInput
                    editable={false}
                    // placeholder="United State"
                    placeholderTextColor={Colors.grey_600}
                    style={styles.input}
                    value={formik.values.country}
                    onChangeText={formik.handleChange('country')}
                  />
                </View>
              </>
            ) : null}
            {stage > 0 ? (
              <>
                <Label style={styles.subtitle}>Network</Label>
                <TouchableOpacity
                  style={[
                    styles.btnForm,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    },
                  ]}
                >
                  <Label
                    style={[
                      {
                        color: Colors.grey_600,
                        fontFamily: Fonts.medium,
                        paddingLeft: 20,
                      },
                    ]}
                  >
                    Select Network
                  </Label>
                </TouchableOpacity>
                <Label style={styles.subtitle}>Blockchain Address</Label>
                <View style={styles.row}>
                  <TextInput
                    placeholder="Wallet Address: 0x1237589797898"
                    placeholderTextColor={Colors.grey_600}
                    style={styles.input}
                    value={formik.values.walletAddress}
                    onChangeText={formik.handleChange('walletAddress')}
                  />
                </View>
              </>
            ) : null}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  },
);
