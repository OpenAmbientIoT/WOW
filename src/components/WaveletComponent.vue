<template>
  <div :class="'wavelet' + ' t-' + wavelet.data.value"
       :style="('left:' + (wavelet.x - waveletSize/2) + 'px; top:' + (wavelet.y - waveletSize/2) + 'px;')
           + ('width: ' + waveletSize + 'px;' + 'height: ' + waveletSize + 'px;')">
        <span class="wavelet__value" :style="`color: ${wavelet.color}; font-size: ${waveletSize/10 < 6 ? 6 : waveletSize/10}px;`">{{
            wavelet.data.value ? wavelet.data.value : '-'
          }}°</span>
    <div v-if="isColorWavelets" class="wavelet-coloring" :style="`background-color: ${wavelet.color}`"></div>
  </div>
</template>

<script setup>
</script>

<style scoped>

</style>
