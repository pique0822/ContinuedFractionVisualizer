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
  epsilon = .00001;
  steps = [];
  nxt = 1/x;
  for(var i = 0; i <n; i++){
    arr = gen_step(1/nxt);
		ni = arr[0]
		nxt = arr[1]
    steps.push(ni);
    if(Math.abs(nxt) < epsilon){break;}
	}
  return steps;
}

function continued_frac(steps){
  if(steps.length == 1){return steps[0];}
  return steps[0] + 1/continued_frac(steps.slice(1));
}

function draw_continued_fraction(n){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = background;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	steps = convergent_n(n,1000);
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

$("#input_num").change(function(){
	console.log($("#input_num").val());
	draw_continued_fraction($("#input_num").val());
});

$("#num_pi").click(function(){
	$("#input_num").val(Math.PI);
	draw_continued_fraction($("#input_num").val())
});

$("#num_e").click(function(){
	$("#input_num").val(Math.E);
	draw_continued_fraction($("#input_num").val())
});

$("#num_phi").click(function(){
	var phi = (1 + Math.sqrt(5))/2;
	$("#input_num").val(phi);
	draw_continued_fraction($("#input_num").val())
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
