import { View, Text, TouchableOpacity } from 'react-native';
import { favSaloons, removeFavSaloons } from '../services/favorutSaloon';
import React, { useState } from 'react';
import HeartIcon from 'react-native-vector-icons/FontAwesome';

const FavoriteIcon = ({ saloonId }) => {
  const [isPressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(!isPressed);
    console.log("Press");

    if (isPressed) {
      removeFavSaloons({ saloonid: saloonId }); // Call removeFavSaloons if the icon is already pressed
    } else {
      favSaloons({ saloonid: saloonId }); // Call favSaloons if the icon is not pressed
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ position: 'relative' }}>
        <View
          style={{
            position: 'absolute',
            top: -5,
            left: -4.6,
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></View>
        {isPressed ? (
          <HeartIcon name="heart-o" size={20} color="black" />
        ) : (
          <HeartIcon name="heart" size={20} color="red" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FavoriteIcon;
