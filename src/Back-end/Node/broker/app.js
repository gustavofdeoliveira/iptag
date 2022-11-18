var mqtt = require('mqtt')

var options = {
    host: '1c683afd49234e988798ebd57eba20af.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'gabcarneiro',
    password: 'gtes^OVZfB6r'
}

// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('BCIBotao1');
