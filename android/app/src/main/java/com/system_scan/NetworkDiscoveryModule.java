package com.system_scan;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.Resources;
import android.net.NetworkInfo;
import android.net.wifi.WifiManager;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;
import com.system_scan.portauthority.Host;
import com.system_scan.portauthority.MainAsyncResponse;
import com.system_scan.portauthority.ScanHostsAsyncTask;
import com.system_scan.portauthority.Wireless;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.concurrent.atomic.AtomicInteger;

public class NetworkDiscoveryModule extends ReactContextBaseJavaModule {
    private static final int TIMER_INTERVAL = 1500;
    private static final String DEFAULT_HOST_SOCKET_TIMEOUT = "500";
    private static final long VIBRATE = 250L;
    private Handler scanHandler;
    private final java.util.List<Host> mHosts = Collections.synchronizedList(new ArrayList<>());

    Wireless wifi = new Wireless(getCurrentActivity());

    public NetworkDiscoveryModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NetworkDiscoveryModule";
    }

    @SuppressLint("LongLogTag")
    @ReactMethod
    public void getNetworkDiscovery2() {
        Log.e("getNetworkDiscovery2 => ", "Called");
        mHosts.clear();
        scanHandler = new Handler(Looper.getMainLooper());
        Wireless wifi = new Wireless(getCurrentActivity());
        NetworkInfo info = getCurrentActivity().getIntent().getParcelableExtra(WifiManager.EXTRA_NETWORK_INFO);

        if (info != null) {
            getNetworkInfo(info, wifi);
        }

        Resources resources = getCurrentActivity().getResources();
        try {
            if (!wifi.isEnabled()) {
                Log.e("getNetworkDiscovery2 => ", resources.getString(R.string.wifiDisabled));
            }
            if (!wifi.isConnectedWifi()) {
                Log.e("getNetworkDiscovery2 => ", resources.getString(R.string.notConnectedWifi));
            }
        } catch (Wireless.NoWifiManagerException | Wireless.NoConnectivityManagerException e) {
            Log.e("getNetworkDiscovery2 => ", resources.getString(R.string.failedWifiManager));
        }

        int numSubnetHosts;
        try {
            numSubnetHosts = wifi.numberOfHostsInWifiSubnet();
            Log.e("numSubnetHosts", String.valueOf(numSubnetHosts));
        } catch (Wireless.NoWifiManagerException e) {
            Log.e("getNetworkDiscovery2 => ", resources.getString(R.string.failedSubnetHosts));
            return;
        }

        try {
            final int[] progressInt = {0};
            String ip = String.valueOf(wifi.getInternalWifiIpAddress(wifi.getType()));
            new ScanHostsAsyncTask(getCurrentActivity().getApplicationContext(), new MainAsyncResponse() {

                @Override
                public void processFinish(Host hostEntry, AtomicInteger numberOfHosts) {
                    scanHandler.post(() -> {
                        if (hostEntry != null) {
                            mHosts.add(hostEntry);
                            getReactApplicationContext()
                                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                    .emit("onNetworkHostUpdate", new Gson().toJson(hostEntry));
                            Log.e("Hosts => ", new Gson().toJson(mHosts));
                        }
                        Log.e("Host Count => ", " (" + mHosts.size() + ")");
                    });
                }

                @Override
                public void processFinish(int progress) throws JSONException {
                    progressInt[0] += progress;
                    Log.e("Progress => ", String.valueOf(progressInt[0]));
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("progressCount", progressInt[0]);
                    jsonObject.put("isFinished", false);
                    getReactApplicationContext()
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("onNetworkProgress", jsonObject.toString());
                }

                @Override
                public void processFinish(String externalIp) {
                    Log.e("externalIp => ", String.valueOf(externalIp));
                }

                @Override
                public void processFinish(boolean isFinished) throws JSONException {
                    if (isFinished) {
                        Log.e("Hosts => ", new Gson().toJson(mHosts));
                        JSONObject jsonObject = new JSONObject();
                        jsonObject.put("progressCount", -1);
                        jsonObject.put("isFinished", true);
                        getReactApplicationContext()
                                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("onNetworkProgress", jsonObject.toString());

                        Vibrator vibrator = (Vibrator) getCurrentActivity().getSystemService(Context.VIBRATOR_SERVICE);
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                            vibrator.vibrate(VibrationEffect.createOneShot(VIBRATE, VibrationEffect.DEFAULT_AMPLITUDE));
                        } else {
                            vibrator.vibrate(200);
                        }
                    }
                }

                @Override
                public <T extends Throwable> void processFinish(T output) {
                    Log.e("Exception => ", output != null ? output.getLocalizedMessage() : "");
                }
            }).executeOnExecutor(
                    AsyncTask.THREAD_POOL_EXECUTOR,
                    Integer.valueOf(ip),
                    wifi.getInternalWifiSubnet(),
                    Integer.parseInt(DEFAULT_HOST_SOCKET_TIMEOUT)
            );
        } catch (UnknownHostException e) {
            Log.e("getNetworkDiscovery2 => ", resources.getString(R.string.notConnectedWifi));
        } catch (Wireless.NoWifiManagerException e) {
            Log.e("getNetworkDiscovery2 => ", resources.getString(R.string.notConnectedWifi));
        }
        try {
            String wifiSsid = wifi.getSSID();
            String wifiBssid = wifi.getSSID();
            Log.e("ssid", wifiSsid);
            Log.e("bssid", wifiBssid);
        } catch (Wireless.NoWifiManagerException e) {
            Log.e("getNetworkInfo => ", resources.getString(R.string.failedSsid));
        }

    }

    private void getNetworkInfo(NetworkInfo info, Wireless wifi) {
        setupMac(wifi);

        Resources resources = getCurrentActivity().getResources();
        try {
            boolean enabled = wifi.isEnabled();
            if (!info.isConnected() || !enabled) {
                Log.e("getNetworkInfo => ", Wireless.getInternalMobileIpAddress());
            }
            if (!enabled) {
                Log.e("getNetworkInfo => ", resources.getString(R.string.wifiDisabled));
            }
        } catch (Wireless.NoWifiManagerException e) {
            Log.e("getNetworkInfo => ", resources.getString(R.string.failedWifiManager));
        }
        if (!info.isConnected()) {
            Log.e("getNetworkInfo => ", resources.getString(R.string.noWifiConnection));
        }

        Handler signalHandler = new Handler();
        signalHandler.postDelayed(new Runnable() {
            @Override
            public void run() {
                try {
                    int speed = wifi.getLinkSpeed();
                    int signal = wifi.getSignalStrength();
                    Log.e("getNetworkInfo => ", String.format(resources.getString(R.string.signalLink), signal, speed));
                    signalHandler.postDelayed(this, TIMER_INTERVAL);
                } catch (Wireless.NoWifiManagerException e) {
                    Log.e("getNetworkInfo => ", resources.getString(R.string.failedLinkSpeed));
                }
            }
        }, 0);
    }

    private void setupMac(Wireless wifi) {
        String macAddress = "";
        try {
            if (!wifi.isEnabled()) {
                macAddress = getCurrentActivity().getString(R.string.wifiDisabled);
                return;
            }
            String mac = wifi.getMacAddress();
            macAddress = mac;
        } catch (UnknownHostException e) {
            macAddress = getCurrentActivity().getString(R.string.noWifiConnection);
        } catch (SocketException e) {
            macAddress = getCurrentActivity().getString(R.string.noWifiConnection);
        } catch (Wireless.NoWifiManagerException e) {
            macAddress = getCurrentActivity().getString(R.string.noWifiConnection);
        } catch (Wireless.NoWifiInterface e) {
            macAddress = getCurrentActivity().getString(R.string.noWifiInterface);
        } finally {
            Log.e("setupMac => ", macAddress);
        }
    }
}
