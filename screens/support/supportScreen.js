import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, ScrollView, TouchableOpacity, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Colors, Sizes, } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { TransitionPresets } from 'react-navigation-stack';

class SupportScreen extends Component {

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

    state = {
        name: '',
        email: '',
        support: '',
    }

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
                        {this.nameTextField()}
                        {this.emailTextField()}
                        {this.supportTextField()}
                        {this.submitButton()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.pop()}
                style={styles.submitButtonStyle}>
                <Text style={{ ...Fonts.whiteColor14Bold }}>
                    Submit
                </Text>
            </TouchableOpacity>
        )
    }

    supportTextField() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 3.0, }}>
                <TextInput
                    placeholder="Write here"
                    multiline={true}
                    numberOfLines={5}
                    mode="outlined"
                    value={this.state.support}
                    onChangeText={text => this.setState({ support: text })}
                    style={{
                        ...Fonts.blackColor14Medium,
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        backgroundColor: Colors.bodyBackColor,
                    }}
                    selectionColor={Colors.primaryColor}
                    theme={{ colors: { primary: Colors.primaryColor, underlineColor: 'transparent', } }}
                />
            </View>

        )
    }

    emailTextField() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 3.0 }}>
                <TextInput
                    placeholder="Email"
                    mode="outlined"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    theme={{ colors: { primary: Colors.primaryColor, underlineColor: 'transparent', } }}
                />
            </View>
        )
    }

    nameTextField() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 3.0 }}>
                <TextInput
                    placeholder="Name"
                    mode="outlined"
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    theme={{ colors: { primary: Colors.primaryColor, underlineColor: 'transparent' } }}
                />
            </View>
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
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Support
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
    submitButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginVertical: Sizes.fixPadding + 5.0
    },
    textFieldStyle: {
        ...Fonts.blackColor14Medium,
        height: 50.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.bodyBackColor,
    }
})

SupportScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(SupportScreen);