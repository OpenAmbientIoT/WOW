<template>
  <WaveletProximityPacketComponent v-if="wavelet.event.name === PACKET
    && ('PVAL' in wavelet.event.value)" :wavelet="wavelet"></WaveletProximityPacketComponent>
  <WaveletPacketComponent v-if="wavelet.event.name === PACKET
    && !('PVAL' in wavelet.event.value)" :wavelet="wavelet"></WaveletPacketComponent>
  <WaveletComponent v-if="wavelet.event.name !== PACKET" :wavelet="wavelet"></WaveletComponent>
</template>

<script setup>
import {defineProps} from "vue"
import WaveletElement from "@/assets/js/classes/WaveletElement"
import WaveletComponent from "@/components/WaveletComponent"

import {PACKET} from "@/assets/js/classes/events/EventsConfig";
import WaveletPacketComponent from "@/components/WaveletPacketComponent"
import WaveletProximityPacketComponent from "@/components/WaveletProximityPacketComponent";

defineProps({
  wavelet: WaveletElement,
})
</script>

<style scoped>

</style>
