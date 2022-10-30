<!-- Temperature -->
<template>
  <div v-if="wavelet.event.name == TEMP_C"
       :class="'shine' + (wavelet.options.fadein ? ' shine_fadein' : '' ) + (wavelet.options.fadeout ? ' shine_fadeout' : '' )"
       :style="('left:' + (wavelet.x - wavelet.diskSize*1/2) + 'px; top:' + (wavelet.y - wavelet.diskSize*1/2) + 'px;')
           + ('width: ' + wavelet.diskSize*1 + 'px;' + 'height: ' + wavelet.diskSize*1 + 'px;') + ('background-color:' + wavelet.color + ';') +
           ('-webkit-filter: blur(' + wavelet.diskSize/5 + 'px)')"></div>
  <div v-else-if="wavelet.predecessor && wavelet.predecessor.event.name == TEMP_C"
       :class="'shine' + (wavelet.predecessor.options.fadein ? ' shine_fadein' : '' ) + (wavelet.predecessor.options.fadeout ? ' shine_fadeout' : '' )"
       :style="('left:' + (wavelet.predecessor.x - wavelet.predecessor.diskSize*1/2) + 'px; top:' + (wavelet.predecessor.y - wavelet.predecessor.diskSize*1/2) + 'px;')
           + ('width: ' + wavelet.predecessor.diskSize*1 + 'px;' + 'height: ' + wavelet.predecessor.diskSize*1 + 'px;') + ('background-color:' + wavelet.predecessor.color + ';') +
           ('-webkit-filter: blur(' + wavelet.predecessor.diskSize/5 + 'px)')"></div>
  <div :class="'wavelet wavelet_packet' + (wavelet.options.fadein ? ' wavelet_fadein' : '' )
    + (wavelet.options.fadeout ? ' wavelet_fadeout' : '' )
    + (wavelet.options.ringsFadeout ? ' wavelet_fadeout' : '' )"
       :style="('left:' + (wavelet.x - wavelet.size/2) + 'px; top:' + (wavelet.y - wavelet.size/2) + 'px;')
           + ('width: ' + wavelet.size + 'px;' + 'height: ' + wavelet.size + 'px;')">
    <!-- + ('background-image: url(static/wavelet-anim-last-ring.svg?v='+generate()+');') -->
    <span v-if="wavelet.event.name == TEMP_C"
        :class="'wavelet__value'"
          :style="`font-size: ${wavelet.size/10 < 6 ? 6 : wavelet.size/10}px;`">{{
        wavelet.event.value ? wavelet.event.value : '-'
      }}°</span>
    <span class="wavelet__value" v-if="wavelet.debug && wavelet.event.name != TEMP_C"
          :style="`color: green; font-size: ${wavelet.size/10 < 6 ? 6 : wavelet.size/10}px;`">{{ wavelet.event.name ? wavelet.event.name : '-' }}{{ wavelet.event.value ? ' ' + wavelet.event.value : '' }}</span>
    <div v-if="wavelet.colored" class="wavelet-coloring" :style="`background-color: ${wavelet.color}`"></div>
  </div>
</template>


<script setup>
import {defineProps} from "vue"
import WaveletElement from "@/assets/js/classes/WaveletElement"
import {TEMP_C} from "@/assets/js/classes/events/EventsConfig"
// eslint-disable-next-line
import {generate} from "@/assets/js/helpers/id";
// eslint-disable-next-line
const props = defineProps({
  wavelet: WaveletElement,
})
</script>


