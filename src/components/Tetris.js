import React, { useState } from "react";  
import Stage from "./Stage"
import Display from "./Display"
import StartButton from "./StartButton"
import { createStage, checkCollision } from "../gameHelper";
//style components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris"
//custom hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";


function Tetris(){
    const[droptime,setDropTime] = useState(null);
    const[gameOver,setGameOver] = useState(false);
    const[player, updatePlayerPos, resetPlayer,playerRotate] = usePlayer();
    const[stage,setStage,rowsCleared] = useStage(player,resetPlayer);
    const[score,setScore,rows,setRows,level,setLevel] = useGameStatus(rowsCleared)

    console.log("re-render");

    const movePlayer = dir => {
        if(!checkCollision(player,stage,{x: dir, y:0})){
            updatePlayerPos({x: dir, y: 0});
        }
    }


    const startGame = () => {
        //reset
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        //level incremement on rows cleared = 10
        if(rows > (level + 1) * 10){
            setLevel(prev => prev + 1);
            //increase speedof drop
            setDropTime(1000/(level + 1) +200);
        }
        
        if(!checkCollision(player,stage,{x:0,y:1})){
            updatePlayerPos({x:0,y:1,collided:false})
        }else{
            if(player.pos.y < 1){
                console.log("Game Over!");
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({x: 0, y: 0, collided: true})
        }
    }

    const keyUp = (key) =>{
        if(!gameOver){
            if(key === "ArrowDown"){
                console.log("Interval on");
                setDropTime(1000/(level + 1) +200);;
            }
        }
    }
    const dropPlayer = () => {
        console.log("Interval off");
        setDropTime(null);
        drop();
    }


    const move = (key) => {
        if(!gameOver){
            if(key === "ArrowLeft"){
                movePlayer(-1);
            }else if(key === "ArrowRight"){
                movePlayer(1);
            }else if(key === "ArrowDown"){
                dropPlayer();
            }else if(key === "ArrowUp"){
                playerRotate(stage,1);
            }else if(key === " "){
                console.log("");
            }
        }
    }

    useInterval(()=>{drop();},droptime);
    return (
        <StyledTetrisWrapper 
            role="button" 
            tabIndex="0" 
            onKeyDown ={e => move(e.key)} 
            onKeyUp={e => keyUp(e.key)}
        >
            <StyledTetris>
              <Stage stage= {stage}/>
              <aside>
                    {gameOver?(<Display gameOver={gameOver} text="Game Over"/>):(
                        <div>
                            <Display text={`Score: ${score}`} />
                            <Display text={`Rows: ${rows}`} />
                            <Display text={`Level: ${level}`} />

                        </div>
                    )}
                    
                    <StartButton callback={startGame} />
              </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
}
export default Tetris;