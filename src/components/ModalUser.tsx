import { Label } from 'components';
import { NavigationService, Routes } from 'navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodInfo, getMenuStatus, getUserInfo } from 'selectors/app';
import { controlCamera, toggleMenu } from 'store/app';
import { Colors, Fonts } from 'theme';
import { IUser } from 'types/app';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { APP_NAME, height } from 'utils';

export const ModalUser = () => {
  const userInfo = useSelector(getUserInfo) as unknown as IUser;
  const menuVisible = useSelector(getMenuStatus);

  const dispatch = useDispatch();

  const [modalAlert, setModalAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const foodInfo = useSelector(getFoodInfo);

  const closeMenu = () => {
    dispatch(controlCamera(true));
    dispatch(toggleMenu());
  };

  const onPressProfileInfo = useCallback(() => {
    closeMenu();
    if (userInfo?.email) {
      NavigationService.navigate(Routes.Profile);
    } else {
      NavigationService.navigate(Routes.Login);
    }
  }, [userInfo]);

  useEffect(() => {
    setModalAlert(false);
  }, []);

  return (
    <Modal
      isVisible={menuVisible}
      onSwipeComplete={() => closeMenu()}
      swipeDirection="left"
      propagateSwipe
      onBackdropPress={() => closeMenu()}
      backdropOpacity={0.5}
      hideModalContentWhileAnimating
      // swipeThreshold={250}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
    >
      <View style={styles.container}>
        {/* <Image
          source={Images.hamburger}
          style={{
            resizeMode: 'cover',
            alignSelf: 'center',
            width: 80,
            height: 80,
            marginBottom: 20,
          }}
        /> */}
        <Label
          style={[
            styles.label,
            {
              marginBottom: 20,
              fontSize: 30,
              alignSelf: 'center',
              fontFamily: Fonts.semibold,
            },
          ]}
        >
          {APP_NAME}
        </Label>
        <TouchableOpacity style={styles.button} onPress={onPressProfileInfo}>
          <Label style={styles.label}>{userInfo?.username ?? 'Profile'}</Label>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => {
            closeMenu();
            NavigationService.navigate(Routes.Subscription);
          }}
        >
          <Label style={styles.label}>Edit/Pause Subscription</Label>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (userInfo) {
              closeMenu();
              NavigationService.navigate(Routes.FoodTracking);
            } else {
              setAlertMessage('This feature only enable when signin!');
              setModalAlert(true);
            }
          }}
        >
          <Label style={styles.label}>Food tracking</Label>
          {!userInfo ? (
            <Fontisto name="locked" color="white" size={24} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => {
            if (userInfo) {
              closeMenu();
              NavigationService.navigate(Routes.GoalSetting);
            } else {
              setAlertMessage('This feature only enable when signin!');
              setModalAlert(true);
            }
          }}
        >
          <Label style={styles.label}>Set Goal</Label>
          {userInfo === null ? (
            <Fontisto name="locked" color="white" size={24} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (userInfo) {
              closeMenu();
              NavigationService.navigate(Routes.FoodInformation, { tab: 0 });
              // if (!foodInfo) {
              //   setAlertMessage('Please scan a food code for report!');
              //   setModalAlert(true);
              // } else {
              //   NavigationService.navigate(Routes.FoodInformation, { tab: 0 });
              // }
            } else {
              setAlertMessage('This feature only enable when signin!');
              setModalAlert(true);
            }
          }}
        >
          <Label style={styles.label}>Progress Report</Label>
          {userInfo === null ? (
            <Fontisto name="locked" color="white" size={24} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (userInfo?.subscriptionPlan === 'year') {
              closeMenu();
              NavigationService.navigate(Routes.DNATest);
            } else {
              setAlertMessage(
                'This feature is only enable when subscribe yearly!',
              );
              setModalAlert(true);
            }
          }}
        >
          <Label style={styles.label}>DNA Report</Label>
          {userInfo?.subscriptionPlan !== 'year' ? (
            <Fontisto name="locked" color="white" size={24} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            closeMenu();
            NavigationService.navigate(Routes.AboutUs);
          }}
        >
          <Label style={styles.label}>About Us</Label>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={modalAlert}
        onBackdropPress={() => setModalAlert(false)}
        backdropOpacity={0.5}
        hideModalContentWhileAnimating
      >
        <View
          style={{
            padding: 30,
            backgroundColor: 'white',
            alignItems: 'center',
            borderRadius: 24,
          }}
        >
          <Label
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: 15,
              lineHeight: 22,
            }}
          >
            {alertMessage}
          </Label>
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    // top: Platform.OS === 'ios' ? (height > 750 ? 60 : 20) : 30,
    // borderBottomRightRadius: 40,
    borderRadius: 24,
    width: '80%',
    padding: 20,
    height: Platform.OS === 'android' ? '100%' : '95%',
    borderWidth: 2,
    borderColor: Colors.neonViolet,
    marginLeft: -10,
  },
  label: {
    color: 'white',
    fontFamily: Fonts.medium,
    fontSize: 16,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginBottom: 10,
    padding: 10,
  },
});
