import './global.css';
import React from 'react';
import Configure from './app/src/screens/Configure';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, TouchableOpacity} from 'react-native';
import Loader from './app/src/screens/Loader';

function HomeScreen({navigation}): React.JSX.Element {
  return (
    <View className="flex-1 bg-white p-6">
      {/* Welcome Section */}
      <View className="mb-12 mt-4">
        <Text className="text-4xl tracking-tight font-extrabold text-gray-800 mb-3">
          Welcome to ThinkTwice
        </Text>
        <Text className="  text-gray-600 text-xl tracking-wide font-light">
          Take a moment to pause and reflect
        </Text>
      </View>

      {/* Navigation Buttons */}
      <View className="space-y-4">
        <TouchableOpacity
          onPress={() => navigation.navigate('Configure')}
          className="p-6 bg-blue-50 rounded-2xl active:bg-blue-100">
          <Text className="text-xl tracking-wide font-bold text-gray-800 mb-2">
            Configure
          </Text>
          <Text className="text-gray-600 text-base font-light">
            Set up your preferences
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Loader')}
          className="p-6 bg-purple-50 rounded-2xl active:bg-purple-100">
          <Text className="text-xl tracking-wide font-bold text-gray-800 mb-2">
            Take a Break
          </Text>
          <Text className="text-gray-600 text-base font-light">
            Start your mindful pause
          </Text>
        </TouchableOpacity>
      </View>
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
          name="Configure"
          component={Configure}
          options={{title: 'Configure'}}
        />
        <Stack.Screen name="Loader" component={Loader} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
