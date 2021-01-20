import React, { useState } from 'react';
import './App.css';
import Timeinput from './components/Timeinput';
import startSound from './sounds/ride-acoustic02.wav';
import restSound from './sounds/perc-hollow.wav';
import Gobtn from './components/Gobtn';
const App = () => {
  const restsound = new Audio(restSound);
  const startsound = new Audio(startSound);
  const [sets, setSets] = useState(3);
  const [dur, setDur] = useState(5);
  const [rest, setRest] = useState(10);
  const [rem, setRem] = useState(0);
  const [restbtn, setRestbtn] = useState("");
  const [goclass, setGoclass] = useState("");
  const [rotstate, setRotstate] = useState("");
  const [progress, setProgress] = useState(1360);
  let timeremain;

  function timehandler() {
    setRotstate("rotanimclass");
    let setcounter = sets;
    setRem(dur);
    timeremain = dur;
    startsound.play();
    const firstrem = setInterval(() => {
      timeremain -= 1;
      setRem((rem) => rem -= 1);
      setProgress((progress)=> progress=(1360*timeremain)/dur);
      if (timeremain === -1) {
        clearInterval(firstrem);
        console.log("first wala time remaining stopped");
        setProgress(1360);
        setRestbtn("rest-appear");
        setRem(dur);
        timeremain = dur;
        restsound.play();
      }
    }, 1000);

    const repsint = setInterval(() => {
      setRestbtn("");
      startsound.play(2);
      const remainint = setInterval(() => {
        if (setcounter === 0) {
          clearInterval(remainint);
        }
        timeremain -= 1;
        setRem((rem) => rem -= 1);
        setProgress((progress)=> progress=(1360*timeremain)/dur);
        if (timeremain === -1) {
          clearInterval(remainint);
          console.log(" beech wala time remaining stopped");
          setProgress(1360);
          setRem(dur);
          timeremain = dur;
          console.log("rest start");
          setRestbtn("rest-appear");
          restsound.play();
        }

      }, 1000);

      setcounter -= 1;
      console.log("sets remaining: ", setcounter);
      if (setcounter === 0) {
        clearInterval(repsint);
        timeremain = 0;
        clearInterval(remainint);
        clearInterval(firstrem);
        setRem(0);
        setGoclass("");
        setRotstate("");
        console.log('stopped');
      }
    }, dur*1000+(rest+1)*1000);

  }

  // function sleep(milliseconds) {
  //   const date = Date.now();
  //   let currentDate = null;
  //   do {
  //     currentDate = Date.now();
  //   } while (currentDate - date < milliseconds);
  // }



  return (
    <div className="App">
      <nav className="nav">
        <h1 className="main-heading">Exercise Timer</h1>
      </nav>
      <Timeinput setSets={setSets} sets={sets} setDur={setDur} dur={dur} setRest={setRest} rest={rest} />
      <Gobtn timehandler={timehandler} dur={dur} sets={sets} rem={rem} restbtn={restbtn} setGoclass={setGoclass} goclass={goclass} progress={progress}/>
      <div className="stop">
        <a href="/" className="stop-btn"><i className="far fa-stop-circle stop-icon"></i></a>
        <div className={`rotate ${rotstate}`}></div>
      </div>
    </div>
  );
}

export default App;
