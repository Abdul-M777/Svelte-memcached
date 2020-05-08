<script>
import {friends} from "./data.js"
export let id
let name = $friends.find(item => item.id == id).name
$: active = $friends.find(item => item.id == id).active
</script>

<section style="color: {active==1?'green':'black'}">
	{id} {name} {active}
</section>

<style>
	
</style>