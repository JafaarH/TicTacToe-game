import { Dispatch, SetStateAction } from "react"
import "../ticStyle.css"

type props ={
    state: string[],
    setState: Dispatch<SetStateAction<string[]>>,
    go: string,
    setGo: Dispatch<SetStateAction<string>>,
    id: number,
    item: string,
    winningMassage: string
}





const Game: React.FC<props>= ({state, setState, go, setGo, id, item, winningMassage}: props) => {

   const handleAdd = () => {

    if (winningMassage)
    return ;

    const taken = !!state[id]
    
    if(!taken) {
        if(go === "cross") {
            handleChangeState("cross")
            setGo("circle")
        }else if(go === "circle") {
            handleChangeState("circle")
            setGo("cross")
        }
    }

   }
    
   const handleChangeState = (changeState: string) => {
    let copyState = [...state]
    copyState[id] = changeState
    setState(copyState)
   }

    return (
        <div 
        onClick={handleAdd}
        className="item">
            <div className={item}>{item ? (item === "cross" ? "X" : "O") : null }</div>
        </div>
    )
}
export default Game;