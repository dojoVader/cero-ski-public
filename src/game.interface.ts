import { Obstacle } from "./Entities/Obstacles/Obstacle";

export interface IRenderableSize {
    width: number;
    height: number;
}

export interface ICanvasOffset {
    x: number;
    y: number;
}



export interface IRenderableBoundingBox {
    left: number;
    top: number;
    bottom: number;
    right: number;
}

export interface SkierDirection {
    [key: number]: string | Array<string>
}

export interface ICollision {
    isCollision: boolean,
    obstacle: Obstacle
}