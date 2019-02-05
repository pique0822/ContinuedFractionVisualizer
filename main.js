function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function gen_step(x){
	return [x-x%1,x%1];
}

function convergent_n(x,n){
  if(x==Math.E)
  {
    return [2,1,2,1,1,4,1,1,6,1,1,8,1,1,10,1,1,12,1,1,14,1,1,
   16,1,1,18,1,1,20,1,1,22,1,1,24,1,1,26,1,1,28,1,1,
   30,1,1,32,1,1,34,1,1,36,1,1,38,1,1,40,1,1,42,1,1,
   44,1,1,46,1,1,48,1,1,50,1,1,52,1,1,54,1,1,56,1,1,
   58,1,1,60,1,1,62,1,1,64,1,1,66].slice(0,n)
  }
  if(x==Math.PI)
  {
    return [3,7,15,1,292,1,1,1,2,1,3,1,14,2,1,1,2,2,2,2,1,84,2,1,1,15,3,13,1,4,2,6,6,99,1,2,2,6,3,5,1,1,6,8,1,7,1,2,3,7,1,2,1,1,12,1,1,1,3,1,1,8,1,1,2,1,6,1,1,5,2,2,3,1,2,4,4,16,1,161,45,1,22,1,2,2,1,4,1,2,24,1,2,1,3,1,2,1,1,10].slice(0,n)
  }
  if(x==(1+Math.sqrt(5))/2)
  {
    return [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].slice(0,n);
  }
  epsilon = .000001;
  steps = [];
  nxt = precision(1/x);
  for(var i = 0; i <n; i++){
    arr = gen_step(precision(1/nxt));
		ni = arr[0]
		nxt = arr[1]
    steps.push(ni);
    if(Math.abs(nxt) < epsilon){break;}
	}
  return steps;
}

function continued_frac(steps){
  if(steps.length == 1){return steps[0];}
  return steps[0] + precision(1/continued_frac(steps.slice(1)));
}

function draw_continued_fraction(steps){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = background;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	console.log(steps);

	multiplier = 1;

	x_pos = 0;
	y_pos = 0;

	x_vals = [0];
	y_vals = [0];

	for(var i = 0; i < steps.length; i++){
		if(i%4==0){
			x_pos = x_pos + steps[i]*multiplier;
		}
		else if(i%4==1){
			y_pos = y_pos - steps[i]*multiplier;
		}
		else if(i%4==2){
			x_pos = x_pos - steps[i]*multiplier;
		}
		else if(i%4==3){
			y_pos = y_pos + steps[i]*multiplier;
		}
		x_vals.push(x_pos);
		y_vals.push(y_pos);
	}

	max_x = Math.max(...x_vals)
	min_x = Math.min(...x_vals)
	max_y = Math.max(...y_vals)
	min_y = Math.min(...y_vals)

	height = Math.abs(max_y)+Math.abs(min_y)
	width = Math.abs(max_x)+Math.abs(min_x)

	// console.log(canvas.width)
	// console.log(canvas.height)
	// x_sep = Math.max(.1*height,.1*width)
	buffer = 0

	if(height != 0){
		height_ratio = (.8*canvas.height/((height+buffer)));
	} else {
		height_ratio = 0;
	}

	if(width != 0){
		width_ratio = (.8*canvas.width/((width+buffer)));
	} else {
		width_ratio = 0;
	}

	center_x = .1*canvas.width
	center_y = .1*canvas.height

	for(var i = 0; i < steps.length; i++){
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.moveTo(Math.round(((x_vals[i]-min_x)*width_ratio+center_x)), Math.round(((y_vals[i]-min_y)*height_ratio+center_y)));
		// console.log(Math.round(((x_vals[i]-min_x)*width_ratio+center_x)));
		// console.log(Math.round(((y_vals[i]-min_y)*height_ratio+center_y)));
		if(i%4==0){
			ctx.strokeStyle = red;
		}
		else if(i%4==1){
			ctx.strokeStyle = green;
		}
		else if(i%4==2){
			ctx.strokeStyle = blue;
		}
		else if(i%4==3){
			ctx.strokeStyle = orange;
		}
		ctx.lineTo(Math.round(((x_vals[i+1]-min_x)*width_ratio+center_x)), Math.round(((y_vals[i+1]-min_y)*height_ratio)+center_y));
		// console.log(Math.round(((x_vals[i+1]-min_x)*width_ratio+center_x)));
		// console.log(Math.round(((y_vals[i+1]-min_y)*height_ratio+center_y)));
		ctx.stroke();
		ctx.closePath();
	}
	ctx.beginPath();
	ctx.closePath();
}

