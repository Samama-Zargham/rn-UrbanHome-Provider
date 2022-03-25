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

const { width } = Dimensions.get('screen');

class OtpScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.goBack();
        return true;
    };

    state = {
        isLoading: false,
        firstDigit: '',
        secondDigit: '',
        thirdDigit: '',
        forthDigit: '',
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
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
                    <Text style={{ ...Fonts.grayColor12Medium, marginTop: Sizes.fixPadding * 2.0 }}>
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
                            this.setState({ isLoading: true })
                            setTimeout(() => {
                                this.setState({ isLoading: false })
                                this.props.navigation.navigate('BottomTabBar');
                            }, 2000);
                        }}
                    />
                </View>
            </View>
        )
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
            <View>
                <Image
                    source={require('../../assets/images/icon.jpg')}
                    style={styles.appLogoStyle}
                    resizeMode="cover"
                />
                <Text style={{
                    ...Fonts.grayColor14Medium, textAlign: 'center',
                    marginTop: Sizes.fixPadding,
                    marginBottom: Sizes.fixPadding + 5.0
                }}>
                    Provider
                </Text>
            </View>
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
                onPress={() => {
                    this.setState({ isLoading: true })
                    setTimeout(() => {
                        this.setState({ isLoading: false })
                        this.props.navigation.navigate('BottomTabBar');
                    }, 2000);
                }}
                style={styles.continueButtonStyle}
            >
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
        width: 290.0,
        height: 150.0,
        alignSelf: 'center',
    },
    textFieldWrapStyle: {
        height: 60.0,
        width: 60.0,
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