import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  NativeModules,
  Button,
  DeviceEventEmitter,
  Platform,
  NativeEventEmitter
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {CalendarModule, Counter} = NativeModules;
  const CounterEvents = new NativeEventEmitter(Counter);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('EventReminder', (event) => {
      console.log('Received event:', event);
    });

    return () => {
      subscription.remove()
    }
  }, []);

  useEffect(() => {
    CounterEvents.addListener("onIncrement", (result) => {
      console.log("result of increment ", result)
    })
    CounterEvents.addListener("onDecrement", (result) => {
      console.log("result of decrement ", result)
    })
    CounterEvents.addListener("continuousEvent", (result) => {
      console.log("continuous event result ", result)
    })

    return () => {
      CounterEvents.removeAllListeners("onIncrement")
      CounterEvents.removeAllListeners("onDecrement")
      CounterEvents.removeAllListeners("continuousEvent")
    }
  }, [])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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

  const workWithIosPromise = async () => {
    try {
      const promiseMessage = await Counter.decrement();
      console.log("promise message: ", promiseMessage);
    } catch(e) {
      console.log("error is: ", e)
    }
  }

  const incrementCounterIOS = () => {
    Counter.increment((count: number) => {
      console.log("Count after increment: ", count)
    });
  }

  const startContinuousEventIOS = () => {
    Counter.startEventsContinuously();
  }

  const stopContinuousEventIOS = () => {
    Counter.stopSendingContinuously();
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
      <Button title='Promise ios decrement' onPress={Platform.OS === 'ios' ? workWithIosPromise : ()=>{}} />
      <Button title='IOS increment' onPress={Platform.OS === 'ios' ? incrementCounterIOS : ()=>{}} />
      <Button title='start continuous event ios' onPress={Platform.OS === 'ios' ? startContinuousEventIOS : ()=>{}} />
      <Button title='stop continuous event ios' onPress={Platform.OS === 'ios' ? stopContinuousEventIOS : ()=>{}} />
    </SafeAreaView>
  );
}

export default App;
