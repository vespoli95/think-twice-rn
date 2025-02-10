import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import {Button, Checkbox} from 'react-native-paper';
import {AndroidApplicationInfo} from '../../../types';

const AppList = (props: {
  apps: AndroidApplicationInfo[];
  handleAppSelection: (selectedApps: AndroidApplicationInfo[]) => void;
  selectedApps: AndroidApplicationInfo[];
}) => {
  const [selectedApps, setSelectedApps] = useState<AndroidApplicationInfo[]>(
    props.selectedApps,
  );
  console.log({selectedApps});

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
      className="flex-row items-center p-4 border-b border-gray-200">
      <Checkbox
        status={
          selectedApps.some(app => app.packageName === item.packageName)
            ? 'checked'
            : 'unchecked'
        }
        onPress={() => toggleAppSelection(item)}
      />
      <View className="ml-4">
        <Text className="text-lg font-semibold">{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={props.apps}
        keyExtractor={item => item.packageName}
        renderItem={renderAppItem}
      />
      <Button onPress={() => props.handleAppSelection(selectedApps)}>
        Save
      </Button>
    </View>
  );
};

export default AppList;
