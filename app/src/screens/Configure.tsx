import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
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
  const [delay, setDelay] = useMMKVStorage<string>('delay', storage, '3');

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

  const incrementDelay = () => {
    const currentDelay = parseInt(delay || '0', 10);
    const newDelay = Math.min(60, currentDelay + 1);
    setDelay(String(newDelay));
  };

  const decrementDelay = () => {
    const currentDelay = parseInt(delay || '0', 10);
    const newDelay = Math.max(1, currentDelay - 1);
    setDelay(String(newDelay));
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
          <TouchableOpacity
            onPress={decrementDelay}
            className="w-12 h-12 bg-gray-200 rounded-l-lg items-center justify-center active:bg-gray-300">
            <Text className="text-2xl text-gray-600">-</Text>
          </TouchableOpacity>

          <View className="h-12 px-4 bg-white border-t border-b border-gray-300 justify-center min-w-[60px]">
            <Text className="text-center text-lg font-semibold">
              {delay || '0'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={incrementDelay}
            className="w-12 h-12 bg-gray-200 rounded-r-lg items-center justify-center active:bg-gray-300">
            <Text className="text-2xl text-gray-600">+</Text>
          </TouchableOpacity>

          <Text className="ml-3 text-gray-600">seconds</Text>
        </View>
      </View>
    </View>
  );
};

export default Configure;
