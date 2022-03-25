import React, { Component, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, SafeAreaView, StatusBar, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons';
import { Fonts, Colors, Sizes, } from "../../constant/styles";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';

const userMessages = [
    {
        id: '1',
        message: 'Hello',
        time: '9:35 AM',
        isSender: true,
        isSeen: true,
    },
    {
        id: '2',
        message: 'Hello',
        time: '9:36 AM',
        isSender: false,
    },
    {
        id: '3',
        message: 'How can i help you?',
        time: '9:37 AM',
        isSender: false,
    },
    {
        id: '4',
        message: 'You\'re available tomorrow for \nwork?',
        time: '9:38 AM',
        isSender: true,
        isSeen: false,
    },
];

class MessageScreen extends Component {

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

    name = this.props.navigation.getParam('name');

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <Message />
                </View>
            </SafeAreaView>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color="black"
                    style={{ position: 'absolute', left: 20.0, }}
                    onPress={() => this.props.navigation.pop()}
                />
                <Text style={{
                    ...Fonts.blackColor18Bold,
                    alignSelf: 'center',
                    justifyContent: 'center'
                }}>
                    {this.name}
                </Text>
            </View>
        )
    }
}

const Message = () => {

    const [messagesList, setMessagesList] = useState(userMessages);

    function messages() {

        const renderItem = ({ item }) => {
            return (
                <View style={{
                    alignItems: item.isSender == true ? 'flex-end' : 'flex-start',
                    marginHorizontal: Sizes.fixPadding,
                    marginVertical: Sizes.fixPadding - 5.0,
                }}>
                    <View style={{
                        ...styles.messageWrapStyle,
                        backgroundColor: item.isSender == true ? Colors.primaryColor : '#E0E0E0',
                        borderBottomLeftRadius: item.isSender == true ? Sizes.fixPadding - 5.0 : 0.0,
                        borderBottomRightRadius: item.isSender == true ? 0.0 : Sizes.fixPadding - 5.0,
                    }}>
                        <Text style={item.isSender ? { ...Fonts.whiteColor15Medium } : { ...Fonts.blackColor15Medium }}>
                            {item.message}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: Sizes.fixPadding - 5.0,
                    }}>
                        {item.isSender == true ?
                            item.isSeen == true ?
                                <Ionicons name="checkmark-done-sharp" size={18} color='#448AFF' />
                                :
                                <Ionicons name="checkmark-sharp" size={18} color='#448AFF' />
                            : null
                        }
                        <Text style={{ ...Fonts.grayColor14Medium, }}>
                            {item.time}
                        </Text>
                    </View>
                </View>
            )
        }

        return (
            <FlatList
                data={messagesList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
            />
        )
    }

    function addMessage({ message }) {

        const oldMessages = messagesList;
        let date = Date();
        let hour = (new Date(date)).getHours();
        let minute = (new Date(date)).getMinutes();
        let AmPm = hour >= 12 ? 'PM' : 'AM';
        let finalhour = hour > 12 ? (hour - 12) : hour;

        const newMessage = {
            id: messagesList.length + 1,
            message: message,
            time: `${finalhour}:${minute} ${AmPm}`,
            isSender: true,
            isSeen: false,
        }

        oldMessages.push(newMessage);
        setMessagesList(oldMessages);
    }

    function typeMessage() {
        const [message, setMessage] = useState('');
        return (
            <View style={styles.bottomWrapStyle}>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.whiteColor}
                        value={message}
                        onChangeText={setMessage}
                        placeholder='Type a Message'
                        style={{ ...Fonts.whiteColor14Medium }}
                        placeholderTextColor={Colors.whiteColor}
                    />
                </View>
                <View style={styles.sendButtonStyle}>
                    <MaterialCommunityIcons name="send" size={24} color={Colors.primaryColor}
                        onPress={() => {
                            if (message != '') {
                                addMessage({ message: message })
                                setMessage('');
                            }
                        }}
                    />
                </View>
            </View>
        )
    }

    return <View style={{ flex: 1, }}>
        {messages()}
        {typeMessage()}
    </View>
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 55.0,
        backgroundColor: Colors.whiteColor,
        elevation: 10.0,
    },
    messageWrapStyle: {
        borderTopRightRadius: Sizes.fixPadding - 5.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
    },
    bottomWrapStyle: {
        flexDirection: 'row',
        marginBottom: Sizes.fixPadding + 3.0,
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding,
    },
    textFieldWrapStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        height: 48.0,
        justifyContent: 'center',
        flex: 1,
        paddingLeft: Sizes.fixPadding,
    },
    sendButtonStyle: {
        height: 40.0,
        width: 40.0,
        borderRadius: 20.0,
        backgroundColor: 'rgba(128, 128, 128, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding,
    },
})

MessageScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(MessageScreen);