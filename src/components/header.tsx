import { useContext } from "react";
import Logo from "./logo";
import Button from "./button";
import XOutline from "./xoutline";
import OOutline from "./ooutline";

function Header({ isTurnX, handleHomeClick }: { isTurnX: boolean, handleHomeClick: () => void }) {
    return (
        <div className="flex justify-between items-center py-4 mb-10 w-[85%] mx-auto">
            <div className="w-1/3"></div>
            <div className="w-1/3 pb-[0.2rem] rounded-[0.2rem] flex justify-center">
                <div className="flex w-[70%] bg-black-300 rounded-[0.2rem] gap-2 py-[0.4rem] px-[1rem]" onClick={() => { }}>
                    {isTurnX ? (
                        <XOutline width={18} height={18} />
                    ) : (
                        <OOutline width={18} height={18} />
                    )}
                    <span className="block text-sm text-gray-400">TURN</span>
                </div>
            </div>

            <div className="w-1/3 flex justify-end">
                <Button css="w-[70%] bg-yellow-400 rounded-md pb-2 cursor-pointer" onClick={handleHomeClick}>
                    Home
                </Button>
            </div>
        </div>
    );
}

export default Header;