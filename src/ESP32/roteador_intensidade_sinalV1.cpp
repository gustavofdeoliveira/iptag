#include <Arduino.h>
#include <WiFi.h>
#include <iostream>
#include <WiFiClient.h>

int blueLed = 10;

void setup() {
  Serial.begin(115200);
  pinMode(blueLed, OUTPUT);
}
void loop() {
  int locAchado = 0;
  int n = WiFi.scanNetworks();
  Serial.println("scan done");
  if (n == 0) {
      Serial.println("no networks found");
  } else {
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i) {
      // Print SSID and RSSI for each network found
      if (WiFi.SSID(i) == "Localizador 1") {
        if (WiFi.RSSI(i) >= (-50)) {
          locAchado ++;
        }
      }
    }
    if (locAchado != 0) {
      digitalWrite(blueLed, HIGH);
    }
    else {
      digitalWrite(blueLed, LOW);
    }
  }

  // Wait a bit before scanning again


}