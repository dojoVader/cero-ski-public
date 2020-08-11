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
    private _jumpAnimationIndex: number = 0;


    private _currentAnimation: 'sking' | 'left' | 'leftDown' | 'right' | 'rightDown' | 'crashed' | 'jump';

    constructor(src: any, size: IRenderableSize, pos: IRenderableOffsetPosition) {
        super(src, size, pos);
        this.setCurrentAnimation('left');
    }
    // Override 
    render(engine: CerosEngine, x , y ): void {
        console.log('Current Anaimtion: %s', this._currentAnimation);
        engine.gpu.drawImage(this.getCurrentAnimation(), x, y, this.size.width, this.size.height);
        if(engine.isDebug){
            engine.gpu.save();
            engine.gpu.strokeStyle = 'red';
            engine.gpu.strokeRect(this.position.x,this.position.y, this.resource.width, this.resource.height);
            engine.gpu.restore();
        }
    }

    setAnimation(animations: SkierAnimationObject ){
        // Set the animation to the property
        this._animationSets = animations;
    }
    
    setCurrentAnimation(animation: 'sking' | 'left' | 'leftDown' | 'right' | 'rightDown' | 'crashed' | 'jump'){
        this._currentAnimation = animation;
    }

    getCurrentAnimation(){
        if(this._currentAnimation && this._currentAnimation !== 'jump'){
            return this._animationSets[this._currentAnimation];
        }
        else{
            const resource =  this._animationSets.jump[this._jumpAnimationIndex++];
            this._jumpAnimationIndex === 5 ? this.setCurrentAnimation('sking') : null; // Sets the Animation to avoid loop
            this._jumpAnimationIndex %= this._animationSets.jump.length; // if 5 % 5 this reset back to Zero 
            
            return resource;

        }
        return null;
    }

    



}