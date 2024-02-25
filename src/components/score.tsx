import { useState } from "react";
import Button from "./button";

export interface Score {
    x: number;
    o: number;
    ties: number;
}

function Score(score: Score) {
    const { x, o, ties } = score;

    return (
        <section className="grid grid-cols-3 gap-5 w-[90%] mx-auto">
            <div className="py-2 flex flex-col items-center justify-center text-black-400 bg-blue-400 rounded-lg">
                <span className="block uppercase text-xs">x</span>
                <span className="font-bold block">{x}</span>
            </div>

            <div className="py-2 flex flex-col items-center justify-center text-black-400 bg-blue-400 rounded-lg">
                <span className="block uppercase text-xs">ties</span>
                <span className="font-bold block">{ties}</span>
            </div>

            <div className="py-2 flex flex-col items-center justify-center text-black-400 bg-blue-400 rounded-lg">
                <span className="block uppercase text-xs">o</span>
                <span className="font-bold block">{o}</span>
            </div>
        </section>
    );
}

export default Score;