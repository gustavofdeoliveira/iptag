#include <Arduino.h>
#include <WiFi.h>
#include <iostream>
#include <WiFiClient.h>

#include <ArduinoJson.h>
#include <HTTPClient.h>

#define SEVIDOR_ENVIO "http://192.168.183.104:3001/device/move"

const char* SSIDS = "Cel's Galaxy A53 5G";
const char* PWD = "qhvz8247";
HTTPClient http; 

void postDataToServer(String macAddressLoc) {
 
  Serial.println("Posting JSON data to server...");
  // Block until we are able to connect to the WiFi access point
  // HTTPClient http;   
     
  // http.begin("http://192.168.183.104:3001/device/move");  
  // http.addHeader("Content-Type", "application/json");         
     
  StaticJsonDocument<200> doc;
  // Add values in the document
  //
  doc["mac_address_router"] = WiFi.macAddress();
  doc["mac_address_moved"] = macAddressLoc;
  // Add an array.
  //
  JsonArray data = doc.createNestedArray("data");
    
     
  String requestBody;
  serializeJson(doc, requestBody);
     
  int httpResponseCode = http.POST(requestBody);
 
    if(httpResponseCode>0){
       
      String response = http.getString();                       
       
      Serial.println(httpResponseCode);   
      Serial.println(response);
     
    }
     
}

void EnviarDados(String macAddLoc) {
     Serial.println("Enviei o MACADRESS");
     Serial.println(macAddLoc);
    //DadosConexao();
    postDataToServer(macAddLoc);       
}


void setup() {
  Serial.begin(115200);

  WiFi.begin(SSIDS,PWD);
  while (WiFi.status() != WL_CONNECTED) {
      Serial.print("Tentando novamente!");
      delay(500);
  }

  http.begin("http://192.168.183.104:3001/device/move");  
  http.addHeader("Content-Type", "application/json");  
}

void loop() {
  int n = WiFi.scanNetworks();

  Serial.println("MEU WIFI: ");
  Serial.print(WiFi.macAddress());

  Serial.println("scan done");
  
  if (n == 0) {
      Serial.println("no networks found");
  } else {
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i) {
      // Print SSID and RSSI for each network found
      
      std::string ssid = (WiFi.SSID(i)).c_str();
      std::string ssidInitials = ssid.substr(0, 4);

      char ssidIniti[ssidInitials.length() + 1]; 

      strcpy(ssidIniti, ssidInitials.c_str()); 
      if (WiFi.SSID(i) == "Loc-1209") {
        Serial.println("Achei!");
        Serial.println(WiFi.RSSI(i));
        if (WiFi.RSSI(i) >= (-30)) {
          Serial.println("MAC ADRESS ENCONTRADO: "); 
          Serial.print(WiFi.BSSIDstr(i));
          String BSSID = (WiFi.BSSIDstr(i)); 
          EnviarDados(BSSID);
          delay(1000); 
          ESP.restart();
        }
      } 
    }
  }

  // Wait a bit before scanning again
  delay(100);

}