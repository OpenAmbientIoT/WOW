import {trim} from "@/assets/js/helpers/trim"
import {ACTV} from "@/assets/js/classes/events/EventsConfig";

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
                message_pieces.forEach(msg_piece => {
                    if (msg_piece.includes('tagId')) {
                        event.tag = msg_piece.replace('tagId=', '')
                    }
                    // TEMP_C, DBUG, ACTV, ...
                    if (msg_piece.includes('eventName')) {
                        event.name = msg_piece.replace('eventName=', '')
                    }
                    if (msg_piece.includes('eventValue')) {
                        event.value = Number.parseFloat(msg_piece.replace('eventValue=', '')).toFixed(1)
                        event.raw = msg_piece.replace('eventValue=', '')
                    }
                    if (msg_piece.includes('timestamp')) {
                        event.timestamp = parseInt(msg_piece.replace('timestamp=', ''))
                    }
                })
                // Skip ACTV with 0 values
                if (event.name === ACTV && (parseInt(event.value) === 0)) {
                    return  null
                }
                return event
            }
        }
        return null
    }
}
