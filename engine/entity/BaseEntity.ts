import { IRenderable, IRenderableSize, IRenderableOffsetPosition, IRenderableBoundingBox, ICanRendererContext } from "../engine.interface";
import { CerosEngine } from "../CerosEngine";

export class BaseEntity implements IRenderable {
    resource: HTMLImageElement; // Most likely will be an image
    size: IRenderableSize;
    position: IRenderableOffsetPosition;
    boundbox: IRenderableBoundingBox
    offset: number = 0;

    constructor(src: any, size: IRenderableSize, pos: IRenderableOffsetPosition) {
        this.resource = src;
        this.size = size;
        this.position = pos;
    }

    calculateRect() {
        this.boundbox = {
            bottom: this.position.y + this.resource.height,
            top: this.position.y - (this.resource.height - this.offset),
            left: this.position.x - this.resource.width,
            right: this.position.x + this.resource.width
        }
    }
    render(engine: CerosEngine, x, y, e): void {
        engine.gpu.save();
        engine.gpu.drawImage(this.resource, x, y, this.size.width, this.size.height);
        if(engine.isDebug){
            
            engine.gpu.strokeStyle = 'red';
            engine.gpu.strokeRect(x,y, this.resource.width, this.resource.height);
            
        }
        engine.gpu.restore();
    }
}