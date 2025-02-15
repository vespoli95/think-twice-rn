import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
  Animated,
  ScrollView,
  TextInput,
} from 'react-native';
import {AndroidApplicationInfo} from '../../../types';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import NativeAppList from '../../../specs/NativeAppList';

const storage = new MMKVLoader().initialize();

const Configure = ({navigation, route}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedApps, setSelectedApps] = useMMKVStorage<
    AndroidApplicationInfo[]
  >('selectedApps', storage, []);
  const [delay, setDelay] = useMMKVStorage<number>('delay', storage, 3);

  const installedApps = NativeAppList.getInstalledApps()
    .filter(app => app)
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  const toggleAppSelection = (app: AndroidApplicationInfo) => {
    setSelectedApps(prevSelected =>
      prevSelected.some(
        selectedApp => selectedApp.packageName === app.packageName,
      )
        ? prevSelected.filter(
            selectedApp => selectedApp.packageName !== app.packageName,
          )
        : [...prevSelected, app],
    );
  };

  const handleDelayChange = (value: string) => {
    const numericValue = parseInt(value, 10);
    setDelay(isNaN(numericValue) ? 0 : numericValue);
  };

  const renderAppItem = ({
    item,
  }: ListRenderItemInfo<AndroidApplicationInfo>) => {
    console.log({item});
    return (
      <TouchableOpacity
        onPress={() => toggleAppSelection(item)}
        className="flex-row items-center p-4 border-b border-gray-200 active:bg-gray-100">
        <View className="flex-row items-center flex-1">
          <View
            className={`w-6 h-6 rounded-full border-2 mr-4 ${
              selectedApps.some(app => app.packageName === item.packageName)
                ? 'bg-blue-500 border-blue-500'
                : 'border-gray-300'
            }`}
          />
          <Text className="text-lg font-semibold text-gray-800">
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white px-4">
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className="flex-row items-center justify-between p-4 bg-gray-50 rounded-lg mt-4">
        <Text className="text-lg font-semibold text-gray-800">
          Select apps ({selectedApps.length} selected)
        </Text>
        <Text className="text-lg">{isOpen ? '▼' : '▶'}</Text>
      </TouchableOpacity>

      {isOpen && (
        <FlatList
          data={installedApps}
          keyExtractor={item => item.packageName}
          renderItem={renderAppItem}
          className="flex-1 max-h-96 border border-gray-200 rounded-lg mt-2 overflow-hidden"
        />
      )}

      <View className="mt-4 p-4 bg-gray-50 rounded-lg">
        <Text className="text-lg font-semibold text-gray-800 mb-2">
          Delay Settings
        </Text>
        <View className="flex-row items-center">
          <TextInput
            value={delay?.toString()}
            onChangeText={handleDelayChange}
            keyboardType="numeric"
            className="flex-1 h-12 px-4 border border-gray-300 rounded-lg bg-white"
            placeholder="Enter delay in seconds"
          />
          <Text className="ml-2 text-gray-600">seconds</Text>
        </View>
      </View>
    </View>
  );
};

export default Configure;
