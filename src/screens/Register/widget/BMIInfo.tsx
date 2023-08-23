import { Label } from 'components';
import React, { memo, useEffect } from 'react';
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
import { Colors } from 'theme';
import _ from 'lodash';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { styles } from '../style';

export const BMIInfo = memo(
  ({
    callback,
    isSubmit,
  }: {
    callback: (info: any) => void;
    isSubmit: boolean;
  }) => {
    const validationSchema = yup.object({
      weight: yup.string().required('Please input your weight!'),
      height: yup.string().required('Please input your height!'),
      username: yup.string().required('Please input your name!'),
    });

    const formik = useFormik({
      initialValues: {
        username: 'Test User',
        age: '30',
        height: '170',
        weight: '70',
        activityLevelFactor: '1',
        gender: 'Male',
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
            <Label style={styles.subtitle}>Username</Label>
            <View style={styles.row}>
              <TextInput
                autoCapitalize="none"
                placeholder="Username"
                placeholderTextColor={Colors.grey_600}
                style={styles.input}
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
              />
            </View>
            {formik.errors.username && formik.touched.username ? (
              <Label style={styles.error}>{formik.errors.username}</Label>
            ) : null}
            <Label style={styles.subtitle}>Age</Label>
            <View style={styles.row}>
              <TextInput
                autoCapitalize="none"
                keyboardType="numeric"
                placeholder="Age"
                placeholderTextColor={Colors.grey_600}
                style={styles.input}
                value={formik.values.age}
                maxLength={2}
                onChangeText={formik.handleChange('age')}
              />
            </View>
            {formik.errors.age && formik.touched.age ? (
              <Label style={styles.error}>{formik.errors.age}</Label>
            ) : null}
            <Label style={styles.subtitle}>Height</Label>
            <View style={styles.row}>
              <TextInput
                autoCapitalize="none"
                keyboardType="numeric"
                placeholder="Height in (cm)"
                placeholderTextColor={Colors.grey_600}
                style={styles.input}
                value={formik.values.height}
                maxLength={3}
                onChangeText={formik.handleChange('height')}
              />
            </View>
            {formik.errors.height && formik.touched.height ? (
              <Label style={styles.error}>{formik.errors.height}</Label>
            ) : null}
            <Label style={styles.subtitle}>Weight</Label>
            <View style={styles.row}>
              <TextInput
                autoCapitalize="none"
                keyboardType="numeric"
                placeholder="Weight in (kg)"
                placeholderTextColor={Colors.grey_600}
                style={styles.input}
                value={formik.values.weight}
                maxLength={3}
                onChangeText={formik.handleChange('weight')}
              />
            </View>
            {formik.errors.weight && formik.touched.weight ? (
              <Label style={styles.error}>{formik.errors.weight}</Label>
            ) : null}
            <Label style={styles.subtitle}>Gender</Label>
            <View
              style={[
                styles.row,
                { justifyContent: 'space-between', paddingHorizontal: 50 },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.btnForm,
                  {
                    marginRight: 40,
                    backgroundColor:
                      formik.values.gender === 'Male' ? Colors.dark : 'white',
                  },
                ]}
                onPress={() => formik.setFieldValue('gender', 'Male')}
              >
                <Label
                  style={[
                    {
                      color:
                        formik.values.gender === 'Male' ? 'white' : 'black',
                    },
                    styles.textGender,
                  ]}
                >
                  Male
                </Label>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btnForm,
                  {
                    backgroundColor:
                      formik.values.gender === 'Female' ? Colors.dark : 'white',
                  },
                ]}
                onPress={() => formik.setFieldValue('gender', 'Female')}
              >
                <Label
                  style={[
                    {
                      color:
                        formik.values.gender === 'Female' ? 'white' : 'black',
                    },
                    styles.textGender,
                  ]}
                >
                  Female
                </Label>
              </TouchableOpacity>
            </View>
            <Label style={styles.subtitle}>Activity Level</Label>
            <View style={[styles.row, { justifyContent: 'space-around' }]}>
              {_.range(1, 5).map((item) => (
                <TouchableOpacity
                  key={`activity-${item}`}
                  style={[
                    styles.btnForm,
                    {
                      flex: 1,
                      marginRight: item !== 4 ? 10 : 0,
                      backgroundColor:
                        formik.values.activityLevelFactor === `${item}`
                          ? Colors.dark
                          : 'white',
                    },
                  ]}
                  onPress={() =>
                    formik.setFieldValue('activityLevelFactor', `${item}`)
                  }
                >
                  <Label
                    style={[
                      styles.textGender,
                      ,
                      {
                        fontSize: 11,
                        paddingHorizontal: 2,
                        color:
                          formik.values.activityLevelFactor === `${item}`
                            ? 'white'
                            : 'black',
                      },
                    ]}
                  >
                    {item === 1
                      ? 'Sedentary'
                      : item === 2
                      ? 'Lightly active'
                      : item === 3
                      ? 'Moderately active'
                      : 'Very active'}
                  </Label>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  },
);
