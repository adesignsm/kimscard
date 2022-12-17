import $ from "jquery";
import "../styles/christmas-tree.css";

const ChristmasTree = () => {
    var thetaMin = 0;
    var thetaMax = 6 * Math.PI;
    var period = 5;
    var lineSpacing = 1 / 50;
    var lineLength = lineSpacing / 2;
    var yScreenOffset = 100;
    var xScreenOffset = 100;
    var xScreenScale = 300;
    var yScreenScale = 300;
    var yCamera = 2;
    var zCamera = -3;

    var rate = 1 / (2 * Math.PI); // every rotation y gets one bigger
    var factor = rate / 2;

    function run() {
        let ctx = document.getElementById('scene').getContext('2d');
        let spirals = [
            new Spiral({
                foreground: "#220000", // Second shadow for red spiral
                angleOffset: Math.PI * 0.92,
                factor: 0.90 * factor
            }),
            new Spiral({
                foreground: "#002211", // Second shadow for cyan spiral
                angleOffset: -Math.PI * 0.08,
                factor: 0.90 * factor
            }),
            new Spiral({
                foreground: "#89CFF0", // red spiral shadow
                angleOffset: Math.PI * 0.95,
                factor: 0.93 * factor
            }),
            new Spiral({
                foreground: "#A193C7", // cyan spiral shadow
                angleOffset: -Math.PI * 0.05,
                factor: 0.93 * factor
            }),
            new Spiral({
                foreground: "#92C7B2", // red Spiral
                angleOffset: Math.PI,
                factor: factor
            }),
            new Spiral({
                foreground: "#C9AEA1", // cyan spiral
                angleOffset: 0,
                factor: factor
            })
        ];

        renderFrame(); // animation loop starts here

        function renderFrame() {
            requestAnimationFrame(renderFrame);

            ctx.clearRect(0, 0, 500, 500);
            ctx.beginPath();
            spirals.forEach(renderSpiral);
        }

        function renderSpiral(spiral) {
            spiral.render(ctx);
        }

        function Spiral(config) {
            var offset = 0;
            var lineSegments = computeLineSegments();

            this.render = function(ctx) {
                offset -= 1;
                if (offset <= -period) {
                    offset += period;
                }

                lineSegments[offset].forEach(drawLineSegment);
            };

            function drawLineSegment(segment) {
                stroke(config.foreground, segment.start.alpha);
                ctx.moveTo(segment.start.x, segment.start.y);
                ctx.lineTo(segment.end.x, segment.end.y);
            }

            function computeLineSegments() {
                var lineSegments = {};
                var factor = config.factor;
                var thetaNew, thetaOld;

                for (var offset = 0; offset > -period; offset--) {
                    let lines;
                    lineSegments[offset] = lines = [];
                    for ( var theta = thetaMin + getThetaChangeRate(thetaMin, offset * lineSpacing / period, rate, factor); theta < thetaMax; theta += getThetaChangeRate(theta, lineSpacing, rate, factor)) {
                        thetaOld = (theta >= thetaMin) ? theta : thetaMin;
                        thetaNew = theta + getThetaChangeRate(theta, lineLength, rate, factor);

                        if (thetaNew <= thetaMin) {
                            continue;
                        }

                        lines.push({
                            start: getPointByAngle(thetaOld, factor, config.angleOffset, rate),
                            end: getPointByAngle(thetaNew, factor, config.angleOffset, rate)
                        });
                    }
                }
                
                return lineSegments;
            }
        }

        function stroke(color, alpha) {
            ctx.closePath();
            ctx.stroke();
            ctx.strokeStyle = color;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
        }

        function getPointByAngle(theta, factor, angleOffset, rate) {
            var x = theta * factor *  Math.cos(theta + angleOffset);
            var z = - theta * factor * Math.sin(theta + angleOffset);
            var y = rate * theta;
            
            var point = projectTo2d(x, y, z);
            point.alpha = Math.atan((y * factor / rate * 0.1 + 0.02 - z) * 40) * 0.35 + 0.65;

            return point;
        }

        function getThetaChangeRate(theta, lineLength, rate, factor) {
            return lineLength / Math.sqrt(rate * rate + factor * factor * theta * theta);
        }

        function projectTo2d(x, y, z) {
            return {
                x: xScreenOffset + xScreenScale * (x / (z - zCamera)),
                y: yScreenOffset + yScreenScale * ((y - yCamera) / (z - zCamera))
            };
        }

        function requestAnimationFrame(callback) {
            window.setTimeout(callback, 1000 / 24);
        }
    }

    setTimeout(() => {
        run();
    }, 500);

    return (
        <>
            <div id = "greeting">
                <div id = "container">
                    <h1 id = "christmas-greeting">
                        Ayoo merry Christmas! Wishing you all the good juju energies to take care of you in 2023 🌠
                        <br></br>
                        <br></br>
                        Here's to more succcess and all that good stuff 🍻 
                    </h1> 
                </div>
            </div>
            <canvas id = "scene"></canvas>
        </>
    )
}

export default ChristmasTree;