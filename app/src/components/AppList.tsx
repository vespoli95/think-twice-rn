import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import {AndroidApplicationInfo} from '../../../types';

const AppList = (props: {
  apps: AndroidApplicationInfo[];
  handleAppSelection: (selectedApps: AndroidApplicationInfo[]) => void;
  selectedApps: AndroidApplicationInfo[];
}) => {
  const [selectedApps, setSelectedApps] = useState<AndroidApplicationInfo[]>(
    props.selectedApps,
  );

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
        <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={props.apps}
        keyExtractor={item => item.packageName}
        renderItem={renderAppItem}
        className="flex-1"
      />
      <TouchableOpacity
        onPress={() => props.handleAppSelection(selectedApps)}
        className="m-4 p-4 bg-blue-500 rounded-lg active:bg-blue-600">
        <Text className="text-white text-center font-semibold text-lg">
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppList;
