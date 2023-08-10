import React from "react";

export default function TitleComponent(props) {
    return(
        <div className="title-field">
            <h1 id="title">{(props.status === 1 && "USER 1 WIN!!!")
                || (props.status === 2 && "USER 2 WIN!!!")
                || (props.status === 0 && "Let's go")
                || (props.status === 3 && "DRAW")
            }</h1>
        </div>
    )
}