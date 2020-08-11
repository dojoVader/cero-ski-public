import { IRenderable, IRenderableSize, IRenderableOffsetPosition, ICanRendererContext } from "../engine.interface";
import { BaseEntity } from "./BaseEntity";

export class TreeCluster extends BaseEntity implements IRenderable , ICanRendererContext{
    constructor(src: any, size: IRenderableSize, pos: IRenderableOffsetPosition) {
        super(src, size, pos);
    }
    

}