/**
 * Simple implementation
 * @param {number} rssi  RSSI value (higher value = lower signal) (suggested: e.g 80 meaning -80db, 60 — -60db, etc.)
 * @param {number} scale Multiplier for final size
 */
export function toSize(rssi, scale) {
    //const minRssi = 60 // size * 2
    //const maxRssi = 80 // size
    //const difRssi = maxRssi - minRssi

    // minRssi / maxRssi = 2x / x
    // 0.75 = x

    // 100 - 100 = 0
    // 100 - 80 = 20
    // 100 - 60 = 40
    // 100 - 40 = 60
    // 100 - 20 = 80

    // 20, 40, 60, 80, 100
    // 4s  3s  2s  1s  0...

    // Invert RSSI in this simple way
    let invertedRssi = 100 - rssi
    if (invertedRssi < 0) invertedRssi = 1

    let size = scale * (invertedRssi)
    return size
}