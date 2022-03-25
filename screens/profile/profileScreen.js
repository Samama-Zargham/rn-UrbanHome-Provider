import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Colors, Sizes, } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

class ProfileScreen extends Component {

    state = {
        isLogout: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
                    >
                        {this.userInfo()}

                        {this.title({ title: 'ABOUT' })}

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.props.navigation.push('PrivacyPolicy')}
                        >
                            {this.moreInfo({ info: 'Privacy Policy' })}
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.props.navigation.push('TermsOfUse')}
                        >
                            {this.moreInfo({ info: 'Terms of use' })}
                        </TouchableOpacity>

                        {this.title({ title: 'APP' })}

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.props.navigation.push('Support')}
                        >
                            {this.moreInfo({ info: 'Support' })}
                        </TouchableOpacity>

                        {this.moreInfo({ info: 'Report a Bug' })}
                        {this.moreInfo({ info: 'App Version 1.0' })}
                        {this.logOutInfo()}
                    </ScrollView>
                    {this.logOutDialog()}
                </View>
            </SafeAreaView>
        )
    }

    logOutDialog() {
        return (
            <Dialog.Container
                visible={this.state.isLogout}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0, padding: 0.0 }}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor16Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        You sure want to logout?
                    </Text>
                    <View style={styles.logoutAndCancelButtonWrapStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ isLogout: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor14Medium }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                this.setState({ isLogout: false })
                                this.props.navigation.navigate('Login')
                            }}
                            style={styles.logOutButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor14Medium }}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    logOutInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ isLogout: true })}
                style={styles.logoutInfoWrapStyle}
            >
                <MaterialCommunityIcons name="login-variant" size={24} color='#FF0000' />
                <Text style={{ ...Fonts.redColor14Medium, marginLeft: Sizes.fixPadding }}>
                    Logout
                </Text>
            </TouchableOpacity>
        )
    }

    divider() {
        return (
            <View style={{
                backgroundColor: Colors.grayColor,
                height: 1.0,
                marginVertical: Sizes.fixPadding,
            }} />
        )
    }

    title({ title }) {
        return (
            <Text
                numberOfLines={1}
                style={{
                    ...Fonts.blackColor12Regular,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginTop: Sizes.fixPadding,
                    marginBottom: Sizes.fixPadding + 5.0
                }}>
                {title}
            </Text>
        )
    }

    moreInfo({ info }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: width - 80, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                            {info}
                        </Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={13} color={Colors.blackColor} />
                </View>
                {this.divider()}
            </View>
        )
    }

    userInfo() {
        return (
            <View style={styles.userInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/provider/provider_7.jpg')}
                        style={{ height: 70.0, width: 70.0, borderRadius: 35.0 }}
                    />
                    <Text
                        numberOfLines={1}
                        style={{
                            ...Fonts.blackColor18Bold,
                            width: width - 200,
                            marginLeft: Sizes.fixPadding * 2.0,
                        }}
                    >
                        Ans Shakeel
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.push('EditProfile')}
                    style={styles.editButtonStyle}>
                    <MaterialIcons name="edit" size={24} color={Colors.whiteColor} />
                </TouchableOpacity>
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Profile
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        height: 53.0,
        elevation: 3.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userInfoWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: Sizes.fixPadding * 2.0,
    },
    editButtonStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 40,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 5.0,
    },
    logOutButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    logoutAndCancelButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding,
    },
    logoutInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding - 5.0
    }
})

export default withNavigation(ProfileScreen);

