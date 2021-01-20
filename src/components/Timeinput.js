import React from 'react';

const Timeinput=({setSets, setRest, setDur, dur, rest, sets})=>{

    return(
        <div className="input-form">
            <div className="sets">
                <p>SETS</p>
                <input type="range" className="inp" min='0' max='20' value={sets} onChange={e=> setSets(e.target.value) } />
                <h4>{sets}</h4>
            </div>

            <div className="duration">
                <p>DURATION</p>
                <input type="range" className="inp" min='0' max='120' value={dur} onChange={e=> setDur(e.target.value) } />
                <h4>{dur}s</h4>
            </div>

            <div className="rest">
                <p>REST</p>
                <input type="range" className="inp restinp" min='0' max='60' value={rest} onChange={e=> setRest(e.target.value) } />
                <h4>{rest}s</h4>
            </div>
        </div>
    );
}

export default Timeinput;

