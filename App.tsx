import './global.css';
import React from 'react';
import {ScrollView, Text} from 'react-native';

import NativeAppList from './specs/NativeAppList';
import AppList from './app/src/components/AppList';

import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import {AndroidApplicationInfo} from './types';
const storage = new MMKVLoader().initialize();

function App(): React.JSX.Element {
  const [selectedApps, setSelectedApps] = useMMKVStorage<
    AndroidApplicationInfo[]
  >('selectedApps', storage, []);

  const handleAppSelection = async (apps: AndroidApplicationInfo[]) => {
    console.log('Saving selected apps');
    setSelectedApps(apps);
  };

  // remove nulls
  const installedApps = NativeAppList.getInstalledApps().filter(app => app);

  console.log(selectedApps);

  return (
    <ScrollView style={{flex: 1}}>
      <Text className="font-bold text-2xl mb-5">Home</Text>
      <AppList
        apps={installedApps}
        handleAppSelection={handleAppSelection}
        selectedApps={selectedApps}
      />
    </ScrollView>
  );
}

export default App;
