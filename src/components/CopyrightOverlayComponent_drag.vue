<template v-if="copyrightOverlay.enabled">
  <div class="c-overlay" v-drag="{snap: 5}" @v-drag-end="fixPosition()"
       :style="`${copyrightOverlay.position};`">
    <div class="c-overlay__box">
      <div class="c-overlay__title">{{ copyrightOverlay.title }}</div>
      <div class="c-overlay__subtitle">{{ copyrightOverlay.subtitle }}</div>
    </div>
  </div>
</template>


<script setup>
import {defineProps} from "vue"
import {CopyrightOverlay} from "@/assets/js/hooks/useCopyrightOverlay";


defineProps({
  copyrightOverlay: CopyrightOverlay,
})

function fixPosition() {

}

</script>

<style scoped lang="sass">
.c-overlay
  z-index: 99999
  position: absolute
  opacity: .9
  width: 116px

  &__box
    background-color: rgba(0, 0, 0, .9)
    padding: 4px 10px
    border-radius: 4px
    border: 1px solid rgba(255,255,255,.1)
    height: 58px

  &__title
    color: white
    font-size: 1em
    font-weight: bold

  &__subtitle
    color: rgba(255, 255, 255, .9)
    font-size: .7em
    text-align: left
    background-image: url(@/assets/img/wiliot-logo-white.png)
    background-repeat: no-repeat
    background-size: 42px
    background-position: 32px 0
    padding-top: 2px
    text-indent: 14px
</style>


