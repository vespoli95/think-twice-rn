import './global.css';
import React from 'react';

import AppList from './app/src/screens/AppList';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Button} from 'react-native';

function HomeScreen({navigation}): React.JSX.Element {
  return (
    <View>
      <Button
        title="Select apps..."
        onPress={() => navigation.navigate('AppList', {name: 'Jane'})}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="AppList"
          component={AppList}
          options={{title: 'App List'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
