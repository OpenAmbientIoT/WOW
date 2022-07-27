<template>
  <div class="wavelet wavelet_eternal" :style="('left:' + (map.x - size/2) + 'px; top:' + (map.y - size/2) + 'px;')
        + ('width: ' + size + 'px;' + 'height: ' + size + 'px;')"></div>

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



.wavelet
  background-image: url(@/assets/wavelet-anim.svg) //currently using the file from the static folder for recreation wavelets with a pseudo different backgrounds (?v=xxxx)
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
    font-weight: 900
    padding: 0 4px
    text-align: center
    border-radius: 6px
    z-index: 110

</style>
