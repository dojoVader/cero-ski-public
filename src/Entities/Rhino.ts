import { Entity } from "./Entity";
import * as Constants from './../Constants'
import { AssetManager } from "../Core/AssetManager";
import { Rect, intersectTwoRects, distance } from "../Core/Utils";
import { Skier } from "./Skier";
import { Canvas } from "../Core/Canvas";
import { ObstacleManager } from "./Obstacles/ObstacleManager";
import { Obstacle } from "./Obstacles/Obstacle";
import { PauseInfo } from "./PauseInfo";
import { Game } from "../Core/Game";

const TOTAL_EAT_FRAMES = 6;

const TOTAL_MOVE_FRAMES = 2;

const EAT_ANIMATION_PER_FRAME = 600 / TOTAL_EAT_FRAMES;

const MOVE_ANIMATION_PER_FRAME = 200 / TOTAL_MOVE_FRAMES;

let LAST_WHEN_UPDATED_TIME;

let TIME_ELAPSED;

let EAT_SEQUENCE_INDEX = 0;

let MOVE_SEQUENCE_INDEX = 0;

export class Rhino extends Entity {

    assetName: string = Constants.RHINO_MOVEMENT;

    direction = Constants.RHINO_DIRECTIONS.LEFT;
    speed = Constants.RHINO_SPEED;
    isEating = false;

    caughtSkier = false;

    showRhino = false;

    distance = null;

    constructor(x: number, y: number) {
        super(x, y);
        this.setId('rhino');
        this.setDirection(Constants.RHINO_DIRECTIONS.DOWN);
        this.isEating = false;
        this.showRhino = false;
    }

    setDirection(direction: number) {
        this.direction = direction;
        this.updateAsset();
    }

    updateAsset() {

        switch (this.direction) {
            case Constants.RHINO_DIRECTIONS.DOWN:
            case Constants.RHINO_DIRECTIONS.LEFT:
            case Constants.RHINO_DIRECTIONS.RIGHT:
            case Constants.RHINO_DIRECTIONS.STOP:
                this.assetName = Constants.RHINO_DIRECTION_ASSETS[Constants.RHINO_DIRECTIONS.LEFT][MOVE_SEQUENCE_INDEX] as string;
                break;
            case Constants.RHINO_DIRECTIONS.EAT:
                this.assetName = Constants.RHINO_DIRECTION_ASSETS[Constants.RHINO_DIRECTIONS.EAT][EAT_SEQUENCE_INDEX];
                break;
        }
    }

    checkSkierMovement(skier: Skier, obstacleManager: ObstacleManager, assetManager: AssetManager) {
        const asset = assetManager.getAsset(this.assetName);
        const rhinoBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const distanceBetween = Math.abs(distance(this, skier));
        this.distance = distanceBetween;


        if (distanceBetween <= 23 && this.showRhino) {
            this.isEating = true;
            this.setDirection(Constants.RHINO_DIRECTIONS.EAT);
            skier.shouldRender = false;
        }



        if (skier.x > this.x && distanceBetween > 21) {
            this.moveRhinoRight();
            this.moveRhinoDown();


        }
        if (skier.x < this.x && distanceBetween > 21) {
            this.moveRhinoLeft();
            this.moveRhinoDown();
        }

        // If we have passed the Rhino let it slow down
        if (this.y > skier.y && distanceBetween > 21) {
            this.y -= this.speed;
            this.setDirection(Constants.RHINO_DIRECTIONS.STOP);
        }



    }


    move() {
        if (this.isEating) {
            if (!LAST_WHEN_UPDATED_TIME) LAST_WHEN_UPDATED_TIME = this.millis;
            TIME_ELAPSED = this.millis - LAST_WHEN_UPDATED_TIME;
            if (TIME_ELAPSED > EAT_ANIMATION_PER_FRAME) {
                if (EAT_SEQUENCE_INDEX === (TOTAL_EAT_FRAMES - 1)) {
                    this.isEating = false;
                    EAT_SEQUENCE_INDEX = 0;
                    this.setDirection(Constants.RHINO_DIRECTIONS.STOP);
                    this.caughtSkier = true;


                } else {
                    EAT_SEQUENCE_INDEX++;
                }
                LAST_WHEN_UPDATED_TIME = this.millis;
            }
        } else {
            this.updateAsset();
            if (!LAST_WHEN_UPDATED_TIME) LAST_WHEN_UPDATED_TIME = this.millis;
            TIME_ELAPSED = this.millis - LAST_WHEN_UPDATED_TIME;
            if (TIME_ELAPSED > MOVE_ANIMATION_PER_FRAME) {
                if (MOVE_SEQUENCE_INDEX === (TOTAL_MOVE_FRAMES - 1)) {
                    this.isEating = false;
                    MOVE_SEQUENCE_INDEX = 0;


                } else {
                    MOVE_SEQUENCE_INDEX++;
                }
                LAST_WHEN_UPDATED_TIME = this.millis;
            }
        }
        switch (this.direction) {
            case Constants.RHINO_DIRECTIONS.LEFT:
                this.moveRhinoLeft();
                break;
            case Constants.RHINO_DIRECTIONS.DOWN:
                this.moveRhinoDown();
                break;
            case Constants.RHINO_DIRECTIONS.RIGHT:
                this.moveRhinoRight();
                break;
            case Constants.RHINO_DIRECTIONS.STOP:
            case Constants.RHINO_DIRECTIONS.EAT:
                break;
        }
    }

    moveRhinoLeft() {
        this.x -= this.speed;

    }


    moveRhinoDown() {
        this.y += this.speed;
    }

    moveRhinoRight() {
        this.x += this.speed;

    }

    moveRhinoUp() {
        this.y -= this.speed;
    }

    turnLeft() {
        if (this.direction === Constants.RHINO_DIRECTIONS.LEFT) {
            this.moveRhinoLeft();
        }

    }

    turnRight() {
        if (this.direction === Constants.RHINO_DIRECTIONS.RIGHT) {
            this.moveRhinoRight();
        }
        else {
            this.setDirection(Constants.RHINO_DIRECTIONS.RIGHT);
        }
    }

    turnDown() {
        this.setDirection(Constants.RHINO_DIRECTIONS.DOWN);
    }

    draw(canvas: Canvas, assetManager: AssetManager) {
        if (this.showRhino) {
            super.draw(canvas, assetManager);
            this.showBossMode(assetManager, canvas)
        }

    }

    showBossMode(assetMgr: AssetManager, canvas: Canvas) {
        // We will create a simple boss icon to inform the user that boss has entered the scene
        const asset = assetMgr.getAsset(Constants.BOSS_MODE);
        const xPos = 14;
        const yPos = 120;
        canvas.ctx.drawImage(asset, xPos, yPos, asset.width, asset.height);
        canvas.ctx.save();
        canvas.ctx.fillStyle = 'red';
        canvas.ctx.fillText(this.caughtSkier ? 'Another Ski casualty :(' : 'Wild Rhino on the loose', xPos + 24, 143);
        canvas.ctx.fillText(this.showRhino ? `Distance: ${this.distance}` : '',xPos + 25, 173);
        canvas.ctx.restore();
    }




}