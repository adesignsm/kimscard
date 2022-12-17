import React from "react";

import "./styles/app.css";
import Overlay from "./components/Overlay";
import ChristmasTree from "./components/ChristmasTree";

const App = () => {
    return (
        <>
            <Overlay />
            <ChristmasTree />
        </>
    )
}

export default App;