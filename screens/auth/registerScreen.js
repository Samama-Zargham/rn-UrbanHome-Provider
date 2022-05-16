import React, { Component } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Image, BackHandler, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { TransitionPresets } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from "react-native-paper";
import { CircleFade } from 'react-native-animated-spinkit';

import WebHandler from "../../Data/Remote/WebHandler";
import Routs from "../../Data/Remote/Routs";
import Dialog from "react-native-dialog";

const wbh = new WebHandler()

class RegisterScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
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
        password: '',
        confirmPassword: '',
        showSnackBar: false,
        snackBarMsg: '',
        isLoading: false,

    }

    render() {

        console.log("NOW PHONE YOU ENTERED === > " + this.state.PHONE)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.backArrow()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    >
                        {this.appLogo()}
                        {this.registerInfo()}
                        {this.PhoneNumber()}
                        {/* {this.secondNameTextField()} */}
                        {this.passwordTextField()}
                        {this.confirmPasswordTextField()}
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
    handleRegister = () => {

        const { password, confirmPassword, PHONE } = this.state
        if (!PHONE || !password || !confirmPassword) {
            this.setState({ showSnackBar: true })
            this.setState({ snackBarMsg: 'All Fields are required' })
            return
        }
        if (password != confirmPassword) {
            this.setState({ showSnackBar: true })
            this.setState({ snackBarMsg: 'password not match' })
            return
        }
        this.setState({ isLoading: true })
        var body = {
            "phone": "+923026102257",
            "password": this.state.password,
        }

        // wbh.postDataRequest(Routs.REGISTER_USER, body, (res) => {
        //     if (res.responseStatus === 200) {
        //         this.setState({ isLoading: false, showSnackBar: true, snackBarMsg: res })
        // this.props.navigation.navigate('BottomTabBar', { index: 1 });                //  }
        this.props.navigation.navigate('Login1');
        // }, (error) => {
        //     this.setState({ isLoading: false })
        //     this.setState({ showSnackBar: true })
        //     this.setState({ snackBarMsg: error })
        // })
    }
    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.handleRegister()}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor14Bold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    confirmPasswordTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={this.state.confirmPassword}
                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                    placeholder="Confirm Password"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                    secureTextEntry={true}
                />
            </View>
        )
    }

    PhoneNumber() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={this.state.PHONE}
                    onChangeText={(text) => this.setState({ PhoneNumber: text })}
                    placeholder="Phone Number"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                    maxLength={11}
                />
            </View>
        )
    }

    passwordTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    placeholder="Password"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                    secureTextEntry={true}
                />
            </View>
        )
    }

    // secondNameTextField() {
    //     return (
    //         <View style={styles.textFieldWrapStyle}>
    //             <TextInput
    //                 value={this.state.SNAME}
    //                 onChangeText={(text) => this.setState({ SNAME: text })}
    //                 placeholder="Last Name"
    //                 style={{ ...Fonts.blackColor14Medium }}
    //                 placeholderTextColor={Colors.blackColor}
    //                 selectionColor={Colors.primaryColor}
    //             />
    //         </View>
    //     )
    // }

    // firstNameTextField() {
    //     return (
    //         <View style={styles.textFieldWrapStyle}>
    //             <TextInput
    //                 value={this.state.FNAME}
    //                 onChangeText={(text) => this.setState({ FNAME: text })}
    //                 placeholder="First Name"
    //                 style={{ ...Fonts.blackColor14Medium }}
    //                 placeholderTextColor={Colors.blackColor}
    //                 selectionColor={Colors.primaryColor}
    //             />
    //         </View>
    //     )
    // }

    registerInfo() {
        return (
            <Text style={{ ...Fonts.grayColor14Bold, textAlign: 'center', marginBottom: Sizes.fixPadding + 5.0 }}>
                Register your account
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
}

const styles = StyleSheet.create({
    appLogoStyle: {
        width: 200.0,
        height: 200.0,
        alignSelf: 'center',
        marginBottom: Sizes.fixPadding * 2.0
    },
    textFieldWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginBottom: Sizes.fixPadding * 2.0,
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        elevation: 3.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderColor: 'rgba(128,128,128,0.12)',
        borderWidth: 1.0,
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

})

RegisterScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(RegisterScreen);