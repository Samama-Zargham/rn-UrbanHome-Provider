import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, ScrollView, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Colors, Sizes, } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';

class PrivacyPolicyScreen extends Component {

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
                <StatusBar
                    translucent={false}
                    backgroundColor={Colors.primaryColor}
                />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
                    >
                        {this.dummyText()}
                        {this.dummyText()}
                        {this.dummyText()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    dummyText() {
        return (
            <Text style={{
                ...Fonts.blackColor14Medium,
                marginHorizontal: Sizes.fixPadding * 2.0,
                textAlign: 'justify',
                marginBottom: Sizes.fixPadding,
            }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, venenatis leo ante morbi magnis porttitor. Massa ut mauris id aliquam at dapibus dignissim aliquam. In porta arcu, purus amet ipsum, aliquet tortor. Amet, bibendum erat iaculis in ipsum integer.
            </Text>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color="black"
                    onPress={() => this.props.navigation.pop()}
                    style={{ position: 'absolute', left: 20.0, }}
                />
                <Text style={{ ...Fonts.blackColor18Bold, }}>
                    Privacy Policy
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 3.0,
    },
})

PrivacyPolicyScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(PrivacyPolicyScreen);