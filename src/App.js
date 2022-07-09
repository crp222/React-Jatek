import React, { useEffect, useState } from "react";
import "./App.css"

function App() {

  const [Positions, setPositions] = useState([[],[],[],[],[]]);
  const [Flipped, setFlipped] = useState([{i:-1,j:-1,p:-1}]);
  const [Guessed, setGuessed] = useState([]);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(()=>{
    let numbers = [1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5];
    numbers.sort(() => Math.random() - 0.5)
    let k = 0;
    let newPositions = [[],[],[],[],[]];
    for(let i=0;i<5;i++) {
      for(let j=0;j<5;j++) {
        newPositions[i][j] = numbers[k];
        k++;
      }
    }
    setPositions(newPositions);
  },[])

  function displayCard(p,state) {
    if(state === 1) {
      switch (p) {
        case 1 : return <div><div className="pos"><div className="red">{p}</div></div></div> ;
        case 2 : return <div><div className="pos"><div className="green">{p}</div></div></div> ;
        case 3 : return <div><div className="pos"><div className="yellow">{p}</div></div></div> ;
        case 4 : return <div><div className="pos"><div className="blue">{p}</div></div></div> ;
        case 5 : return <div><div className="pos"><div className="orange">{p}</div></div></div> ;
      }
    }else {
      return <div className="outer"><div className="pos hidden"><div>{p}</div></div></div>
    }
  }

  function displayPosition(p,i,j) {
    
    for(let k in Flipped) {
      if(Flipped[k].i === i && Flipped[k].j === j) {
        return displayCard(p,1);
      }
    }

    if(Guessed.includes(p)) {
      return displayCard(p,1);

    }
    return displayCard(p,0)

  }

  function reset() {
      setGuessed([]);
      setFlipped([{i:-1,j:-1,p:-1}]);

      let numbers = [1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5];
      numbers.sort(() => Math.random() - 0.5)
      let k = 0;
      let newPositions = [[],[],[],[],[]];
      for(let i=0;i<5;i++) {
        for(let j=0;j<5;j++) {
          newPositions[i][j] = numbers[k];
          k++;
        }
      }
      setPositions(newPositions);
  }
  
  useEffect(()=>{
    if(Guessed.length === 5) {
      alert("win");

      setTimeout(() => {
          reset();
      }, 3000);
    }
  },[Guessed])

  function flip(p,i,j) {
    if(Flipped[0].p !== p && !Guessed.includes(p)) {
      setFlipped([{i:i,j:j,p:p}]);
    }else {
        setFlipped(Flipped => [...Flipped,{i:i,j:j,p:p}]);
        if(Flipped.length === 4) {
          setGuessed(Guessed=>[...Guessed,p]);
        }
    }
  }

  return (
    <div className="container">
        {
          Positions.map((e,i)=>(
            <div key={"col"+i} className="col">
                {
                  e.map((p,j)=>(
                    <div onClick={()=>flip(p,i,j)} key={"pos"+j}>{displayPosition(p,i,j)}</div>
                  )) 
                }
            </div>
          ))
        }
    </div>
  );
}

export default App;
