import React, { Component } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Image, FlatList, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const reviewsList = [
    {
        id: '1',
        image: require('../../assets/images/user/user_1.jpg'),
        name: 'Samama',
        work: 'Home Cleaning',
        date: '15 March, 2021',
        review: 'Excellent service.',
    },
    {
        id: '2',
        image: require('../../assets/images/user/user_2.jpg'),
        name: 'Fazal',
        work: 'Carpet Cleaning',
        date: '14 March, 2021',
        review: 'Really good Service',
    },
    {
        id: '3',
        image: require('../../assets/images/user/user_3.jpg'),
        name: 'Ahmad',
        work: 'Home Cleaning',
        date: '13 March, 2021',
        review: 'Quick service.',
    },
    {
        id: '4',
        image: require('../../assets/images/user/user_4.jpg'),
        name: 'Adnan',
        work: 'Home Cleaning',
        date: '12 March, 2021',
        review: 'Nice & clean service.',
    },
    {
        id: '5',
        image: require('../../assets/images/user/user_5.jpg'),
        name: 'Uzair',
        work: 'Home Cleaning',
        date: '11 March, 2021',
        review: 'Excellent service.',
    },
    {
        id: '6',
        image: require('../../assets/images/user/user_6.jpg'),
        name: 'Ali',
        work: 'Home Cleaning',
        date: '10 March, 2021',
        review: 'Good.',
    },
    {
        id: '7',
        image: require('../../assets/images/user/user_7.jpg'),
        name: 'Ans',
        work: 'Home Cleaning',
        date: '09 March, 2021',
        review: 'Best service ever seen.',
    },
    {
        id: '8',
        image: require('../../assets/images/user/user_1.jpg'),
        name: 'Mohsin',
        work: 'Home Cleaning',
        date: '15 March, 2021',
        review: 'Excellent service.',
    }
];

class ReviewScreen extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <FlatList
                        ListHeaderComponent={
                            <>
                                {this.providerDetail()}
                                {this.recentReviewsTitle()}
                            </>
                        }
                        data={reviewsList}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 5.0 }}
                    />
                </View>
            </SafeAreaView>
        )
    }

    renderItem = ({ item }) => (
        <View style={styles.reviewsWrapStyle}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={item.image}
                        style={{ width: 40.0, height: 40.0, borderRadius: 20.0, }}
                        resizeMode="cover"
                    />
                    <View style={{ marginLeft: Sizes.fixPadding, maxWidth: width / 2.85, }}>
                        <Text style={{ ...Fonts.blackColor16Bold, }}>
                            {item.name}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Sizes.fixPadding - 8.0 }}>
                            <MaterialIcons name="star" size={16} color={Colors.orangeColor} />
                            <MaterialIcons name="star" size={16} color={Colors.orangeColor} />
                            <MaterialIcons name="star" size={16} color={Colors.orangeColor} />
                            <MaterialIcons name="star" size={16} color={Colors.orangeColor} />
                            <MaterialIcons name="star" size={16} color={Colors.orangeColor} />
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end', maxWidth: width / 2.85 }}>
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        {item.work}
                    </Text>
                    <Text style={{ ...Fonts.grayColor14Regular, marginTop: Sizes.fixPadding - 8.0 }}>
                        {item.date}
                    </Text>
                </View>
            </View>
            <Text style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding - 3.0 }}>
                {item.review}
            </Text>
        </View>
    )

    recentReviewsTitle() {
        return (
            <Text style={{
                ...Fonts.blackColor14Bold,
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginBottom: Sizes.fixPadding * 2.0
            }}>
                Recent reviews
            </Text>
        )
    }

    providerDetail() {
        return (
            <View style={{ flexDirection: 'row', margin: Sizes.fixPadding * 2.0 }}>

                <View style={styles.providerImageShadowStyle}>
                    <Image
                        source={require('../../assets/images/provider/provider_7.jpg')}
                        style={styles.providerImageStyle}
                        resizeMode="cover"
                    />
                </View>

                <View style={{ justifyContent: 'space-between', marginLeft: Sizes.fixPadding, marginBottom: Sizes.fixPadding - 5.0 }}>

                    <Text style={{ ...Fonts.blackColor16Bold }}>
                        Ans Shakeel
                    </Text>

                    <Text style={{ ...Fonts.grayColor14Medium }}>
                        Cleaner
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.ratingAndJobIconWrapStyle}>
                            <MaterialIcons name="star-rate" size={20} color={Colors.orangeColor} />
                        </View>
                        <View style={{ marginLeft: Sizes.fixPadding - 5.0 }}>
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                                Rating
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Bold }}>
                                4.9 out of 5
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.ratingAndJobIconWrapStyle}>
                            <MaterialIcons name="group" size={20} color={Colors.primaryColor} />
                        </View>
                        <View style={{ marginLeft: Sizes.fixPadding - 5.0 }}>
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                                Jobs
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Bold }}>
                                700+
                            </Text>
                        </View>
                    </View>

                </View>

            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Reviews
                </Text>
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
        justifyContent: 'center',
    },
    ratingAndJobIconWrapStyle: {
        width: 38.0,
        height: 38.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderColor: 'rgba(128,128,128,0.02)',
        borderWidth: 1.0,
    },
    providerImageStyle: {
        width: 120.0,
        height: 140.0,
        borderRadius: Sizes.fixPadding,
        borderColor: '#d3d3d3',
        borderWidth: 1.0,
    },
    providerImageShadowStyle: {
        width: 120.0,
        height: 140.0,
        borderRadius: Sizes.fixPadding,
        backgroundColor: '#d3d3d3',
        elevation: 3.0,
    },
    reviewsWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        borderColor: '#d3d3d3',
        borderWidth: 1.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    }
})

export default withNavigation(ReviewScreen);