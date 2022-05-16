import React, { Component } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Image, BackHandler, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { TransitionPresets } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from "react-native-paper";
import { CircleFade } from 'react-native-animated-spinkit';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import WebHandler from "../../Data/Remote/WebHandler";
import Routs from "../../Data/Remote/Routs";
import Dialog from "react-native-dialog";

const wbh = new WebHandler()
var radio_props = [
    { value: 'male', label: "MALE" },
    { value: 'female', label: "FEMALE" }
];
var radio_props1 = [
    { value: 1, label: "Yes" },
    { value: 0, label: "No" }
];

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: "",
            userPhone: "",
            allAreas:[]
        }
    }

    componentDidMount = () => {
      
        wbh.General_GET_From_WEB_Without_ID(Routs.GET_USER, (res) => {
            if (res) {
                // console.log("EEeeeeee" + res.id)
                this.setState({ userID: res.id })
                this.setState({ userPhone: res.username })

            }
        }, (error) => {
            console.log("ERRORRR === >   " + error)
        })

        wbh.General_GET_From_WEB_Without_ID1(Routs.GET_ALL_AREAS, (res) => {
            if (res) {
                // console.log("RES ++++ ===>>  " + JSON.stringify(res))
                this.setState({ allAreas: JSON.stringify(res)})

            }
        }, (error) => {
            console.log("ERRORRR === >   " + error)
        })
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
        ServiceProviderGender: "",
        ServiceProviderCnic: '',
        ServiceProviderMobileNumber: '',
        ServiceProviderAddress: "",
        ServiceProviderCertificate: '',
        ServiceProviderVehicle: "",
        ServiceProviderInspectionFee: "",
        ServiceProviderExperience: "",
        ServiceProviderExperienceStatus: '',
        ServiceProviderCity: "",
        ServiceProviderAreas: "",
        FieldService: '',
        MyService: "",
        showSnackBar: false,
        snackBarMsg: '',
        isLoading: false,
        Gender: ""
    }

    render() {
        console.log("User ID:    "+this.state.userID)
        console.log("User phone: "+this.state.userPhone)
        console.log("User AREAS: "+this.state.allAreas)

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

                        {this.selectGender()}
                        {this.PhoneNumber()}
                        {this.confirmPasswordTextField()}
                        {this.secondNameTextField()}
                        {this.firstNameTextField()}
                        {this.passwordTextField()}
                        {this.ServiceProviderInspectionFee()}
                        {this.ServiceProviderExperience()}
                        {this.ServiceProviderExperienceStatus()}
                        {this.ServiceProviderCity()}
                        {this.FieldService()}
                        {this.ServiceProviderAreas()}
                        {this.MyService()}


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

        // wbh.postDataRequest(Routs.USR_CREATE_ACCOUNT_SP, body, (res) => {
        //     if (res.responseStatus === 200) {
        //         this.setState({ isLoading: false, showSnackBar: true, snackBarMsg: res })
        // this.props.navigation.navigate('BottomTabBar', { index: 1 });                //  }
        // }, (error) => {
        //     this.setState({ isLoading: false })
        //     this.setState({ showSnackBar: true })
        //     this.setState({ snackBarMsg: error })
        // })
    }
    selectGender() {
        console.log("Gender ==> " + this.state.Gender)
        return (
            <>
                <Text style={{
                    ...Fonts.blackColor14Bold,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}>
                    ServiceProviderGender
                </Text>
                <RadioForm
                    style={{ marginLeft: 150, marginVertical: 10 }}
                    buttonSize={10}
                    radio_props={radio_props}
                    initial={"male"}
                    onPress={(value) => { this.setState({ Gender: value }) }}
                />
            </>
        )
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
                    value={this.state.ServiceProviderMobileNumber}
                    onChangeText={(text) => this.setState({ ServiceProviderMobileNumber: text })}
                    placeholder="Enter MobileNumber"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    PhoneNumber() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={this.state.ServiceProviderCnic}
                    onChangeText={(text) => this.setState({ ServiceProviderCnic: text })}
                    placeholder="Enter Cnic without - "
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
                    value={this.state.ServiceProviderVehicle}
                    onChangeText={(text) => this.setState({ ServiceProviderVehicle: text })}
                    placeholder="Enter Vehicle Name"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    secondNameTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={this.state.ServiceProviderAddress}
                    onChangeText={(text) => this.setState({ ServiceProviderAddress: text })}
                    placeholder="Enter Address"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    firstNameTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={this.state.ServiceProviderCertificate}
                    onChangeText={(text) => this.setState({ ServiceProviderCertificate: text })}
                    placeholder="Certificate status (Optional)"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }
    ServiceProviderInspectionFee() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={this.state.ServiceProviderInspectionFee}
                    onChangeText={(text) => this.setState({ ServiceProviderInspectionFee: text })}
                    placeholder="Enter Your Inspection Fee"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }
    ServiceProviderExperience() {
        console.log("Gender ==> " + this.state.ServiceProviderExperience)

        return (
            <>
                <Text style={{
                    ...Fonts.blackColor14Bold,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}>
                    Any Experience
                </Text>
                <RadioForm
                    style={{ marginLeft: 150, marginVertical: 10 }}
                    buttonSize={10}
                    radio_props={radio_props1}
                    initial={"male"}
                    onPress={(value) => { this.setState({ ServiceProviderExperience: value }) }}
                />
            </>
        )
    }
    ServiceProviderExperienceStatus() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={this.state.ServiceProviderExperienceStatus}
                    onChangeText={(text) => this.setState({ ServiceProviderExperienceStatus: text })}
                    placeholder="Enter Your ExperienceStatus"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }
    ServiceProviderCity() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={this.state.ServiceProviderCity}
                    onChangeText={(text) => this.setState({ ServiceProviderCity: text })}
                    placeholder="Enter Your ServiceProviderCity"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }
    FieldService() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={this.state.FieldService}
                    onChangeText={(text) => this.setState({ FieldService: text })}
                    placeholder="Enter Your FieldService"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }
    ServiceProviderAreas() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={this.state.ServiceProviderAreas}
                    onChangeText={(text) => this.setState({ ServiceProviderAreas: text })}
                    placeholder="Enter Your ServiceProviderAreas"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }
    MyService() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={this.state.MyService}
                    onChangeText={(text) => this.setState({ MyService: text })}
                    placeholder="Enter Your MyService"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    registerInfo() {
        return (
            <Text style={{ ...Fonts.grayColor14Bold, textAlign: 'center', marginBottom: Sizes.fixPadding + 5.0 }}>
                Complete your Profile first
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
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Sizes.fixPadding - 5.0
    },

})

Profile.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(Profile);