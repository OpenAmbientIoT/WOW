// Event – file input changed event; into – reactive (ref) map id list
export function loadFile(event, into) {
    let input = event.target;
    const reader = new FileReader();
    reader.onload = function () {
        console.log('Loaded file:');
        console.log(reader.result.substring(0, 200));
        into.value = parseCoordinates(reader.result)
    };

    reader.readAsText(input.files[0]);
}

export function parseCoordinates(list) {
    console.log('parseCoordinates list')
    console.log(list)
    const coordinates = new Map()

    if (!list) {
        return coordinates
    }

    const rows = list.replace(/\r\n/g, '\n').split('\n')

    rows.forEach((line) => {
        const splited = line.split(',')
        if (splited[0] != 'ID') { // Skip first line 'ID,1080X,1080Y,,,,,,,,,'
            const tag = splited[0].replace('tagId=', '')
            const x = splited[1]
            const y = splited[2]
            coordinates.set(tag, {x: x, y: y})
        }
    })


    return coordinates;
}