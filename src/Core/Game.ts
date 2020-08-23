import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';
import { ScoreBoard, ScoreBoardPosition } from "../Entities/Scoreboard";
import { PauseInfo } from "../Entities/PauseInfo";
import { Rhino } from "../Entities/Rhino";


const RHINO_APPEARANCE_TIME = 10;

let TIME_START = performance.now();
export class Game {
    gameWindow: Rect = null;

    assetManager: AssetManager;

    canvas: Canvas;

    skier: Skier;

    obstacleManager: ObstacleManager;

    scoreboard: ScoreBoard;

    pauseUI: PauseInfo;

    isPaused: boolean = null;

    private animationID: number;

    rhino: Rhino;

    isGameOver = false;

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.obstacleManager = new ObstacleManager();
        this.scoreboard = new ScoreBoard(ScoreBoardPosition.TOP_LEFT);
        this.pauseUI = new PauseInfo;
        this.rhino = new Rhino(Constants.GAME_WIDTH / 2, 0);
        this.rhino.x = this.rhino.x - (Constants.GAME_WIDTH / 2);
        this.rhino.y = -160;




        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run(e?: number) {
        let elapsed = Math.abs(TIME_START - e) / 1000;


        this.canvas.clearCanvas();


        this.skier.millis = e;
        this.rhino.millis = e;
        this.updateGameWindow();
        this.drawGameWindow();

        this.animationID = requestAnimationFrame(this.run.bind(this));
    }

    updateGameWindow() {
        this.skier.move();
        // console.log('Skier Data: X:%d , Y:%d , Dir:%s', this.skier.x, this.skier.y, this.skier.direction );
        // console.log('Rhino Data: X:%d , Y:%d , Dir:%s', this.rhino.x, this.rhino.y, this.rhino.direction );
        this.rhino.move();
        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

        this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);

        if (!this.rhino.caughtSkier) this.rhino.checkSkierMovement(this.skier, this.obstacleManager, this.assetManager);


    }


    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
        this.rhino.draw(this.canvas, this.assetManager);
        this.skier.draw(this.canvas, this.assetManager);
        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
        // If the skier is caught
        if (this.rhino.caughtSkier) {
            this.pauseUI.display(this.canvas, 'Game over!, Press R to restart');
            cancelAnimationFrame(this.animationID);
        }
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
        this.scoreboard.render(this.canvas);
    }
    pause(shouldReset?: boolean) {
        this.pauseUI.display(this.canvas, shouldReset ? 'Game Over!, Press R to reset' : 'Pause..');
        cancelAnimationFrame(this.animationID);
    }

    handleKeyDown(event: KeyboardEvent) {
        switch (event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                if (this.rhino.caughtSkier) return; // Game over 
                this.skier.turnDown();
                event.preventDefault();
                break;

            case Constants.KEYS.PAUSE:
                if (this.isPaused === null) {
                    this.isPaused = true;
                    this.pauseUI.display(this.canvas, 'Paused..');
                    cancelAnimationFrame(this.animationID);
                }
                this.isPaused ? this.animationID = requestAnimationFrame((e) => this.run(e)) : this.pause();
                this.isPaused = !this.isPaused;
                break;

            case Constants.KEYS.J:
                // Implement the jump functionality
                this.skier.jump();
                event.preventDefault();
                break;

        }
    }
}