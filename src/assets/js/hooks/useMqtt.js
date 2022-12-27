import {ref} from 'vue'
import mqtt from 'mqtt/dist/mqtt'
import {generate} from "@/assets/js/helpers/id"


// TODO
export default function useMqtt() {
    // todo probably it's not necessary to use ref()s since we are updating settings on a call (@change)
    const mqttHost = ref('common.wow.equipment')
    const mqttPort = ref(9001)
    const mqttEnpoint = '/mqtt'
    const mqttClean = true
    const mqttTimeout = 4000 //ms
    const mqttReconnect = ref(10) //ms
    const mqttClientPrefix = 'common-wss-client-'
    const mqttUsername = ref('common')
    const mqttPassword = ref('UO!hE#!CtYb9O6eQ')
    const mqttTopic = ref('common/telemetry')



    // Singleton?
    const mqttClient = {
        client: {
            connected: false,
        },
        connection: {
            host: mqttHost.value,
            port: mqttPort.value,
            endpoint: mqttEnpoint,
            clean: mqttClean,
            connectTimeout: mqttTimeout,
            // reconnectPeriod value required if reconnection needed
            // Connection (and data receiving) can be interrupted if used more than one app instance simultaneously
            // This interruption can be a specific broker limitation (Hive) or, maybe, websockets itself
            reconnectPeriod: mqttReconnect.value,
            // Important to use random client or guarantee that only instance of the client existing
            clientId: mqttClientPrefix + generate() + '-' + generate(),
            username: mqttUsername.value,
            password: mqttPassword.value,
        },

        subscription: {
            topic: mqttTopic.value,
            qos: 0,
        },

        publish: {
            topic: mqttTopic.value,
            qos: 0,
        },

        qosList: [
            {label: 0, value: 0},
            {label: 1, value: 1},
            {label: 2, value: 2},
        ],

        data: new Map(),

        onConnectionLost: function () {
            console.log('Connection lost');
        },

        createConnection: function (onMessageCallback, statusInformer) {
            console.log('Connecting...')
            const {host, port, endpoint, ...options} = this.connection
            const connectUrl = `wss://${host}:${port}${endpoint}`
            try {
                this.client = mqtt.connect(connectUrl, options)
                mqtt.onConnectionLost = this.onConnectionLost;
                console.log(mqttClient)
            } catch (error) {
                console.log('mqtt.connect error', error)
            }
            this.client.on('connect', () => {
                console.log('👍 Connection succeeded!')
                if (typeof statusInformer == 'function') {
                    statusInformer('blue')
                }
            })
            this.client.on('onConnectionLost', () => {
                console.log('🤨 Connection lost!')
                if (typeof statusInformer == 'function') {
                    statusInformer('yellow')
                }
            })
            this.client.on('error', error => {
                console.log('🤬 Connection failed!', error)
                this.doUnSubscribe()
                this.destroyConnection()
                if (typeof statusInformer == 'function') {
                    statusInformer('red')
                }
            })
            this.client.on('message', (topic, message) => {
                if (!this.client.connected) {
                    return false;
                }
                // Not required
                //this.receivedMessages = this.receivedMessages.concat(message)

                // Here is strange that message encoded... to UTF8 chars codes?
                let msg = new TextDecoder().decode(message)
                //decodeURIComponent(escape(String.fromCharCode(...message)));
                // Do something with message (render)
                if (typeof onMessageCallback == 'function') {
                    onMessageCallback(msg)
                }

                if (typeof statusInformer == 'function') {
                    statusInformer('green')
                }
            })
        },

        doSubscribe: function () {
            const {topic, qos} = this.subscription
            this.client.subscribe(topic, qos, (error, res) => {
                if (error) {
                    console.log('Subscribe to topics error!', error)
                    return
                }
                this.subscribeSuccess = true
                console.log('Subscribe to topics res', res)
            })
        },

        doUnSubscribe: function () {
            if (this.client.connected && typeof this.client.unsubscribe === 'function') {
                console.log('Unsubscribing...')
                const {topic} = this.subscription
                this.client.unsubscribe(topic, error => {
                    if (error) {
                        console.log('Unsubscribe error!', error)
                    }
                })
            }
        },

        doPublish: function (payload) {
            const {topic, qos} = this.publish
            this.client.publish(topic, payload, qos, error => {
                if (error) {
                    console.log('Publish error!', error)
                }
            })
        },

        destroyConnection: function () {
            console.log('Destroying connection...')
            
                try {
                    this.client.end()
                    this.client = {
                        connected: false,
                    }
                    console.log('🔌 Successfully disconnected!')
                } catch (error) {
                    console.log('Disconnect failed!', error.toString())
                    console.log('Already disconnected!?')
                }

        },

        updateSettings: function () {
            console.log('Updating settings...')
            this.connection = {
                host: mqttHost.value,
                port: mqttPort.value,
                endpoint: mqttEnpoint,
                clean: mqttClean,
                connectTimeout: mqttTimeout,
                // reconnectPeriod value required if reconnection needed
                // Connection (and data receiving) can be interrupted if used more than one app instance simultaneously
                // This interruption can be a specific broker limitation (Hive) or, maybe, websockets itself
                reconnectPeriod: mqttReconnect.value,
                // Important to use random client or guarantee that only instance of the client existing
                clientId: mqttClientPrefix + generate() + '-' + generate(),
                username: mqttUsername.value,
                password: mqttPassword.value,
            }

            this.subscription.topic = mqttTopic.value
            this.publish.topic = mqttTopic.value

            console.log('Settings updated...')
        },
    }

    const updateMqttSettings = function () {
        mqttClient.doUnSubscribe()
        mqttClient.destroyConnection()
        mqttClient.updateSettings()
    }

    return {
        mqttHost,
        mqttPort,
        mqttUsername,
        mqttPassword,
        mqttTopic,
        mqttClient,
        updateMqttSettings,
    }
}

