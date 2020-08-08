import { IRenderable, IRenderableSize, IRenderableOffsetPosition } from "../engine.interface";

enum ROCKTYPE {
    ROCK1 = 1,
    ROCK2 = 2
};

export class Rock implements IRenderable {
    public resource: any;
    public size: IRenderableSize;
    public position: IRenderableOffsetPosition;
    public rockType: ROCKTYPE




    constructor(src: any, size: IRenderableSize, pos: IRenderableOffsetPosition, type: ROCKTYPE){
        this.resource = src;
        this.size = size;
        this.position = pos;
        // Set the rock type this will be alternated during the render
        this.rockType = type;
    }

    

}