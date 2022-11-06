import {ref} from 'vue'
import useSimulation from "@/assets/js/hooks/useSimulation";
import mqttclient from "@/assets/js/mqttclient";

export default function usePublish() {
    const enablePublish = ref(false)

    const publishLoop = function (eventsTypes, idsMap) {
        if (!enablePublish.value) { return false }
        const {generateMessage} = useSimulation()
        const message = generateMessage(eventsTypes, idsMap.value)
        mqttclient.doPublish(message)
        setTimeout(function () {
            publishLoop(eventsTypes, idsMap)
        }, 1)

    }

    return {enablePublish, publishLoop}
}

