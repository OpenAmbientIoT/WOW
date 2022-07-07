import {generate} from "@/assets/js/helpers/id";
export default class DisplayElement {
    constructor() {
        this.id = generate()
        this.x = 0
        this.y = 0
        this.created = Date.now()

        this.data = {
            tag: '',
            name: '',
            value: '',
            timestamp: '',
        }
    }

    inject(data) {
        if (data) {
            this.x = data.x ? data.x : 0
            this.y = data.y ? data.y : 0
        }
    }
}
