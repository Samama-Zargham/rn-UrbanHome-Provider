import React, { Component } from "react";
import { SafeAreaView, StatusBar, View, StyleSheet, Image, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../constant/styles";
import { CircleFade } from 'react-native-animated-spinkit';

class SplashScreen extends Component {

    render() {
        setTimeout(() => {
            this.props.navigation.navigate('Login');
        }, 2000);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {this.appLogo()}
                    <CircleFade
                        size={55}
                        color={Colors.primaryColor}
                        style={{ position: 'absolute', bottom: 40.0 }}
                    />
                </View>
            </SafeAreaView>
        )
    }

    appLogo() {
        return (
            <View>
                <Image
                    source={require('../assets/images/icon.jpg')}
                    style={styles.appLogoStyle}
                    resizeMode="cover"
                />
                <Text style={{ ...Fonts.grayColor16Medium, textAlign: 'center', marginTop: Sizes.fixPadding + 10.0 }}>
                    Provider
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    appLogoStyle: {
        width: 290.0,
        height: 150.0,
        alignSelf: 'center',
    }
})

SplashScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(SplashScreen);