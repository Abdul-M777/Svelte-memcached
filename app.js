let Memcached = require("memcached")
let express = require("express")
let app = express()
let memcached = new Memcached("localhost:11211")

let logged = 1

// ######################################

// populate database / seed
memcached.set("user:1:friends", "[2,3]", 3600, function(err){
    if(err){console.log("Error - seeding"); return}
    console.log("friend saved")
})
memcached.set("user:2:status", 1, 3600, function(err){
    if(err){console.log("Error - seeding"); return}
    console.log("status 2 saved")
})
memcached.set("user:3:status", 0, 3600, function(err){
    if(err){console.log("Error - seeding"); return}
    console.log("status 3 saved")
})


// ######################################

app.get("/statuses", (req, res) => {
    res.set("Content-Type", "text/event-stream")
    res.set("Connection", "Keep-alive")
    res.set("Cache-Control", "no-cache")
    res.set("Access-Control-Allow-Origin", "*")
    setInterval(function(){
        memcached.get("user:2:status", function(err, status){
            if(err){console.log("Error - reading"); return}
            console.log(`"user:2:status": ${status}`)
            res.status(200).write(`data: [2,${status}]\n\n`)
        })
    }, 1000)
})



// ######################################
app.listen(80, err => {
    if(err){console.log("Error - server connot listen"); return}
    console.log("server listining...")
})


/*
memcached.set("name", "a" , 10, function(err){
    if(err){console.log("Error - saving"); return}
    console.log("name saved")
})


memcached.get("name", function(err, data){
    if(err){console.log("Error - reading"); return}
    console.log(`name: ${data}`)

})*/