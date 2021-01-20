import React from 'react';

const Gobtn = ({ timehandler, sets, dur, rem, restbtn, goclass, setGoclass, progress }) => {
    const goclick = (e) => {
        if (sets !== 0 && dur !== 0) {
            setGoclass("go-dissappear");
            timehandler();
        }

    }

    return (
        <div className="go-box">
            <svg className="svg-moving" width="300" height="300" viewBox="0 0 453 453" fill="none" strokeDashoffset = {progress} >
                <circle cx="226.5" cy="226.5" r="216.5" stroke="#018EBA" strokeWidth="20" />
            </svg>
            <div className="btn-div">
                <h1 onClick={goclick} className={`${goclass} gobutton`}>GO!</h1>
                <div className="timers">
                    <i className="fas fa-dumbbell dumbell-icon"></i>
                    <h3 className="remain-time" >{rem} sec</h3>
                    <p className="remain-label" >remaining</p>
                    <h1 className={`${restbtn} rest-circle`} >REST</h1>
                </div>
            </div>
        </div>
    );
}

export default Gobtn;