<template>
  <WaveletPacketComponent v-if="wavelet.event.name === PACKET" :wavelet="wavelet"></WaveletPacketComponent>
  <WaveletComponent v-else :wavelet="wavelet"></WaveletComponent>
</template>

<script setup>
import {defineProps} from "vue"
import WaveletElement from "@/assets/js/classes/WaveletElement"
import WaveletComponent from "@/components/WaveletComponent"
import WaveletPacketComponent from "@/components/WaveletPacketComponent"
import {PACKET} from "@/assets/js/classes/events/EventsConfig";
defineProps({
  wavelet: WaveletElement,
})
</script>

<style scoped>

</style>
