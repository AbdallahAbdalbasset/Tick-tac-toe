import {useState} from "react";

function Square({value, onSquareClick}) {

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({squares, onSquareclick, xIsNext}) {

  var winner = decideWinner(squares);
  var status;
  if(winner){
    status = "Winner is " + winner;
  }else{
    status = "Next Player is " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className = "status"> {status} </div>
      <div className="board-row">
        <Square  value = {squares[0]} onSquareClick={()=>{onSquareclick(0)}} />
        <Square  value = {squares[1]} onSquareClick={()=>{onSquareclick(1)}} />
        <Square  value = {squares[2]} onSquareClick={()=>{onSquareclick(2)}} />
      </div>
      <div className="board-row">
        <Square  value = {squares[3]} onSquareClick={()=>{onSquareclick(3)}}/>
        <Square  value = {squares[4]} onSquareClick={()=>{onSquareclick(4)}}/>
        <Square  value = {squares[5]} onSquareClick={()=>{onSquareclick(5)}}/>
      </div>
      <div className="board-row">
        <Square  value = {squares[6]} onSquareClick={()=>{onSquareclick(6)}}/>
        <Square  value = {squares[7]} onSquareClick={()=>{onSquareclick(7)}}/>
        <Square  value = {squares[8]} onSquareClick={()=>{onSquareclick(8)}}/>
      </div>
    </>
  );
}

export default function Game(){
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const curSquares = [...history[history.length-1]];

  function handleOnButtonClicked(i){
    if(curSquares[i]|| decideWinner(curSquares))return;
    
    curSquares[i] = xIsNext ? "X" : "O";
    history.push(curSquares);

    const historyCopy = history.map((row) => {return [...row]});

    setXIsNext(!xIsNext);
    setHistory(historyCopy);
  }

  function jumpToMove(i){
    const historyCopy = history.slice(0, i+1);

    setHistory(historyCopy);
    if(i%2) setXIsNext(false);
    else setXIsNext(true);
  }

  return(
    <div className="game">
      <div className = "game-board">
       <Board squares = {curSquares} onSquareclick={handleOnButtonClicked} xIsNext={xIsNext} />
     </div>
     <div className = "game-info">
      <h1> Go Back</h1>
        <ol> 
          {history.map((item, idx)=>{ 
            var description = "Back to move " + (idx);
            if(!idx) description = "Back to the Start";

            return (<li key = {idx} > <button onClick = {()=>{jumpToMove(idx)}} > {description} </button></li>);
          })}
          <li key = {history.length}> <h5> {"You are in move " + history.length } </h5></li>
        </ol>
     </div>
    </div>
  );

}

function decideWinner(squares){
  const lines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

  for(var i = 0;i<lines.length;i++){
    var [a,b,c] = lines[i];
    if(squares[a]&&squares[a]===squares[b]&&squares[a] === squares[c]) return squares[a];
  }
  return null;

}
