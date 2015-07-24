$( document ).ready(function() {
  var body = $("body");
  var gd = {
    degrees: parseFloat(body.data("gradient-degrees")),
    start:   body.data("gradient-start"),
    end:     body.data("gradient-end")
  };

  body.css("background", "linear-gradient(" + gd.degrees + "deg," + gd.start + "," + gd.end + ")");

  var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
  // resize the canvas to fill browser window dynamically
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawStuff();

  $("#download").click(function() {
    var outputCanvas = document.createElement("canvas");
    outputCanvas.width = canvas.width;
    outputCanvas.height = canvas.height;

    var outputContext = outputCanvas.getContext("2d");

    drawBackgroundGradient(outputContext);
    drawAdviceTextAndContainer(outputContext, $(".advice").text());

    outputContext.drawImage(canvas, 0, 0);

    this.href = outputCanvas.toDataURL();
    this.download = "advice.png";
  });

  function drawAdviceTextAndContainer(context, text) {
    context.font = "bold 24pt Times";

    var textWidth = context.measureText(text).width;
    var textHeight = 24;
    var boxWidth = textWidth + 64;
    var boxHeight = textHeight + 64;

    context.fillStyle = "rgba(255, 255, 255, 0.5)"
    context.fillRect((canvas.width - boxWidth) / 2, (canvas.height - boxHeight) / 2, boxWidth, boxHeight);

    context.fillStyle = "black";
    context.fillText(text, (canvas.width - textWidth) / 2, (canvas.height - textHeight) / 2 + textHeight);
  }

  function drawBackgroundGradient(context) {
    context.fillStyle = createLinearGradient(context);
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  function createLinearGradient(context) {
    var radians = gd.degrees * Math.PI / 180;
    var length = (Math.abs(canvas.width * Math.sin(radians)) + Math.abs(canvas.height * Math.cos(radians))) / 2;
    var x1 = Math.sin(radians + Math.PI) * length + canvas.width/2,
        y1 = -Math.cos(radians + Math.PI) * length + canvas.height/2,
        x2 = Math.sin(radians) * length + canvas.width/2,
        y2 = -Math.cos(radians) * length + canvas.height/2;

    var gradient = context.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, gd.start);
    gradient.addColorStop(1, gd.end);

    return gradient;
  }

  function drawStuff() {

    $('#canvas').mousedown(function(e){
      var mouseX = e.pageX - this.offsetLeft;
      var mouseY = e.pageY - this.offsetTop;
        
      paint = true;
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
      redraw();
    });

    $('#canvas').mousemove(function(e){
      if(paint){
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
      }
    });

    $('#canvas').mouseup(function(e){
      paint = false;
    });

    $('#canvas').mouseleave(function(e){
      paint = false;
    });

    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;

    function addClick(x, y, dragging)
    {
      clickX.push(x);
      clickY.push(y);
      clickDrag.push(dragging);
    }

    function redraw(){
      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
      
      context.strokeStyle = brush_colour;
      context.lineJoin = "round";
      context.lineWidth = 2;
      context.globalAlpha = 0.3;
          
      for(var i=0; i < clickX.length; i++) {    
        context.beginPath();
        if(clickDrag[i] && i){
          context.moveTo(clickX[i-1], clickY[i-1]);
         }else{
           context.moveTo(clickX[i]-1, clickY[i]);
         }
         context.lineTo(clickX[i], clickY[i]);
         context.closePath();
         context.stroke();
      }
    }

  }
});
