import React, { Component } from "react";
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    StyleSheet,
    BackHandler,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    Dimensions
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { TransitionPresets } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { CircleFade } from 'react-native-animated-spinkit';
import Dialog from "react-native-dialog";
import { Snackbar } from "react-native-paper";
import WebHandler from "../../Data/Remote/WebHandler";
import Routs from "../../Data/Remote/Routs";
const wbh = new WebHandler()
const { width } = Dimensions.get('screen');

class OtpScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: 'www.javatpoint.com',
            PHONE: this.props.navigation.getParam('phone')

        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    state = {
        isLoading: false,
        firstDigit: '',
        secondDigit: '',
        thirdDigit: '',
        forthDigit: '',
        fifthDigit: '',
        sixthDigit: '',
        OTP: '',
        showSnackBar: false,
        snackBarMsg: '',
    }

    render() {


        console.log("PHONE YOU ENTER FIRST ====> " + this.state.PHONE)

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, }}>
                    {this.backArrow()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    >
                        {this.appLogo()}
                        {this.otpInfo()}
                        {this.otpFields()}
                        {this.resendInfo()}
                        {this.continueButton()}
                        <Snackbar
                            duration={1000}
                            style={styles.snackBarStyle}
                            visible={this.state.showSnackBar}
                            onDismiss={() => this.setState({ showSnackBar: false })}
                        >
                            <Text style={{ ...Fonts.whiteColor12Medium }}>
                                {this.state.snackBarMsg}
                            </Text>
                        </Snackbar>
                    </ScrollView>
                    {this.loading()}
                </View>
            </SafeAreaView>
        )
    }

    loading() {
        return (
            <Dialog.Container
                visible={this.state.isLoading}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0 }}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <CircleFade size={55} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor12Medium,
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        Please wait..
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    resendInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Didn’t receive otp code!
                </Text>
                <Text style={{ ...Fonts.blackColor18Bold, marginLeft: Sizes.fixPadding - 7.0 }}>
                    Resend
                </Text>
            </View>
        )
    }

    otpFields() {
        return (
            <View style={styles.otpFieldsWrapStyle}>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        value={this.state.firstDigit}
                        style={{ ...Fonts.blackColor16Bold, paddingLeft: Sizes.fixPadding }}
                        onChangeText={(text) => {
                            this.setState({ firstDigit: text })
                            this.secondTextInput.focus();
                        }}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        value={this.state.secondDigit}
                        style={{ ...Fonts.blackColor16Bold, paddingLeft: Sizes.fixPadding }}
                        ref={(input) => { this.secondTextInput = input; }}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            this.setState({ secondDigit: text })
                            this.thirdTextInput.focus();
                        }}
                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor16Bold, paddingLeft: Sizes.fixPadding }}
                        keyboardType="numeric"
                        value={this.state.thirdDigit}
                        ref={(input) => { this.thirdTextInput = input; }}
                        onChangeText={(text) => {
                            this.setState({ thirdDigit: text })
                            this.forthTextInput.focus();
                        }}
                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor16Bold, paddingLeft: Sizes.fixPadding }}
                        keyboardType="numeric"
                        value={this.state.forthDigit}
                        ref={(input) => { this.forthTextInput = input; }}
                        onChangeText={(text) => {
                            this.setState({ forthDigit: text })
                            this.fifthTextInput.focus();
                        }}
                    />
                </View>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor16Bold, paddingLeft: Sizes.fixPadding }}
                        keyboardType="numeric"
                        value={this.state.fifthDigit}
                        ref={(input) => { this.fifthTextInput = input; }}
                        onChangeText={(text) => {
                            this.setState({ fifthDigit: text })
                            this.sixthTextInput.focus();
                        }}
                    />
                </View>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor16Bold, paddingLeft: Sizes.fixPadding }}
                        keyboardType="numeric"
                        value={this.state.sixthDigit}
                        ref={(input) => { this.sixthTextInput = input; }}
                        onChangeText={(text) => {
                            this.setState({ sixthDigit: text })
                            this.setState({ isLoading: true })
                            setTimeout(() => {
                                this.setState({ OTP: this.state.firstDigit + this.state.secondDigit + this.state.thirdDigit + this.state.forthDigit + this.state.fifthDigit + this.state.sixthDigit })
                                this.handleVerifyOTP()
                            }, 2000);

                        }}
                    />
                </View>
            </View>
        )
    }
    handleVerifyOTP = () => {
        // if (!this.state.OTP) {
        //     this.setState({showSnackBar:true,isLoading:false})
        //     this.setState({snackBarMsg:'Please Enter Valid OTP'})
        //     return
        // }  
        // var body = { "otp_code": this.state.OTP }

        // wbh.postDataRequest(Routs.VALIDATE_USER_OTP, body, (res) => {
        //     if (res.responseStatus === 200) {
        // this.setState({ isLoading: false })
        this.props.navigation.navigate('Register', { phone: this.state.PHONE })
        //     }
        // }, (error) => {
        //     this.setState({ isLoading: false })
        //     this.setState({showSnackBar:true})
        //     this.setState({snackBarMsg:error})
        // })
    }
    otpInfo() {
        return (
            <Text style={{
                ...Fonts.grayColor14Bold, textAlign: 'center',
                marginHorizontal: Sizes.fixPadding * 2.0
            }}>
                Enter the otp code from the phone we just sent you
            </Text>
        )
    }

    appLogo() {
        return (
            <Image
                source={require('../../assets/images/icon.jpg')}
                style={styles.appLogoStyle}
                resizeMode="cover"
            />
        )
    }

    backArrow() {
        return (
            <MaterialIcons
                name="arrow-back"
                size={24}
                color="black"
                onPress={() => this.props.navigation.goBack()}
                style={{ left: 20.0, top: 10.0 }}
            />
        )
    }

    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={this.handleVerifyOTP}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor14Bold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
    appLogoStyle: {
        width: 200.0,
        height: 200.0,
        alignSelf: 'center',
        marginBottom: Sizes.fixPadding * 2.0
    },
    textFieldWrapStyle: {
        height: 50.0,
        width: 50.0,
        borderRadius: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderColor: 'rgba(128,128,128,0.12)',
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    otpFieldsWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 8.0,
        marginBottom: Sizes.fixPadding * 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 80,
        paddingTop: Sizes.fixPadding + 10.0,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
})

OtpScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(OtpScreen);