function precision(x){
  var precise = x.toPrecision(100);
  last_val = precise.indexOf("0000000000");
  if(last_val == -1)
  {
    last_val = precise.length;
  }
  precise = precise.substring(0,last_val);
  return parseFloat(precise);
}

$("#input_num").on('input', function() {
	console.log($("#input_num").val());
  steps = convergent_n($("#input_num").val(),$("#precise_num").val());
  $("#list_fraction").val("["+steps.toString()+"]");
  draw_continued_fraction(steps);
});

$("#precise_num").on('input', function() {
	console.log($("#input_num").val());
  steps = convergent_n($("#input_num").val(),$("#precise_num").val());
  $("#list_fraction").val("["+steps.toString()+"]");
  draw_continued_fraction(steps);
});

$("#num_pi").click(function(){
	$("#input_num").val(Math.PI);
  steps = [3,7,15,1,292,1,1,1,2,1,3,1,14,2,1,1,2,2,2,2,1,84,2,1,1,15,3,13,1,4,2,6,6,99,1,2,2,6,3,5,1,1,6,8,1,7,1,2,3,7,1,2,1,1,12,1,1,1,3,1,1,8,1,1,2,1,6,1,1,5,2,2,3,1,2,4,4,16,1,161,45,1,22,1,2,2,1,4,1,2,24,1,2,1,3,1,2,1,1,10];
  steps = steps.slice(0,$("#precise_num").val())
  $("#list_fraction").val("["+steps.toString()+"]");
  draw_continued_fraction(steps);
});

$("#num_e").click(function(){
	$("#input_num").val(Math.E);
  steps = [2,1,2,1,1,4,1,1,6,1,1,8,1,1,10,1,1,12,1,1,14,1,1,
 16,1,1,18,1,1,20,1,1,22,1,1,24,1,1,26,1,1,28,1,1,
 30,1,1,32,1,1,34,1,1,36,1,1,38,1,1,40,1,1,42,1,1,
 44,1,1,46,1,1,48,1,1,50,1,1,52,1,1,54,1,1,56,1,1,
 58,1,1,60,1,1,62,1,1,64,1,1,66]
 steps = steps.slice(0,$("#precise_num").val())
 $("#list_fraction").val("["+steps.toString()+"]");
  draw_continued_fraction(steps);
});

$("#num_phi").click(function(){
	var phi = (1 + Math.sqrt(5))/2;
	$("#input_num").val(phi);
  steps = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
  steps = steps.slice(0,$("#precise_num").val());
  $("#list_fraction").val("["+steps.toString()+"]");
  draw_continued_fraction(steps);
});

$("#list_fraction").on('input', function() {
  console.log(parseInt($("#list_fraction").attr('size'),10));
  input = $("#list_fraction").val();
  if(input[0] == "[" && input[input.length-1] == "]")
  {
    input = input.replace("[","");
    input = input.replace("]","");
    try{
      var steps = input.split(',').map(Number);
      draw_continued_fraction(steps);
      var new_num = continued_frac(steps);
      if(new_num == "Infinity")
      {
        console.log('INFINITE');
        new_num = 99999999999;
      }
      $("#input_num").val(new_num);
    } catch(error)
    {
      console.log(error);
    }
  }
});

red = "#e74c3c";
green = "#2ecc71";
blue = "#3498db";
orange = "#e67e22";
background = "#FFFFFF"

var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

// $("#plot").width($("#plot").parent().width());

