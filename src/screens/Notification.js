import OneSignal from 'react-native-onesignal'

export const Notification = ( userId , contents) =>{
    var contents = {'en': contents};
    var data = {};
    var playerIds = userId;
    var other = { 'android_sound':'notification' , 'android_visibility':1 , 'large_icon':'ic_stat_onesignal_default'};
    OneSignal.postNotification(contents,data,playerIds,other)
}
