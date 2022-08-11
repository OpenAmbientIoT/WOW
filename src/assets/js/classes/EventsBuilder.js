import {trim} from "@/assets/js/helpers/trim"

export default class EventsBuilder {
    constructor() {
    }


    static parse(string, eventsTypes) {
        //events,tagId=(01)00850027865010(21)00oeT4035,eventName=TEMP_C,eventValue=15.53504436835706,timestamp=1655924635
        const message_pieces = trim(string, '"').split(',')

        // Get only events
        if (message_pieces[0] && message_pieces[0] == 'events') {

            // Iterate over events and check if message belongs to an enabled
            let isEventEnabled = false
            eventsTypes.forEach((eventType) => {
                const messageHasEvent = message_pieces.some(msg => msg.includes('eventName=' + eventType.name))
                if (eventType.enabled && messageHasEvent) {
                    isEventEnabled = true
                }
            })


            if (isEventEnabled) {
                const event = {}
                message_pieces.forEach(msg => {
                    if (msg.includes('tagId')) {
                        event.tag = msg.replace('tagId=', '')
                    }
                    // TEMP_C, DBUG, ACTV, ...
                    if (msg.includes('eventName')) {
                        event.name = msg.replace('eventName=', '')
                    }
                    if (msg.includes('eventValue')) {
                        event.value = Number.parseFloat(msg.replace('eventValue=', '')).toFixed(1)
                        event.raw = msg.replace('eventValue=', '')
                    }
                    if (msg.includes('timestamp')) {
                        event.timestamp = parseInt(msg.replace('timestamp=', ''))
                    }
                })
                return event
            }
        }
        return null
    }
}
