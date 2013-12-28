//*** Initializing ***
// Extract bubbles
var elm = document.getElementById("ocean");
var kids = elm.getElementsByTagName("ul");
var bubbles = kids[0].getElementsByTagName("li")



// Put Bubble State objects in 'dictionary'
var bubbleStates = new Object
for (var i = bubbles.length - 1; i >= 0; i--) {
	var title = bubbles[i].getElementsByTagName("a")[0].getAttribute('title')

	var state = new State(title)
	bubbleStates[title] = state	
}


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

	if (!state.paused){
		state.x += 1*state.dirx
		state.y += 1*state.diry
	}
}

// pause and play bubble
function pause(state){
	state.paused = true
}
function play(state){
	state.paused = false
}

//*** Doing stuff *** 

// Animate state
function move(state){
	setInterval(function() {
		updateState(state)
		updateCSS(state)
	},100)}

for (var i = bubbles.length - 1; i >= 0; i--) {
	var title = bubbles[i].getElementsByTagName("a")[0].getAttribute('title')
	bubbles[i].onmouseover=function() {
		pause(getState(title)); 
		console.log(title)
	}
	bubbles[i].onmouseout=function() {
		play(getState(title)); 
	}
}
for (var key in bubbleStates){
	state = getState(key)
	updateState(state)
	updateCSS(state)
	move(getState(key))	
}

// *** Playing ***
