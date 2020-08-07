/**
 * @author Okeowo Aderemi
 * @description  CerosEngine handles most of the core gaming functionality, the game loop and the render operation and also setup the Canvas
 * dom if not present in the body
 */
export default class CerosEngine {


    private _debug = false; // This allows us to toggle the debugging mode for internal information if needed
    private _gpu: CanvasRenderingContext2D; // Canvas 2D Context 
    private _stage: HTMLCanvasElement // Keeps copy of the Canvas DOM element to read height and width if neccessary

    public get gpu(): CanvasRenderingContext2D {
        if (!this._gpu) // Context 2D not set inform user about the message
        {
            if (this.isDebug) {
                console.error('Canvas 2D Content was not set, check implementation in the code');
            }
        }
        return this._gpu;
    }

    public get stage() {
        return this._stage;
    }

    public get isDebug() {
        return this._debug;
    }

    constructor() {

    }

    init() {
        // Check if there is a canvas in the document and if not create one for the engine
    }

    render() {
        // Allow items to be rendered on the Engine
    }

    bindInput() {
        document.addEventListener('keydown', (e: KeyboardEvent) => onInput(e));
    }

    /**
     * Handles the Keyboard Event for the application
     * @param e 
     */
    onInput(e: KeyboardEvent) {
        console.log('Key Entered: %s', e.keyCode);
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
}