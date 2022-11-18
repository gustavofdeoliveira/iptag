#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <WiFi.h>

#include <iostream>
#include <string>

const char* SSID = "REDE WIFI";    
const char* PASSWORD = "SENHA";   
int locAchado = 0;
                    
WiFiClientSecure wifiClient;
PubSubClient MQTT(wifiClient);

//MQTT Server
const char* BROKER_MQTT = "1c683afd49234e988798ebd57eba20af.s1.eu.hivemq.cloud"; //URL do broker MQTT que se deseja utilizar
int BROKER_PORT = 8883;                      // Porta do Broker MQTT

#define ID_MQTT  "BCI02"            
#define TOPIC_SUBSCRIBE "BCIBotao1"  

//Declaração das Funções
void mantemConexoes();  //Garante que as conexoes com WiFi e MQTT Broker se mantenham ativas
void conectaWiFi();     //Faz conexão com WiFi
void conectaMQTT();     //Faz conexão com Broker MQTT
void recebePacote(char* topic, byte* payload, unsigned int length);

void taskDois (void* param) {
  while (true) {
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
  }
  }
}


void setup() {
  pinMode(pinLED1, OUTPUT);         

  Serial.begin(115200);

    pinMode(14, INPUT);

  conectaWiFi();

  wifiClient.setInsecure(); 
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);  

}

bool gustavo = true; 

void loop() {
  mantemConexoes();
  while (gustavo) {
    int n = WiFi.scanNetworks();
    Serial.println("scan done");
    if (n == 0) {
      Serial.println("no networks found");
    } else {
      //Serial.print(n);
      //Serial.println(" networks found");
      for (int i = 0; i < n; ++i) {
        std::string ssid = (WiFi.SSID(i)).c_str();
        std::string ssidEl = ssid.substr(0, 11);

      // Print SSID and RSSI for each network found
        if (ssidEl == "Localizador") {
          if (WiFi.RSSI(i) >= -80) {
            locAchado += 1;
            gustavo = false; 
        }
      }
    }
  }

  
  }
  delay(1000);
  MQTT.loop();
  if (locAchado == 1) {
      MQTT.beginPublish(TOPIC_SUBSCRIBE, 1, false);
      MQTT.print(locAchado);
      MQTT.endPublish();
  }
  gustavo = true;
  locAchado=0; 
}

void mantemConexoes() {
    if (!MQTT.connected()) {
       conectaMQTT(); 
    }
    
    conectaWiFi(); //se não há conexão com o WiFI, a conexão é refeita
}

void conectaWiFi() {

  if (WiFi.status() == WL_CONNECTED) {
     return;
  }
        
  Serial.print("Conectando-se na rede: ");
  Serial.print(SSID);
  Serial.println("  Aguarde!");

  WiFi.begin(SSID, PASSWORD); // Conecta na rede WI-FI  
  while (WiFi.status() != WL_CONNECTED) {
      delay(100);
      Serial.print(".");
  }
  
  Serial.println();
  Serial.print("Conectado com sucesso, na rede: ");
  Serial.print(SSID);  
  Serial.print("  IP obtido: ");
  Serial.println(WiFi.localIP()); 
}

void conectaMQTT() { 
    while (!MQTT.connected()) {
        Serial.print("Conectando ao Broker MQTT: ");
        Serial.println(BROKER_MQTT);
        if (MQTT.connect(ID_MQTT, "gabcarneiro", "gtes^OVZfB6r")) {
            Serial.println("Conectado ao Broker com sucesso!");
            
        } 
        else {
            Serial.println("Noo foi possivel se conectar ao broker.");
            Serial.println("Nova tentatica de conexao em 10s");
            delay(10000);
        }
    }
}