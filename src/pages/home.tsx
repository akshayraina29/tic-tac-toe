import React, { useState } from 'react'
import Button from '../components/button'
import Logo from '../components/logo'
import XOutline from '../components/xoutline'
import OOutline from '../components/ooutline'
import { players } from './game'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();

    const [selectedPlayer, setSelectedPlayer] = useState<typeof players.X.id | typeof players.O.id>(players.X.id);

    const handlePlayerSelection = (id: (typeof players.X.id | typeof players.O.id)) => {
        setSelectedPlayer(id);
    }

    const handleGameStart = () => {
        navigate("/game", {
            state: {
                selectedPlayer,
            }
        });
    }

    return (
        <div className="h-[70vh] w-full sm:w-[60%] lg:w-[40%] flex flex-col items-center justify-center gap-10">
            <Logo width={10} height={10} />

            <div className="bg-black-300 w-[90%] rounded-lg p-5 text-center">
                <h1 className="font-bold mb-5 text-lg">Select Player</h1>

                <div className="flex w-full mb-5">
                    <button
                        onClick={() => { handlePlayerSelection(players.X.id) }}
                        className={`${selectedPlayer === players.X.id && 'border-4 border-yellow-500'} bg-gray-400 rounded-lg px-3 py-3 ml-3 w-1/2 mx-auto flex justify-center items-center`}
                    >
                        <XOutline />
                    </button>
                    <button
                        onClick={() => { handlePlayerSelection(players.O.id) }}
                        className={`${selectedPlayer === players.O.id && 'border-4 border-yellow-500'} bg-gray-400 rounded-lg px-3 py-3 mr-3 ml-3 w-1/2 mx-auto flex justify-center items-center`}
                    >
                        <OOutline />
                    </button>
                </div>
            </div>

            <div className="flex flex-col w-[90%]">
                <Button css="bg-blue-400 uppercase rounded-2xl w-full cursor-pointer" onClick={() => { handleGameStart() }}>
                    Start
                </Button>
            </div>
        </div >

    )
}

export default Home