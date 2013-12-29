//*** Initializing ***
// Extract bubbles (div id="ocean", ul, li)
var elm = document.getElementById("ocean");
var kids = elm.getElementsByTagName("ul");
var bubbles = kids[0].getElementsByTagName("li")

// Create Bubble State objects and put in 'dictionary'
var bubbleStates = new Object
for (var i = bubbles.length - 1; i >= 0; i--) {
	var title = bubbles[i].getElementsByTagName("a")[0].getAttribute('title')
	var state = new State(title)
	bubbleStates[title] = state	
}

// Extract button(s)
var pauseButton = document.getElementById("pauseButton")
var fireButton = document.getElementById("fireButton")

var pauseCheck = document.getElementById("pauseCheck")
var pauseBox = pauseCheck.getElementsByTagName("input")[0]


//*** Objects ***
// State: A title, an x,y position, an x,y direction, and paused or not
function State(title){
	// title, x, y, dirx, diry, paused

	this.title = title;
	// rand*(windowWidth-((marginLeft-20)+(marginRight+160)))+(marginLeft-20)
	this.x = Math.round(Math.random()*(window.innerWidth-(20+160))+20)
	// rand*(windowHeight-(marginTop+marginBottom))+marginTop
	this.y = Math.round(Math.random()*(window.innerHeight-(100+200))+100)
	
	var randx = Math.random()
	var randy = Math.random()
	this.dirx = randx/Math.abs(randx)
	this.diry = randy/Math.abs(randy)

	this.paused = false
}

//*** Functions ***
// Update the css for the given bubble state
function updateCSS(state){
	for (var i=0; i<bubbles.length;i++){
		var link = bubbles[i].getElementsByTagName("a")[0]
		if (link.getAttribute("title")==state.title){
			bubbles[i].style.left= state.x+'px';
			bubbles[i].style.top= state.y+'px';
			bubbles[i].style.dirx = state.dirx
			bubbles[i].style.diry = state.diry
		}
	}
}

// Give a bubble state a random location
function placeRand(state){
	// rand*(windowWidth-((marginLeft-20)+(marginRight+160)))+(marginLeft-20)
	state.x = Math.random()*(window.innerWidth-(20+160))+20
	// rand*(windowHeight-(marginTop+marginBottom))+marginTop
	state.y = Math.random()*(window.innerHeight-(100+200))+100
}

// Give a bubble state a specific location
function place(state,x,y){
	state.x = x
	state.y = y
}

// Give a state a new direction with probability prob
function dirRand(state, prob){
	var randx = Math.random()-prob
	var randy = Math.random()-prob
	state.dirx *= randx/Math.abs(randx)
	state.diry *= randy/Math.abs(randy)
}

// Get state of bubble given title
function getState(title){
	return bubbleStates[title]
}

// Get next state of bubble
function updateState(state){
	var prob = 0.05
	dirRand(state, prob)

	var margin = 0
	// if near top edge
	if (state.y < margin+90) 	state.diry = 1
	// if near bottom edge
	if (state.y > window.innerHeight-margin-200) 	state.diry = -1
	// if near left edge
	if (state.x < margin) 		state.dirx = 1 
	// if near right edge
	if (state.x > window.innerWidth - margin-200) 	state.dirx = -1

	if (!state.paused && !pauseBox.checked){
		state.x += 5*state.dirx
		state.y += 5*state.diry
	}
}


// pause and play bubble
function pause(state){
	state.paused = true
}
function play(state){
	state.paused = false
}
function alternate(state){
	state.paused = !state.paused
}

//*** Activation *** 

//set pause/play mouseover action for all bubbles
for (var i = bubbles.length - 1; i >= 0; i--) {	
	bubbles[i].onmouseover=function() {
		var title = this.getElementsByTagName("a")[0].getAttribute('title')
		pause(getState(title)); 
	}
	bubbles[i].onmouseout=function() {
		var title = this.getElementsByTagName("a")[0].getAttribute('title')
		play(getState(title)); 
	}
}

// Animate bubble states
function animate(state){
	setInterval(function() {
		updateState(state)
		updateCSS(state)
	},100)}

for (var key in bubbleStates){
	state = getState(key)
	updateState(state)
	updateCSS(state)
	animate(getState(key))	//comment this to pause and troubleshoot
}

// *** Playing ***
