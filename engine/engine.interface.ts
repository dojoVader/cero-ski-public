/**
 * @description This interface represents any item that can be rendered on the screen
 * it expects a graphic resource and also the size and the X/Y Pos
 */
export interface IRenderable extends ICanRendererContext {
    resource: any;
    size: IRenderableSize;
    position: IRenderableOffsetPosition;
    boundbox?: IRenderableBoundingBox;
    offset: number; // Spacing Offset
   }

export interface ICanRendererContext {
    render(engine: IGameEngine, x: number, y: number, millis?: number): void
}

export interface IRenderableSize {
    width: number;
    height: number;
}

export interface IRenderableOffsetPosition {
    x: number;
    y: number;
}
// This is the interface for the main game scene each game scene should handle it's own render and update and should be delegated to te main Engine

export interface IGameScene {
    render(e): void;
    initialSetup(): void;
    title: string;
    
}

// This is the main game engine our class should handle the input, game loop and also have a scene and an asset manager
export interface IGameEngine {
    assetManager: IAssetManager;
    audioManager?: any;
    render(): void;

}

// AssetManager Interface
export interface IAssetManager {
    download(func: () => void ): void;
    setAsset(name: string, resource: any): void
    getAsset(name: string): any;
}

export interface IRenderableBoundingBox {
    left: number;
    top: number;
    bottom: number;
    right: number;
}