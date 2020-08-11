// Handles loading the assets for the game that is needed
/**
 * @todo Implement sound loader
 */
import { LoDashStatic } from "lodash";
import { IAssetManager } from "./engine.interface";

declare var _: LoDashStatic
declare var $: JQueryStatic;




/**
 * @todo Implement functionality to allow loading assets via JSON
 */
export class AssetManager implements IAssetManager {
    private assets = {
        'skierCrash': 'img/skier_crash.png',
        'skierLeft': 'img/skier_left.png',
        'skierLeftDown': 'img/skier_left_down.png',
        'skierDown': 'img/skier_down.png',
        'skierRightDown': 'img/skier_right_down.png',
        'skierRight': 'img/skier_right.png',
        'tree': 'img/tree_1.png',
        'treeCluster': 'img/tree_cluster.png',
        'rock1': 'img/rock_1.png',
        'rock2': 'img/rock_2.png',
        'jumpRamp': 'img/jump_ramp.png',
        'skierJump1': 'img/skier_jump_1.png',
        'skierJump2': 'img/skier_jump_2.png',
        'skierJump3': 'img/skier_jump_3.png',
        'skierJump4': 'img/skier_jump_4.png',
        'skierJump5': 'img/skier_jump_5.png',
        'rhinoDefault': 'img/rhino_default.png',
        'rhinoLift': 'img/rhino_lift.png',
        'rhinoLiftEat1': 'img/rhino_lift_eat_1.png',
        'rhinoLiftEat2': 'img/rhino_lift_eat_2.png',
        'rhinoLiftEat3': 'img/rhino_lift_eat_3.png',
        'rhinoLiftEat4': 'img/rhino_lift_eat_4.png',
        'rhinoLiftEatMouthOpen': 'img/rhino_lift_mouth_open.png',
        'rhinoRunLeft':'img/rhino_run_left.png',
        

    };
    private _assetResourceList: object = {}; // This stores the list of the assets to be downloaded

    private _trackingManager = {
        failed: 0,
        passed: 0
    }

    isDone() {
        return (this._trackingManager.failed + this._trackingManager.passed) === Object.keys(this.assets).length
    }


    public download(cb: Function) {

        _.each(this.assets, (asset, assetName) => {

            let resourceImage = new Image();

            resourceImage.onload = () => {
                // resourceImage.width /= 2;
                // resourceImage.height /= 2;
                this.setAsset(assetName, resourceImage);
                this._trackingManager.passed++;
                if (this.isDone()) {
                    cb();
                }

            }

            resourceImage.onerror = (e) => {
                this._trackingManager.failed++;
                if (this.isDone()) {
                    cb();
                }
            }
            //Set the resource to the source to trigger the events
            resourceImage.src = asset;
        });

    }

    setAsset(name: string, resource: any) {
        this._assetResourceList[name] = resource;
    }
    getAsset(name: string) {
        if (!this._assetResourceList[name]) {
            console.error(' Asset has not been defined in the resource list');
        }
        return this._assetResourceList[name];
    }

}