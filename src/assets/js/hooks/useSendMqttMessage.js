import {ref} from 'vue'

export default function useSendMqttMessage() {
    const mqttMessageToSend = ref('Enter a message to send')

    function sendMqttMessage(mqttClient) {
        console.log('MQTT message sent (published)')
        mqttClient.doPublish(mqttMessageToSend.value)
    }

    return { mqttMessageToSend, sendMqttMessage }
}

