import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';

export default function BackButton({ marginRight1, marginLeft1, onPress }) {
  const marginRight = isNaN(marginRight1) ? 0 : Rw(marginRight1);
  const marginLeft = isNaN(marginLeft1) ? 0 : Rw(marginLeft1);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'black',
        borderRadius: 50,
        height: Rh(3),
        width: Rh(3),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight,
        marginLeft,
      }}
      onPress={onPress}
    >
    
      <Icon name={'arrow-back'} size={Rh(2.4)} color={'white'} />

    </TouchableOpacity>
  );
}
