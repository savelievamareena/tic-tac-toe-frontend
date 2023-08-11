import React from "react";
import './App.css';
import AppContext from "./contexts/AppContext";
import ContentComponent from "./ContentComponent";

function App() {
    const uidRef = React.useRef(0);
    const ajaxIsRunning= React.useRef(true);
    const firstPlayerId= React.useRef(1);

    const [gameStatus, setGameStatus] = React.useState(0);
    const [showBlockingUiSpinner, setShowBlockingUiSpinner] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeUser, setActiveUser] = React.useState(1);
    const [store, setStore] = React.useState([]);

    return (
        <AppContext.Provider value={{
            store, setStore,
            activeUser, setActiveUser,
            isLoading, setIsLoading,
            showBlockingUiSpinner, setShowBlockingUiSpinner,
            gameStatus, setGameStatus,
            firstPlayerId, ajaxIsRunning, uidRef
        }}>
            <div className="App">
                <ContentComponent/>
            </div>
        </AppContext.Provider>
    );
}

export default App;
