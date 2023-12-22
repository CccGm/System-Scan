package com.system_scan.portauthority;

import java.io.IOException;
import java.net.InetAddress;

public interface Resolver {

    String[] resolve(InetAddress ip) throws IOException;

    void close();

}
