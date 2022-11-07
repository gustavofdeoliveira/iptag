#include <Arduino.h>
#include <WiFi.h>

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_AP_STA);
  delay(500);
  WiFi.begin("Meu ESP32", "$Inteli12345");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void loop() {
  if(WiFi.status() == WL_CONNECTED) {
    Serial.println("Conectado!");
    delay(500);
  }
  else if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Desconectado!");
    Serial.println("Buscando redes...");
    int n = WiFi.scanNetworks();
    Serial.println(n);
    while (WiFi.status() != WL_CONNECTED) {
      WiFi.begin("Meu ESP32", "$Inteli12345");
      delay(1000);
    }
  }
}