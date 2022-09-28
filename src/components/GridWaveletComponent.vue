<template>
  <div class="wavelet-gr wavelet-gr_eternal" :style="('left:' + (map.x - size/2) + 'px; top:' + (map.y - size/2) + 'px;')
        + ('width: ' + size + 'px;' + 'height: ' + size + 'px;')">
    <div class="wavelet-gr__value" :style="`font-size: ${size/10 < 6 ? 6 : size/10}px;`">{{ map.tag.slice(-4) }}</div>
  </div>

</template>

<script setup>
import {defineProps} from "vue"

// eslint-disable-next-line
const props = defineProps({
  size: Number,
  map: Object,
})
</script>

<style scoped lang="sass">



.wavelet-gr
  background-image: url(@/assets/img/wavelet-quality.gif) //was bad: using the file from the static folder for recreation wavelets with a pseudo different backgrounds (?v=xxxx)
  background-size: contain
  background-position: center
  position: absolute

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
    font-weight: 500
    padding: 0 4px
    text-align: center
    border-radius: 6px
    z-index: 110

</style>
