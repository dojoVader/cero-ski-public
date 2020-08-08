import { IRenderable, IRenderableSize, IRenderableOffsetPosition } from "../engine.interface";

export class JumpRamp implements IRenderable {
    resource: any;
    size: IRenderableSize;
    position: IRenderableOffsetPosition;

    constructor(src: any, size: IRenderableSize, pos: IRenderableOffsetPosition) {
        this.resource = src;
        this.size = size;
        this.position = pos;
    }

}