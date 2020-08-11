import { IRenderableSize, IRenderableOffsetPosition, IRenderable, ICanRendererContext } from "../engine.interface";
import { BaseEntity } from "./BaseEntity";
import { CerosEngine } from "../CerosEngine";

export interface RhinoAnimationObject {
    lift: HTMLImageElement,
    default:HTMLImageElement,
    eat?:HTMLImageElement[]
}

export class Rhino extends BaseEntity implements IRenderable, ICanRendererContext {
    private _animationSets: RhinoAnimationObject;
    private _currentAnimation: string;
    private _eatAnimationIndex: any;

    constructor(src: any, size: IRenderableSize, pos: IRenderableOffsetPosition) {
        super(src, size, pos);
    
    }

    setAnimation(animations: RhinoAnimationObject ){
        // Set the animation to the property
        this._animationSets = animations;
    }

    setCurrentAnimation(animation: 'lift' | 'eat' | 'default'){
        this._currentAnimation = animation;
    }

    getCurrentAnimation(){
        if(this._currentAnimation && this._currentAnimation !== 'eat'){
            return this._animationSets[this._currentAnimation];
        }
        else{
            const resource =  this._animationSets.eat[this._eatAnimationIndex++];
            this._eatAnimationIndex === 4 ? this.setCurrentAnimation('eat') : null; // Sets the Animation to avoid loop
            this._eatAnimationIndex %= this._animationSets.eat.length; // if 5 % 5 this reset back to Zero 
            
            return resource;

        }
        return null;
    }

    // Override 
    render(engine: CerosEngine, x , y ): void {
        console.log('Current Anaimtion: %s', this._currentAnimation);
        engine.gpu.drawImage(this.getCurrentAnimation(), this.position.x, this.position.y, this.size.width, this.size.height);
        if(engine.isDebug){
            engine.gpu.save();
            engine.gpu.strokeStyle = 'red';
            engine.gpu.strokeRect(this.position.x,this.position.y, this.resource.width, this.resource.height);
            engine.gpu.restore();
        }
    }



}