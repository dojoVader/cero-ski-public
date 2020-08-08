/**
 * @author Okeowo Aderemi
 * @description This is the main application that bootstraps the application
 */
import { CerosEngine } from './engine/CerosEngine';
import { AssetManager } from './engine/AssetManager';
document.addEventListener('DOMContentLoaded', (event: Event) => {
    // Start the main application here
    console.log('Gaming Engine runs now...')
    console.log(new CerosEngine().version());
    var asset = new AssetManager();
    asset.download().then(()=> console.log('loaded'));
    console.log(asset);
});