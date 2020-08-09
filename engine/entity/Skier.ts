import { IRenderable, IRenderableSize, IRenderableOffsetPosition, IGameEngine, ICanRendererContext } from "../engine.interface";
import { BaseEntity } from "./BaseEntity";
import { CerosEngine } from "../CerosEngine";


export interface SkierAnimationObject {
    sking: HTMLImageElement,
    crashed:HTMLImageElement,
    left: HTMLImageElement,
    leftDown: HTMLImageElement,
    right: HTMLImageElement,
    rightDown: HTMLImageElement,
    jump?:HTMLImageElement[]
}


export class Skier extends BaseEntity implements IRenderable, ICanRendererContext {

    private _animationSets: SkierAnimationObject;


    private _currentAnimation: 'sking' | 'left' | 'leftDown' | 'right' | 'rightDown' | 'crashed';

    constructor(src: any, size: IRenderableSize, pos: IRenderableOffsetPosition) {
        super(src, size, pos);
        this.setCurrentAnimation('left');
    }
    // Override 
    render(engine: CerosEngine, x , y ): void {
        console.log('Current Anaimtion: %s', this._currentAnimation);
        engine.gpu.drawImage(this.getCurrentAnimation(), x, y, this.size.width, this.size.height)
    }

    setAnimation(animations: SkierAnimationObject ){
        // Set the animation to the property
        this._animationSets = animations;
    }
    
    setCurrentAnimation(animation: 'sking' | 'left' | 'leftDown' | 'right' | 'rightDown' | 'crashed'){
        this._currentAnimation = animation;
    }

    getCurrentAnimation(){
        if(this._currentAnimation){
            return this._animationSets[this._currentAnimation];
        }
        return null;
    }



}