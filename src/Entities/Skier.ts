import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";
import { Obstacle } from "./Obstacles/Obstacle";
import { ICollision } from "../game.interface";
import { ObstacleManager } from "./Obstacles/ObstacleManager";
import { AssetManager } from "../Core/AssetManager";

const TOTAL_JUMP_FRAMES = 5;

const ANIMATION_PER_FRAME = 600 / TOTAL_JUMP_FRAMES;

let LAST_WHEN_UPDATED_TIME;

let TIME_ELAPSED;

export class Skier extends Entity {



    assetName: string = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;
    isJumping = false;
    jumpingIndex = 0;



    constructor(x: number, y: number) {
        super(x, y);
        this.setId('skier');
    }
    move() {
        // calculate the diff between frames per second as specificed for each animation and
        if (this.isJumping) {
            if (!LAST_WHEN_UPDATED_TIME) LAST_WHEN_UPDATED_TIME = this.millis;
            TIME_ELAPSED = this.millis - LAST_WHEN_UPDATED_TIME;
            if (TIME_ELAPSED > ANIMATION_PER_FRAME) {
                if (this.jumpingIndex === 4) {
                    this.isJumping = false;
                    this.jumpingIndex = 0;
                    this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
                }else {
                    this.jumpingIndex++;
                }
                LAST_WHEN_UPDATED_TIME = this.millis;
            }
        }
        switch (this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
            case Constants.SKIER_DIRECTIONS.JUMP:
                this.moveSkierDown();
                this.assetName = Constants.SKIER_DIRECTION_ASSET[Constants.SKIER_DIRECTIONS.JUMP][this.jumpingIndex] as string;
                this.updateAsset();

                break;
        }
    }

    setDirection(direction: number) {
        this.direction = direction;
        this.updateAsset();
    }

    updateAsset() {
        const jumpAsset = Constants.SKIER_DIRECTION_ASSET[this.direction];
        this.assetName = this.isJumping ?
            jumpAsset[this.jumpingIndex] as string : Constants.SKIER_DIRECTION_ASSET[this.direction] as string;
    }

    getAsset(){
        this.updateAsset();
        return this.assetName;
    }

    

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    turnLeft() {
        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        }
        else {
            if (this.direction !== Constants.SKIER_DIRECTIONS.CRASH) {
                this.setDirection(this.direction - 1);
            }

        }
    }

    jump() {
        this.isJumping = true;
        this.setDirection(Constants.SKIER_DIRECTIONS.JUMP);
    }

    turnRight() {
        if (this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        }
        else {
            this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    checkIfSkierHitObstacle(obstacleManager: ObstacleManager, assetManager: AssetManager) {
        const asset = assetManager.getAsset(this.assetName);
        if(!asset) return ; // Hack: it occurs that we get an undefined assets, possibly direction issue
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const collision: Entity = obstacleManager.getObstacles().find((obstacle: Obstacle) => {
            const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );

            return intersectTwoRects(skierBounds, obstacleBounds);
        });
        if (!collision) return;
        if (collision.id !== 'jumping_ramp' && collision.id !== 'rock') {
            // There is a collision if it is a ramp make skier jump or make skier skip obstacle when in jump mode
            if (!this.isJumping) {
                this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
                console.log("Skier: %o, Collision: %o",skierBounds, collision);
                return true;
            }

        }
        else {
            this.jump();
            return false;
        }
    };
}