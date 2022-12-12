#include <WiFiManager.h>
#include <Arduino.h>
#include <WiFi.h>
#include <iostream>
#include <WiFiClient.h>
#include "esp_wifi.h"

#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

#define led 2
#define buzzer 8

//MQTT Server
const char* BROKER_MQTT = "8c714ce31a3c43c8ba932790cd7e6ddd.s1.eu.hivemq.cloud"; //URL do broker MQTT que se deseja utilizar
int BROKER_PORT = 8883; // Porta do Broker MQTT

WiFiClientSecure wifiClient;

#define ID_MQTT  "BCI02"             //Informe um ID unico e seu. Caso sejam usados IDs repetidos a ultima conexão irá sobrepor a anterior.
#define TOPIC_SUBSCRIBE "BUZZER"   //Informe um Tópico único. Caso sejam usados tópicos em duplicidade, o último irá eliminar o anterior.
PubSubClient MQTT(wifiClient);        // Instancia o Cliente MQTT passando o objeto espClient


void setup() {
  WiFi.mode(WIFI_STA);
  Serial.begin(9600);
  pinMode(led, OUTPUT);
  WiFiManager wm;
  bool res;
  res = wm.autoConnect("Configurar-ESP32", "");

  if (!res) {
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
  else {
    Serial.println("connected :)");
    digitalWrite(led, HIGH);
    WiFi.softAP("Loc-1209", "$Inteli12345", 1);
    delay(500);
  }
  
  wifiClient.setInsecure();
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);
  MQTT.setCallback(callback);
}

void conectaMQTT() {
  while (!MQTT.connected()) {
    Serial.print("Conectando ao Broker MQTT: ");
    Serial.println(BROKER_MQTT);
    if (MQTT.connect(ID_MQTT, "gabcarneiro", "gtes^OVZfB6r")) {
      Serial.println("Conectado ao Broker com sucesso!");
      MQTT.subscribe(TOPIC_SUBSCRIBE);
    }
    else {
      Serial.println("Noo foi possivel se conectar ao broker.");
      Serial.println("Nova tentatica de conexao em 10s");
      delay(10000);
    }
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  String response;

  //obtem a string do payload recebido
  for(int i = 0; i < length; i++) {
    char c = (char)payload[i];
    response += c;
  }

  StaticJsonDocument<200> res;
  deserializeJson(res, msg);
  
  String mac = res["mac_address"];
  Serial.println(mac);
  
  if (mac == WiFi.macAddress()) {
    tone(8, 200, 200);
  }
  
}

void loop() {
  if (!MQTT.connected()) {
    conectaMQTT();
  }
        
  	
  delay(10000);
}
