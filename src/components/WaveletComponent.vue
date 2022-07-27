<template>
  <!-- Temperature -->
  <template v-if="wavelet.event.name == TEMP_C">
    <div :class="'shine' + (wavelet.options.fadeout ? ' shine_fadeout' : '' )" :style="('left:' + (wavelet.x - wavelet.size*1/2) + 'px; top:' + (wavelet.y - wavelet.size*1/2) + 'px;')
           + ('width: ' + wavelet.size*1 + 'px;' + 'height: ' + wavelet.size*1 + 'px;') + ('background-color:' + wavelet.color + ';')"></div>
    <div :class="'wavelet' + ' t-' + wavelet.event.value"
         :style="('left:' + (wavelet.x - wavelet.size/2) + 'px; top:' + (wavelet.y - wavelet.size/2) + 'px;')
           + ('width: ' + wavelet.size + 'px;' + 'height: ' + wavelet.size + 'px;') + ('background-image: url(static/wavelet-anim.svg?v='+generate()+');')">
        <span :class="'wavelet__value' + (wavelet.options.fadeout ? ' d-none' : '')"
              :style="`color: ${wavelet.color}; font-size: ${wavelet.size/10 < 6 ? 6 : wavelet.size/10}px;`">{{
            wavelet.event.value ? wavelet.event.value : '-'
          }}°</span>
      <div v-if="wavelet.colored" class="wavelet-coloring" :style="`background-color: ${wavelet.color}`"></div>
    </div>
  </template>
  <!-- All other -->
  <template v-else>
    <div :class="'wavelet' + ' t-' + wavelet.event.value"
         :style="('left:' + (wavelet.x - wavelet.size/2) + 'px; top:' + (wavelet.y - wavelet.size/2) + 'px;')
           + ('width: ' + wavelet.size + 'px;' + 'height: ' + wavelet.size + 'px;') + ('background-image: url(static/wavelet-anim.svg?v='+generate()+');')">
      <span class="wavelet__value" v-if="wavelet.debug"
            :style="`color: green; font-size: ${wavelet.size/10 < 6 ? 6 : wavelet.size/10}px;`">{{ wavelet.event.name ? wavelet.event.name : '-' }}</span>
    </div>
  </template>

</template>

<script setup>
import {defineProps} from "vue"
import WaveletElement from "@/assets/js/classes/WaveletElement"
import {TEMP_C} from "@/assets/js/classes/events/EventsConfig"
import {generate} from "@/assets/js/helpers/id";
// eslint-disable-next-line
const props = defineProps({
  wavelet: WaveletElement,
})
</script>

<style scoped lang="sass">



.wavelet
  //background-image: url(@/assets/wavelet-anim.svg) //currently using the file from the static folder for recreation wavelets with a pseudo different backgrounds (?v=xxxx)
  background-size: contain
  background-position: center
  position: absolute

  // This is two hiding modificators for further animation restart implementation
  &_hiding1
    -moz-animation: hidingAnimation1 .4s ease-in 9s forwards
    -webkit-animation: hidingAnimation1 .4s ease-in 9s forwards
    -o-animation: hidingAnimation1 .4s ease-in 9s forwards
    animation: hidingAnimation1 .4s ease-in 9s forwards
    -webkit-animation-fill-mode: forwards
    animation-fill-mode: forwards

  &_hiding2
    -moz-animation: hidingAnimation2 .4s ease-in 9s forwards
    -webkit-animation: hidingAnimation2 .4s ease-in 9s forwards
    -o-animation: hidingAnimation2 .4s ease-in 9s forwards
    animation: hidingAnimation2 .4s ease-in 9s forwards
    -webkit-animation-fill-mode: forwards
    animation-fill-mode: forwards

  &_eternal
    -moz-animation: none
    -webkit-animation: none
    -o-animation: none
    animation: none
    -webkit-animation-fill-mode: none
    animation-fill-mode: none
    opacity: .5
    // Vertical cross line
    &:before
      content: ''
      display: block
      width: 1px
      height: 100%
      background-color: #fff
      left: 50%
      position: absolute
    // Horizontal cross line
    &:after
      content: ''
      display: block
      width: 100%
      height: 1px
      background-color: #fff
      top: 50%
      position: absolute


  &__value
    color: rgba(255, 255, 255, 1)
    background-color: black
    display: inline-block
    position: absolute
    left: 50%
    transform: translateX(-50%)
    top: 10%
    font-weight: 900
    padding: 0 4px
    text-align: center
    border-radius: 6px
    z-index: 110


.wavelet-coloring
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  border-radius: 100%
  mix-blend-mode: multiply

.shine
  //background-image: url('@/assets/shinea.gif')
  background-size: contain
  background-position: center
  position: absolute
  background-color: white
  border-radius: 100%
  -webkit-filter: blur(20px)
  -moz-filter: blur(20px)
  -o-filter: blur(20px)
  -ms-filter: blur(20px)
  filter: blur(20px)
  opacity: .8
  transition: opacity 1s
  &_fadeout
    opacity: 0
    & + .wavelet
      background-image: none !important

@-webkit-keyframes hidingAnimation1
  from
    opacity: 1
  to
    opacity: 0

@keyframes hidingAnimation1
  from
    opacity: 1
  to
    opacity: 0

@-webkit-keyframes hidingAnimation2
  from
    opacity: 1
  to
    opacity: 0

@keyframes hidingAnimation2
  from
    opacity: 1
  to
    opacity: 0

</style>
