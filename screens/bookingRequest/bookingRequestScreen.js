import React, { Component } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, BackHandler, Dimensions, Image, FlatList, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';

const { width } = Dimensions.get('screen');

const requestsList = [
    {
        id: '1',
        image: require('../../assets/images/user/user_1.jpg'),
        name: 'Samama',
        work: 'Home Cleaning',
        date: '17 March',
        time: '01:00 PM',
    },
    {
        id: '2',
        image: require('../../assets/images/user/user_3.jpg'),
        name: 'Ahmad',
        work: 'Home Cleaning',
        date: '18 March',
        time: '09:00 AM',
    },
    {
        id: '3',
        image: require('../../assets/images/user/user_5.jpg'),
        name: 'Uzair',
        work: 'Home Cleaning',
        date: '18 March',
        time: '12:00 PM',
    },
];

class BookingRequestScreen extends Component {

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
                    {this.requests()}
                </View>
            </SafeAreaView>
        )
    }

    requests() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('NextBookingRequestDetail')}
                style={styles.requestWrapStyle}>
                <View style={{ flexDirection: 'row', }}>
                    <Image
                        source={item.image}
                        style={{ width: 60.0, height: 60.0, borderRadius: Sizes.fixPadding }}
                    />
                    <View style={{ marginLeft: Sizes.fixPadding, maxWidth: width / 2.0, }}>
                        <Text style={{ ...Fonts.blackColor16Bold }}>
                            {item.name}
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Medium, marginVertical: Sizes.fixPadding + 5.0 }}>
                            {item.work}
                        </Text>
                        <Text style={{ ...Fonts.blackColor16Medium }}>
                            {item.date} | {item.time}
                        </Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between', marginTop: Sizes.fixPadding }}>
                    <View style={styles.requestDoneIconWrapStyle}>
                        <MaterialIcons name="check" size={24} color={Colors.primaryColor} />
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <MaterialIcons
                            name="chat"
                            size={22}
                            color={Colors.primaryColor}
                            onPress={() => this.props.navigation.push('Message', { name: item.name })}
                        />
                        <MaterialIcons
                            name="call"
                            size={20}
                            color={Colors.primaryColor}
                            style={{ alignSelf: 'flex-end', marginLeft: Sizes.fixPadding }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={requestsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0 }}
            />
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Booking Requests
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
    requestWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: Sizes.fixPadding,
        borderColor: '#d3d3d3',
        borderWidth: 1.0,
        marginBottom: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    requestDoneIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignSelf: 'flex-end'
    },
})

BookingRequestScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.ModalSlideFromBottomIOS,
    }
}

export default withNavigation(BookingRequestScreen);