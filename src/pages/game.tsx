import { useEffect, useState } from "react";
import Header from "../components/header";
import Grid from "../components/grid";
import Score from "../components/score";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from "js-cookie";
import { ScoresAPI } from "../api/scoresAPI";
const rows = 3;
const columns = 3;

export const players: {
    "X": {
        id: "X",
        name: string
    },
    "O": {
        id: "O",
        name: string
    }
} = {
    "X": {
        id: "X",
        name: "X",
    },
    "O": {
        id: "O",
        name: "O",
    }
}

const initializeBoard = (rows: number, columns: number): string[][] => {
    return Array(rows).fill(null).map(() => Array(columns).fill(null));
};
function Game() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedPlayer = location.state.selectedPlayer;
    const [board, setBoard] = useState(initializeBoard(rows, columns));
    const [turnOfPlayer, setTurnOfPlayer] = useState<typeof players.X.id | typeof players.O.id>(selectedPlayer);
    const [winner, setWinner] = useState<null | string>(null);
    const [matchCount, setMatchCount] = useState(0);
    const [scores, setScores] = useState({ X: 0, O: 0, T: 0 });

    const areDiagonalSame = () => {
        let diagonal1 = true;
        let diagonal2 = true;
        for (let i = 0; i < rows; i++) {
            diagonal1 = diagonal1 && (board[i][i] === players[turnOfPlayer].id);
            diagonal2 = diagonal2 && (board[i][columns - 1 - i] === players[turnOfPlayer].id);
        }
        return diagonal1 || diagonal2;
    };

    const areRowSame = (row: string[]) => {
        return row.every((cell) => cell === players[turnOfPlayer].id);
    };

    const areColumnSame = (colIndex: number) => {
        return board.every((row) => row[colIndex] === players[turnOfPlayer].id);
    };

    const checkWinner = () => {
        for (let i = 0; i < rows; i++) {
            if (areRowSame(board[i]) || areColumnSame(i)) {
                return true;
            }
        }
        return areDiagonalSame();
    };

    const checkTie = () => {
        return board.every((row) => row.every((c) => c !== null))
    }

    const onPlay = (ri: number, ci: number) => {
        if (board[ri][ci] !== null || winner !== null) return;

        const updatedBoard = [...board];
        updatedBoard[ri][ci] = players[turnOfPlayer].id;
        setBoard(updatedBoard);

        if (checkWinner()) {
            setWinner(players[turnOfPlayer].id);
            toast(`Player ${players[turnOfPlayer].id} have won, Restarting`, {
                icon: "🏆",
                className: "font-semibold"
            });
            updateScore(players[turnOfPlayer].id);
            setMatchCount(matchCount + 1);
            resetGame();
        } else {
            if (checkTie()) {
                updateScore("T");
                toast(`Match tie, Restarting`, {
                    icon: "🤝",
                    className: "font-semibold"
                });
                setMatchCount(matchCount + 1);
                resetGame();
                return;
            }

            setTurnOfPlayer(turnOfPlayer === players.X.id ? players.O.id : players.X.id);
        }
    };

    const updateScore = (winner: typeof players.X.id | typeof players.O.id | "T") => {
        let updatedScore = { ...scores, [winner]: scores[winner] + 1 };
        setScores(updatedScore);
        Cookies.set("scores", JSON.stringify(updatedScore));
    };

    const resetGame = () => {
        setBoard(initializeBoard(rows, columns));
        setTurnOfPlayer(selectedPlayer);
        setWinner(null);
    };

    const handleResetTournament = () => {
        Cookies.remove("scores");
        navigate("/", { replace: true });

    }

    const handleHomeClick = () => {
        navigate("/", { replace: true });
    }

    const findTournamentWinner = () => {
        if (scores.X > scores.O) {
            return players.X.id
        }
        else if (scores.O > scores.X) {
            return players.O.id
        }
        else {
            return "T"
        }
    }

    const submitScores = async () => {
        try {
            let winner: any = findTournamentWinner();
            if ([players.X.id, players.O.id].includes(winner)) {
                toast(`Player ${winner} have won tournament, Restarting`, {
                    icon: "🏆",
                    className: "font-semibold"
                });
            }
            else {
                toast(`Tournament tied, Restarting`, {
                    className: "font-semibold"
                });
            }
            const response = await ScoresAPI.storeScoresApi({
                x: scores.X,
                o: scores.O,
                tie: scores.T,
                winner: winner
            });
            handleResetTournament();
        } catch (error) {
            toast.error("Something went wrong while submitting scores");
        }
    }

    useEffect(() => {
        if (matchCount === 5) {
            submitScores();
        }
    }, [matchCount]);

    useEffect(() => {
        let scores = Cookies.get("scores");
        try {
            let parsedScores = JSON.parse(scores || "null");
            console.log("parsedScores ", parsedScores);
            if (parsedScores) {
                setScores(parsedScores);
                setMatchCount(parsedScores[players.X.id] + parsedScores[players.O.id] + parsedScores["T"]);
            }
        } catch (error) {

        }
    }, []);


    return (
        <section className="h-screen md:h-[70vh] w-full sm:w-[60%] lg:w-[40%] flex flex-col justify-center items-center">
            <Toaster />

            <Header isTurnX={turnOfPlayer === players.X.id} handleHomeClick={handleHomeClick} />

            <Grid board={board}
                onPlay={onPlay} />

            <Score x={scores.X} o={scores.O} ties={scores.T} />
        </section>
    );
}

export default Game;