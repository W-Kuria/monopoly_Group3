import Dice from "./dice";
import Locate from "./position";
import { useState } from "react";
function Movement(){
 const[position1,setposition1]=useState(0);
 const[position2,setposition2]=useState(0)
 const[turn,setturn]=useState("Player1");
 const[board,setboard]=useState(()=>{
    const initial=Locate();
    initial[1].owner="Player1";
    initial[3].owner="Player1";
    initial[6].owner="Player1";
    initial[8].owner = "Computer";
    initial[9].owner = "Computer";
    initial[11].owner = "Computer";  
    return initial;

 })
 const [players,setplayers] =useState([{
    id: 1,
    name: 'Player 1',
    position: 0,
    money: 1500,
    properties: [1,3,6],
  },
  {
    id: 2,
    name: 'Computer',
    position: 0,
    money: 1500,
    properties: [8,9,11],
  }]);


 
const location=Locate();
 const move=(Roll)=>{
    if(turn==="Player1"){
        const newPos=position1+Roll;
    if(newPos>=location.length){
        setposition1(newPos-location.length)
    }else{
        setposition1(newPos)
    }
    setturn("Computer")
 }else{
    const newPos=position2+Roll;
    if(newPos>=location.length){
        setposition2(newPos-location.length)
    }else{
        setposition2(newPos)
    }setturn("Player1")
 }}
 
 const currentPosition=()=>{
    if(turn==="Player1"){
        return position1
    }else{
        return position2;
    }
 }
  const currentLocation=location[currentPosition()];
 return(
   <div>
    <h1>{turn},You are currently on:{currentLocation.name}</h1>
    <Dice Roll={move} />
   </div>
 );

    }
    


export default Movement;