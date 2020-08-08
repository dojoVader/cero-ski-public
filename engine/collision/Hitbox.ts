import { IRenderable } from "../engine.interface";

export class Hitbox {

    hasCollided(rect1: IRenderable, rect2: IRenderable): boolean {
        if (rect1.position.x < rect2.position.x + rect2.size.width &&
            rect1.position.x + rect1.size.width > rect2.position.x &&
            rect1.position.y < rect2.position.y + rect2.size.height &&
            rect1.position.y + rect1.size.height > rect2.position.y) {
            return true;
        }
        return false;
    }
}