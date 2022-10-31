import {ACTV, PACKET} from "@/assets/js/classes/events/EventsConfig";


export default function useSimulation() {
    const generateMessage = function(eventsTypes) {
        //events,tagId=(01)00850027865010(21)00oeT4035,eventName=TEMP_C,eventValue=15.53504436835706,timestamp=1655924635
        const min = 4000
        const max = 5026
        const min_t = 15
        const max_t = 27
        const tag = '(01)00850027865010(21)00oeT' + (Math.floor(Math.random() * (max - min) + min)).toString()
        let value = (Math.random() * (max_t - min_t) + min_t).toFixed(4)
        // Get random event type from the list
        const eventsType = eventsTypes[Math.floor(Math.random() * eventsTypes.length)];
        if (eventsType.name === ACTV) {
            value = Math.round((Math.random()))
        }
        if (eventsType.name === PACKET) {
            value = '{"TEMP":"' + (Math.random() * (max_t - min_t) + min_t).toFixed(4) + '"' + '&#44;' + '"RSSI":"70"}'
            console.log(value)
        }
        return 'events,tagId=' + tag + ',eventName=' + eventsType.name + ',eventValue=' + value + ',timestamp=' + Date.now()
    }



    return { generateMessage }

}