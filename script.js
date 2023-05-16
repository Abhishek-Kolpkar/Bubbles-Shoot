const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const flag = true;
let arrowMove;

// Draw circles to the left side of the canvas
let circleOne = new Path2D(),
  circleTwo = new Path2D(),
  circleThree = new Path2D(),
  circleFour = new Path2D();

const circles = [
  { circle: circleOne, x: 100, y: 65, r: 40, color: "rgb(135, 206, 235)" },
  { circle: circleTwo, x: 100, y: 185, r: 40, color: "rgb(144, 238, 144)" },
  { circle: circleThree, x: 100, y: 305, r: 40, color: "rgb(238, 130, 238)" },
  { circle: circleFour, x: 100, y: 425, r: 40, color: "rgb(205, 133, 63)" },
];

const renderCircle = () => {
  circles.forEach(({ circle, x, y, r, color }) => {
    circle.arc(x, y, r, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill(circle);
    context.lineWidth = 3;
    context.stroke(circle);
  });
};
renderCircle(); // invoking function for rendering circles on canvas

// Draw arrows corresponding to each circle to the right side of the canvas
const drawArrow = (context, x1, y1, x2, y2) => {
  const t = 0.9;

  const arrow = {
    dx: x2 - x1,
    dy: y2 - y1,
  };

  const middle = {
    x: arrow.dx * t + x1,
    y: arrow.dy * t + y1,
  };

  const tip = {
    dx: x2 - middle.x,
    dy: y2 - middle.y,
  };

  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(middle.x, middle.y);
  context.moveTo(middle.x + 0.5 * tip.dy, middle.y - 0.5 * tip.dx);
  context.lineTo(middle.x - 0.5 * tip.dy, middle.y + 0.5 * tip.dx);
  context.lineTo(x2, y2);
  context.closePath();
  context.lineWidth = 8;
  context.stroke();
};

let arrowPos = [
  { id: 1, x1: 850, y1: 65, x2: 800, y2: 65 },
  { id: 2, x1: 850, y1: 185, x2: 800, y2: 185 },
  { id: 3, x1: 850, y1: 305, x2: 800, y2: 305 },
  { id: 4, x1: 850, y1: 425, x2: 800, y2: 425 },
];

const renderArrow = () => {
  arrowPos.forEach(({ x1, y1, x2, y2 }) => {
    drawArrow(context, x1, y1, x2, y2);
  });
};
renderArrow(); // invoking function for rendering arrows on canvas

/* When you click inside any circle, the arrow to the corresponding circle should start moving towards the circle & hit it & change circle color */
canvas.addEventListener("click", (event) => {
  circles.forEach(({ circle, y }) => {
    arrowPos.forEach(({ x1, y1, x2, y2 }) => {
      if (context.isPointInPath(circle, event.offsetX, event.offsetY)) {
        const moveArrow = () => {
          if (flag && x1 >= 141) {
            x1 -= 50;
            x2 -= 50;
            if (x2 < 141) {
              context.fillStyle = "rgb(153, 153, 153)";
              context.fill(circle);
              context.lineWidth = 2;
              context.stroke(circle);
              return;
            }
            drawArrow(context, x1, y1, x2, y2);
            context.clearRect(x1, y1 - 10, x2, 20);
          }
        };
        if (y == 65 && y1 == 65) {
          let { x1, y1, x2, y2 } = arrowPos[0];
          arrowMove = setInterval(moveArrow, 200);
        } else if (y == 185 && y1 == 185) {
          let { x1, y1, x2, y2 } = arrowPos[1];
          arrowMove = setInterval(moveArrow, 200);
        } else if (y == 305 && y1 == 305) {
          let { x1, y1, x2, y2 } = arrowPos[2];
          arrowMove = setInterval(moveArrow, 200);
        } else if (y == 425 && y1 == 425) {
          let { x1, y1, x2, y2 } = arrowPos[3];
          arrowMove = setInterval(moveArrow, 200);
        }
      }
    });
  });
});

// reset button that resets the application to its initial state
const resetBtn = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  renderCircle();
  renderArrow();
  clearInterval(arrowMove);
};
