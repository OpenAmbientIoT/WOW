<!-- Temperature -->
<template>
  <div :class="'wavelet wavelet_packet wavelet_proximity-packet'
    + (wavelet.event.value.PROX === '1' ? ' wavelet_proximity-packet_touched' : '')
    + (wavelet.options.fadein ? ' wavelet_fadein' : ' wavelet_fadein' )
    + (wavelet.packets.pulse ? ' pulse' : '')"
       :style="('left:' + (wavelet.x - wavelet.size/2) + 'px; top:' + (wavelet.y - wavelet.size/2) + 'px;')
           + ('width: ' + wavelet.size + 'px;' + 'height: ' + wavelet.size + 'px;')"
       :key="wavelet.tag">

    <!-- <span :key="wavelet.tag" class="text-white small position-fixed">{{ wavelet.event.value.N }}</span>-->

    <!-- Packet rings -->
    <!-- <span class="text-white position-fixed">{{ wavelet.packets.stack.size }}</span>-->
    <template v-if="wavelet.proximity.renderPackets && !wavelet.options.ringsFadeout">
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

    <!-- Trying #2 with scale instead of width and height – best performance? -->
    <div class="proximity-indicator"
         :style="'transform: translate(' + (wavelet.proximity.indicator.positionShift[0] - (64 - wavelet.size)/2) + 'px,'
                                         + (wavelet.proximity.indicator.positionShift[1] - (64 - wavelet.size)/2) + 'px) ' +
                                          'scale(' + (wavelet.proximity.indicator.size/64)  + ');'"></div>
<!--    * (wavelet.packets.pulse ? 1.2 : 1)-->


    <span class="wavelet__value wavelet__value_debug" v-if="wavelet.debug"
          :style="`color: green; font-size: ${wavelet.size/10 < 6 ? 6 : wavelet.size/10}px;`">
      PROX PACK
      <template v-if="isObject(wavelet.event.value)">
        {{ wavelet.event.value.TEMP ? ' T:' + wavelet.event.value.TEMP : '' }}
        {{ wavelet.event.value.RSSI ? ' RSSI:' + wavelet.event.value.RSSI : '' }}
        {{ wavelet.event.value.PROX ? ' PROX:' + wavelet.event.value.PROX : '' }}
        {{ wavelet.event.value.PVAL ? ' PVAL:' + wavelet.event.value.PVAL : '' }}
      </template>
    </span>
  </div>
</template>


<script setup>
import {defineProps} from "vue"
import WaveletElement from "@/assets/js/classes/WaveletElement"
import {isObject} from "@/assets/js/helpers/check";
defineProps({
  wavelet: WaveletElement,
})
</script>


