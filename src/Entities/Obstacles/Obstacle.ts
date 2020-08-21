import * as Constants from "../../Constants";
import { Entity } from "../Entity";
import { randomInt } from '../../Core/Utils';

const assetTypes = [
    Constants.TREE,
    Constants.TREE_CLUSTER,
    Constants.ROCK1,
    Constants.ROCK2,
    Constants.JUMPING_RAMP
];

const assetEntityId = [
    'tree',
    'treeCluster',
    'rock',
    'rock2',
    'jumping_ramp'
]

export class Obstacle extends Entity {

    private _id: string;

    public get id() {
        return this._id;
    }

    constructor(x: number, y: number) {
        super(x, y);

        const assetIdx = randomInt(0, assetTypes.length - 1);
        this.assetName = assetTypes[assetIdx];
        this._id = assetEntityId[assetIdx];
    }
}