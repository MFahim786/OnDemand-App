import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Pressable,ActivityIndicator,Alert } from 'react-native';
import { responsiveHeight as Rh, responsiveScreenWidth as Rw,responsiveFontSize as Rf } from 'react-native-responsive-dimensions';
import { colors } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { searchBeauticians } from '../../services/searchapi';
import { useNavigation } from '@react-navigation/native';
import SearchBeautician from './Beautation';
import { searchCategorey } from '../../services/searchapi';
import BookingButtons from '../../components/bookingButton';
import ScreenWrapper from '../../components/ScreenWrapper';
export default function SearchBarResult() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('defualt');
    const [searchText, setSearchText] = useState('');
    const [searchData, setSearchData] = useState('');
    const [loading, setLoading] = useState(false);
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setModalVisible(false);
    }

const search = async () => {
    if (searchText==''){
        Alert.alert(
            'Please enter search text'
        );
        return;
    }
    setLoading(true);
try {
    if (selectedOption === 'category') {
        const response = await searchCategorey(searchText);
        console.log("===", response);
        setSearchData(response);
    } else if (selectedOption === 'beautician') {
        const response = await searchBeauticians(searchText);
        console.log("===", response);
        setSearchData(response);
    }
    else if (selectedOption === 'defualt') {
        const response = await searchBeauticians(searchText);
        console.log("===", response);
        setSearchData(response);
    }
} catch (e) { 
    setLoading(false);
    console.error('Error occurred during search:', e); }finally{
        setLoading(false);
    }

    }
  
    
    return (
        <ScreenWrapper>
        <View>
        <View>
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <TouchableOpacity onPress={() => navigation.navigate('SearchResultsScreen')}>
                        <Ionicons
                            name="search-sharp"
                            size={25}
                            color={`${colors.font1}`}
                        />
                    </TouchableOpacity>
                    <TextInput
                        className="text-lg tracking-wide"
                        placeholder="Search..."
                        style={styles.input}
                        onChangeText={text => setSearchText(text)}
                        placeholderTextColor={colors.placeholderText}
                    />
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Ionicons
                            name="filter-circle-sharp"
                            size={30}
                            color={`${colors.font1}`}
                        />
                    </TouchableOpacity>
                </View>
                {/* Modal for filter options */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Pressable onPress={() => handleOptionSelect('category')}>
                                <Text style={styles.modalText}>Category</Text>
                            </Pressable>
                            <Pressable onPress={() => handleOptionSelect('beautician')}>
                                <Text style={styles.modalText}>Beautician</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
            {selectedOption === 'beautician'  && (
    <View>
        {/* Content to render when selectedOption is 'beautician' or 'category' */}
        <SearchBeautician data={searchData} />
    </View>
)}
         {selectedOption === 'category'  && (
    <View>
        {/* Content to render when selectedOption is 'beautician' or 'category' */}
        <SearchBeautician data={searchData} />
    </View>
)}     
            {selectedOption === 'defualt' && (
                <View>
                {/* Content to render when selectedOption is 'beautician' */}
                <SearchBeautician data={searchData} />
            </View>
            )}
             <View>
      {searchData && searchData.success && searchData.data.length === 0 && (
    <View style={styles.nothingFoundContainer}>
        <Text style={styles.nothingFoundText}>Nothing found</Text>
    </View>
)}
        </View>  
             </View>
             <View style={styles.bookingButtonContainer}>
             {loading ? (
                <View style={{marginBottom:Rh(100)}}>
                <ActivityIndicator size="large" color={colors.headerbackground} />
                </View>
            ) : (
        <BookingButtons backgroundColor={colors.ServiceProvider_buttonBackground} titlenext={'Search'} pressnext={search}/>
            )}
      </View>
     
            </View>
            </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Rh(12),
        backgroundColor: colors.headerbackground,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Rw(70),
        height: Rh(6),
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        marginLeft: 10,
        fontSize:Rf(2),
        color: `${colors.font1}`,
        top:Rh(0)
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        
        borderRadius: 10,
        padding: 20,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    bookingButtonContainer: {
       marginLeft:Rw(0),
       
        width: '100%',
        position:'absolute',
        alignItems: 'center',
        marginTop: Rh(92),
      },
      nothingFoundContainer: {
        
        justifyContent: 'center',
        alignItems: 'center',
    },
    nothingFoundText: {
        fontSize: 20,
        color: 'gray',
    },
});
