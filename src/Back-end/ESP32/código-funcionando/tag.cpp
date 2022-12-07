#include <WiFiManager.h>
#include <Arduino.h>
#include <WiFi.h>
#include <iostream>
#include <WiFiClient.h>
#include "esp_wifi.h"
#define led 2

void setup()
{
  WiFi.mode(WIFI_STA);
  Serial.begin(9600);
  pinMode(led, OUTPUT);
  WiFiManager wm;
  bool res;
  res = wm.autoConnect("Configurar-ESP32", "");

  if (!res)
  {
    Serial.println("Failed to connect");
    digitalWrite(led, HIGH);
    delay(1000);
    digitalWrite(led, LOW);
    delay(1000);
    digitalWrite(led, HIGH);
    delay(1000);
    digitalWrite(led, LOW);
    delay(1000);
    ESP.restart();
  }
  else
  {
    Serial.println("connected :)");
    digitalWrite(led, HIGH);
    WiFi.softAP("Loc-1209", "$Inteli12345", 1);
    delay(500);
  }
}
String getBuzzer()
{
  HTTPClient http;

  http.begin("http://ip:3001/esp/buzzer/" + WiFi.macAddress());
  http.addHeader("Content-Type", "application/json");

  StaticJsonDocument<200> res;

  int httpResponseCode = http.GET();

  if (httpResponseCode > 0)
  {

    String response = http.getString();

    Serial.println(httpResponseCode);
    Serial.println(response);
    deserializeJson(res, response);

    String mac_adress = res["mac_address"];
    return mac_adress;
  }
}
void loop()
{
  Serial.println("Deu certo");
  delay(10000);
  String mac_addr = getBuzzer();

  if (mac_addr = "1")
  {
    tone(48, 250, 500);
  }
}