import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { memo, useEffect, useRef, useState } from 'react';
import { NavigationService, Routes } from 'navigation';
import { ModalReport } from './widget';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFoodItem,
  controlCamera,
  toggleMenu,
  updateBarcode,
  updateFoodInfo,
} from 'store/app';
import axiosClient from 'utils/axios';
import { CameraScreen, CameraType } from 'react-native-camera-kit';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { EStatus } from 'types/app';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from 'theme';
import moment from 'moment';
import { getCameraStatus, getFoodList } from 'selectors/app';

export const ScanBarcode = memo(({ navigation }: { navigation: any }) => {
  const [barcode, setBarcode] = useState('');

  const [modalReport, setModalReport] = useState(false);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(EStatus.INIT);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const cameraActive = useSelector(getCameraStatus);
  const foodList = useSelector(getFoodList);

  const fetchOpenFood = async (barcode: string) => {
    setModalReport(true);
    setStatus(EStatus.LOADING);
    dispatch(controlCamera(false));
    if (isNaN(parseFloat(barcode))) {
      setStatus(EStatus.FAIL);
      setTimeout(() => {
        dispatch(controlCamera(true));
      }, 500);
      setBarcode('');
      return;
    }
    try {
      const res = await axiosClient.get(
        `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`,
      );
      const { status } = res.data;
      if (status) {
        const data = {
          id: foodList?.length ?? 0,
          code: barcode,
          name: res.data?.product?.product_name,
          quantity: res.data?.product?.quantity,
          description: res.data?.product?.product_name_en_imported,
          nutriments: res.data?.product?.nutriments,
          nutriscore_data: res.data?.product?.nutriscore_data,
          nutrition_score_debug: res.data?.product?.nutrition_score_debug,
          nutrient_levels: res.data?.product?.nutrient_levels,
          ingredients: res.data?.product?.ingredients,
          image: res.data?.product?.image_url,
          nutriscore_grade: res.data?.product?.nutriscore_grade,
          ingredients_analysis_tags:
            res.data?.product?.ingredients_analysis_tags,
        };
        dispatch(updateFoodInfo(data)); //get res.data?.nutriments and res.data?.product.product_name
        // dispatch(addFoodItem(data));
        setStatus(EStatus.SUCCESS);
      }
    } catch (e) {
      setStatus(EStatus.FAIL);
      setTimeout(() => {
        dispatch(controlCamera(true));
      }, 500);
    } finally {
      setBarcode('');
    }
  };

  useEffect(() => {
    if (barcode.length > 0) {
      dispatch(updateBarcode(barcode));
      fetchOpenFood(barcode);
    }
  }, [barcode]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setBarcode('');
      dispatch(controlCamera(true));
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider
      style={{
        backgroundColor: Colors.main,
      }}
    >
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 5,
          top: 0,
          padding: 10,
          zIndex: 2,
        }}
        onPress={() => {
          dispatch(toggleMenu());
          dispatch(controlCamera(false));
        }}
      >
        <FontAwesome
          name="user-circle"
          color={'white'}
          size={40}
          style={{ padding: 5 }}
        />
      </TouchableOpacity>
      <ModalReport
        visible={modalReport}
        close={() => setModalReport(false)}
        rescan={() => {
          setModalReport(false);
          setTimeout(() => {
            dispatch(controlCamera(true));
          }, 500);
        }}
        extraData={{ loading, status }}
        callback={(tab: number) => {
          // action: nutrition:0 or ingredient:1
          setModalReport(false);
          setTimeout(() => {
            NavigationService.navigate(Routes.FoodInformation, { tab });
          }, 500);
        }}
      />
      {cameraActive && isFocused ? (
        <View style={[StyleSheet.absoluteFill]}>
          <CameraScreen
            zoomMode="on"
            // cameraType={CameraType.Front}
            scanBarcode={true}
            onReadCode={(event) => {
              if (event.nativeEvent.codeStringValue) {
                console.log(event.nativeEvent.codeStringValue);
                setBarcode(event.nativeEvent.codeStringValue);
              }
            }}
            showFrame={cameraActive}
            laserColor="white"
            frameColor="white"
            cameraRatioOverlay={undefined}
            captureButtonImage={undefined}
            captureButtonImageStyle={{}}
            cameraFlipImage={undefined}
            cameraFlipImageStyle={undefined}
            hideControls={false}
            torchOnImage={undefined}
            torchOffImage={undefined}
            torchImageStyle={{}}
            onBottomButtonPressed={() => {}}
          />
        </View>
      ) : null}
    </SafeAreaProvider>
  );
});
