import Dice from "./dice";
import Locate from "./position";
import { useState } from "react";
function Movement(){
 const[position1,setposition1]=useState(0);
 const[position2,setposition2]=useState(0)
 const[turn,setturn]=useState("Player1");
 const[board,setboard]=useState(()=>{
    const initial=Locate();
    
    return initial;

 })
 const [players,setplayers] =useState([{
    id: 1,
    name: 'Player 1',
    position: 0,
    money: 1500,
    properties: []
  },
  {
    id: 2,
    name: 'Computer',
    position: 0,
    money: 1500,
    properties: []
  }]);

const[laps,setlaps]=useState({"Player1":0,"Computer":0})
 

 const move=(Roll)=>{
    if(turn==="Player1"){
        let newPos=position1+Roll;
        let newLaps={...laps}
    if(newPos>=board.length){
        newPos=newPos-board.length
        newLaps={...laps,Player1:laps.Player1+1}
        if(newLaps.Player1===1){
        alert("Player1,You have completed your first lap.You can now own property and  go collect 200$ as a bonus");
        const updatePlayers=[...players]
        updatePlayers[0].money+=200
        setplayers(updatePlayers);
        }
        setlaps(newLaps);
       
}


        setposition1(newPos);
        setturn("Computer");
    }else{
       let newPos=position2+Roll;
       let newLaps={...laps};
       const updatePlayers=[...players];
       if(newPos>=board.length){
         newPos=newPos-board.length;
         newLaps={...laps, Computer: laps.Computer+1};
         if(newLaps.Computer===1){
        alert("Computer,You have completed your first lap.You can now own property and  go collect 200$ as a bonus");
         updatePlayers[1].money+=200
         setplayers(updatePlayers);
         }
         setlaps(newLaps);
         
       }
       setposition2(newPos);

       const computerLocation=board[newPos];
       if(computerLocation.type==="property"&&newLaps.Computer>=1&& updatePlayers[1].money>computerLocation.cost&&!updatePlayers[1].properties.includes(computerLocation.name)){
        const remainder=updatePlayers[1].money-computerLocation.cost;
        const purchase=computerLocation.cost<=150&&remainder>=300&&Math.random()<0.5;
        if(purchase){
            updatePlayers[1].money-=computerLocation.cost;
            updatePlayers[1].properties.push(computerLocation.name);
            alert(`Computer bought ${computerLocation.name} for ${computerLocation.cost}`)
            setplayers(updatePlayers);
        }else{
            alert(`Computer has insufficient funds to buy ${computerLocation.name}`)
        }


       }
       setturn("Player1");
    }
    
 }
 const currentPosition=()=>{
    if(turn==="Player1"){
        return position1
    }else{
        return position2;
    }
 }
  const currentLocation=board[currentPosition()];
 

  

  const buyProperty=()=>{
    if(currentLocation.type!=="property"){
        return;
    }
    if(laps[turn]>=1){
        const purchase=window.confirm(`${turn},do you want to buy ${currentLocation.name} for ${currentLocation.cost}?`);

        if(purchase){
            const updatePlayers=[...players];

             const playerIndex=turn==="Player1"? 0:1;

                if(updatePlayers[playerIndex].money>=currentLocation.cost){
                    updatePlayers[playerIndex].money-=currentLocation.cost;
                    updatePlayers[playerIndex].properties.push(currentLocation.name);
                    setplayers(updatePlayers);
                    alert(`${updatePlayers[playerIndex].name},you have purchased ${currentLocation.name}`);                    
                }else{
                    alert(`You have insufficient funds to buy ${currentLocation.name}`)
                }
                        }
    }else{
        alert("You must run your first lap to be able to buy property")
    }
  }



 return(
   <div>
    <div>
        <h1>{turn},You are currently on:{currentLocation.name}</h1>        
    </div>
    <div>
        <h2>{players[0].name},you have {players[0].money}  in the bank</h2>
        <h2>{players[1].name},you have {players[1].money}  in the bank</h2>
    </div>
    {turn==="Player1"&&currentLocation.type==="property"&&laps.Player1>=1&&(
        <button onClick={buyProperty}>Buy property</button>
    )}
    
    <Dice Roll={move} />
   </div>
 );

    }
    


export default Movement;