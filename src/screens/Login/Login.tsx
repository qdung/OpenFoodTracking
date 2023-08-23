import React, { memo, useState } from 'react';
import { Label, Back, BackgroundImage } from 'components';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from 'react-native';
import { styles } from './style';
import { Colors, Fonts } from 'theme';
import { Formik } from 'formik';
import * as yup from 'yup';
import { NavigationService, Routes } from 'navigation';
import { useDispatch } from 'react-redux';
import { updateUser } from 'store/app';
import { APP_NAME } from 'utils';

const _Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showLang, setShowLang] = useState(false);

  const dispatch = useDispatch();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Email is not valid!')
      .required('Email is required!'),
    password: yup.string().required('Password is required!'),
  });

  return (
    <Formik
      initialValues={{
        email: 'testUser@gmail.com',
        password: '123456',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(
          updateUser({
            ...values,
            username: 'TestUser',
            gender: 'Male',
            weight: 70,
            height: 170,
            age: 30,
            subscriptionPlan: 'month',
          }),
        );
        NavigationService.goBack();
      }}
    >
      {({ values, errors, handleSubmit, handleChange }) => (
        <KeyboardAvoidingView
          style={{
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: Colors.main,
            borderWidth: 1,
            borderColor: Colors.neonViolet,
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <BackgroundImage />
              <Back />
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'center',
                }}
              >
                <Label style={styles.title}>{APP_NAME}</Label>
                <Label style={styles.label}>Email</Label>
                <View style={[styles.row, { marginBottom: 20 }]}>
                  <TextInput
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={styles.input}
                    value={values.email}
                    onChangeText={handleChange('email')}
                  />
                </View>
                {errors.email && (
                  <Label style={[styles.error, { top: -10 }]}>
                    {errors.email}
                  </Label>
                )}
                <Label style={styles.label}>Password</Label>
                <View style={styles.row}>
                  <TextInput
                    secureTextEntry
                    style={styles.input}
                    value={values.password}
                    onChangeText={handleChange('password')}
                  />
                </View>
                {errors.password && (
                  <Label style={[styles.error, { top: 10 }]}>
                    {errors.password}
                  </Label>
                )}
                <TouchableOpacity
                  style={{ marginTop: 20, alignSelf: 'flex-end' }}
                >
                  <Label style={{ fontFamily: Fonts.medium }}>
                    Forgot password?
                  </Label>
                </TouchableOpacity>
                <View style={[styles.row, { justifyContent: 'space-around' }]}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => handleSubmit()}
                  >
                    <Label style={styles.loginLabel}>Login</Label>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => NavigationService.navigate(Routes.Register)}
                  >
                    <Label style={styles.loginLabel}>Register</Label>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export const Login = memo(_Login);
