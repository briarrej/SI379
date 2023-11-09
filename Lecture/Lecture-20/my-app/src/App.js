import React from 'react';
function App(){
    const clickCountState = React.useState(0);
    //React.useState returns an ARRAY with two elements:
    //1. The current value of the state
    //2. A function to update the state 
    
    const clickCountValue = clickCountState[0];
    const setClickCount = clickCountState[1];
    const clickListener = () => {
        setClickCount(clickCountValue+1);
    };

    return <button onClick={clickListener}>
        Clicked {clickCountValue}
    </button>

}
export default App