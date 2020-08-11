import { CerosEngine } from "../CerosEngine";


const X_OFFSET = 20;
const Y_OFFSET = 40;
const PAUSED_TEXT = "Game Paused !";

export enum ScoreBoardPosition {
    TOP_LEFT = 0,
    TOP_RIGHT = 1
};

const HIGHEST_SCORE_KEY = 'highest_score';


/**
 * @description Simple class to help display score board
 */
export class ScoreBoard {

    private _direction: ScoreBoardPosition;
    private _highest_score = null;
    private _current_score: number = 0;
    private _timesHit = 0;

    constructor(direction: ScoreBoardPosition) {
        this._direction = direction;
        this.retrieveHighestScore();
    }

    setScore(score: number) {
        this._current_score = score;
    }

    getScore() {
        return this._current_score;
    }

    setTimeHitCounter(count: number){
        this._timesHit = count;
    }

    saveScore(value: number) {
        const score = value;
        const highestValue = localStorage.getItem(HIGHEST_SCORE_KEY);
        if (!highestValue) {
            localStorage.setItem(HIGHEST_SCORE_KEY, score.toString());
        }
        else {
            if (score > parseInt(highestValue)) {
                localStorage.setItem(HIGHEST_SCORE_KEY, score.toString());
            }
        }
        this.retrieveHighestScore();

    }

    retrieveHighestScore() {
        const score = localStorage.getItem(HIGHEST_SCORE_KEY)
        this._highest_score = (score === null ? 0 : parseInt(score));
    }

    getHighestScore() {
        return this._highest_score;
    }

    render(engine: CerosEngine) {
        switch (this._direction) {
            case ScoreBoardPosition.TOP_LEFT:
                engine.gpu.save();
                engine.gpu.fillText(`Highest Score: ${this.getHighestScore()}`, X_OFFSET, Y_OFFSET)
                engine.gpu.fillText(`Current Score: ${this._current_score}`, X_OFFSET, Y_OFFSET * 2);
                engine.gpu.restore();
                break;

            case ScoreBoardPosition.TOP_RIGHT:
                engine.gpu.save();
                engine.gpu.fillText(`Highest Score: ${this.getHighestScore()}`, engine.dimension.w - 20, 5, this._current_score.toString().length + 10)
                engine.gpu.fillText(`Current Score: ${this._current_score}`, engine.dimension.w - 30, this._current_score.toString().length + 30, this._current_score.toString().length + 10);
                engine.gpu.restore();
                break;
        }
    }



}

export class PauseInfo {

    // The goal is to render a mario like paused UI in the center with a semi transparent bg
    display(engine: CerosEngine, message: string) {
        //Render the BG
        engine.gpu.save();
        engine.gpu.fillStyle = 'rgba(0 , 0 , 0 , 0.74)';
        engine.gpu.fillRect(0, 0, engine.dimension.w, engine.dimension.h);
        engine.gpu.restore();

        // Render the text
        engine.gpu.save();
        engine.gpu.fillStyle = 'white';
        engine.gpu.fillText(message, (engine.dimension.w / 2) - 75, (engine.dimension.h / 2));
        engine.gpu.restore();
    }
}