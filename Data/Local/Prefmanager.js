import AsyncStorage from '@react-native-community/async-storage';
const Locationkey = '@Location:key';
const LANGUAGE_KEY = '@Language'
import DeviceInfo from 'react-native-device-info';
export default class Prefmanager {
    async GetUserLocation(OnSuccess, OnError) {
        try {
            const getlocation = await AsyncStorage.getItem(Locationkey);
            var LocationsData = JSON.parse(getlocation);
            if (LocationsData.Status == true) {
                LocationsData.Locations.map((Location) => {
                    if (Location.Default == true) {
                        OnSuccess(Location)
                    }
                });
            } else {
                OnError(global.currentLanguage.Nodefaultlocationfound)
            }
        } catch (error) {
            OnError(error.message)
        }
    }
    async UserSession(OnSuccess, OnError) {
        try {
            getsession = await AsyncStorage.getItem('@Session:key');
            Session = await JSON.parse(getsession);
            OnSuccess(Session)
        } catch (error) {
            OnError(null)
        }
    }

    async getRequestdata(Onsuccess) {
        var Loc;
        var Sess;
        var Deviceid;
        try {
            const getlocation = await AsyncStorage.getItem(Locationkey);
            var LocationsData = JSON.parse(getlocation);
            if (LocationsData.Status == true) {
                LocationsData.Locations.map((Location) => {
                    if (Location.Default == true) {
                        Loc = Location
                    }
                });
            } else {
                Loc = null
            }
        } catch (error) {
            Loc = null
        }
        try {
            getsession = await AsyncStorage.getItem('@Session:key');
            Session = await JSON.parse(getsession);
            Sess = Session
        } catch (error) {
            Sess = 0
        }
        try {
            Deviceid = await AsyncStorage.getItem('@Deviceid:key');
        } catch (error) {

        }
        //alert(JSON.stringify(Loc))
        var data = { 'Session': Sess, 'Location': [Loc], 'Deviceid': Deviceid }
        Onsuccess(data)

    }
  
 
}