var newCanvas = $('<canvas/>',{'width':$('#canvasContainer').width(),'height':$('#canvasContainer').height(),'id':"plot"});
$('#canvasContainer').append(newCanvas);

var canvas = document.getElementById("plot");

let dpi = window.devicePixelRatio;

var ctx = canvas.getContext("2d");

function fix_dpi() {
//get CSS height
//the + prefix casts it to an integer
//the slice method gets rid of "px"
let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
//get CSS width
let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
//scale the canvas
canvas.setAttribute('height', style_height * dpi);
canvas.setAttribute('width', style_width * dpi);
}

fix_dpi();

ctx.fillStyle = background;
ctx.fillRect(0, 0, canvas.width, canvas.height);


$("#animate").click(function(){
	start_val = parseFloat($("#low_num").val());
	end_val = parseFloat($("#hi_num").val());
	by_val = parseFloat($("#by_num").val());
	function animated_continued_fraction(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = background;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		steps = convergent_n(start_val,100);
		console.log(steps);

		multiplier = 1;

		x_pos = 0;
		y_pos = 0;

		x_vals = [0];
		y_vals = [0];

		for(var i = 0; i < steps.length; i++){
			if(i%4==0){
				x_pos = x_pos + steps[i]*multiplier;
			}
			else if(i%4==1){
				y_pos = y_pos - steps[i]*multiplier;
			}
			else if(i%4==2){
				x_pos = x_pos - steps[i]*multiplier;
			}
			else if(i%4==3){
				y_pos = y_pos + steps[i]*multiplier;
			}
			x_vals.push(x_pos);
			y_vals.push(y_pos);
		}

		max_x = Math.max(...x_vals)
		min_x = Math.min(...x_vals)
		max_y = Math.max(...y_vals)
		min_y = Math.min(...y_vals)

		height = Math.abs(max_y)+Math.abs(min_y)
		width = Math.abs(max_x)+Math.abs(min_x)

		// console.log(canvas.width)
		// console.log(canvas.height)
		// x_sep = Math.max(.1*height,.1*width)
		buffer = 0

		if(height != 0){
			height_ratio = (.8*canvas.height/((height+buffer)));
		} else {
			height_ratio = 0;
		}

		if(width != 0){
			width_ratio = (.8*canvas.width/((width+buffer)));
		} else {
			width_ratio = 0;
		}

		center_x = .1*canvas.width
		center_y = .1*canvas.height

		for(var i = 0; i < steps.length; i++){
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.moveTo(Math.round(((x_vals[i]-min_x)*width_ratio+center_x)), Math.round(((y_vals[i]-min_y)*height_ratio+center_y)));
			// console.log(Math.round(((x_vals[i]-min_x)*width_ratio+center_x)));
			// console.log(Math.round(((y_vals[i]-min_y)*height_ratio+center_y)));
			if(i%4==0){
				ctx.strokeStyle = red;
			}
			else if(i%4==1){
				ctx.strokeStyle = green;
			}
			else if(i%4==2){
				ctx.strokeStyle = blue;
			}
			else if(i%4==3){
				ctx.strokeStyle = orange;
			}
			ctx.lineTo(Math.round(((x_vals[i+1]-min_x)*width_ratio+center_x)), Math.round(((y_vals[i+1]-min_y)*height_ratio)+center_y));
			// console.log(Math.round(((x_vals[i+1]-min_x)*width_ratio+center_x)));
			// console.log(Math.round(((y_vals[i+1]-min_y)*height_ratio+center_y)));
			ctx.stroke();
			ctx.closePath();
		}
		ctx.beginPath();
		ctx.closePath();
		ctx.save();

		start_val = start_val + by_val;
		console.log(start_val);
		if(start_val <= end_val){
			sleep(100);
			requestAnimationFrame(animated_continued_fraction);
		}
	}
	requestAnimationFrame(animated_continued_fraction);
});

$(document).ready(function(){
  steps = convergent_n($("#input_num").val(),$("#precise_num").val());
  draw_continued_fraction(steps);
  $("#list_fraction").val("["+steps.toString()+"]");
});
