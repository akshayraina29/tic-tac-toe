import axios from "axios";
import { Score } from "../components/score";
const API_BASE_URL = process.env.API_BASE_URL || "https://retoolapi.dev/qH7JEd";
const SCORES_PATH = "/scores";
const API_URL = API_BASE_URL + SCORES_PATH;

export class ScoresAPI {
    static storeScoresApi = async (scores: { x: number, o: number, tie: number, winner: string }) => {
        return await axios.post(API_URL, scores);
    }
}