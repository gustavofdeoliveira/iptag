#include <Arduino.h>
#include <WiFi.h>
#include <iostream>
#include <WiFiClient.h>
#include "esp_wifi.h"


void setup() {
  Serial.begin(9600);
  WiFi.mode(WIFI_AP_STA);
  delay(100);
  WiFi.softAP("Localizador 1", "$Inteli12345", 1);
  delay(500);
}
void loop() {
  Serial.println("Deu certo");
  delay(10000);
}