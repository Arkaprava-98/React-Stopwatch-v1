import { useEffect, useState } from "react";
import "./App.css";

function Stopwatch() {
    const [time, setTime] = useState({ min: 0, sec: 0, mSec: 0 }); //Defining time state
    const [stop, setStop] = useState(false); //Defining state for button clicks
    const [laps, setLaps] = useState([]); //defining state for laps recording

    //stopwatch timer code
    useEffect(() => {
        let interval = null;
        if (stop) {
            interval = setInterval(() => {
                setTime((prev) => {
                    if (prev.min > 60) {
                        return { ...prev, hr: prev.hr + 1, min: 0, sec: 0 };
                    }
                    if (prev.sec > 59) {
                        return { ...prev, min: prev.min + 1, sec: 0 };
                    }
                    if (prev.mSec >= 99) {
                        return { ...prev, sec: prev.sec + 1, mSec: 0 };
                    }
                    return { ...prev, mSec: prev.mSec + 1 };
                });
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [stop]);

    //Stopwatch Start Function
    const handleStart = () => {
        setStop(true);
        clearInterval();
    };

    //Stopwatch Stop Function
    const handleStop = () => {
        setStop(false);
        clearInterval();
    };

    //Stopwatch Reset Function
    const handleReset = () => {
        setTime({ min: 0, sec: 0, mSec: 0 });
        setStop(false);
        setLaps([]);
        clearInterval();
    };

    //Stopwatch Lap Function
    const handleLap = () => {
        if (stop) {
            setLaps([...laps, time]);
            setStop(true);
            console.log("click");
        }
    };

    return (
        <>
            <div className="container">
                <div className="header">Stopwatch</div>
                {/* Timer Code */}
                <div className="stopwatch-container">
                    <span> {time.min.toString().padStart(2, "0")}</span>{" "}
                    <span>:</span>
                    <span> {time.sec.toString().padStart(2, "0")}</span>{" "}
                    <span>.</span>
                    <span> {time.mSec.toString().padStart(2, "0")}</span>
                </div>
                {/* Code for Button hide / show */}
                <div className="btn-container">
                    {/*if the state of the watch is not start then the START button Shows */}
                    {!stop && <button onClick={handleStart}>Start</button>}
                    {/*if the state of the watch is start then the stop or pause button Shows */}
                    {stop && <button onClick={handleStop}>Stop</button>}
                    {/*if the state of the watch is not start then the RESET button Shows */}
                    {!stop && <button onClick={handleReset}>Reset</button>}
                    {stop && <button onClick={handleLap}>Lap</button>}
                </div>

                <div className="lap-heading">Laps</div>
                <div className="lap-container">
                    {/* Mapping the lap on Click of the lap button */}
                    {laps.map((lap, index) => (
                        <div className="lap-value" key={index}>
                            {/* Taking the index as Lap Number */}
                            <span className="lap-number">
                                Lap {index + 1} :
                            </span>{" "}
                            {/* Iterate through each element of the Time object to ger Minute, Second & Milisecons for storing in Laps */}
                            <span className="timestamp">
                                {Object.values(
                                    lap.min.toString().padStart(2, "0") +
                                        " : " +
                                        lap.sec.toString().padStart(2, "0") +
                                        " . " +
                                        lap.mSec.toString().padStart(2, "0")
                                )}{" "}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="footer">
                    Made with <span>&hearts;</span> by Arkaprava Chakrabarty
                </div>
            </div>
        </>
    );
}

export default Stopwatch;
