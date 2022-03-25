import React, { Component } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Image, BackHandler, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';

class NextBookingRequestDetailScreen extends Component {

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

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.customerImage()}
                    {this.customerDetails()}
                    {this.cancelAndAcceptButton()}
                </View>
            </SafeAreaView>
        )
    }

    cancelAndAcceptButton() {
        return (
            <View style={styles.cancelAndAcceptButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.pop()}
                    style={{ ...styles.cancelAndAcceptButtonStyle, backgroundColor: Colors.whiteColor }}
                >
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.pop()}
                    style={{ ...styles.cancelAndAcceptButtonStyle, backgroundColor: Colors.primaryColor }}
                >
                    <Text style={{ ...Fonts.whiteColor16Medium }}>
                        Accept
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    customerDetails() {
        return (
            <View>
                {this.customerInfo({ title: 'Customer Name', value: 'Stella French' })}
                {this.customerInfo({ title: 'Address', value: '421, Opera Banglow, New York.' })}
                {this.customerInfo({ title: 'Booking For', value: 'Home Cleaning' })}
                {this.customerInfo({ title: 'Date & Time', value: '18 March, 12:00 PM' })}
            </View>
        )
    }

    customerInfo({ title, value }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.blackColor16Bold }}>
                    {title}
                </Text>
                <Text style={{
                    ...Fonts.grayColor14Medium,
                    marginTop: Sizes.fixPadding - 5.0,
                    marginBottom: Sizes.fixPadding,
                }}>
                    {value}
                </Text>
                <View style={{ backgroundColor: Colors.grayColor, height: 1.0 }} />
            </View>
        )
    }

    customerImage() {
        return (
            <Image
                source={require('../../assets/images/user/user_5.jpg')}
                style={styles.customerImageWrapStyle}
                resizeMode="cover"
            />
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Booking ID 2101
                </Text>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={Colors.blackColor}
                    style={{ position: 'absolute', left: 20.0 }}
                    onPress={() => this.props.navigation.pop()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        height: 56.0,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancelAndAcceptButtonStyle: {
        flex: 0.50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 3.0,
    },
    cancelAndAcceptButtonWrapStyle: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
    },
    customerImageWrapStyle: {
        width: 100.0,
        height: 100.0,
        borderRadius: 50.0,
        marginTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
        alignSelf: 'center'
    }
})

NextBookingRequestDetailScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(NextBookingRequestDetailScreen);