import mqtt from 'mqtt';

class MqttService {
  client: any;
  constructor() {
    this.client = null;
    this.connect();
  }

  connect() {
    this.client = mqtt.connect('ws://0.0.0.0:8083/mqtt');

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });
    this.client.on('error', (error) => {
      console.error('MQTT error:', error);
    });
  }

  publish(topic, message) {
    // console.log(`Published to topic ${topic}: ${message}`);
    this.client.publish(topic, message);
  }

  onMessage(callback) {
    this.client.on('message', (receivedTopic, receivedMessage) => {
      callback(receivedTopic, receivedMessage.toString());
    });
  }
}

export default new MqttService();
