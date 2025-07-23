import Dice from "./dice";
import Locate from "./position";
import { useState } from "react";
function Movement(){
 const[position,setposition]=useState(0);
const location=Locate();
 const move=(Roll)=>{
    const newPos=position+Roll;
    if(newPos>=location.length){
        setposition(newPos-location.length)
    }else{
        setposition(newPos)
    }
 }

 const currentLocation=location[position];
 return(
   <div>
    <p>You are currently on:{currentLocation.name}</p>
    <Dice Roll={move} />
   </div>
 );
}
export default Movement;