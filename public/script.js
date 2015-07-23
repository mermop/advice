$( document ).ready(function() {
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
    outputContext.font = "bold 24pt Times";

    var gradient = outputContext.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#ECF9FF");
    gradient.addColorStop(1, "#F5D9E5");
    outputContext.fillStyle = gradient;
    outputContext.fillRect(0, 0, canvas.width, canvas.height);

    var text = $(".advice").text();
    var textWidth = outputContext.measureText(text).width;
    var textHeight = 24;
    var boxWidth = textWidth + 64;
    var boxHeight = textHeight + 64;

    outputContext.fillStyle = "rgba(255, 255, 255, 0.5)"
    outputContext.fillRect((canvas.width - boxWidth) / 2, (canvas.height - boxHeight) / 2, boxWidth, boxHeight);

    outputContext.fillStyle = "black";
    outputContext.fillText(text, (canvas.width - textWidth) / 2, (canvas.height - textHeight) / 2 + textHeight);

    outputContext.drawImage(canvas, 0, 0);

    this.href = outputCanvas.toDataURL();
    this.download = "advice.png";
  });

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
