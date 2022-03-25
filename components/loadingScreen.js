import React from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default class LoadingScreen extends React.Component {
    async componentDidMount() {
        await Font.loadAsync({
            Montserrat_Bold: require("../assets/fonts/montserrat/Montserrat-Bold.ttf"),
            Montserrat_Light: require("../assets/fonts/montserrat/Montserrat-Light.ttf"),
            Montserrat_Medium: require("../assets/fonts/montserrat/Montserrat-Medium.ttf"),
            Montserrat_Regular: require("../assets/fonts/montserrat/Montserrat-Regular.ttf"),
            Montserrat_SemiBold: require("../assets/fonts/montserrat/Montserrat-SemiBold.ttf"),
        });
        this.props.navigation.navigate('Splash');
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}></View>
        )
    }
}

