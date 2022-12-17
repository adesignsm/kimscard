import React, {useState} from "react";
import $ from "jquery";

import "../styles/overlay.css";

const Overlay = () => {
    const [overlayState, setOverlayState] = useState(false);

    const animations = () => {
        $("#overlay-container h1").animate({opacity: "1", marginTop: "0"}, 1000);
        $("#overlay-container h4").delay(1500).animate({opacity: "1", marginTop: "0"}, 1500);
        $("#overlay-container button").delay(1000).fadeIn(500);

        setInterval(() => {
            if ($("#overlay-container button").css("display") === "inline-block") {
                setTimeout(() => {
                    $("#overlay-container button").addClass("blinker");
                }, 500);
            }
        }, 100)
    }

    const handleClick = () => setOverlayState(true);
    if (overlayState === true) {
        $("#overlay").delay(500).animate({top: "-100vh"}, 2000);
        $("#greeting").delay(2500).animate({top: "0"}, 1000);
        $("#container h1").delay(4000).animate({opacity: "1", marginTop: "0"}, 500);
        $("#container h1").delay(6000).animate({opacity: "0"}, 500);
         setTimeout(() => {
            document.getElementById("christmas-greeting").innerHTML = "Also heads up your gift is coming on the 19th! Super sorry for it coming late.";
         }, 11000);
        $("#container h1").delay(1000).animate({opacity: "1"}, 500);
    }

    setTimeout(() => {
        animations();
    }, 1000);

    return (
        <>
            <div id = "overlay">
                <div id = "overlay-container">
                    <h1> MERRY CHRISTMAS KIM! 🎄 </h1>
                    <h4> I kinda procastinated so I just made this digital card instead lol. Hope you like it, its not a whole lot </h4>
                    <button onClick={handleClick}> BING BONG </button>
                </div>
            </div>
        </>
    )
}

export default Overlay;