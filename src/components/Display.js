import React from "react";  
import { StyledDisplay } from "./styles/StyledDisplay";
function Display({ gameover, text }){
    return <StyledDisplay gameover = {gameover}>{ text }</StyledDisplay>
}
export default Display;