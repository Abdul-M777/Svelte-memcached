<script>
import Friend from "./Friend.svelte"
import {friends} from "./data.js"

const getData = async () => {
	let eventSource = new EventSource("http://localhost/statuses")
	eventSource.addEventListener("message", function(e){
		try{
			console.log(e.data)
			let status = JSON.parse(e.data)
			console.log(status)
		}catch(error){

		}
		
	})
}
getData()

setTimeout(() =>{
	$friends[0].active = 0
	$friends[1].active = 1

}, 5000)
</script>

<main>
	<div>{JSON.stringify($friends)}</div>
	{#each $friends as friend}
	<Friend id={friend.id}/>
	{/each}

</main>

<style>
	
</style>