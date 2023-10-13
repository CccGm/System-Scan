import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const Screen_2 = () => {
  const [Manufacturer, setManufacturer] = useState(null);
  const [BuildId, setBuildId] = useState(null);
  const [DeviceName, setDeviceName] = useState(null);
  const [ApiLevel, setApiLevel] = useState(null);
  const [UserAgent, setUserAgent] = useState(null);
  const [hasNotch, sethasNotch] = useState(null);
  const [IpAddress, setIpAddress] = useState(null);
  const [MacAddress, setMacAddress] = useState(null);
  const [BatteryLevel, setBatteryLevel] = useState(null);
  const [isLandscape, setisLandscape] = useState(null);
  const [isAirplaneMode, setisAirplaneMode] = useState(null);
  const [isBatteryCharging, setisBatteryCharging] = useState(null);
  const [isPinOrFingerprintSet, setisPinOrFingerprintSet] = useState(null);
  const [supportedAbis, setsupportedAbis] = useState(null);
  const [isLocationEnabled, setisLocationEnabled] = useState(null);
  const [isHeadphonesConnected, setisHeadphonesConnected] = useState(null);
  const [device, setdevice] = useState(null);
  const [Display, setDisplay] = useState(null);
  const [Fingerprint, setFingerprint] = useState(null);
  const [Hardware, setHardware] = useState(null);
  const [Host, setHost] = useState(null);
  const [Product, setProduct] = useState(null);
  const [Tags, setTags] = useState(null);
  const [PreviewSdkInt, setPreviewSdkInt] = useState(null);
  const [Codename, setCodename] = useState(null);
  const [Incremental, setIncremental] = useState(null);
  const [syncUniqueId, setsyncUniqueId] = useState(null);
  const [DeviceId, setDeviceId] = useState(null);
  const [getBundleId, setgetBundleId] = useState(null);
  const [SystemVersion, setSystemVersion] = useState(null);
  const [isTablet, setisTablet] = useState(null);
  const [ApplicationName, setApplicationName] = useState(null);
  const [InstanceId, setInstanceId] = useState(null);
  const [UsedMemory, setUsedMemory] = useState(null);
  const [SecurityPatch, setSecurityPatch] = useState(null);
  const [getTotalMemory, setgetTotalMemory] = useState(null);
  const [getTotalDiskCapacity, setgetTotalDiskCapacity] = useState(null);
  const [getFreeDiskStorage, setgetFreeDiskStorage] = useState(null);

  useEffect(() => {
    getDataAsync();
  }, []);

  const getDataAsync = async () => {
    try {
      await DeviceInfo.getManufacturer().then(data => setManufacturer(data));
      await DeviceInfo.getBuildId().then(data => setBuildId(data));
      await DeviceInfo.getDeviceName().then(data => setDeviceName(data));
      await DeviceInfo.getUsedMemory().then(data => setUsedMemory(data));
      await DeviceInfo.getUserAgent().then(data => setUserAgent(data));
      await DeviceInfo.getInstanceId().then(data => setInstanceId(data));

      let BundleId = await DeviceInfo.getBundleId();
      setgetBundleId(BundleId);
      let DeviceId = await DeviceInfo.getDeviceId();
      setDeviceId(DeviceId);
      let HasNotch = await DeviceInfo.hasNotch();
      sethasNotch(HasNotch);
      let SystemVersion = DeviceInfo.getSystemVersion();
      setSystemVersion(SystemVersion);

      await DeviceInfo.getIpAddress().then(data => setIpAddress(data));
      await DeviceInfo.getMacAddress().then(data => setMacAddress(data));
      await DeviceInfo.getApiLevel().then(data => setApiLevel(data));
      await DeviceInfo.getTotalMemory().then(data => setgetTotalMemory(data));
      await DeviceInfo.getTotalDiskCapacity().then(data =>
        setgetTotalDiskCapacity(data),
      );
      await DeviceInfo.getFreeDiskStorage().then(data =>
        setgetFreeDiskStorage(data),
      );
      await DeviceInfo.getBatteryLevel().then(data => setBatteryLevel(data));
      await DeviceInfo.isLandscape().then(data => setisLandscape(data));
      await DeviceInfo.isAirplaneMode().then(data => setisAirplaneMode(data));
      await DeviceInfo.isBatteryCharging().then(data =>
        setisBatteryCharging(data),
      );
      await DeviceInfo.isPinOrFingerprintSet().then(data =>
        setisPinOrFingerprintSet(data),
      );

      await DeviceInfo.isLocationEnabled().then(data =>
        setisLocationEnabled(data),
      );
      await DeviceInfo.isHeadphonesConnected().then(data =>
        setisHeadphonesConnected(data),
      );

      await DeviceInfo.getDevice().then(data => setdevice(data));
      await DeviceInfo.getDisplay().then(data => setDisplay(data));
      await DeviceInfo.getFingerprint().then(data => setFingerprint(data));
      await DeviceInfo.getHardware().then(data => setHardware(data));
      await DeviceInfo.getHost().then(data => setHost(data));
      await DeviceInfo.getProduct().then(data => setProduct(data));
      await DeviceInfo.getTags().then(data => setTags(data));
      await DeviceInfo.getPreviewSdkInt().then(data => setPreviewSdkInt(data));
      await DeviceInfo.getSecurityPatch().then(data => setSecurityPatch(data));
      await DeviceInfo.getCodename().then(data => setCodename(data));
      await DeviceInfo.getIncremental().then(data => setIncremental(data));
      await DeviceInfo.syncUniqueId().then(data => setsyncUniqueId(data));

      let Tablet = DeviceInfo.isTablet();
      setisTablet(Tablet);

      let applicationName = DeviceInfo.getApplicationName();
      setApplicationName(applicationName);
    } catch (e) {
      console.log('Trouble getting device info ', e);
    }
  };

  return (
    <View style={{flex: 1, borderWidth: 1, margin: 10, padding: 10}}>
      <Text
        style={{fontSize: 18, color: '#875383', fontWeight: 500, margin: 5}}>
        Screen 2
      </Text>
      <Text>Your Device :- {DeviceName}</Text>
      <Text>ApiLevel :- {ApiLevel}</Text>
      <Text>BuildId :- {BuildId}</Text>
      <Text>Manufacturer :- {Manufacturer}</Text>
      <Text>UserAgent :- {UserAgent}</Text>
      <Text>hasNotch :- {hasNotch ? 'Yes' : 'No'}</Text>
      <Text>IpAddress :- {IpAddress}</Text>
      {Platform.OS == 'ios' ? <Text>MacAddress :- {MacAddress}</Text> : null}
      <Text>BatteryLevel :- {BatteryLevel}</Text>
      <Text>isLandscape :- {isLandscape ? 'Yes' : 'No'}</Text>
      <Text>isAirplaneModeon :- {isAirplaneMode ? 'Yes' : 'No'}</Text>
      <Text>isBatteryCharging :- {isBatteryCharging ? 'Yes' : 'No'}</Text>
      <Text>
        isPinOrFingerprintSet :- {isPinOrFingerprintSet ? 'Yes' : 'No'}
      </Text>
      <Text>supportedAbis :- {supportedAbis}</Text>
      <Text>isLocationEnabled :- {isLocationEnabled ? 'Yes' : 'No'}</Text>
      <Text>
        isHeadphonesConnected :- {isHeadphonesConnected ? 'Yes' : 'No'}
      </Text>
      <Text>device :- {device}</Text>
      <Text>Display :- {Display}</Text>
      <Text>Fingerprint :- {Fingerprint}</Text>
      <Text>Hardware :- {Hardware}</Text>
      <Text>Host :- {Host}</Text>
      <Text>Product :- {Product}</Text>
      <Text>Tags :- {Tags}</Text>
      <Text>PreviewSdkInt :- {PreviewSdkInt}</Text>
      <Text>Codename :- {Codename}</Text>
      <Text>Incremental :- {Incremental}</Text>
      <Text>syncUniqueId :- {syncUniqueId}</Text>
      <Text>DeviceId :- {DeviceId}</Text>
      <Text>getBundleId :- {getBundleId}</Text>
      <Text>SystemVersion :- {SystemVersion}</Text>
      <Text>isTablet :- {isTablet ? 'Yes' : 'No'}</Text>
      <Text>ApplicationName :- {ApplicationName}</Text>
      <Text>InstanceId :- {InstanceId}</Text>
      <Text>SecurityPatch :- {SecurityPatch}</Text>

      <Text>TotalMemory :- {getTotalMemory}</Text>
      <Text>UsedMemory :- {UsedMemory}</Text>
      <Text>TotalDiskCapacity :- {getTotalDiskCapacity}</Text>
      <Text>FreeDiskStorage :- {getFreeDiskStorage}</Text>
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
