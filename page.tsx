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
const [wins, setWins] = useState("")
const [number, setNumber] = useState(0)
const [crossScore, setCrossScore] = useState(0)
const [circleScore, setCircleScore] = useState(0)

  useEffect(() => {
    if(winningMassage === "Cross Wins!") {
      setWins("crossWins")
      setCrossScore(prev => prev + 1)
    } else if (winningMassage === "Circle Wins!") {
      setWins("circleWins")
      setCircleScore(prev => prev + 1)
    } else if (winningMassage === "Draw!") {
      setWins("draw")
    }
  }, [setWins, winningMassage])

useEffect(()=> {
  comboWinning.forEach(combo => {
    const crossWins = combo.every(id => state[id] === "Cross" )
    const circleWins = combo.every(id => state[id] === "Circle" )

    if(crossWins) {
      setWinningMassage("Cross Wins!")
    } else if (circleWins) {
      setWinningMassage("Circle Wins!")
    } 
  })
  if (state.every(cell => cell !== "" && !winningMassage )) {
  setWinningMassage("Draw!")
 }
} , [state, winningMassage, setWinningMassage])

  const returnToDefault = () => {
    setState(["", "", "", "", "", "", "", "", ""])
    setGo("Cross")
    setWinningMassage("")
    setNumber(number + 1)
   }

   useEffect(() => {
    if(number % 2 === 0) {
      setGo("Cross")
    } else if(number % 2 !== 0) {
      setGo("Circle")
    }
   }, [number])

  return (
    <div className='container'>
       <div className='score'>
          <div className="subScore">
            <p className="scorePara">Cross Score</p>
            <p style={{fontSize: "35px", color: "blue", marginTop: "0"}}>{crossScore}</p>
          </div>
          <div className="subScore">
            <p className="scorePara">Circle Score</p>
            <p style={{fontSize: "35px", color: "red", marginTop: "0"}}>{circleScore}</p>
          </div>
        </div>
    <div className='game'>
      {state.map((item, id)=>(
      <div key={id}>
        <Game 
          id = {id}
          state={state}
          setState={setState} 
          go = {go}
          setGo = {setGo}
          item = {item}
          winningMassage = {winningMassage}
          />
      </div>
      ))}
    </div>
    <div className='winning'>{winningMassage}</div>
    { !winningMassage && <div className='massage'>It's {go} turn!</div>}
    {winningMassage && <button onClick={returnToDefault} className={wins}>New Game</button>}
    </div>
  )
}
