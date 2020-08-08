import { IRenderable, IRenderableSize, IRenderableOffsetPosition, IGameEngine, ICanRendererContext } from "../engine.interface";
import { BaseEntity } from "./BaseEntity";
import { CerosEngine } from "../CerosEngine";



export class Skier extends BaseEntity implements IRenderable, ICanRendererContext {
  

    constructor(src: any, size: IRenderableSize, pos: IRenderableOffsetPosition) {
        super(src, size, pos);
    }
    // Override 
    render(engine: CerosEngine): void {
        engine.gpu.drawImage(this.resource,this.position.x,this.position.y,this.size.width,this.size.height)
    }

    

}