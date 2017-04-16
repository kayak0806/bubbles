<!-- bubbles
=======

playing with html, css, and javascript

Eventual goal is to have a page with floating 'bubbles' that can contain links, images, etc. Features should include deleting bubbles and moving them.
 -->


 <!DOCTYPE html>
 <html>
 <head>
  <link rel="stylesheet" type="text/css" href="bubble.css">
  
 </head>
 <body>


 <div id="header">
  <!-- <div id="sorter"><p>SORT<p></div> -->
  <label id="pauseCheck"><input type="checkbox" value="paused">pause</label>
  <h1>Thought Bubbles</h1>
  <button id="fireButton">fire</button>
  <button id="waterButton">water</button>

 </div>
 <div id="ocean">
  <ul>
    <li draggable="true" class="fire"><a href="#" title="Dragons" >Dragons</a></li>
    <li draggable="true" class="water"><a href="#" title="Unicorns">Unicorns</a></li>
    <li draggable="true" class="fire" ><a href="#" title="Griffins">Griffins</a></li>
    <li draggable="true" class="water"><a href="#" title="Mermaids">Mermaids</a></li>
  </ul>
 </div>
 <script type="text/javascript" src="bubble.js"></script>
 </body>