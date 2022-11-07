#include <Arduino.h>
#include <WiFi.h>
#include <iostream>
#include <WiFiClient.h>
#include "esp_wifi.h"

int greenLed = 10;
int redLed = 16;
int blueLed = 17;


void setup() {
  // put your setup code here, to run once:
  pinMode(greenLed, OUTPUT);
  pinMode(redLed, OUTPUT);
  pinMode(blueLed, OUTPUT);
  Serial.begin(115200);
  WiFi.mode(WIFI_AP_STA);
  delay(100);
  WiFi.softAP("Meu ESP32", "$Inteli12345");
  delay(500);
  WiFi.begin("Cel's Galaxy A53 5G", "qhvz8247");
  while(WiFi.status() != WL_CONNECTED) {
    digitalWrite(redLed, HIGH);
    delay(500);
    digitalWrite(redLed, LOW);
  }
}
void loop() {
  
  if(WiFi.status() == WL_CONNECTED) {
    Serial.println("Conectado!");
    delay(100);
    Serial.println(WiFi.softAPIP());
    Serial.println(WiFi.localIP());
    digitalWrite(redLed, LOW);
    digitalWrite(greenLed, HIGH);
    delay(300);
    while (WiFi.status() == WL_CONNECTED) {
      if (WiFi.softAPgetStationNum() != 0) {
        digitalWrite(blueLed, HIGH);
        wifi_sta_list_t wifi_sta_list;
        tcpip_adapter_sta_list_t adapter_sta_list;
      
        memset(&wifi_sta_list, 0, sizeof(wifi_sta_list));
        memset(&adapter_sta_list, 0, sizeof(adapter_sta_list));
      
        esp_wifi_ap_get_sta_list(&wifi_sta_list);
        tcpip_adapter_get_sta_list(&wifi_sta_list, &adapter_sta_list);
      
        for (int i = 0; i < adapter_sta_list.num; i++) {
      
          tcpip_adapter_sta_info_t station = adapter_sta_list.sta[i];
      
          Serial.print("station nr ");
          Serial.println(i);
      
          Serial.print("MAC: ");
      
          for(int i = 0; i< 6; i++){
            
            Serial.printf("%02X", station.mac[i]);  
            if(i<5)Serial.print(":");
          }
      
          Serial.print("\nIP: ");  
          Serial.println(station.ip.addr);    
        }
      
        Serial.println("-----------");
        delay(1000);
      }
      else {
        digitalWrite(blueLed, LOW);
      }
    }
  } else if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Desconectado!");
    Serial.println("Buscando redes...");
    int n = WiFi.scanNetworks();
    Serial.println(n);
    digitalWrite(greenLed, LOW);
    digitalWrite(redLed, HIGH);
    while (WiFi.status() != WL_CONNECTED) {
      WiFi.begin("Cel's Galaxy A53 5G", "qhvz8247");
      delay(1000);
    }
  }

}