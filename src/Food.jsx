import React from 'react'

function  Food(){
const elma1= "elma";
const elma2= "elma 2";
const alma="alma bu da ";


  return (
    <ul>
<li> elma</li>
<li> {elma1}</li>
<li> {elma2.toUpperCase()}</li>
<li> {alma.toUpperCase()}</li>
    </ul>
  )
}

export default Food
