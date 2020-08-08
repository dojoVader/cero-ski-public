import { IRenderableSize, IRenderableOffsetPosition, IRenderable, ICanRendererContext } from "../engine.interface";
import { BaseEntity } from "./BaseEntity";
import { CerosEngine } from "../CerosEngine";

export enum ROCKTYPE {
    ROCK1 = 1,
    ROCK2 = 2
};

export class Rock extends BaseEntity implements IRenderable, ICanRendererContext {
    public rockType: ROCKTYPE

    constructor(src: any, size: IRenderableSize, pos: IRenderableOffsetPosition, type: ROCKTYPE) {
        super(src, size, pos);
        this.rockType = type;
    }



}