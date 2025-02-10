import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';
import {AndroidApplicationInfo} from '../types';

export interface Spec extends TurboModule {
  getInstalledApps(): AndroidApplicationInfo[];
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeAppList');
