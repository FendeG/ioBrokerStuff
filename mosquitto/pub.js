var mqtt = require('mqtt')

const host = 'mqtt://192.168.2.16';
var options = {
    // port: 15255,
    host: host,
    clientId: 'node_' + Math.random().toString(16).substr(2, 8),
    username: 'frank',
    password: 'Test@1234',
    keepalive: 60,
    reconnectPeriod: 1000,
    // protocolId: 'MQIsdp',
    // protocolVersion: 3,
    // clean: true,
    // encoding: 'utf8'
};

var client = mqtt.connect(host, options)


//
//
//
client.on('connect', function () {
    console.log('Connected to ' + host);

    //
    //
    //
    client.subscribe('presence', function (err) {
        if (!err) {
            client.publish('presencefdh', 'Hello mqtt test from Frank')
        } else {
            console.log('connect error : ' + JSON.stringify(err))
        }
    })

    //
    // 
    //
    client.subscribe('topic1', function (err) {
        if (err) {
            return console.log('Error subscribe topic1 : ' + JSON.stringify(err));
        }
        // when a message arrives, do something with it
        client.on('message', function (topic, message, packet) {
            console.log("Received '" + message + "' on '" + topic + "'");
            console.log('packet : ' + JSON.stringify(packet));
            console.log('Buffer  : ' + packet.payload.toString());
        });
    });

})

//
// global
//
client.on('message', function (topic, message) {
    // message is Buffer
    console.log('Message received: ' + message.toString())
    // client.end()
})

//
//
//
client.on('error', function (err) {
    console.log('Error : ' + JSON.stringify(err));
});