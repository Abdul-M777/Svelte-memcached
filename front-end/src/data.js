import {writable} from "svelte/store"
export let friends = writable(
    [
        {"id":2, "name": "B", "active":1},
        {"id":3, "name": "C", "active":0}
    ]
)