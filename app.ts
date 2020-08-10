/**
 * @author Okeowo Aderemi
 * @description This is the main application that bootstraps the application
 */
import { CerosEngine } from './engine/CerosEngine';
import { AssetManager } from './engine/AssetManager';
import { Scene } from './engine/Scene';
document.addEventListener('DOMContentLoaded', (event: Event) => {
    // Start the main application here
    
    const asset = new AssetManager;
    
    asset.download(() => {
        const engine = new CerosEngine();
        engine.assetManager = asset;
        const scene = new Scene();
        engine.init(scene);
        engine.useArcadeFont();
        engine.setDebug();
        console.log('Gaming Engine runs now...with Scene')
        
        
    });
    
});