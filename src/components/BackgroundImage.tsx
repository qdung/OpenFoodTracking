import { Images, Videos } from 'assets';
import { Image, ImageBackground } from 'react-native';

export const BackgroundImage = () => (
  <ImageBackground
    source={Images.background}
    imageStyle={{
      height: '100%',
      width: '100%',
    }}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      alignItems: 'stretch',
      bottom: 0,
      right: 0,
      zIndex: 0,
    }}
  />
);
