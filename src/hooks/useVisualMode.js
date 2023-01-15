import React, { useState } from "react";


function useVisualMode(initial) {
const [mode, setMode] = useState(initial)
const [history, setHistory] = useState([initial]);

const transition = (mode, replace = false) => {
  if (replace) {
    setHistory(prev => prev.slice(0,-1)) 
  }
  setHistory(prev => [...prev, mode])
  setMode(mode)
}

const back = () => {
  if (history.length > 1){
  setHistory(prev => prev.slice(0,-1)) //set new array
  console.log(history) 
 return setMode(history[history.length-2])
}
return setMode(history[0])
}

return {mode, transition, back};
}


