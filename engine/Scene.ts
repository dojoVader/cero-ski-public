// This Class handles the whole logic of placing objects on the screen, handling collision detection and also 

import { CerosEngine } from "./CerosEngine";
import { IRenderable } from "./engine.interface";

declare var _;

// dealing with the pausing and stop via the engine
export class Scene {

    private _engine: CerosEngine;

    public renderableList: IRenderable[]; // This list contains the items to be rendered to the canvas

    constructor(engine: CerosEngine) {
        this._engine = engine;
    }

    initialSetUp() {
        // Create the obstacles to be rendered to the screen
        const { w, h } = this._engine.dimension;
        let renderableItems = Math.ceil(_.random(5, 7) *
            (w / 800) * (h / 500));

        var minX = -50;
        var maxX = w + 50;
        var minY = h / 2 + 100;
        var maxY = h + 50;


    }
}