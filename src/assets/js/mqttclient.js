import mqtt from 'mqtt/dist/mqtt'
import {generate} from "@/assets/js/helpers/id"
class ClientMQTT {

    constructor() {
        this.connection = {
            host: 'c4584ed806fd4a70bc09a60417504f7f.s1.eu.hivemq.cloud', //+
            //host: 'test.mosquitto.org',
            port: 8884, // +
            endpoint: '/mqtt',
            clean: true,
            connectTimeout: 4000,
            // reconnectPeriod value required if reconnection needed
            // Connection (and data receiving) can be interrupted if used more than one app instance simultaneously
            // This interruption can be a specific broker limitation (Hive) or, maybe, websockets itself
            reconnectPeriod: 10,
            clientId: 'client-id-' + generate() + '-' + generate(),
            username: 'testuser',
            password: 'password',
        }
        this.subscription = {
            topic: 'TELEMETRY',
            qos: 0,
        }
        //this.publish = {
        //    topic: 'topic/from_browser',
        //    qos: 0,
        //    payload: '{ "msg": "Hello" }',
        //}

        this.receivedMessages = ''
        this.qosList = [
            {label: 0, value: 0},
            {label: 1, value: 1},
            {label: 2, value: 2},
        ]
        this.client = {
            connected: false,
        }
        this.subscribeSuccess = false

        this.data = new Map()
    }

    onConnectionLost() {
        console.log('onConnectionLost');
    }
    createConnection(callback, statusInformer) {
        const {host, port, endpoint, ...options} = this.connection
        const connectUrl = `wss://${host}:${port}${endpoint}`
        try {
            this.client = mqtt.connect(connectUrl, options)
            mqtt.onConnectionLost = this.onConnectionLost;
        } catch (error) {
            console.log('mqtt.connect error', error)
        }
        this.client.on('connect', () => {
            if (typeof statusInformer == 'function') {
                statusInformer('orange')
            }
            console.log('Connection succeeded!')
        })
        this.client.on('onConnectionLost', () => {
            console.log('Connection lost!!')
        })
        this.client.on('error', error => {
            console.log('Connection failed', error)
        })
        this.client.on('message', (topic, message) => {
            // Not required
            //this.receivedMessages = this.receivedMessages.concat(message)

            // Here is strange that message encoded... to UTF8 chars codes?
            let msg = new TextDecoder().decode(message)
                //decodeURIComponent(escape(String.fromCharCode(...message)));
            // Do something with message (render)
            if (typeof callback == 'function') {
                callback(msg)
            }

            if (typeof statusInformer == 'function') {
                statusInformer('green')
            }

            //console.log(`Received message ${msg} from topic ${topic}`)
        })
    }

    doSubscribe() {
        const {topic, qos} = this.subscription
        this.client.subscribe(topic, qos, (error, res) => {
            if (error) {
                console.log('Subscribe to topics error', error)
                return
            }
            this.subscribeSuccess = true
            console.log('Subscribe to topics res', res)
        })
    }

    doUnSubscribe() {
        const {topic} = this.subscription
        this.client.unsubscribe(topic, error => {
            if (error) {
                console.log('Unsubscribe error', error)
            }
        })
    }

    doPublish() {
        const {topic, qos, payload} = this.publish
        this.client.publish(topic, payload, qos, error => {
            if (error) {
                console.log('Publish error', error)
            }
        })
    }

    destroyConnection() {
        if (this.client.connected) {
            try {
                this.client.end()
                this.client = {
                    connected: false,
                }
                console.log('Successfully disconnected!')
            } catch (error) {
                console.log('Disconnect failed', error.toString())
            }
        }
    }
}


const mqttclient = new ClientMQTT()

export default mqttclient
