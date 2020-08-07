/**
 * @author Okeowo Aderemi
 * @description This is the main application that bootstraps the application
 */
import { CerosEngine } from './engine/CerosEngine';
document.addEventListener('DOMContentLoaded', (event: Event) => {
    // Start the main application here
    console.log('Gaming Engine runs now...')
    console.log(new CerosEngine().version());
});