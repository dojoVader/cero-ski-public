// This Class handles the whole logic of placing objects on the screen, handling collision detection and also 

import { CerosEngine } from "./CerosEngine";
import { IRenderable, IGameScene, IRenderableOffsetPosition } from "./engine.interface";
import { LoDashStatic } from "lodash";
import { Tree } from './entity/Tree';
import { Rock, ROCKTYPE } from './entity/Rock';
import { JumpRamp } from './entity/JumpRamp';
import { TreeCluster } from './entity/TreeCluster'
import { AssetManager } from "./AssetManager";
import { Skier } from './entity/Skier';

declare var _: LoDashStatic;

// The Items that should be randomly generated to the screen
const renderableTypes = [
    'tree',
    'treeCluster',
    'rock1',
    'rock2',
    'jump'
];

// Global variables for the Scene to use
var skierDirection = 5;
var skierMapX = 0;
var skierMapY = 0;
var skierSpeed = 8;

const KeyboardMappings = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40
}


// dealing with the pausing and stop via the engine
export class Scene implements IGameScene {

    private _engine: CerosEngine;

    public title;

    // This list contains the items to be rendered to the canvas
    public renderableList: IRenderable[];
    private skier: Skier;


    constructor() {
        this.renderableList = [];
    }

    setEngine(engine: CerosEngine) {
        this._engine = engine;
    }
    init() {
        //Set the AssetMgr
        const assetMgr = this._engine.assetManager;

        // Set a default instance we will update the same resource
        const asset = assetMgr.getAsset('skierDown') as HTMLImageElement;
        this.skier = new Skier(asset, { width: asset.width, height: asset.height }, { x: 0, y: 0 });

        // Setup the collision system
        this.initialSetup();

        requestAnimationFrame((t) => this.render(t));

    }

    onInput(e: KeyboardEvent) {
        switch (e.keyCode) {
            case KeyboardMappings.LEFT: // left
                if (skierDirection === 1) {
                    skierMapX -= skierSpeed;
                    this.placeNewObstacle(skierDirection);
                }
                else {
                    skierDirection--;
                }
                e.preventDefault();
                break;
            case KeyboardMappings.RIGHT: // right
                if (skierDirection === 5) {
                    skierMapX += skierSpeed;
                    this.placeNewObstacle(skierDirection);
                }
                else {
                    skierDirection++;
                }
                e.preventDefault();
                break;
            case KeyboardMappings.UP: // up
                if (skierDirection === 1 || skierDirection === 5) {
                    skierMapY -= skierSpeed;
                    this.placeNewObstacle(6);
                }
                e.preventDefault();
                break;
            case KeyboardMappings.DOWN: // down
                skierDirection = 3;
                e.preventDefault();
                break;
        }
    }

    render(e) {

        this._engine.gpu.save();
        this._engine.gpu.scale(window.devicePixelRatio, window.devicePixelRatio);
        this._engine.clear();

        this.moveSkier();
        this.checkIfSkierHitObstacle();
        this.drawSkier();
        this.drawObstacles();
        this._engine.gpu.restore();
        requestAnimationFrame((e) => this.render(e));
        // console.log('Rendering...');
        //console.log('Direction: %s, MapX: %s, MapY: %s, speed: %s', skierDirection, skierMapX, skierMapY, skierSpeed);

    }
    update() {

    }
    initialSetup() {
        // Create the obstacles to be rendered to the screen
        const { w, h } = this._engine.dimension;
        let renderableItems = Math.ceil(_.random(1, 7) *
            (w / 800) * (h / 500));

        var minX = -50;
        var maxX = w + 50;
        var minY = h / 2 + 100;
        var maxY = h + 50;

        for (var idx = 0; idx < renderableItems; idx++) {
            this.drawRandomRenderables(minX, maxX, minY, maxY);
        }

        this.renderableList = _.sortBy(this.renderableList, function (obstacle) {
            var obstacleImage = obstacle.resource;
            return obstacle.position.y + obstacleImage.height;
        });

        console.log(this.renderableList);

    }

    moveSkier() {
        switch (skierDirection) {
            case 2:
                skierMapX -= Math.round(skierSpeed / 1.4142);
                skierMapY += Math.round(skierSpeed / 1.4142);

                this.placeNewObstacle(skierDirection);
                break;
            case 3:
                skierMapY += skierSpeed;

                this.placeNewObstacle(skierDirection);
                break;
            case 4:
                skierMapX += skierSpeed / 1.4142;
                skierMapY += skierSpeed / 1.4142;

                this.placeNewObstacle(skierDirection);
                break;
        }
    }

