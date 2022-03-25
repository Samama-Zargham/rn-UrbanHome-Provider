import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, BackHandler, Animated, Text, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../constant/styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import BookingScreen from "../screens/booking/bookingScreen";
import ChatScreen from "../screens/chat/chatScreen";
import ReviewScreen from "../screens/review/reviewScreen";
import ProfileScreen from "../screens/profile/profileScreen";
import { NavigationEvents } from 'react-navigation';

let { height } = Dimensions.get('window');

class BottomTabBarScreen extends Component {

    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(100);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
        return true;
    };

    _spring() {
        this.setState({ backClickCount: 1 }, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.07 * height,
                        friction: 5,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
            ]).start(() => {
                this.setState({ backClickCount: 0 });
            });
        });
    }

    state = {
        currentIndex: 1,
        backClickCount: 0,
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationEvents onDidFocus={() => {
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
                }} />
                {this.state.currentIndex == 1 ?
                    <BookingScreen /> :
                    this.state.currentIndex == 2 ?
                        <ChatScreen /> :
                        this.state.currentIndex == 3 ?
                            <ReviewScreen /> :
                            <ProfileScreen />
                }
                <View style={styles.bottomTabBarStyle}>
                    {this.bottomTabBarItem({ index: 1, })}
                    {this.bottomTabBarItem({ index: 2, })}
                    {this.bottomTabBarItem({ index: 3, })}
                    {this.bottomTabBarItem({ index: 4, })}
                </View>
                <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                    <Text style={{ ...Fonts.whiteColor14Medium }}>
                        press back again to exit the app
                    </Text>
                </Animated.View>
            </View>
        )
    }

    bottomTabBarItem({ index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ currentIndex: index })}
            >
                {
                    index == 1
                        ?
                        <MaterialCommunityIcons
                            name="calendar-range"
                            size={24}
                            color={this.state.currentIndex == index ? Colors.primaryColor : Colors.grayColor}
                        />
                        :
                        index == 2
                            ?
                            <MaterialIcons
                                name="chat"
                                size={24}
                                color={this.state.currentIndex == index ? Colors.primaryColor : Colors.grayColor} />
                            :
                            index == 3
                                ?
                                <MaterialCommunityIcons
                                    name="thumbs-up-down"
                                    size={24}
                                    color={this.state.currentIndex == index ? Colors.primaryColor : Colors.grayColor}
                                />
                                :
                                <MaterialCommunityIcons
                                    name="account"
                                    size={24}
                                    color={this.state.currentIndex == index ? Colors.primaryColor : Colors.grayColor}
                                />
                }
            </TouchableOpacity>
        )
    }
}

BottomTabBarScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(BottomTabBarScreen);

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 50.0,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30.0,
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
})



