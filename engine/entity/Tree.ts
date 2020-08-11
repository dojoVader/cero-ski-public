import { IRenderableSize, IRenderableOffsetPosition, IRenderable, ICanRendererContext } from "../engine.interface";
import { BaseEntity } from "./BaseEntity";
import { CerosEngine } from "../CerosEngine";

export class Tree extends BaseEntity implements IRenderable, ICanRendererContext{

    constructor(src: any, size: IRenderableSize, pos: IRenderableOffsetPosition) {
        super(src, size, pos);
    }

}