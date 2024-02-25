
import Button from "./button";
import XIcon from "../assets/icons/x.svg";
import OIcon from "../assets/icons/o.svg";
import { players } from "../pages/game";

function Grid({
    board,
    onPlay,
}: {
    board: string[][];
    onPlay: (ri: number, ci: number) => void;
}) {
    return (
        <section className="grid grid-cols-3 gap-5 w-[90%] mx-auto mb-10">
            {board.map((row, ri) => (
                <div key={ri}>
                    {row.map((col, ci) => (
                        <div
                            key={ci + ri}
                            className="pb-2  w-full h-[99px] rounded-md"
                        >
                            <Button
                                onClick={() => { onPlay(ri, ci); }}
                                css={`bg-black-300 rounded-md py-6 h-full w-full cursor-pointer`}
                            >
                                <img src={board[ri][ci] === players.X.id ? XIcon : board[ri][ci] === players.O.id ? OIcon : ""} alt="" className="w-11 mx-auto" />
                            </Button>
                        </div>))}
                </div>
            ))}
        </section>
    );
}

export default Grid;