import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const initialState = {
  Manufacturer: null,
  BuildId: null,
  DeviceName: null,
  ApiLevel: null,
  UserAgent: null,
  hasNotch: null,
  IpAddress: null,
  MacAddress: null,
  BatteryLevel: null,
  isLandscape: null,
  isAirplaneMode: null,
  isBatteryCharging: null,
  isPinOrFingerprintSet: null,
  supportedAbis: null,
  isLocationEnabled: null,
  isHeadphonesConnected: null,
  device: null,
  Display: null,
  Fingerprint: null,
  Hardware: null,
  Host: null,
  Product: null,
  Tags: null,
  PreviewSdkInt: null,
  Codename: null,
  Incremental: null,
  syncUniqueId: null,
  DeviceId: null,
  getBundleId: null,
  SystemVersion: null,
  isTablet: null,
  ApplicationName: null,
  InstanceId: null,
  UsedMemory: null,
  SecurityPatch: null,
  getTotalMemory: null,
  getTotalDiskCapacity: null,
  getFreeDiskStorage: null,
};

export const Screen_3 = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    getDataAsync();
  }, []);

  const getDataAsync = async () => {
    try {
      const data = await Promise.all([
        DeviceInfo.getManufacturer(),
        DeviceInfo.getBuildId(),
        DeviceInfo.getDeviceName(),
        DeviceInfo.getUsedMemory(),
        DeviceInfo.getUserAgent(),
        DeviceInfo.getInstanceId(),
      ]);

      setState(prevState => ({
        ...prevState,
        ...Object.fromEntries(
          data.map((item, index) => [Object.keys(initialState)[index], item]),
        ),
      }));

      if (Platform.OS === 'ios') {
        const macAddress = await DeviceInfo.getMacAddress();
        setState(prevState => ({...prevState, MacAddress: macAddress}));
      }

      const [
        BundleId,
        DeviceId,
        HasNotch,
        SystemVersion,
        IpAddress,
        ApiLevel,
        TotalMemory,
        TotalDiskCapacity,
        FreeDiskStorage,
        BatteryLevel,
        isLandscape,
        isAirplaneMode,
        isBatteryCharging,
        isPinOrFingerprintSet,
        isLocationEnabled,
        isHeadphonesConnected,
        device,
        Display,
        Fingerprint,
        Hardware,
        Host,
        Product,
        Tags,
        PreviewSdkInt,
        Codename,
        Incremental,
        syncUniqueId,
        Tablet,
        applicationName,
      ] = await Promise.all([
        DeviceInfo.getBundleId(),
        DeviceInfo.getDeviceId(),
        DeviceInfo.hasNotch(),
        DeviceInfo.getSystemVersion(),
        DeviceInfo.getIpAddress(),
        DeviceInfo.getApiLevel(),
        DeviceInfo.getTotalMemory(),
        DeviceInfo.getTotalDiskCapacity(),
        DeviceInfo.getFreeDiskStorage(),
        DeviceInfo.getBatteryLevel(),
        DeviceInfo.isLandscape(),
        DeviceInfo.isAirplaneMode(),
        DeviceInfo.isBatteryCharging(),
        DeviceInfo.isPinOrFingerprintSet(),
        DeviceInfo.isLocationEnabled(),
        DeviceInfo.isHeadphonesConnected(),
        DeviceInfo.getDevice(),
        DeviceInfo.getDisplay(),
        DeviceInfo.getFingerprint(),
        DeviceInfo.getHardware(),
        DeviceInfo.getHost(),
        DeviceInfo.getProduct(),
        DeviceInfo.getTags(),
        DeviceInfo.getPreviewSdkInt(),
        DeviceInfo.getCodename(),
        DeviceInfo.getIncremental(),
        DeviceInfo.syncUniqueId(),
        DeviceInfo.isTablet(),
        DeviceInfo.getApplicationName(),
      ]);

      setState(prevState => ({
        ...prevState,
        getBundleId: BundleId,
        DeviceId: DeviceId,
        hasNotch: HasNotch,
        SystemVersion: SystemVersion,
        IpAddress: IpAddress,
        ApiLevel: ApiLevel,
        getTotalMemory: TotalMemory,
        getTotalDiskCapacity: TotalDiskCapacity,
        getFreeDiskStorage: FreeDiskStorage,
        BatteryLevel: BatteryLevel,
        isLandscape: isLandscape,
        isAirplaneMode: isAirplaneMode,
        isBatteryCharging: isBatteryCharging,
        isPinOrFingerprintSet: isPinOrFingerprintSet,
        isLocationEnabled: isLocationEnabled,
        isHeadphonesConnected: isHeadphonesConnected,
        device: device,
        Display: Display,
        Fingerprint: Fingerprint,
        Hardware: Hardware,
        Host: Host,
        Product: Product,
        Tags: Tags,
        PreviewSdkInt: PreviewSdkInt,
        Codename: Codename,
        Incremental: Incremental,
        syncUniqueId: syncUniqueId,
        isTablet: Tablet,
        ApplicationName: applicationName,
      }));
    } catch (e) {
      console.log('Trouble getting device info ', e);
    }
  };

  return (
    <View style={{flex: 1, borderWidth: 1, margin: 10, padding: 10}}>
      <Text
        style={{fontSize: 18, color: '#875383', fontWeight: '500', margin: 5}}>
        Screen 2
      </Text>
      {Object.entries(state).map(([key, value]) => (
        <Text key={key}>
          {key} :- {value}
        </Text>
      ))}
      <ScrollView>
        <Text
          style={{
            textAlign: 'left',
            color: '#333333',
            margin: 5,
            fontSize: 14,
            color: '#370657aa',
          }}>
          {/* {JSON.stringify(abc,null, '  ')} */}
        </Text>
      </ScrollView>
    </View>
  );
};
