import { IGameEngine, IAssetManager, IGameScene } from "./engine.interface";
import { Scene } from "./Scene";

/**
 * @author Okeowo Aderemi
 * @description  CerosEngine handles most of the core gaming functionality, the game loop and the render operation and also setup the Canvas
 * dom if not present in the body
 */
declare var $;

var skierDirection = 5;
var skierMapX = 0;
var skierMapY = 0;
var skierSpeed = 8;
export class CerosEngine implements IGameEngine {


    private _debug = false; // This allows us to toggle the debugging mode for internal information if needed
    private _gpu: CanvasRenderingContext2D; // Canvas 2D Context 
    private _stage: HTMLCanvasElement // Keeps copy of the Canvas DOM element to read height and width if neccessary
    private _gameWidth: number;
    private _gameHeight: number;
    private _scene: Scene;
    assetManager: IAssetManager;
    audioManager?: any;

    public get gpu(): CanvasRenderingContext2D {
        if (!this._gpu) // Context 2D not set inform user about the message
        {
            if (this.isDebug) {
                console.error('Canvas 2D Content was not set, check implementation in the code');
            }
        }
        return this._gpu;
    }

    public get dimension() {
        return {
            w: this._gameWidth,
            h: this._gameHeight
        };
    }

    public get stage() {
        return this._stage;
    }

    public get isDebug() {
        return this._debug;
    }


    setScene(scene: Scene){
        this._scene = scene;
    }


    init(scene: Scene) {
        // Check if there is a canvas in the document and if not create one for the engine
        this.setScene(scene);
        this._scene.setEngine(this);
        this._configureViewPort();
        this.bindInput();
        this.render();
        
    }

    _configureViewPort() {
        // This handles viewport information and setting up of the window for our engine
        this._gameHeight = window.innerHeight;
        this._gameWidth = window.innerWidth;

        // Do we have any canvas if not give us one
        var canvasElement = document.getElementsByTagName('canvas').length ? document.getElementsByTagName('canvas').item(0) : document.createElement('canvas');
        canvasElement.className = 'ceros-engine';
        // Set the width of the canvas
        $(canvasElement).attr('width', this._gameWidth * window.devicePixelRatio)
            .attr('height', this._gameHeight * window.devicePixelRatio)
            .css({
                width: this._gameWidth + 'px',
                height: this._gameHeight + 'px'
            });
        document.body.appendChild(canvasElement);
        this._stage = canvasElement;
        this._gpu = canvasElement.getContext('2d');
    }

    render() {
        // Allow items to be rendered on the Engine
        this._scene.init();
    }

    bindInput() {
        document.addEventListener('keydown', (e: KeyboardEvent) => this.onInput(e));
    }

    /**
     * Handles the Keyboard Event for the application
     * @param e 
     */
    onInput(e: KeyboardEvent) {
        this._scene.onInput(e);
    }

    setDebug() {
        this._debug = true;
    }

    update() {
        // Make modification to the state and POS 
    }

    useArcadeFont() {
        if (this.stage && this.gpu) {
            this.gpu.font = 'VT323'; // Set the font to be used for display to give arcade retro styling
        }
    }

    version() {
        return 'version 1.0.0';
    }

    clear() {
        this._gpu ? this._gpu.clearRect(0, 0, this._gameWidth, this._gameHeight) : console.error('Context 2D is missing check implementation');
    }

   

}

