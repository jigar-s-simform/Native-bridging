import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  NativeModules,
  Button,
  DeviceEventEmitter
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('EventReminder', (event) => {
      console.log('Received event:', event);
    });

    return () => {
      subscription.remove()
    }
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const {CalendarModule, Counter} = NativeModules;

  const handler = async () => {
    try {
      // const promiseValue = await CalendarModule.createCalendarEvent();
      // console.log("promise value ", promiseValue);

      CalendarModule.getEventsContinuously()

      // ios
      // console.log("counter module ", Counter);
      // console.log("constants exported ", Counter.getConstants());
      // Counter.increment(count => {
      //   console.log("count obtained ", count);
      // })
    } catch(e: unknown) {
        console.log(e);
    }
  }

  const getConstants = () => {
    console.log("FirstConstant ", CalendarModule.FirstConstant)
  }

  const stopReceivingEvents = () => {
    CalendarModule.stopContinuousEvents()
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Button title='Ye hi hai wo' onPress={handler} />
      <Button title='Ye hi hai wo stop button' onPress={stopReceivingEvents} />
      <Button title='Get constants' onPress={getConstants} />
    </SafeAreaView>
  );
}

export default App;
