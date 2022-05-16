import React, { Component, useState, useEffect } from "react";
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    Modal,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    BackHandler,
    TextInput,
    ScrollView,
    Alert,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { NavigationEvents } from 'react-navigation';
import { Snackbar } from "react-native-paper";
import WebHandler from "../../Data/Remote/WebHandler";
import Routs from "../../Data/Remote/Routs";
const wbh = new WebHandler()
const { width, height } = Dimensions.get('screen');

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            OTP: null
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationEvents onDidFocus={() => {
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
                }} />
                <Login navigation={this.props.navigation} />

            </View>
        )
    }
}
handleMobileVerify = () => {

}
const Login = ({ navigation }) => {

    const [selectedArea, setSelectedArea] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [areas, setAreas] = useState([]);
    const [OTP, setOTP] = useState('')
    const [isOTP, setISOTP] = useState(false)
    const [search, setSearch] = useState('');
    const [data_temp, setdata_temp] = useState([]);
    const [mobileNumber, setMobileNumber] = useState('');
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackBarMsg, setSnackBarMsg] = useState('');

    // useEffect(() => {
    //     fetch("https://restcountries.eu/rest/v2/all")
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             let areaData = data.map(item => {
    //                 return {
    //                     code: item.alpha2Code,
    //                     name: item.name,
    //                     callingCode: `+${item.callingCodes[0]}`,
    //                     flag: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`
    //                 }
    //             })
    //             setAreas(areaData);
    //             setdata_temp(areaData);
    //             if (areaData.length > 0) {
    //                 let defaultData = areaData.filter(a => a.code == "US");
    //                 if (defaultData.length > 0) {
    //                     setSelectedArea(defaultData[0]);
    //                 }
    //             }
    //         })
    // }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        paddingBottom: Sizes.fixPadding * 2.0
                    }}
                >
                    {appLogo()}
                    {signInText()}
                    {mobileNumberInfo()}
                    {continueButton()}

                    {/* {loginWithFacebookButton()}
                    {logionWithGoogleButton()} */}
                    <Snackbar
                        duration={1000}
                        style={styles.snackBarStyle}
                        visible={showSnackBar}
                        onDismiss={() => setShowSnackBar(false)}
                    >
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            {snackBarMsg}
                        </Text>
                    </Snackbar>
                </ScrollView>
            </View>
            {/* {renderAreaCodesModal()} */}
        </SafeAreaView>
    )

    // function logionWithGoogleButton() {
    //     return (
    //         <View style={styles.loginWithGoogleButtonStyle}>
    //             <Image
    //                 source={require('../../assets/images/google.png')}
    //                 style={{ width: 30.0, height: 30.0, }}
    //             />
    //             <Text style={{ ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding * 2.0 }}>
    //                 Log in with Google
    //             </Text>
    //         </View >
    //     )
    // }

    // function loginWithFacebookButton() {
    //     return (
    //         <View style={styles.loginWithFacebookButtonStyle}>
    //             <Image
    //                 source={require('../../assets/images/facebook.png')}
    //                 style={{ width: 30.0, height: 30.0, }}
    //             />
    //             <Text style={{ ...Fonts.whiteColor14Medium, marginLeft: Sizes.fixPadding * 2.0 }}>
    //                 Log in with Facebook
    //             </Text>
    //         </View>
    //     )
    // }

    // function otpInfo() {
    //     return (
    //         <View style={styles.mobileNumberWrapStyle} >
    //             <TouchableOpacity
    //                 style={{
    //                     marginRight: Sizes.fixPadding * 3.0,
    //                     flexDirection: 'row',
    //                     alignItems: 'center'
    //                 }}
    //                 onPress={() => setModalVisible(true)}
    //             >
    //                 <Image
    //                     source={{ uri: selectedArea?.flag }}
    //                     resizeMode="cover"
    //                     style={{ height: 21.0, width: 35.0, }}
    //                 />
    //                 <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14Regular }}>
    //                     {selectedArea?.callingCode}
    //                 </Text>
    //             </TouchableOpacity >
    //             <TextInput
    //                 style={{ ...Fonts.blackColor14Regular, flex: 1 }}
    //                 selectionColor={Colors.primaryColor}
    //                 value={OTP}
    //                 onChangeText={(text) => { setOTP(text) }}
    //                 placeholder="Enter OTP"
    //                 placeholderTextColor={Colors.blackColor}
    //                 keyboardType='number-pad'
    //             />
    //         </View >
    //     )
    // }

    function continueButton() {

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleContinue}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor14Bold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    // function verifyotpButton() {

    //     return (
    //         <TouchableOpacity
    //             activeOpacity={0.9}
    //             onPress={handleVerifyOTP}
    //             style={styles.continueButtonStyle}>
    //             <Text style={{ ...Fonts.whiteColor14Bold }}>
    //                 Verify OTP
    //             </Text>
    //         </TouchableOpacity>
    //     )
    // }

    function handleContinue() {

        if (!mobileNumber) {
            setShowSnackBar(true)
            setSnackBarMsg('Please Enter Mobile Number')
            return
        }
        var body = { "phone": "+923026102257" }

        // wbh.postDataRequest(Routs.USER_PHONE_VERIFY, body, (res) => {
        //     console.log(JSON.stringify(res))
        //     if (res.responseStatus === 200) {
        navigation.navigate('Otp', { phone: mobileNumber })
        // }
        // }, (error) => {
        //     console.log("error==>" + error)
        // })
    }
    function signInText() {
        return (
            <Text style={{
                ...Fonts.grayColor14Bold,
                textAlign: 'center',
                marginBottom: Sizes.fixPadding + 5.0
            }}>
                SignUp with phone number
            </Text >
        )
    }

    function appLogo() {
        return (
            <Image
                source={require('../../assets/images/icon.jpg')}
                style={styles.appLogoStyle}
                resizeMode="cover"
            />
        )
    }

    // function settingSearch(text) {
    //     let data = [];
    //     data_temp.map(function (value) {
    //         if (value.name.indexOf(text) > -1) {
    //             data.push(value);
    //         }
    //     });
    //     setAreas(data);
    //     setSearch(text);
    // }

    // function renderAreaCodesModal() {

    //     const renderItem = ({ item }) => {
    //         return <TouchableOpacity
    //             style={{
    //                 padding: Sizes.fixPadding,
    //                 flexDirection: 'row',
    //                 alignItems: 'center'
    //             }}
    //             onPress={() => {
    //                 setSelectedArea(item)
    //                 setModalVisible(false)
    //             }}
    //         >
    //             <Image
    //                 source={{ uri: item.flag }}
    //                 style={{
    //                     width: 40.0,
    //                     height: 40.0,
    //                     marginRight: Sizes.fixPadding
    //                 }}
    //             />
    //             <View style={{ marginLeft: Sizes.fixPadding }}>
    //                 <Text style={{ ...Fonts.blackColor16Medium }}>
    //                     {item.name}
    //                 </Text>
    //                 <Text style={{ ...Fonts.grayColor14Medium }}>
    //                     {item.callingCode}
    //                 </Text>
    //             </View>
    //         </TouchableOpacity>
    //     }

    //     return (
    //         <Modal
    //             animationType="slide"
    //             transparent={true}
    //             visible={modalVisible}
    //         >
    //             <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
    //                 <View style={{
    //                     flex: 1, alignItems: 'center', justifyContent: 'center',
    //                 }}>
    //                     <View style={styles.selectAreaModalStyle}>
    //                         <View style={styles.searchCountryTextFieldWrapStyle}>
    //                             <TextInput
    //                                 selectionColor={Colors.primaryColor}
    //                                 placeholder='Search by country name or dial...'
    //                                 labelTextStyle={{ ...Fonts.blackColor16Medium }}
    //                                 style={{ ...Fonts.blackColor16Medium, marginBottom: Sizes.fixPadding }}
    //                                 value={search}
    //                                 onChangeText={(text) => settingSearch(text)}
    //                             />
    //                         </View>
    //                         <FlatList
    //                             data={areas}
    //                             renderItem={renderItem}
    //                             keyExtractor={(item) => item.code}
    //                             showsVerticalScrollIndicator={false}
    //                             style={{
    //                                 padding: Sizes.fixPadding * 2.0,
    //                                 marginBottom: Sizes.fixPadding * 2.0,
    //                             }}
    //                         />
    //                     </View>
    //                 </View>
    //             </TouchableWithoutFeedback>
    //         </Modal>
    //     );
    // }

    function mobileNumberInfo() {
        return (
            <View style={styles.mobileNumberWrapStyle} >
                {/* <TouchableOpacity
                    style={{
                        marginRight: Sizes.fixPadding * 3.0,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    onPress={() => setModalVisible(true)}
                >
                    <Image
                        source={{ uri: selectedArea?.flag }}
                        resizeMode="cover"
                        style={{ height: 21.0, width: 35.0, }}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14Regular }}>
                        {selectedArea?.callingCode}
                    </Text>
                </TouchableOpacity > */}
                <TextInput
                    style={{ ...Fonts.blackColor14Regular, flex: 1 }}
                    selectionColor={Colors.primaryColor}
                    value={mobileNumber}
                    onChangeText={(text) => { setMobileNumber(text) }}
                    placeholder="Phone Number"
                    placeholderTextColor={Colors.blackColor}
                    keyboardType="number-pad"
                    maxLength={11}
                />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    mobileNumberWrapStyle: {
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 3.0,
        borderColor: 'rgba(128,128,128,0.12)',
        borderWidth: 1.0,
        marginBottom: Sizes.fixPadding * 2.5,
    },
    selectAreaModalStyle: {
        height: height * 0.5,
        width: width * 0.8,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 3.0
    },
    searchCountryTextFieldWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding,
        borderBottomWidth: 1.0,
        borderBottomColor: Colors.grayColor
    },
    loginWithGoogleButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding
    },
    loginWithFacebookButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3B5998',
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.5,
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding - 5.0
    },
    appLogoStyle: {
        width: 200.0,
        height: 200.0,
        alignSelf: 'center',
        marginBottom: Sizes.fixPadding * 2.0
    }
})

LoginScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(LoginScreen);