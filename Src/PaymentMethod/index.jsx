import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BackButton from '../../components/backbutton';
import { colors } from '../../theme';
import { responsiveHeight as Rh, responsiveScreenWidth as Rw, responsiveScreenFontSize as fo } from 'react-native-responsive-dimensions';
const PaymentPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');

  return (
    
    <View style={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center', backgroundColor:colors.topbackground,height:Rh(8),width:'120%',marginLeft:Rw(-5),marginTop:Platform.OS=='android'? 0: Rh(1.3)}}>
      <TouchableOpacity
          style={styles.backButton}
        >
          <BackButton onPress={()=> navigation.navigate('Schedule')}/>
        </TouchableOpacity>
        <Text style={styles.loginText}>Receipt</Text> 
        </View>
      {/* Header with card image */}
      <View style={styles.header}>
        <Image source={require('../../assets/Payment/payment.jpg')} style={styles.cardImage} />
      </View>

      {/* Payment options */}
      <View style={styles.paymentOptions}>
        <TouchableOpacity
          style={[styles.paymentOption, selectedPaymentMethod === 'Cash' && styles.selectedOption]}
          onPress={() => setSelectedPaymentMethod('Cash')}
        >
          <Text style={styles.optionText}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentOption, selectedPaymentMethod === 'JazzCash' && styles.selectedOption]}
          onPress={() => setSelectedPaymentMethod('JazzCash')}
        >
          <Text style={styles.optionText}>JazzCash</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction ID input for JazzCash */}
      {selectedPaymentMethod === 'JazzCash' && (
        <View style={styles.transactionIdContainer}>
          <TextInput
            style={styles.transactionIdInput}
            placeholder="Enter Transaction ID"
            value={transactionId}
            onChangeText={text => setTransactionId(text)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardImage: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentOption: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
  },
  selectedOption: {
    backgroundColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black',
  },
  transactionIdContainer: {
    marginBottom: 20,
  },
  transactionIdInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color:'black',
  },
  EmailText: {
    fontSize: fo(1.3),
    color: colors.font1,
    fontWeight: 'bold',
    marginLeft: Rw(1),
    marginBottom:Rh(1)
  },
  backButton: {
    position: 'absolute',
    top: Rh(0.5),
    left: Rw(0.2),
    zIndex: 1,
    marginTop:Rh(2),
    marginLeft:Rw(4)
  },
  loginText: {
    fontSize: fo(3),
    marginTop: Rw(1),
    fontWeight: 'bold',   
    textAlign: 'center',
    color: 'white',
  },
});

export default PaymentPage;
