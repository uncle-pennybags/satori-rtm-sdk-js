var RTM = require("satori-rtm-sdk");

var endpoint = 'wss://open-data.api.satori.com';
var appkey = 'YOUR_APPKEY';
var channelName = 'YOUR_CHANNEL'

var client = new RTM(endpoint, appkey);

client.on('enter-connected', function () {
  console.log('Connected to Satori RTM!');
});

client.on('error', function (e) {
  console.log('Failed to connect', e);
});

var channel = client.subscribe(channelName, RTM.SubscriptionMode.SIMPLE);

channel.on('enter-subscribed', function () {
  console.log('Subscribed to: ' + channel.subscriptionId);
});

channel.on('rtm/subscription/data', function (pdu) {
  pdu.body.messages.forEach(function (msg) {
    console.log('Got message:', msg);
  });
});

channel.on('rtm/subscribe/error', function (pdu) {
  console.log('Failed to subscribe. RTM replied with the error ' +
      pdu.body.error + ': ' + pdu.body.reason);
});

channel.on('rtm/subscription/error', function (pdu) {
  console.log('Subscription failed. RTM sent the unsolicited error ' +
      pdu.body.error + ': ' + pdu.body.reason);
});

client.start();
