
// Extract bubbles
var elm = document.getElementById("ocean");
var kids = elm.getElementsByTagName("ul");
var bubbles = kids[0].getElementsByTagName("li")


// State: an x,y position and an x,y direction (default 1)
function State(x,y, dirx, diry){
	this.x = x
	this.y = y

	if (typeof dirx == 'undefined'){
		this.dirx = 1
		this.diry = 1
	}
	else {
		this.dirx = dirx
		this.diry = diry
	}
}
function randState(){
	// rand*(windowWidth-((marginLeft-20)+(marginRight+160)))+(marginLeft-20)
	this.x = Math.random()*(window.innerWidth-(20+160))+20
	// rand*(windowHeight-(marginTop+marginBottom))+marginTop
	this.y = Math.random()*(window.innerHeight-(100+200))+100
	
	var randx = Math.random()
	var randy = Math.random()
	this.dirx = randx/Math.abs(randx)
	this.diry = randy/Math.abs(randy)
}

// Two positioning functions: place at a set location or a random one.
function place(title,state){
	for (var i=0; i<bubbles.length;i++){
		var link = bubbles[i].getElementsByTagName("a")[0]
		if (link.getAttribute("title")==title){
			bubbles[i].style.left= state.x+'px';
			bubbles[i].style.top= state.y+'px';
			bubbles[i].style.dirx = state.dirx
			bubbles[i].style.diry = state.diry
		}
	}
}
function placeRand(title){
	var state = new randState()
	place(title, state)
}

// Get current state of bubble
function currentState(title){
	for (var i=0; i<bubbles.length;i++){
		var link = bubbles[i].getElementsByTagName("a")[0]
		if (link.getAttribute("title")==title){
			var state = new State(0,0)
			state.x = parseFloat(bubbles[i].style.left)
			state.y = parseFloat(bubbles[i].style.top)
			state.dirx = bubbles[i].style.dirx
			state.diry = bubbles[i].style.diry
			console.log(bubbles[i].style.dirx)
			return state
		}
	}
}


// Set direction (given and random)
function point(title, state){
	for (var i=0; i<bubbles.length;i++){
		var link = bubbles[i].getElementsByTagName("a")[0]
		if (link.getAttribute("title")==title){
			bubbles[i].style.dirx= state.dirx;
			bubbles[i].style.diry= state.diry;
		}
	}
}
function randPoint(title){
	var state = randState
	point(title, state)
}

// Get next state of bubble
function nextState(state){
	var prob = Math.random()-.1
	state.dirx *= prob/Math.abs(prob)
	state.diry *= prob/Math.abs(prob)

	state.x += 1*state.dirx
	state.y += 2*state.diry

	return state
}

// send bubbles to random locations
placeRand('Dragons')
placeRand("Mermaids")
placeRand("Griffins")
placeRand("Unicorns")
// send Dragons to 0,0
place('Dragons',new State(0,0))


// Make Dragons float across the screen
function move(title){
	setInterval(function() {
		var state = currentState(title)
		state = nextState(state)
		place(title,state)

},100)}

// move('Dragons')

// print stuff
var x = new State(0,0)
x.x = 2
// console.log(-0.3/Math.abs(-0.3))