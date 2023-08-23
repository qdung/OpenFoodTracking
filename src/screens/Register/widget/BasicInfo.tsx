import { Label } from 'components';
import { Formik, FormikHelpers, FormikValues, useFormik } from 'formik';
import { values } from 'lodash';
import { memo, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Colors, Fonts } from 'theme';
import * as yup from 'yup';
import { styles } from '../style';

export const BasicInfo = memo(
  ({
    callback,
    isSubmit,
  }: {
    callback: (info: any) => void;
    isSubmit: boolean;
  }) => {
    const validationSchema = yup.object({
      email: yup
        .string()
        .email('Email is not valid!')
        .required('Email is required!'),
      password: yup.string().required('Password is required!'),
      verifyPassword: yup.string().required('Verify password is required!'),
    });

    const formik = useFormik({
      initialValues: {
        email: 'testUser@gmail.com',
        password: '123456',
        verifyPassword: '123456',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        callback(values);
      },
    });

    useEffect(() => {
      if (isSubmit) {
        formik.handleSubmit();
      }
    }, [isSubmit]);

    return (
      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        keyboardVerticalOffset={150}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 150,
              paddingHorizontal: 20,
            }}
          >
            <Label style={styles.subtitle}>Email</Label>
            <View style={styles.row}>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Input email"
                placeholderTextColor={Colors.grey_600}
                style={styles.input}
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
              />
            </View>
            {formik.errors.email && formik.touched.email ? (
              <Label style={styles.error}>{formik.errors.email}</Label>
            ) : null}
            <Label style={styles.subtitle}>Password</Label>
            <View style={styles.row}>
              <TextInput
                autoCapitalize="none"
                secureTextEntry
                placeholder="Input password"
                placeholderTextColor={Colors.grey_600}
                style={[
                  styles.input,
                  { paddingTop: Platform.OS === 'android' ? 20 : 0 },
                ]}
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
              />
            </View>
            {formik.errors.password && formik.touched.password ? (
              <Label style={styles.error}>{formik.errors.password}</Label>
            ) : null}
            <Label style={styles.subtitle}>Verify Password</Label>
            <View style={styles.row}>
              <TextInput
                autoCapitalize="none"
                secureTextEntry
                placeholder="Verify password"
                placeholderTextColor={Colors.grey_600}
                style={[
                  styles.input,
                  { paddingTop: Platform.OS === 'android' ? 20 : 0 },
                ]}
                value={formik.values.password}
                onChangeText={formik.handleChange('verifyPassword')}
              />
            </View>
            {formik.errors.verifyPassword && formik.touched.verifyPassword ? (
              <Label style={styles.error}>{formik.errors.verifyPassword}</Label>
            ) : null}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  },
);
