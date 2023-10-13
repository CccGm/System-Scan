import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const Screen_2 = () => {
  const [asyncDeviceInfo, setAsyncDeviceInfo] = useState({});

  const [Manufacturer, setManufacturer] = useState(null);
  const [BuildId, setBuildId] = useState(null);
  const [DeviceName, setDeviceName] = useState(null);
  const [ApiLevel, setApiLevel] = useState(null);
  const [UserAgent, setUserAgent] = useState(null);
  const [InstallReferrer, setInstallReferrer] = useState(null);
  const [installerPackageName, setinstallerPackageName] = useState(null);
  const [hasNotch, sethasNotch] = useState(null);
  const [SerialNumber, setSerialNumber] = useState(null);
  const [IpAddress, setIpAddress] = useState(null);
  const [MacAddress, setMacAddress] = useState(null);
  const [PhoneNumber, setPhoneNumber] = useState(null);
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
  const [getDeviceToken, setgetDeviceToken] = useState(null);
  const [DeviceId, setDeviceId] = useState(null);
  const [getBundleId, setgetBundleId] = useState(null);
  const [SystemVersion, setSystemVersion] = useState(null);
  const [BuildNumber, setBuildNumber] = useState(null);
  const [Model, setModel] = useState(null);

  let deviceJSON = {};

  // deviceJSON.systemVersion = DeviceInfo.getSystemVersion().then(data =>
  //   setSystemVersion(data),
  // );
  // DeviceInfo.getBuildNumber().then(data => setBuildNumber(data));
  deviceJSON.isTablet = DeviceInfo.isTablet();
  deviceJSON.appName = DeviceInfo.getApplicationName();
  deviceJSON.brand = DeviceInfo.getBrand();

  useEffect(() => {
    getDataAsync();
  }, []);

  const getDataAsync = async () => {
    let deviceJSON = {};
    try {
      // await DeviceInfo.getModel().then(data => setModel(data));

      await DeviceInfo.getManufacturer().then(data => setManufacturer(data));
      await DeviceInfo.getBuildId().then(data => setBuildId(data));
      // deviceJSON.isCameraPresent = await DeviceInfo.isCameraPresent();
      await DeviceInfo.getDeviceName().then(data => setDeviceName(data));
      // deviceJSON.usedMemory = await DeviceInfo.getUsedMemory();
      await DeviceInfo.getUserAgent().then(data => setUserAgent(data));
      // deviceJSON.instanceId = await DeviceInfo.getInstanceId();
      await DeviceInfo.getInstallReferrer().then(data =>
        setInstallReferrer(data),
      );
      let BundleId = await DeviceInfo.getBundleId();
      setgetBundleId(BundleId);
      let DeviceId = await DeviceInfo.getDeviceId();
      setDeviceId(DeviceId);
      await DeviceInfo.getInstallerPackageName().then(data =>
        setinstallerPackageName(data),
      );
      // deviceJSON.isEmulator = await DeviceInfo.isEmulator();
      // deviceJSON.fontScale = await DeviceInfo.getFontScale();
      let HasNotch = await DeviceInfo.hasNotch();
      sethasNotch(HasNotch);
      // deviceJSON.firstInstallTime = await DeviceInfo.getFirstInstallTime();
      // deviceJSON.lastUpdateTime = await DeviceInfo.getLastUpdateTime();
      await DeviceInfo.getSerialNumber().then(data => setSerialNumber(data));
      // deviceJSON.androidId = await DeviceInfo.getAndroidId();
      await DeviceInfo.getIpAddress().then(data => setIpAddress(data));
      // For MacAddress add android.permission.ACCESS_WIFI_STATE
      await DeviceInfo.getMacAddress().then(data => setMacAddress(data));
      // For phoneNumber add android.permission.READ_PHONE_STATE
      await DeviceInfo.getPhoneNumber().then(data => setPhoneNumber(data));
      await DeviceInfo.getApiLevel().then(data => setApiLevel(data));
      // deviceJSON.carrier = await DeviceInfo.getCarrier();
      // deviceJSON.totalMemory = await DeviceInfo.getTotalMemory();
      // deviceJSON.maxMemory = await DeviceInfo.getMaxMemory();
      // deviceJSON.totalDiskCapacity = await DeviceInfo.getTotalDiskCapacity();
      // deviceJSON.totalDiskCapacityOld =
      //   await DeviceInfo.getTotalDiskCapacityOld();
      // deviceJSON.freeDiskStorage = await DeviceInfo.getFreeDiskStorage();
      // deviceJSON.freeDiskStorageOld = await DeviceInfo.getFreeDiskStorageOld();
      await DeviceInfo.getBatteryLevel().then(data => setBatteryLevel(data));
      await DeviceInfo.isLandscape().then(data => setisLandscape(data));
      await DeviceInfo.isAirplaneMode().then(data => setisAirplaneMode(data));
      await DeviceInfo.isBatteryCharging().then(data =>
        setisBatteryCharging(data),
      );

      await DeviceInfo.isPinOrFingerprintSet().then(data =>
        setisPinOrFingerprintSet(data),
      );
      await DeviceInfo.supportedAbis().then(data => setsupportedAbis(data));
      // deviceJSON.hasSystemFeature = await DeviceInfo.hasSystemFeature(
      //   'android.software.webview',
      // );
      // deviceJSON.getSystemAvailableFeatures =
      //   await DeviceInfo.getSystemAvailableFeatures();
      // deviceJSON.powerState = await DeviceInfo.getPowerState();
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
      // deviceJSON.type = await DeviceInfo.getType();

      await DeviceInfo.getPreviewSdkInt().then(data => setPreviewSdkInt(data));
      // deviceJSON.securityPatch = await DeviceInfo.getSecurityPatch();
      await DeviceInfo.getCodename().then(data => setCodename(data));
      await DeviceInfo.getIncremental().then(data => setIncremental(data));

      await DeviceInfo.syncUniqueId().then(data => setsyncUniqueId(data));

      await DeviceInfo.getDeviceToken().then(data => setgetDeviceToken(data));
    } catch (e) {
      console.log('Trouble getting device info ', e);
    }
    // eslint-disable-next-line react/no-did-mount-set-state
    setAsyncDeviceInfo(deviceJSON);
  };

  return (
    <View style={{flex: 1, borderWidth: 1, margin: 10, padding: 10}}>
      <Text
        style={{fontSize: 18, color: '#875383', fontWeight: 500, margin: 5}}>
        Screen 2
      </Text>
      <Text>
        Your Device :- {DeviceName} ApiLevel :- {ApiLevel}
      </Text>
      <Text>BuildId :- {BuildId}</Text>
      <Text>Manufacturer :- {Manufacturer}</Text>
      <Text>UserAgent :- {UserAgent}</Text>
      <Text>InstallReferrer :- {InstallReferrer}</Text>
      <Text>installerPackageName :- {installerPackageName}</Text>
      <Text>hasNotch :- {hasNotch ? 'Yes' : 'No'}</Text>
      <Text>SerialNumber :- {SerialNumber}</Text>
      <Text>IpAddress :- {IpAddress}</Text>
      <Text>MacAddress :- {MacAddress}</Text>
      <Text>PhoneNumber :- {PhoneNumber}</Text>
      <Text>BatteryLevel :- {BatteryLevel}</Text>
      <Text>isLandscape :- {isLandscape ? 'Yes' : 'No'}</Text>
      <Text>isAirplaneMode :- {isAirplaneMode ? 'Yes' : 'No'}</Text>
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
      <Text>getDeviceToken :- {getDeviceToken}</Text>
      <Text>DeviceId :- {DeviceId}</Text>
      <Text>getBundleId :- {getBundleId}</Text>
      <Text>SystemVersion :- {SystemVersion}</Text>
      <Text>BuildNumber :- {BuildNumber}</Text>
      <Text>Model :- {Model}</Text>
      <ScrollView>
        <Text
          style={{
            textAlign: 'left',
            color: '#333333',
            margin: 5,
            fontSize: 14,
            color: '#370657aa',
          }}>
          {JSON.stringify(deviceJSON, null, '  ')}
        </Text>
      </ScrollView>
    </View>
  );
};
