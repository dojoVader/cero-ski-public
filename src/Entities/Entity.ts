import { AssetManager } from "../Core/AssetManager";
import { Canvas } from "../Core/Canvas";

export class Entity {
    x = 0;
    y = 0;

    shouldRender = true; // We need this flag to pause rendering for individual entities

    millis: number; // This is the rAF animation time elapsed for animation throttling

    private _id: string = '';

    public get id() {
        return this._id;
    }

    setId(id) {
        this._id = id;
    }

    assetName = '';

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getAssetName() {
        return this.assetName;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    draw(canvas: Canvas, assetManager: AssetManager) {
        if(!this.shouldRender ) return;
        const asset = assetManager.getAsset(this.assetName);
        if(!asset) return; /**@todo Fix this issue and look at it*/
        const drawX = this.x - asset.width / 2;
        const drawY = this.y - asset.height / 2;
        canvas.drawImage(asset, drawX, drawY, asset.width, asset.height);




    }
}