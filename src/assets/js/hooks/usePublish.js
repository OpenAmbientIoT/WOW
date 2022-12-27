import {ref} from 'vue'
import useSimulation from "@/assets/js/hooks/useSimulation";

export default function usePublish() {
    const enablePublish = ref(false)

    const publishLoop = function (mqttClient, eventsTypes, idsMap) {
        if (!enablePublish.value) { return false }
        const {generateMessage} = useSimulation()
        const message = generateMessage(eventsTypes, idsMap.value)
        mqttClient.doPublish(message)
        setTimeout(function () {
            publishLoop(mqttClient, eventsTypes, idsMap)
        }, 1)

    }

    return {enablePublish, publishLoop}
}

