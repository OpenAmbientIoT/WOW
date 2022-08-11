import {trim} from "@/assets/js/helpers/trim";

export default class MessageParser {
    constructor() {

    }

    static extract(string, type = 'events') {
        console.log('\n\nReceived message')
        console.log(string)
        //events,tagId=(01)00850027865010(21)00oeT4035,eventName=TEMP_C,eventValue=15.53504436835706,timestamp=1655924635
        const message_pieces = trim(string, '"').split(',')
        // Get only events
        if (type == 'events') {
            if (message_pieces[0] && message_pieces[0] == type) {
                const isTemp = message_pieces.some(msg => msg.includes('eventName=TEMP_C'))
                if (isTemp) {
                    const event = {}
                    message_pieces.forEach(msg => {
                        if (msg.includes('tagId')) {
                            event.tag = msg.replace('tagId=', '')
                        }
                        if (msg.includes('eventName')) {
                            event.name = msg.replace('eventName=', '')
                        }
                        if (msg.includes('eventValue')) {
                            event.value = Number.parseFloat(msg.replace('eventValue=', '')).toFixed(2)
                            event.raw = msg.replace('eventValue=', '')
                        }
                        if (msg.includes('timestamp')) {
                            event.timestamp = parseInt(msg.replace('timestamp=', ''))
                        }
                    })
                    return event
                }
            }
        }

        return null
    }

}
