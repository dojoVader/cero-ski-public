export class AssetManager {
    
    
    private loadedAssets: {[key: string]: HTMLImageElement} = {};

    constructor() {
    }

    async loadAssets(assets: {[key: string]: string}) {
        const assetPromises: Promise<void>[] = [];

        for (const [assetName, assetUrl] of Object.entries(assets)) {
            const assetPromise = this.loadSingleAsset(assetUrl, assetName);
            assetPromises.push(assetPromise);
        }
        await Promise.all(assetPromises);
    }

    loadSingleAsset(assetUrl: string, assetName: string): Promise<void> {
        return new Promise((resolve) => {
            const assetImage = new Image();
            assetImage.onload = () => {
                assetImage.width /= 2;
                assetImage.height /= 2;

                this.loadedAssets[assetName] = assetImage;
                resolve();
            };
            assetImage.src = assetUrl;
        });
    }

    getAsset(assetName: string): HTMLImageElement {
        return this.loadedAssets[assetName];
    }
}