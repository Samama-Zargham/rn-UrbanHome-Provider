import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import bottomTabBarScreen from "./components/bottomTabBarScreen";
import LoadingScreen from "./components/loadingScreen";
import loginScreen from "./screens/auth/loginScreen";
import otpScreen from "./screens/auth/otpScreen";
import bookingRequestScreen from "./screens/bookingRequest/bookingRequestScreen";
import editProfileScreen from "./screens/editProfile/editProfileScreen";
import messageScreen from "./screens/message/messageScreen";
import nextBookingRequestDetailScreen from "./screens/nextBookingRequestDetail/nextBookingRequestDetailScreen";
import privacyPolicyScreen from "./screens/privacyPolicy/privacyPolicyScreen";
import splashScreen from "./screens/splashScreen";
import supportScreen from "./screens/support/supportScreen";
import termsOfUseScreen from "./screens/termsOfUse/termsOfUseScreen";
import upcomingBookingDetailScreen from "./screens/upcomingBookingDetail/upcomingBookingDetailScreen";

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  Splash: splashScreen,
  mainFlow: createStackNavigator({
    Login: loginScreen,
    Otp: otpScreen,
    BottomTabBar: bottomTabBarScreen,
    BookingRequest: bookingRequestScreen,
    NextBookingRequestDetail: nextBookingRequestDetailScreen,
    UpcomingBookingDetail: upcomingBookingDetailScreen,
    Message: messageScreen,
    EditProfile: editProfileScreen,
    PrivacyPolicy: privacyPolicyScreen,
    TermsOfUse: termsOfUseScreen,
    Support: supportScreen,
  }),
},
  {
    initialRouteName: 'Loading',
  });

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App />
  );
};
