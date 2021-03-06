var s2 = function( sketch ) {
    let time = 0;
    let wave = [];
    let path = [];

    let slider;

    sketch.setup = function() {
        sketch.createCanvas(1000, 400).parent("waves_cont");
        slider = sketch.createSlider(1, 15, 3).parent("waves_cont");
    }

    sketch.draw = function() {
        sketch.background(0);
        sketch.translate(150, 200);

        let x = 0;
        let y = 0;

        for (let i = 0; i < slider.value(); i++) {
            let prevx = x;
            let prevy = y;

            let n = i * 2 + 1;
            let radius = 75 * (4 / (n * PI));
            x += radius * Math.cos(n * time);
            y += radius * Math.sin(n * time);

            sketch.stroke(255, 100);
            sketch.noFill();
            sketch.ellipse(prevx, prevy, radius * 2);

            sketch.stroke(255);
            sketch.line(prevx, prevy, x, y);
        }
        wave.unshift(y);


        sketch.translate(200, 0);
        sketch.line(x - 200, y, 0, wave[0]);
        sketch.beginShape();
        sketch.noFill();
        for (let i = 0; i < wave.length; i++) {
            sketch.vertex(i, wave[i]);
        }
        sketch.endShape();

        time += 0.05;


        if (wave.length > 600) {
            wave.pop();
        }
    }
}

new p5(s2);