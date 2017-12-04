import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'Flashcards:Notification';

export async function clearLocalNotification() {
  await AsyncStorage.removeItem(NOTIFICATION_KEY);
  return Notifications.cancelAllScheduledNotificationsAsync;
}

const createNotification = () => ({
  title: 'Study',
  body: "Don't forget to study today.",
  ios: {
    sound: true,
  },
});

export async function setLocalNotification() {
  const rawData = await AsyncStorage.getItem(NOTIFICATION_KEY);
  const data = JSON.parse(rawData);
  if (data !== null) {
    return;
  }
  const status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    return;
  }
  Notifications.cancelAllScheduledNotificationsAsync;
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(20);
  tomorrow.setMinutes(0);
  Notifications.scheduleLocalNotificationAsync(createNotification(), {
    time: tomorrow,
    repeat: 'day',
  });
  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
}
