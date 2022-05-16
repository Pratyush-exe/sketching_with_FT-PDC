var s3 = function(sketch_2) {
    const USER = 0;
    const FOURIER = 1;

    let x = [];
    let y = [];
    let fourierX;
    let fourierY;
    let time = 0;
    let path = [];
    let drawing = [];
    let state = -1;

    sketch_2.mousePressed = function () {
        state = USER;
        drawing = [];
        x = [];
        y = [];
        time = 0;
        path = [];
    }

    sketch_2.mouseReleased = function () {
        state = FOURIER;
        const skip = 1;
        for (let i = 0; i < drawing.length; i += skip) {
            x.push(drawing[i].x);
            y.push(drawing[i].y);
    }
    fourierX = dft_2(x);
    fourierY = dft_2(y);

    fourierX.sort((a, b) => b.amp - a.amp);
    fourierY.sort((a, b) => b.amp - a.amp);
    }

    sketch_2.setup = function () {
        sketch_2.createCanvas(600, 400).parent("sketch2_cont");
        sketch_2.background(0);
        sketch_2.fill(100);
        sketch_2.textAlign(sketch_2.CENTER);
        sketch_2.textSize(32);
        sketch_2.text("Draw Something Here!", sketch_2.width / 2, sketch_2.height / 2);
    }

    function epiCycles(x, y, rotation, fourier) {
        for (let i = 0; i < fourier.length; i++) {
            let prevx = x;
            let prevy = y;
            let freq = fourier[i].freq;
            let radius = fourier[i].amp;
            let phase = fourier[i].phase;
            x += radius * Math.cos(freq * time + phase + rotation);
            y += radius * Math.sin(freq * time + phase + rotation);

            sketch_2.stroke(255, 100);
            sketch_2.noFill();
            sketch_2.ellipse(prevx, prevy, radius * 2);
            sketch_2.stroke(255);
            sketch_2.line(prevx, prevy, x, y);
        }
        return sketch_2.createVector(x, y);
    }

    sketch_2.draw = function () {
        sketch_2.background(0);

        if (state == USER) {
            let point = sketch_2.createVector(sketch_2.mouseX - sketch_2.width / 2, sketch_2.mouseY - sketch_2.height / 2);
            drawing.push(point);
            sketch_2.stroke(255);
            sketch_2.noFill();
            sketch_2.beginShape();
            for (let v of drawing) {
            sketch_2.vertex(v.x + sketch_2.width / 2, v.y + sketch_2.height / 2);
            }
            sketch_2.endShape();
        } else if (state == FOURIER) {
            let vx = epiCycles(sketch_2.width / 2, 100, 0, fourierX);
            let vy = epiCycles(100, sketch_2.height / 2, half_pi, fourierY);
            let v = sketch_2.createVector(vx.x, vy.y);
            path.unshift(v);
            sketch_2.line(vx.x, vx.y, v.x, v.y);
            sketch_2.line(vy.x, vy.y, v.x, v.y);

            sketch_2.beginShape();
            sketch_2.noFill();
            for (let i = 0; i < path.length; i++) {
                sketch_2.vertex(path[i].x, path[i].y);
            }
            sketch_2.endShape();

            const dt = two_pi / fourierY.length;
            time += dt;

            if (time > two_pi) {
                time = 0;
                path = [];
            }
        }
    }
}
new p5(s3)