// =========================================================
// Functons
// =========================================================
function drawFace(canvas, opts) {
    let ctx = canvas.getContext("2d");
    ctx.save();
    ctx.lineWidth = opts.radius * 0.075;
    ctx.strokeStyle = opts.lineColor;
    ctx.beginPath();
    ctx.arc(opts.x, opts.y, opts.radius, opts.startAngle, opts.endAngle);
    ctx.stroke();
    ctx.fillStyle = opts.fill;
    ctx.fill();
    ctx.restore();
}

function drawSmile(canvas, opts, flipSmile = true) {
    let ctx = canvas.getContext("2d");
    let radius = 40 * opts.radius * 0.0125;
    let x = opts.x;
    let y, startAngle, endAngle;
        
    if (flipSmile) {
        y = opts.y + opts.radius * 0.7;
        startAngle = -Math.PI * 0.85; //Math.PI * 0.1;
        endAngle = -0.5; //-Math.PI * 1.1;
    } else {
        y = opts.y + opts.radius * 0.1;
        startAngle = Math.PI * 0.1;
        endAngle = -Math.PI * 1.1;
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.lineWidth = opts.radius * 0.1;

    ctx.strokeStyle = opts.lineColor;
    ctx.stroke();
    ctx.restore();
}

function drawEyes(canvas, opts) {
    let xOffset = opts.radius * 0.5;
    let radius = opts.radius * 0.15;

    drawEye(canvas, opts, xOffset, 0, radius); // Left
    drawEye(canvas, opts, -xOffset, 0, radius); // Right
}

function drawEye(canvas, opts, centerX, centerY, radius) {
    let ctx = canvas.getContext("2d");

    // Save state
    ctx.save();

    // Translate context so height is 1/3'rd from top of enclosing circle
    ctx.translate(opts.x, opts.y - (opts.radius / 3));

    // Scale context horizontally by 50%
    ctx.scale(0.5, 1);

    // Draw circle which will be stretched into an oval
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);

    // Apply styling
    ctx.fillStyle = opts.lineColor;
    ctx.fill();
    ctx.lineWidth = radius * 0.75;
    ctx.strokeStyle = opts.lineColor;
    ctx.stroke();
    
    // Restore to original state
    ctx.restore();
}

export function drawHappyFace(canvas, opts, flipSmile) {
    opts = opts || {};
    
    let defaultRadius = 48;
    let options = {
        x: opts.x || (defaultRadius / 0.9),
        y: opts.y || (defaultRadius / 0.9),
        radius: opts.radius || defaultRadius,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        fill: opts.fill || 'yellow',
        lineColor: opts.lineColor || 'black'
    };
    
    drawFace(canvas, options);
    drawEyes(canvas, options);
    drawSmile(canvas, options, flipSmile);
}