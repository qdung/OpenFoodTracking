import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { Colors, Fonts } from 'theme';
import { IModalCalendar, IModalCustom } from 'types/app';
import { Label } from './Label';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { MarkedDates } from 'react-native-calendars/src/types';
import { height } from 'utils';

export const ModalCalendar = (props: IModalCalendar) => {
  const activeDates = props.activeDates;

  const [focusDate, setFocusDate] = useState(moment().format('yyyy-MM-DD'));

  const markedDates: MarkedDates = useMemo(() => {
    let _markDates: MarkedDates = {};
    if (activeDates?.length > 0) {
      activeDates?.map((item) => {
        _markDates[moment(item).format('yyyy-MM-DD')] = {
          selected: true,
          marked: true,
          selectedColor: 'blue',
        };
      });
    }
    return _markDates;
  }, [activeDates]);

  return (
    <Modal
      swipeDirection={'up'}
      onSwipeComplete={props.close}
      isVisible={props.visible}
      onBackdropPress={props.close}
      backdropOpacity={0.5}
      hideModalContentWhileAnimating
      propagateSwipe
      swipeThreshold={250}
      style={{
        justifyContent: 'flex-start',
        margin: 0,
      }}
      animationIn="bounceInUp"
      animationOut="bounceOutUp"
      useNativeDriver
    >
      {props.visible ? (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={props.close}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: 10,
            }}
          >
            <AntDesign name="closecircle" size={24} color="black" />
          </TouchableOpacity>
          <Calendar
            markedDates={markedDates}
            theme={{
              textMonthFontFamily: Fonts.medium,
              textDayHeaderFontFamily: Fonts.semibold,
              textMonthFontSize: 22,
              textDayFontSize: 20,
            }}
            style={{ marginTop: 20 }}
            dayComponent={({ date, state, marking }) => {
              return (
                <TouchableOpacity
                  hitSlop={{ left: 15, top: 15, right: 15, bottom: 15 }}
                  // style={{ padding: 3 }}
                  disabled={!marking?.selected}
                  onPress={() => {
                    props.callback && props.callback(date);
                    props.close();
                  }}
                >
                  <Label
                    style={{
                      textAlign: 'center',
                      fontFamily: Fonts.medium,
                      fontSize: 18,
                      color: marking?.selected ? 'black' : Colors.grey_200,
                    }}
                  >
                    {(date as any).day as string}
                  </Label>
                </TouchableOpacity>
              );
            }}
            initialDate={focusDate}
            date={focusDate}
            monthFormat={'MMMM yyyy'}
            renderArrow={(direction) =>
              direction === 'left' ? (
                <AntDesign
                  name="arrowleft"
                  color={Colors.neonViolet}
                  size={24}
                />
              ) : (
                <AntDesign
                  name="arrowright"
                  color={Colors.neonViolet}
                  size={24}
                />
              )
            }
            hideExtraDays={true}
            firstDay={1}
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            disableAllTouchEventsForDisabledDays={true}
            enableSwipeMonths={true}
          />
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.neonViolet,
    marginTop: Platform.OS === 'ios' ? (height > 700 ? 50 : 20) : 0,
  },
});
