import React from "react";
import { StyledCell } from "./styles/StyledCells"
import { TETROMINOES } from "../tetrominoes"

function Cell({type}){
    return <StyledCell type= {type} color={TETROMINOES[type].color}/>
}
export default React.memo(Cell);