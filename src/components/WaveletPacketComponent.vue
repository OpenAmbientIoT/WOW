<!-- Temperature -->
<template>
  <template v-if="wavelet.color">
    <div v-if="wavelet.event.value.TEMP"
         :class="'shine' + (wavelet.options.fadein ? ' shine_fadein' : '' ) + (wavelet.options.fadeout ? ' shine_fadeout' : '' )"
         :style="('left:' + (wavelet.x - wavelet.diskSize/2) + 'px; top:' + (wavelet.y - wavelet.diskSize/2) + 'px;')
           + ('width: ' + wavelet.diskSize + 'px;' + 'height: ' + wavelet.diskSize + 'px;') + ('background-color:' + wavelet.color + ';') +
           ('-webkit-filter: blur(' + wavelet.diskSize/5 + 'px)')"></div>
    <div v-else-if="wavelet.predecessor && wavelet.predecessor.event.value.TEMP"
         :class="'shine' + (wavelet.predecessor.options.fadein ? ' shine_fadein' : '' ) + (wavelet.predecessor.options.fadeout ? ' shine_fadeout' : '' )"
         :style="('left:' + (wavelet.predecessor.x - wavelet.predecessor.diskSize/2) + 'px; top:' + (wavelet.predecessor.y - wavelet.predecessor.diskSize/2) + 'px;')
           + ('width: ' + wavelet.predecessor.diskSize + 'px;' + 'height: ' + wavelet.predecessor.diskSize + 'px;') + ('background-color:' + wavelet.predecessor.color + ';') +
           ('-webkit-filter: blur(' + wavelet.predecessor.diskSize/5 + 'px)')"></div>
  </template>

  <div :class="'wavelet wavelet_packet' + (wavelet.options.fadein ? ' wavelet_fadein' : '' )
    + (wavelet.options.fadeout ? ' wavelet_fadeout' : '' )
    + (wavelet.options.ringsFadeout ? ' wavelet_fadeout' : '' )"
       :style="('left:' + (wavelet.x - wavelet.size/2) + 'px; top:' + (wavelet.y - wavelet.size/2) + 'px;')
           + ('width: ' + wavelet.size + 'px;' + 'height: ' + wavelet.size + 'px;')">

    <!-- Packet rings -->
    <!--    <span class="text-white position-fixed">{{ wavelet.packets.stack.size }}</span>-->
    <template v-if="!wavelet.options.ringsFadeout">
      <svg v-for="(created) in wavelet.packets.stack" :key="created"
           :style="('width: ' + wavelet.size + 'px;' + 'height: ' + wavelet.size + 'px;')">
        <circle r="10" stroke="#fff" :stroke-width="2 * (wavelet.size/64)" fill="none" cx="50%" cy="50%">
          <animate attributeType="XML" attributeName="r" :from="1" :to="wavelet.size/2" dur=".4" :begin="0"
                   repeatCount="1" keySplines="0,.69,.16,1" calcMode="spline"/>
          <animate attributeType="CSS" attributeName="opacity" values="0;1;0" dur=".4" :begin="0" repeatCount="1"
                   fill="freeze"/>
        </circle>
      </svg>
    </template>

    <!-- Value -->
    <span class="wavelet__value wavelet__value_debug" v-if="wavelet.debug"
          :style="`color: green; font-size: ${wavelet.size/10 < 6 ? 6 : wavelet.size/10}px;`">{{
        wavelet.event.name ? wavelet.event.name : '-'
      }}
      {{ wavelet.event.value && wavelet.event.value.TEMP ? ' T:' + wavelet.event.value.TEMP : '' }}
      {{ wavelet.event.value && wavelet.event.value.RSSI ? ' RSSI:' + wavelet.event.value.RSSI : '' }}
    </span>
    <div v-if="wavelet.colored" class="wavelet-coloring" :style="`background-color: ${wavelet.color}`"></div>
  </div>
</template>


<script setup>
import {defineProps} from "vue"
import WaveletElement from "@/assets/js/classes/WaveletElement"

defineProps({
  wavelet: WaveletElement,
})
</script>


