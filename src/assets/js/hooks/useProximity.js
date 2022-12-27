import {ref} from 'vue'

export default function useProximity() {
    const proximityIndicatorScaleFactor = ref(1)
    const proximityIndicatorSizeCalculationOffset = ref(0)
    const proximityIndicatorSizeMultiplier = ref(1) // final size multiplier

    const proximityIndicatorPositionShiftX = ref(0)
    const proximityIndicatorPositionShiftY = ref(0)

    const renderProximityPacketsStack = ref(true) // enable render packets rings stack

    /**
     * Convert proximity (PVAL) value to indicator size
     * @param {number} pVal  PVAL value (Proximity – higher – closer to)
     * @param {number} size UI disk size
     */
    function calculateIndicatorSize(pVal, size) {
        const calculated = ((proximityIndicatorSizeCalculationOffset.value + size) + proximityIndicatorScaleFactor.value * pVal).toFixed(1)
        return ((calculated < 10) ? 10 : (calculated > size ? size : calculated)) * proximityIndicatorSizeMultiplier.value
    }

    return {
        proximityIndicatorScaleFactor,
        proximityIndicatorSizeCalculationOffset,
        proximityIndicatorSizeMultiplier,
        proximityIndicatorPositionShiftX,
        proximityIndicatorPositionShiftY,
        calculateIndicatorSize,
        renderProximityPacketsStack,
    }
}

