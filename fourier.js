let two_pi = 6.283185307
let PI = 3.141592654
let half_pi = 1.570796327

class Complex {
  constructor(a, b) {
      this.re = a;
      this.im = b;
  }

  add(c) {
      this.re += c.re;
      this.im += c.im;
  }

  mult(c) {
      const re = this.re * c.re - this.im * c.im;
      const im = this.re * c.im + this.im * c.re;
      return new Complex(re, im);
  }
}

function dft(x) {
  const X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
      let sum = new Complex(0, 0);
      for (let n = 0; n < N; n++) {
          const phi = (two_pi * k * n) / N;
          const c = new Complex(Math.cos(phi), -Math.sin(phi));
          sum.add(x[n].mult(c));
      }
      sum.re = sum.re / N;
      sum.im = sum.im / N;

      let freq = k;
      let amp = Math.sqrt(sum.re * sum.re + sum.im * sum.im);
      let phase = Math.atan2(sum.im, sum.re);
      X[k] = {
          re: sum.re,
          im: sum.im,
          freq,
          amp,
          phase
      };
  }
  return X;
}

function dft_2(x) {
    const X = [];
    const N = x.length;
    for (let k = 0; k < N; k++) {
      let re = 0;
      let im = 0;
      for (let n = 0; n < N; n++) {
        const phi = (two_pi * k * n) / N;
        re += x[n] * Math.cos(phi);
        im -= x[n] * Math.sin(phi);
      }
      re = re / N;
      im = im / N;
  
      let freq = k;
      let amp = Math.sqrt(re * re + im * im);
      let phase = Math.atan2(im, re);
      X[k] = { re, im, freq, amp, phase };
    }
    return X;
  }