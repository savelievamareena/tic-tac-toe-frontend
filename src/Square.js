import React from "react";
import "./Square.css";

export default function Square(props){
    let active = (props.state === 1 && "grey") || (props.state === 2 && "pink")
    let classArr = ['square']
    if(active !== false) {
        classArr.push(active)
    }

    return(
        <div
            className={classArr.join(" ")}
            onClick={props.handleMove.bind(undefined, props.squareIndex)}
        ></div>
    )
}