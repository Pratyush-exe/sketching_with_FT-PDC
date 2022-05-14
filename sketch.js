var s1 = function( sketch ) {
  const USER = 0;
  const FOURIER = 1;

  let x = [];
  let fourierX;
  let time = 0;
  let path = [];
  let drawing = [];
  let state = -1;

  sketch.mousePressed = function () {
      state = USER;
      drawing = [];
      x = [];
      time = 0;
      path = [];
  }

  sketch.mouseReleased = function () {
      state = FOURIER;
      const skip = 1;
      for (let i = 0; i < drawing.length; i += skip) {
          x.push(new Complex(drawing[i].x, drawing[i].y));
      }
      fourierX = dft(x);

      fourierX.sort((a, b) => b.amp - a.amp);
  }

  sketch.setup = function () {
      sketch.createCanvas(500, 500).parent("sketch_cont");
      sketch.background(0);
      sketch.fill(100);
      sketch.textAlign(sketch.CENTER);
      sketch.textSize(32);
      sketch.text("Draw Something Here!", sketch.width / 2, sketch.height / 2);
  }

  function epicycles(x, y, rotation, fourier) {
      for (let i = 0; i < fourier.length; i++) {
          let prevx = x;
          let prevy = y;
          let freq = fourier[i].freq;
          let radius = fourier[i].amp;
          let phase = fourier[i].phase;
          x += radius * Math.cos(freq * time + phase + rotation);
          y += radius * Math.sin(freq * time + phase + rotation);

          sketch.stroke(255, 100);
          sketch.noFill();
          sketch.ellipse(prevx, prevy, radius * 2);
          sketch.stroke(255);
          sketch.line(prevx, prevy, x, y);
      }
      return sketch.createVector(x, y);
  }

  sketch.draw = function () {
      if (state == USER && sketch.mouseX <= sketch.width && sketch.mouseY <= sketch.height) {
          sketch.background(0);
          let point = sketch.createVector(sketch.mouseX - sketch.width / 2, sketch.mouseY - sketch.height / 2);
          drawing.push(point);
          sketch.stroke(255);
          sketch.noFill();
          sketch.beginShape();
          for (let v of drawing) {
              sketch.vertex(v.x + sketch.width / 2, v.y + sketch.height / 2);
          }
          sketch.endShape();
      } else if (state == FOURIER) {
          sketch.background(0);
          let v = epicycles(sketch.width / 2, sketch.height / 2, 0, fourierX);
          path.unshift(v);
          sketch.beginShape();
          sketch.noFill();
          sketch.strokeWeight(2);
          sketch.stroke(255, 255, 0);
          for (let i = 0; i < path.length; i++) {
              sketch.vertex(path[i].x, path[i].y);
          }
          sketch.endShape();

          const dt = two_pi / fourierX.length;
          time += dt;

          if (time > two_pi) {
              time = 0;
              path = [];
          }
      }
  }
};

new p5(s1);