function draw_circle(coords, color, radius){
  var canvas = document.getElementById('graph');
  var context = canvas.getContext('2d');
  context.beginPath();
  context.arc(coords[0], coords[1], radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
  context.strokeStyle = '#000000';
  context.stroke();
}

function draw_line(start, end, color, radius){
  var canvas = document.getElementById('graph');
  var context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(start[0], start[1]);
  context.lineTo(end[0], end[1]);
  context.lineWidth = 1;

  // set line color
  context.strokeStyle = '#002e63'; 
  context.stroke();
}

function draw_X(x, y) {
  var size_of_cross = 5;
  var canvas = document.getElementById('graph');
  var context = canvas.getContext('2d');
  context.moveTo(x - size_of_cross, y - size_of_cross);
  context.lineTo(x + size_of_cross, y + size_of_cross);
  context.stroke();

  context.moveTo(x + size_of_cross, y - size_of_cross);
  context.lineTo(x - size_of_cross, y + size_of_cross);
  context.stroke();
}

 //var coords= [ [20, 50], [20,80], [20,110], [50, 50], [50,80], [50,110], [80, 50], [80,80], [80,110] ];
 //var coords = [ [50, 50], [150, 50], [250, 50], [50, 150], [150, 150], [250, 150] ];
 // 4 x 6
 var columns = 6;
 var rows = 4;
 var nodes = columns * rows;
 var coords2 = [ [10, 30], [35, 30], [60, 30], [85, 30], [110, 30], [135, 30],
                [10, 55], [35, 55], [60, 55], [85, 55], [110, 55], [135, 55],
                [10, 80], [35, 80], [60, 80], [85, 80], [110, 80], [135, 80],
                [10, 105], [35, 105], [60, 105], [85, 105], [110, 105], [135, 105] ];

 var coords = [ [20, 30], [70, 30], [120, 30], [170, 30], [220, 30], [270, 30],
                [20, 80], [70, 80], [120, 80], [170, 80], [220, 80], [270, 80],
                [20, 130], [70, 130], [120, 130], [170, 130], [220, 130], [270, 130],
                [20, 180], [70, 180], [120, 180], [170, 180], [220, 180], [270, 180] ];

var radius = 15;
var color = '#add8e6';
var position = [20, 30];
var clicks = 0;

var value = 50;

//path1 está hardcodeado en click
var path1 = [ [20, 130], [20, 180], [70, 180], [120, 30], [220, 30], [270, 130] ];
var path2 = [ [20, 30], [70, 30], [120, 30], [170, 30], [220, 30], [270, 30] ];

//function generate_graph(columns, rows){
//  var initial_x = 10;
//  var initial_y = 30;
//  var path = [ [initial_x, initial_y] ];
//  var distance = 50;
//  
//  for(var j = 1; j){          
//    for(var i = 1; i < columns; i++){
//      path.push([ path[i-1][0] + distance, path[i-1][1] ]);

//      
//    }
//  }
//}

start();

function draw_special_nodes(nodes){
  for(var i = 0; i < nodes.length; i++){
    draw_X(nodes[i][0], nodes[i][1]);   
  }
}

function next_coord(coord, movement){
  var coordinate;  
  switch(movement) {
    case 'left':
    coordinate = [coord[0] - value, coord[1]];
    break;

    case 'right':
    coordinate = [coord[0] + value, coord[1]];
    break;

    case 'up':
    coordinate = [coord[0], coord[1] - value];
    break;

    case 'down':
    coordinate = [coord[0], coord[1] + value];
    break;
  }
  return coordinate; 
}

function set_coord(movement){
  switch(movement) {
    case 'left':
    position[0] = position[0] - value;
    break;

    case 'right':
    position[0] = position[0] + value;
    break;

    case 'up':
    position[1] = position[1] - value;
    break;

    case 'down':
    position[1] = position[1] + value;
    break;
  }
}

function start(){
  enable_buttons();
  // Draw horizontal lines
  clicks = 0;
  for (var i = 0; i < rows; ++i) {
    for (var j = 0; j < columns-1; ++j) {
      draw_line(coords[columns*i + j], coords[columns*i + j+1], color, radius);        
    } 
  }

  // Draw vertical lines
  for (var i = 0; i < rows-1; ++i) {
    for (var j = 0; j < columns; ++j) {
      draw_line(coords[columns*i + j], coords[columns*(i+1) + j], color, radius);        
    } 
  }

  // Draw circles
  for (var i = 0; i < nodes; ++i) {
    draw_circle(coords[i], color, radius);        
  }

  position = [20, 30]
  //actual node
  draw_circle(position, 'green', radius);     
  var counter = document.getElementById('counter');
  counter.innerHTML = clicks;
  draw_special_nodes(path1);
  start_buttons();
}

function start_buttons(){
  disable_button("button_left");
  disable_button("button_up");
}

 var coords = [ [20, 30], [70, 30], [120, 30], [170, 30], [220, 30], [270, 30],
                [20, 80], [70, 80], [120, 80], [170, 80], [220, 80], [270, 80],
                [20, 130], [70, 130], [120, 130], [170, 130], [220, 130], [270, 130],
                [20, 180], [70, 180], [120, 180], [170, 180], [220, 180], [270, 180] ];

//uses columns and rows variables  
function restore_buttons(){
  var left = coords[0][0];
  var right = coords[columns - 1][0];
  var up = coords[0][1];
  var down = coords[coords.length - 1][1];  

  enable_buttons();
  
  if(position[0] == left) disable_button("button_left");  
  if(position[0] == right) disable_button("button_right");  
  if(position[1] == up) disable_button("button_up");  
  if(position[1] == down) disable_button("button_down");  
}

function button_click(movement){
  draw_circle(position, 'red', radius);     
  switch(movement) {
    case 'left':
      var coordinate = next_coord(position, 'left');
      draw_circle(coordinate, 'green', radius);     
      set_coord('left');
    break;

    case 'right':
      var coordinate = next_coord(position, 'right');
      draw_circle(coordinate, 'green', radius);     
      set_coord('right');
    break;

    case 'up':
      var coordinate = next_coord(position, 'up');
      draw_circle(coordinate, 'green', radius);     
      set_coord('up');
    break;

    case 'down':
      var coordinate = next_coord(position, 'down');
      draw_circle(coordinate, 'green', radius);     
      set_coord('down');
    break;
  }

  clicks += 1;
  var counter = document.getElementById('counter');
  counter.innerHTML = clicks;
  draw_special_nodes(path1);
  restore_buttons();
}

function enable_buttons() {
  document.getElementById("button_up").disabled = false;
  document.getElementById("button_down").disabled = false;
  document.getElementById("button_left").disabled = false;
  document.getElementById("button_right").disabled = false;
}

function disable_button(id){
  document.getElementById(id).disabled = true;
}
