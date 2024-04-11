import { useEffect, useRef, useState } from 'react';
import circle from '/circle.png'
import cross from '/cross.png'
import soundOn from '/soundon.png'
import soundOff from '/soundoff.png'
import game from '/game.mp3'
import { Button } from 'flowbite-react'

let data = ["", "", "", "", "", "", "", "", ""];

const GamePage_02 = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const audioRef = useRef(new Audio(game));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const titleRef = useRef(null);
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);
  const box6 = useRef(null);
  const box7 = useRef(null);
  const box8 = useRef(null);
  const box9 = useRef(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const toggle = (e,num) => {
    if(lock) {
      return 0;
    }
    if(count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross}' />`;
      data[num] = 'X';
      setCount(count + 1);
    } else {
      e.target.innerHTML = `<img src='${circle}' />`;
      data[num] = 'O';
      setCount(count + 1);
    }
    checkWinner();
  }

  const checkWinner = () => {
    if(data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    }
    else if(data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[5]);
    }
    else if(data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[8]);
    }
    else if(data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[6]);
    }
    else if(data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[7]);
    }
    else if(data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[8]);
    }
    else if(data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[8]);
    }
    else if(data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[6]);
    }
    return null;
  }

  const won = (winner) => {
    setLock(true);
    if(winner === 'X') {
      titleRef.current.innerHTML = `Congratulations: <img src='${cross}' style='width: 36px; height: 36px; margin-left: 10px; margin-right: 10px; margin-top: 10px;'> wins`;
    } else {
      titleRef.current.innerHTML = `Congratulations: <img src='${circle}' style='width: 36px; height: 36px; margin-left: 10px; margin-right: 10px; margin-top: 10px;'> wins`;
    }
  }

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = 'Tic Tac Toe Game'
    boxes.forEach((box) => {
      box.current.innerHTML = "";
    })
  }

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);
  
  return (
    <div className='flex flex-col max-w-full mx-auto relative h-screen'>
      <h1 className='text-5xl flex justify-center items-center font-semibold my-10 dark:text-teal-400' ref={titleRef}>Tic Tac Toe Game</h1>
      <div className=" max-w-6xl flex m-auto my-5">
          <div className="row">
            <div className="flex h-[150px] w-[150px] border-4 border-teal-500 rounded-xl cursor-pointer p-12" ref={box1}  onClick={(e) => {toggle(e,0)}}></div>
            <div className="flex h-[150px] w-[150px] border-4 border-teal-500 rounded-xl cursor-pointer p-12" ref={box2}  onClick={(e) => {toggle(e,1)}}></div>
            <div className="flex h-[150px] w-[150px] border-4 border-teal-500 rounded-xl cursor-pointer p-12" ref={box3}  onClick={(e) => {toggle(e,2)}}></div>
          </div>
          <div className="">
            <div className="flex h-[150px] w-[150px] border-4 border-teal-500 rounded-xl cursor-pointer p-12" ref={box4}  onClick={(e) => {toggle(e,3)}}></div>
            <div className="flex h-[150px] w-[150px] border-4 border-teal-500 rounded-xl cursor-pointer p-12" ref={box5}  onClick={(e) => {toggle(e,4)}}></div>
            <div className="flex h-[150px] w-[150px] border-4 border-teal-500 rounded-xl cursor-pointer p-12" ref={box6}  onClick={(e) => {toggle(e,5)}}></div>
          </div>
          <div className="">
            <div className="flex h-[150px] w-[150px] border-4 border-teal-500 rounded-xl cursor-pointer p-12" ref={box7}  onClick={(e) => {toggle(e,6)}}></div>
            <div className="flex h-[150px] w-[150px] border-4 border-teal-500 rounded-xl cursor-pointer p-12" ref={box8}  onClick={(e) => {toggle(e,7)}}></div>
            <div className="flex h-[150px] w-[150px] border-4 border-teal-500 rounded-xl cursor-pointer p-12" ref={box9}  onClick={(e) => {toggle(e,8)}}></div>
          </div>    
      </div>
      <Button gradientDuoTone='purpleToBlue' className='w-[450px] cursor-pointer self-center' onClick={() => {reset()}}>Reset</Button>
      <div className="absolute bottom-2 left-2">
        <img src={!isPlayingMusic ? soundOff : soundOn} onClick={() => setIsPlayingMusic(!isPlayingMusic)} className='w-10 h-10 cursor-pointer object-contain'/>
      </div>
    </div>
  )
}

export default GamePage_02