    private drawRandomRenderables(minX, maxX, minY, maxY) {
        const assetMgr = this._engine.assetManager;
        let renderableIndex = _.random(0, renderableTypes.length - 1);

        var position = this.calculateOpenPosition(minX, maxX, minY, maxY);

        // Get the renderable type and push to the Renderable List to be displayed
        const renderType = renderableTypes[renderableIndex];

        let renderable: IRenderable = null;
        let asset: HTMLImageElement = null;

        switch (renderType) {
            case 'tree':
                asset = assetMgr.getAsset('tree');
                renderable = new Tree(asset, {
                    height: asset.width,
                    width: asset.height
                }, {
                    x: position.x,
                    y: position.y
                });
                this.renderableList.push(renderable);
                break;
            case 'treeCluster':
                asset = assetMgr.getAsset('treeCluster');
                renderable = new TreeCluster(asset, {
                    height: asset.width,
                    width: asset.height
                }, {
                    x: position.x,
                    y: position.y
                });
                this.renderableList.push(renderable);
                break;
            case 'rock1':
                asset = assetMgr.getAsset('rock1');
                renderable = new Rock(asset, {
                    height: asset.width,
                    width: asset.height
                }, {
                    x: position.x,
                    y: position.y
                }, ROCKTYPE.ROCK1);
                this.renderableList.push(renderable);
                break;
            case 'rock2':
                asset = assetMgr.getAsset('rock2');
                renderable = new Rock(asset, {
                    height: asset.width,
                    width: asset.height
                }, {
                    x: position.x,
                    y: position.y
                }, ROCKTYPE.ROCK2);
                this.renderableList.push(renderable);
                break;
            case 'jump':
                asset = assetMgr.getAsset('jumpRamp');
                renderable = new JumpRamp(asset, {
                    height: asset.width,
                    width: asset.height
                }, {
                    x: position.x,
                    y: position.y
                });
                this.renderableList.push(renderable);
                break;

        }


    }

    getSkierAsset() {
        var skierAssetName;
        switch (skierDirection) {
            case 0:
                skierAssetName = 'skierCrash';
                break;
            case 1:
                skierAssetName = 'skierLeft';
                break;
            case 2:
                skierAssetName = 'skierLeftDown';
                break;
            case 3:
                skierAssetName = 'skierDown';
                break;
            case 4:
                skierAssetName = 'skierRightDown';
                break;
            case 5:
                skierAssetName = 'skierRight';
                break;
        }

        return skierAssetName;
    }


    calculateOpenPosition(minX, maxX, minY, maxY): IRenderableOffsetPosition {
        var x = _.random(minX, maxX);
        var y = _.random(minY, maxY);

        var foundCollision = _.find(this.renderableList, function (obstacle) {
            return x > (obstacle.position.x - 50) && x < (obstacle.position.x + 50) && y > (obstacle.position.y - 50) && y < (obstacle.position.y + 50);
        });

        if (foundCollision) {
            return this.calculateOpenPosition(minX, maxX, minY, maxY);
        }
        else {
            return {
                x: x,
                y: y
            }
        }
    }

    drawObstacles() {
        // Get Engine for measurement size
        const { w, h } = this.getDimension();
        let newObstacles = [];

        _.each(this.renderableList, (obstacle) => {
            var obstacleImage = obstacle.resource; // Image resource
            var x = obstacle.position.x - skierMapX - obstacleImage.width / 2;
            var y = obstacle.position.y - skierMapY - obstacleImage.height / 2;


            if (x < -100 || x > w + 50 || y < -100 || y > h + 50) {
                return;
            }

            obstacle.render(this._engine, x, y);
            newObstacles.push(obstacle);
        });

        this.renderableList = newObstacles;

    }

    drawSkier() {
        const { w, h } = this.getDimension();
        var skierAssetName = this.getSkierAsset();
        var skierImage = this._engine.assetManager.getAsset(skierAssetName) as HTMLImageElement;
        var x = (w - skierImage.width) / 2;
        var y = (h - skierImage.height) / 2;

        this.skier.position = {
            x,
            y
        };

        this.skier.size = {
            width: skierImage.width,
            height: skierImage.height
        };

        this.skier.render(this._engine, x, y);
    }

    placeNewObstacle(direction) {
        const { w, h } = this.getDimension();
        var shouldPlaceObstacle = _.random(1, 8);
        if (shouldPlaceObstacle !== 8) {
            return;
        }

        var leftEdge = skierMapX;
        var rightEdge = skierMapX + w;
        var topEdge = skierMapY;
        var bottomEdge = skierMapY + h;

        switch (direction) {
            case 1: // left
                this.drawRandomRenderables(leftEdge - 50, leftEdge, topEdge, bottomEdge);
                break;
            case 2: // left down
                this.drawRandomRenderables(leftEdge - 50, leftEdge, topEdge, bottomEdge);
                this.drawRandomRenderables(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
                break;
            case 3: // down
                this.drawRandomRenderables(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
                break;
            case 4: // right down
                this.drawRandomRenderables(rightEdge, rightEdge + 50, topEdge, bottomEdge);
                this.drawRandomRenderables(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
                break;
            case 5: // right
                this.drawRandomRenderables(rightEdge, rightEdge + 50, topEdge, bottomEdge);
                break;
            case 6: // up
                this.drawRandomRenderables(leftEdge, rightEdge, topEdge - 50, topEdge);
                break;
        }
    }

    getDimension() {
        return this._engine.dimension;
    }

    intersectRect(r1, r2) {
        return !(r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
    };

    checkIfSkierHitObstacle() {
        const { w, h } = this.getDimension();
        var skierRect = {
            left: skierMapX + w / 2,
            right: skierMapX + this.skier.resource.width + w / 2,
            top: skierMapY + this.skier.resource.height - 5 + h / 2,
            bottom: skierMapY + this.skier.resource.height + h / 2
        };

        var collision = _.find(this.renderableList, (obstacle) => {
            var obstacleImage = obstacle.resource
            var obstacleRect = {
                left: obstacle.position.x,
                right: obstacle.position.x + obstacleImage.width,
                top: obstacle.position.y + obstacleImage.height - 5,
                bottom: obstacle.position.y + obstacleImage.height
            };

            return this.intersectRect(skierRect, obstacleRect);
        });

        if (collision) {
            const asset = this._engine.assetManager;
            this.skier.resource = asset.getAsset('skierCrash');
            skierDirection = 0;
        }
    }

}