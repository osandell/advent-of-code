let input = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf
acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`;

input = input.split("\n");

let top;
let topLeft;
let topRight;
let middle;
let bottomLeft;
let bottomRight;
let bottom;

let zero;
let one;
let two;
let three;
let threeIndex;
let four;
let five;
let fiveIndex;
let six;
let sixIndex;
let seven;
let eight;
let nine;

let letters = ["a", "b", "c", "d", "e", "f", "g"];
let totalOutput = 0;
let output = [];
input.forEach((row) => {
  console.log("newrow");

  /////////////////
  // determine 7
  //////////////////
  row = row.split("|");
  firstPart = row[0];
  firstPart = firstPart.replace(/\s+$/, "");
  // console.log(`firstPart`, firstPart);

  signals = firstPart.split(" ");

  signals.forEach((signal) => {
    signal = signal.split("");

    if (signal.length === 3) {
      // console.log(`signal 7`, signal);

      seven = signal;
    }
  });

  /////////////////
  // determine 4
  //////////////////
  // input.forEach((row) => {
  // row = row.split("|");
  // firstPart = row[0];
  // firstPart = firstPart.replace(/\s+$/, "");
  // // console.log(`firstPart`, firstPart);

  // signals = firstPart.split(" ");

  signals.forEach((signal) => {
    signal = signal.split("");

    if (signal.length === 4) {
      // console.log(`signal 7`, signal);

      four = signal;
    }
  });
  // });

  /////////////////
  // determine 8
  //////////////////
  // input.forEach((row) => {
  //   row = row.split("|");
  //   firstPart = row[0];
  //   firstPart = firstPart.replace(/\s+$/, "");
  //   // console.log(`firstPart`, firstPart);

  //   signals = firstPart.split(" ");

  signals.forEach((signal) => {
    signal = signal.split("");

    if (signal.length === 7) {
      // console.log(`signal 7`, signal);

      eight = signal;
    }
  });
  // });

  /////////////////
  // determine top
  //////////////////
  // input.forEach((row) => {
  //   row = row.split("|");
  //   firstPart = row[0];
  //   firstPart = firstPart.replace(/\s+$/, "");
  //   // console.log(`firstPart`, firstPart);

  //   signals = firstPart.split(" ");

  signals.forEach((signal) => {
    signal = signal.split("");

    if (signal.length === 3) {
      // console.log(`signal 7`, signal);

      signal.forEach((segment) => {
        // console.log(`segment`, segment);
        let isIn1or4 = false;
        signals.forEach((signal2) => {
          if (signal2.length === 2 || signal2.length === 4) {
            // console.log(`signal2`, signal2);
            if (signal2.includes(segment)) {
              isIn1or4 = true;
            }
          }
        });
        // console.log(`isIn1or4`, isIn1or4);

        if (!isIn1or4) {
          top = segment;
        }
      });
    }
  });
  // });

  /////////////////
  // determine 6 and topright
  //////////////////
  // input.forEach((row) => {
  //   row = row.split("|");
  //   firstPart = row[0];
  //   firstPart = firstPart.replace(/\s+$/, "");
  //   // console.log(`firstPart`, firstPart);

  //   signals = firstPart.split(" ");

  signals.forEach((signal) => {
    signal = signal.split("");

    // this could be 0, 6 or 9
    // 6 doesn't have top right so check against nr 1 wich one is lacking one of the two segments of 1
    if (signal.length === 6) {
      // console.log(`signal`, signal);

      signals.forEach((signal2, index) => {
        // find 1
        if (signal2.length === 2) {
          signal2Segments = signal2.split("");

          let includesBoth = true;

          if (!signal.includes(signal2Segments[0])) {
            includesBoth = false;
          }
          if (!signal.includes(signal2Segments[1])) {
            includesBoth = false;
          }

          // console.log(`includesBoth`, includesBoth);

          if (!includesBoth) {
            six = signal;
            sixIndex = index;

            letters.forEach((letter) => {
              if (!signal.includes(letter)) {
                topRight = letter;
              }
            });
          }
        }
      });

      // signal.forEach((segment) => {
      //   console.log(`segment`, segment);
      // });
    }
  });
  // });

  /////////////////
  // determine 5
  //////////////////
  // input.forEach((row) => {
  //   row = row.split("|");
  //   firstPart = row[0];
  //   firstPart = firstPart.replace(/\s+$/, "");
  //   // console.log(`firstPart`, firstPart);

  //   signals = firstPart.split(" ");

  signals.forEach((signal, index) => {
    signal = signal.split("");

    // this could be 2, 5 or 3
    // 5 doesn't have top right
    if (signal.length === 5) {
      if (!signal.includes(topRight)) {
        five = signal;
        fiveIndex = index;
      }
    }
  });
  // });

  /////////////////
  // determine 1 and bottomright
  //////////////////
  // input.forEach((row) => {
  //   row = row.split("|");
  //   firstPart = row[0];
  //   firstPart = firstPart.replace(/\s+$/, "");
  //   // console.log(`firstPart`, firstPart);

  //   signals = firstPart.split(" ");

  signals.forEach((signal) => {
    signal = signal.split("");

    if (signal.length === 2) {
      // console.log(`signal 7`, signal);

      one = signal;

      one.forEach((segment) => {
        if (segment != topRight) {
          bottomRight = segment;
        }
      });
    }
  });
  // });

  let topMiddleBottom = [];

  /////////////////
  // determine 3 and 2
  //////////////////
  // input.forEach((row) => {
  //   row = row.split("|");
  //   firstPart = row[0];
  //   firstPart = firstPart.replace(/\s+$/, "");
  //   // console.log(`firstPart`, firstPart);

  //   signals = firstPart.split(" ");

  signals.forEach((signal, index) => {
    signal = signal.split("");

    // this could be 2, 5 or 3
    // 5 doesn't have top right
    if (signal.length === 5) {
      if (signal.includes(bottomRight) && index !== fiveIndex) {
        // console.log(`signal`, signal);
        // console.log(`five`, five);

        // console.log("yeah");
        three = signal;
        threeIndex;

        three.forEach((segmentOfThree) => {
          if (segmentOfThree !== topRight && segmentOfThree !== bottomRight) {
            topMiddleBottom.push(segmentOfThree);
          }
        });
      }
    }
  });

  // console.log(`topMiddleBottom`, topMiddleBottom);

  signals.forEach((signal, index) => {
    signal = signal.split("");

    // this could be 2, 5 or 3
    // 5 doesn't have top right
    if (signal.length === 5) {
      if (!signal.includes(bottomRight) && index !== fiveIndex) {
        // console.log(`signal`, signal);
        // console.log(`five`, five);

        // console.log("yeah");
        two = signal;
      }
    }
  });
  // });

  ////////
  // get top middle bottom
  ////////

  /////////////////
  // determine 0
  //////////////////
  // input.forEach((row) => {
  //   row = row.split("|");
  //   firstPart = row[0];
  //   firstPart = firstPart.replace(/\s+$/, "");
  //   // console.log(`firstPart`, firstPart);

  //   signals = firstPart.split(" ");

  signals.forEach((signal) => {
    signal = signal.split("");

    // this could be 0, 6 or 9
    // 6 doesn't have top right so check against nr 1 wich one is lacking one of the two segments of 1
    if (signal.length === 6) {
      // console.log(`signal`, signal);

      signals.forEach((signal2) => {
        // find 1
        if (signal2.length === 2) {
          signal2Segments = signal2.split("");

          let includesBoth = true;

          if (!signal.includes(signal2Segments[0])) {
            includesBoth = false;
          }
          if (!signal.includes(signal2Segments[1])) {
            includesBoth = false;
          }

          // console.log(`includesBoth`, includesBoth);

          if (includesBoth) {
            // six = signal;

            let includesAll = true;
            topMiddleBottom.forEach((seg) => {
              if (!signal.includes(seg)) {
                includesAll = false;
              }
            });

            if (!includesAll) {
              zero = signal;
            } else {
              nine = signal;
            }
          }
        }
      });

      // signal.forEach((segment) => {
      //   console.log(`segment`, segment);
      // });
    }
  });
  // });

  // console.log(`top`, top);
  // console.log(`topLeft`, topLeft);
  // console.log(`topRight`, topRight);
  // console.log(`middle`, middle);
  // console.log(`bottomLeft`, bottomLeft);
  // console.log(`bottomRight`, bottomRight);
  // console.log(`bottom`, bottom);
  // console.log("----------------");
  // console.log(`zero`, zero);
  // console.log(`one`, one);
  // console.log(`two`, two);
  // console.log(`three`, three);
  // console.log(`four`, four);
  // console.log(`five`, five);
  // console.log(`six`, six);
  // console.log(`seven`, seven);
  // console.log(`eight`, eight);
  // console.log(`nine`, nine);

  // input.forEach((row) => {
  //   row = row.split("|");
  secondPart = row[1];
  secondPart = secondPart.replace(/^\s+/g, "");

  signals = secondPart.split(" ");
  // console.log(`firstPart`, signals);

  signals.forEach((signal) => {
    signal = signal.split("");

    if (signal.length === zero.length) {
      // console.log("coudl be zero");
      let corresponds = true;
      signal.forEach((segment, index) => {
        // console.log(`segment`, segment, zero[index]);
        if (!zero.includes(segment)) {
          corresponds = false;
        }
      });

      if (corresponds) {
        // console.log("this is zero");
        output.push(0);
      }
    }

    if (signal.length === one.length) {
      // console.log("coudl be one");
      let corresponds = true;
      signal.forEach((segment, index) => {
        // console.log(`segment`, segment, one[index]);
        if (!one.includes(segment)) {
          corresponds = false;
        }
      });

      if (corresponds) {
        // console.log("this is one");
        output.push(1);
      }
    }
    if (signal.length === two.length) {
      // console.log("coudl be two");
      let corresponds = true;
      signal.forEach((segment, index) => {
        // console.log(`segment`, segment, two[index]);
        if (!two.includes(segment)) {
          corresponds = false;
        }
      });

      if (corresponds) {
        // console.log("this is two");
        output.push(2);
      }
    }
    if (signal.length === three.length) {
      // console.log("coudl be three");
      let corresponds = true;
      signal.forEach((segment, index) => {
        // console.log(`segment`, segment, three[index]);
        if (!three.includes(segment)) {
          corresponds = false;
        }
      });

      if (corresponds) {
        // console.log("this is three");
        output.push(3);
      }
    }
    if (signal.length === four.length) {
      // console.log("coudl be four");
      let corresponds = true;
      signal.forEach((segment, index) => {
        // console.log(`segment`, segment, four[index]);
        if (!four.includes(segment)) {
          corresponds = false;
        }
      });

      if (corresponds) {
        // console.log("this is four");
        output.push(4);
      }
    }

    if (signal.length === five.length) {
      // console.log("coudl be five");
      let corresponds = true;
      signal.forEach((segment, index) => {
        // console.log(`segment`, segment, five[index]);
        if (!five.includes(segment)) {
          corresponds = false;
        }
      });

      if (corresponds) {
        // console.log("this is five");
        output.push(5);
      }
    }

    if (signal.length === six.length) {
      // console.log("coudl be six");
      let corresponds = true;
      signal.forEach((segment, index) => {
        // console.log(`segment`, segment, six[index]);
        if (!six.includes(segment)) {
          corresponds = false;
        }
      });

      if (corresponds) {
        // console.log("this is six");
        output.push(6);
      }
    }
    if (signal.length === seven.length) {
      // console.log("coudl be seven");
      let corresponds = true;
      signal.forEach((segment, index) => {
        // console.log(`segment`, segment, seven[index]);
        if (!seven.includes(segment)) {
          corresponds = false;
        }
      });

      if (corresponds) {
        console.log("this is seven");
        output.push(7);
      }
    }
    if (signal.length === eight.length) {
      console.log("coudl be eight");
      let corresponds = true;
      signal.forEach((segment, index) => {
        console.log(`segment`, segment, eight[index]);
        if (!eight.includes(segment)) {
          corresponds = false;
        }
      });

      if (corresponds) {
        console.log("this is eight");
        output.push(8);
      }
    }
    if (signal.length === nine.length) {
      console.log("coudl be nine");
      let corresponds = true;
      signal.forEach((segment, index) => {
        console.log(`segment`, segment, nine[index]);
        if (!nine.includes(segment)) {
          corresponds = false;
        }
      });

      if (corresponds) {
        console.log("this is nine");
        output.push(9);
      }
    }
  });

  totalOutput += parseInt(`${output[0]}${output[1]}${output[2]}${output[3]}`);
});

console.log(`output`, totalOutput);
