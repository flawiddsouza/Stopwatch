// Theory:

// 1000ms = time inverval * times it needs to be multiplied to become 1000ms

// 1000ms = 10ms * (1000ms/10ms) // where 1000ms=1s and 10ms is the time inverval
// 1000ms = 10ms * 100 // hence we get 100 which we use in our operations below
//--- that means it takes 100 10ms' to make a full second ---//

// so if the time inverval was 1ms, that would be:
// 1000ms = 1ms * (1000ms/1ms) // where 1000ms=1s and 1ms is the time inverval
// 1000ms = 1ms * 1000 // hence we get 1000 which we should use in our operations below if the time inverval was 1ms
//--- that means it takes 1000 1ms' to make a full second ---//

document.addEventListener("DOMContentLoaded", function(event) { 

    var h1 = document.getElementsByTagName('h1')[0]
    var start_stop_el = document.getElementById('start_stop')
    var reset_el = document.getElementById('reset')
    
    var timer
    var t = 0

    function pad(num, size){ return ('00' + num).substr(-size) }

    start_stop_el.addEventListener('click', start_stop)
    reset_el.addEventListener('click', reset)

    function start_stop() {
        if(start_stop_el.textContent == "Start")
        {
            timer = setInterval(myTimer, 10)
            start_stop_el.textContent = "Stop"
        }
        else
        {
            clearInterval(timer)
            start_stop_el.textContent = "Start"
        }
    }

    function reset() {
        clearInterval(timer)
        t = 0
        h1.textContent = '0s 00'
        start_stop_el.textContent = "Start"
    }

    function myTimer() {
        // formulas from: http://codepen.io/SitePoint/pen/MwNPVq - 100 instead of 1000 to divide millisecs because interval is set to 10ms
        var milliseconds = Math.floor(t % 100)
        var seconds = Math.floor((t/100) % 60)
        var minutes = Math.floor((t/100/60) % 60)
        var hours = Math.floor((t/(100*60*60)) % 24)
        var days = Math.floor(t/(100*60*60*24))

        if(milliseconds > 0 && minutes == 0)
            h1.textContent = `${seconds}s ${pad(milliseconds,2)}`
        else if(minutes > 0 && hours == 0)
            h1.textContent = `${minutes}m ${seconds}s ${pad(milliseconds,2)}`
        else if(hours > 0 && days == 0)
            h1.textContent = `${hours}h ${minutes}m ${seconds}s ${pad(milliseconds,2)}`
        else if(days > 0)
            h1.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s ${pad(milliseconds,2)}`

        t++
    }

    // adding keyboard shortcuts
    window.addEventListener('keydown', handleEvent)

    function handleEvent(e) {
        if(e.keyCode == 32) { // "space" key to start/stop stopwatch
            start_stop()
            e.preventDefault()
        }
        if(e.keyCode == 82) { // "r" key to reset stopwatch
            reset()
            e.preventDefault()
        }
    }
})