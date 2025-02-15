import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
  ScrollView,
} from 'react-native';
import {AndroidApplicationInfo} from '../../../types';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import NativeAppList from '../../../specs/NativeAppList';
const storage = new MMKVLoader().initialize();

const AppList = ({navigation, route}) => {
  const [selectedApps, setSelectedApps] = useMMKVStorage<
    AndroidApplicationInfo[]
  >('selectedApps', storage, []);

  const installedApps = NativeAppList.getInstalledApps().filter(app => app);

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

  const renderAppItem = ({
    item,
  }: ListRenderItemInfo<AndroidApplicationInfo>) => (
    <ScrollView style={{flex: 1}}>
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
    </ScrollView>
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={installedApps}
        keyExtractor={item => item.packageName}
        renderItem={renderAppItem}
        className="flex-1"
      />
    </View>
  );
};

export default AppList;
