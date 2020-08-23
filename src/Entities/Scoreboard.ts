import { Canvas } from "../Core/Canvas";

const X_OFFSET = 20;
const Y_OFFSET = 70;


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

    render(canvas: Canvas) {
        switch (this._direction) {
            case ScoreBoardPosition.TOP_LEFT:
                canvas.ctx.save();
                canvas.ctx.fillText(`Highest Score: ${this.getHighestScore()}`, X_OFFSET, Y_OFFSET)
                canvas.ctx.fillText(`Current Score: ${this._current_score}`, X_OFFSET, Y_OFFSET * 1.5);
                canvas.ctx.restore();
                break;

            case ScoreBoardPosition.TOP_RIGHT:
                canvas.ctx.save();
                canvas.ctx.fillText(`Highest Score: ${this.getHighestScore()}`, canvas.width - 20, 5, this._current_score.toString().length + 10)
                canvas.ctx.fillText(`Current Score: ${this._current_score}`, canvas.width - 30, this._current_score.toString().length + 30, this._current_score.toString().length + 10);
                canvas.ctx.restore();
                break;
        }
    }



}