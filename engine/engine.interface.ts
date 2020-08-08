/**
 * @description This interface represents any item that can be rendered on the screen
 * it expects a graphic resource and also the size and the X/Y Pos
 */
export interface IRenderable {
    resource: any;
    size: IRenderableSize;
    position: IRenderableOffsetPosition;
}

export interface IRenderableSize {
    width: number;
    height: number;
}

export interface IRenderableOffsetPosition {
    x: number;
    y: number;
}