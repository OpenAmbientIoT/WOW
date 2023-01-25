<template v-if="copyrightOverlay.enabled">
  <div class="c-overlay"
       :style="`${copyrightOverlay.position};`"
       ref="draggableContainer" @mousedown="dragMouseDown">
    <!--     @input="$emit('update:copyrightOverlay', $event.target.value)"-->
    <div class="c-overlay__box">
      <div class="c-overlay__title">{{ copyrightOverlay.title }}</div>
      <div class="c-overlay__subtitle">{{ copyrightOverlay.subtitle }}</div>
    </div>
  </div>
</template>


<script setup>
import {defineProps, reactive, ref} from "vue"
import {CopyrightOverlay} from "@/assets/js/hooks/useCopyrightOverlay";


const props = defineProps({
  copyrightOverlay: CopyrightOverlay,
})

const copyrightOverlayRef = reactive(props.copyrightOverlay) // todo how to improve?

const draggableContainer = ref()

// eslint-disable-next-line
//const emit = defineEmits(['update:copyrightOverlay']) // todo how to improve?

const positions = {
  clientX: undefined,
  clientY: undefined,
  movementX: 0,
  movementY: 0
}

const dragMouseDown = function (event) {
  event.preventDefault()
  // Get the mouse cursor position at startup
  positions.clientX = event.clientX
  positions.clientY = event.clientY
  document.onmousemove = elementDrag
  document.onmouseup = closeDragElement
}
const elementDrag = function (event) {
  event.preventDefault()
  positions.movementX = positions.clientX - event.clientX
  positions.movementY = positions.clientY - event.clientY
  positions.clientX = event.clientX
  positions.clientY = event.clientY

  // Calculate element's new position:
  let top = (draggableContainer.value.offsetTop - positions.movementY)
  let left = (draggableContainer.value.offsetLeft - positions.movementX)

  // Prevent moving out of window
  if (top < 0) top = 0
  if (left < 0) left = 0
  if (top > window.innerHeight - 58) top = window.innerHeight - 58
  if (left > window.innerWidth - 116) left = window.innerWidth - 116

  draggableContainer.value.style.top = top + 'px'
  draggableContainer.value.style.left = left + 'px'
  copyrightOverlayRef.position = `left: ${left + 'px'}; top: ${top + 'px'};`;

}

const closeDragElement = function () {
  document.onmouseup = null
  document.onmousemove = null
}

</script>

<style scoped lang="sass">
.c-overlay
  z-index: 99999
  position: absolute
  opacity: .9
  width: 116px
  cursor: grab

  &__box
    background-color: rgba(0, 0, 0, .9)
    padding: 4px 10px
    border-radius: 4px
    border: 1px solid rgba(255, 255, 255, .1)
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


