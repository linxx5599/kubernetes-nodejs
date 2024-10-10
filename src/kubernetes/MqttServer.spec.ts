import mqtt from 'mqtt';
import MqttServer from './MqttServer';

jest.mock('mqtt');

describe('MqttServer', () => {
  let mockMqttConnect;

  beforeEach(() => {
    mockMqttConnect = {
      on: jest.fn(),
      publish: jest.fn(),
    };
    // 模拟 mqtt.connect 的返回值
    (mqtt.connect as jest.Mock).mockReturnValue(mockMqttConnect);
  });

  it('should connect to MQTT broker on instantiation', () => {
    expect(mqtt.connect).toHaveBeenCalledWith('ws://0.0.0.0:8083/mqtt');
    expect(mockMqttConnect.on).toHaveBeenCalledWith(
      'connect',
      expect.any(Function),
    );
    expect(mockMqttConnect.on).toHaveBeenCalledWith(
      'error',
      expect.any(Function),
    );
  });

  it('should publish a message', () => {
    const topic = 'testTopic';
    const message = 'testMessage';
    MqttServer.publish(topic, message);
    expect(mockMqttConnect.publish).toHaveBeenCalledWith(topic, message);
  });

  it('should call callback on receiving message', () => {
    const callback = jest.fn();
    MqttServer.onMessage(callback);
    const receivedTopic = 'receivedTopic';
    const receivedMessage = 'receivedMessage';
    mockMqttConnect.on.mock.calls[2][1](receivedTopic, receivedMessage);
    expect(callback).toHaveBeenCalledWith(
      receivedTopic,
      receivedMessage.toString(),
    );
  });
});
