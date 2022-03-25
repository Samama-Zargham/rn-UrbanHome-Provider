import React, { Component } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const todayBookingsList = [
    {
        id: '1',
        image: require('../../assets/images/user/user_1.jpg'),
        name: 'Samama',
        work: 'Home Cleaning',
        time: '01:00 PM',
    },
    {
        id: '2',
        image: require('../../assets/images/user/user_5.jpg'),
        name: 'Uzair',
        work: 'Home Cleaning',
        time: '03:30 PM',
    },
];

const tomorrowBookingsList = [
    {
        id: '1',
        image: require('../../assets/images/user/user_7.jpg'),
        name: 'Ans',
        work: 'Home Cleaning',
        time: '09:00 AM',
    },
    {
        id: '2',
        image: require('../../assets/images/user/user_3.jpg'),
        name: 'Ahmad',
        work: 'Home Cleaning',
        time: '11:00 AM',
    },
    {
        id: '3',
        image: require('../../assets/images/user/user_6.jpg'),
        name: 'Ali',
        work: 'Home Cleaning',
        time: '02:30 PM',
    },
];

class BookingScreen extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 10.0 }}
                    >
                        {this.nextBookingInfo()}
                        {this.upcomingBookingsInfo()}
                    </ScrollView>
                    {this.bookingRequestButton()}
                </View>
            </SafeAreaView>
        )
    }

    bookingRequestButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('BookingRequest')}
                style={styles.bookingRequestButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Booking Request (4)
                </Text>
            </TouchableOpacity>
        )
    }

    upcomingBookingsInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16Bold }}>
                    Upcoming Bookings
                </Text>
                {this.todayBookings()}
                {this.tomorrowBookings()}
            </View>
        )
    }

    tomorrowBookings() {
        return (
            <View>
                <Text style={{ ...Fonts.grayColor14Medium, marginTop: Sizes.fixPadding - 7.0, marginBottom: Sizes.fixPadding }}>
                    Tomorrow
                </Text>
                {tomorrowBookingsList.map((item) => (
                    <View key={`${item.id}`}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.props.navigation.push('UpcomingBookingDetail')}
                            style={styles.bookingInfoWrapStyle}>
                            <View style={{ flexDirection: 'row', }}>
                                <Image
                                    source={item.image}
                                    style={{ width: 60.0, height: 60.0, borderRadius: Sizes.fixPadding }}
                                    resizeMode="cover"
                                />
                                <View style={{ marginLeft: Sizes.fixPadding, maxWidth: width / 2.0, }}>
                                    <Text style={{ ...Fonts.blackColor16Bold }}>
                                        {item.name}
                                    </Text>
                                    <Text style={{ ...Fonts.grayColor14Medium, marginVertical: Sizes.fixPadding + 5.0 }}>
                                        {item.work}
                                    </Text>
                                    <Text style={{ ...Fonts.blackColor16Medium, flex: 1 }}>
                                        Tomorrow | {item.time}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ justifyContent: 'space-between', marginTop: Sizes.fixPadding }}>
                                <View style={styles.bookingDoneIconWrapStyle}>
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
                    </View>
                ))}
            </View>
        )
    }

    todayBookings() {
        return (
            <View>
                <Text style={{ ...Fonts.grayColor14Medium, marginVertical: Sizes.fixPadding }}>
                    Today
                </Text>
                {todayBookingsList.map((item) => (
                    <View key={`${item.id}`}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.props.navigation.push('UpcomingBookingDetail')}
                            style={styles.bookingInfoWrapStyle}>
                            <View style={{ flexDirection: 'row', }}>
                                <Image
                                    source={item.image}
                                    style={{ width: 60.0, height: 60.0, borderRadius: Sizes.fixPadding }}
                                    resizeMode="cover"
                                />
                                <View style={{ marginLeft: Sizes.fixPadding, maxWidth: width / 2.0 }}>
                                    <Text style={{ ...Fonts.blackColor16Bold }}>
                                        {item.name}
                                    </Text>
                                    <Text style={{ ...Fonts.grayColor14Medium, marginVertical: Sizes.fixPadding + 5.0 }}>
                                        {item.work}
                                    </Text>
                                    <Text style={{ ...Fonts.blackColor16Medium }}>
                                        Today | {item.time}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ justifyContent: 'space-between', marginTop: Sizes.fixPadding }}>
                                <View style={styles.bookingDoneIconWrapStyle}>
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
                    </View>
                ))}
            </View>
        )
    }

    nextBookingInfo() {
        return (
            <View style={styles.nextBookingInfoWrapStyle}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image
                            source={require('../../assets/images/user/user_4.jpg')}
                            style={{ width: 60.0, height: 60.0, borderRadius: Sizes.fixPadding }}
                            resizeMode="cover"
                        />
                        <View style={{ marginLeft: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.whiteColor16Bold }}>
                                Adnan
                            </Text>
                            <Text style={{ ...Fonts.grayColor14Medium, marginTop: Sizes.fixPadding - 2.0 }}>
                                Home Cleaning
                            </Text>
                        </View>
                    </View>
                    <View>
                        <MaterialIcons name="call" size={22} color={Colors.whiteColor} style={{ marginBottom: Sizes.fixPadding }} />
                        <MaterialIcons
                            name="chat"
                            size={22}
                            color={Colors.whiteColor}
                            onPress={() => this.props.navigation.push('Message', { name: 'Elisson Perry' })}
                        />
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: Sizes.fixPadding * 2.0
                }}>
                    <View style={styles.timeInfoWrapStyle}>
                        <MaterialIcons name="access-time" size={20} color={Colors.whiteColor} />
                        <Text style={{ ...Fonts.whiteColor14Medium, marginLeft: Sizes.fixPadding }}>
                            Today, 10:30 AM
                        </Text>
                    </View>
                    <View style={styles.checkIconWrapStyle}>
                        <MaterialIcons name="check" size={24} color={Colors.whiteColor} />
                    </View>
                </View>
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    My Bookings
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        height: 56.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextBookingInfoWrapStyle: {
        backgroundColor: '#141B47',
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
    timeInfoWrapStyle: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
        flex: 1,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Sizes.fixPadding * 2.0
    },
    checkIconWrapStyle: {
        height: 36.0,
        width: 36.0,
        borderRadius: 18.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
    },
    bookingInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: Sizes.fixPadding,
        borderColor: '#d3d3d3',
        borderWidth: 1.0,
        marginBottom: Sizes.fixPadding
    },
    bookingDoneIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignSelf: 'flex-end',
    },
    bookingRequestButtonStyle: {
        position: 'absolute',
        bottom: 60.0,
        left: 20.0,
        right: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 2.0
    }
})

export default withNavigation(BookingScreen);