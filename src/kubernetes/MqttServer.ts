import { MQTT_URI } from 'config/constant';
import mqtt from 'mqtt';

class MqttService {
  client: mqtt.MqttClient;
  constructor() {
    this.client = null;
    this.connect();
  }

  connect() {
    this.client = mqtt.connect(MQTT_URI);

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
