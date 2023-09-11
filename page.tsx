"use client"
import Image from 'next/image'
import Game from './Game/Game'
import "./ticStyle.css"
import { useEffect, useState } from 'react'

export default function Home() {

  const comboWinning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

const [state, setState] = useState(["", "", "", "", "", "", "", "", ""])
const [go, setGo] = useState("cross")
const [winningMassage, setWinningMassage] = useState("")

useEffect(()=> {
  comboWinning.forEach(combo => {
    const crossWins = combo.every(id => state[id] === "cross" )
    const circleWins = combo.every(id => state[id] === "circle" )

    if(crossWins) {
      setWinningMassage("Cross Wins!")
    } else if (circleWins) {
      setWinningMassage("Circle Wins!")
    } 
  })
  
} , [state, winningMassage])

useEffect(() => {
 if (state.every(cell => cell !== "" && !winningMassage )) {
  setWinningMassage("Draw!")
 }
} ,[state,winningMassage])

  return (
    <div className='container'>
    <div className='game'>
      {state.map((item, id)=>(
        <Game 
          id = {id}
          state={state}
          setState={setState}
          key={id} 
          go = {go}
          setGo = {setGo}
          item = {item}
          winningMassage = {winningMassage}
          />
      ))}
    </div>
    <div className='winning'>{winningMassage}</div>
    { !winningMassage && <div className='massage'>It's {go} turn!</div>}
    </div>
  )
}
