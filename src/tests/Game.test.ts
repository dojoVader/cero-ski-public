import { Game } from "../Core/Game";
import { AssetManager } from "../Core/AssetManager";


let game: Game = null;

beforeAll(() => {
    game = new Game();
    game.init();
});

test('Check that there are items to be rendered', () => {
    expect(game.obstacleManager.getObstacles().length).toBeGreaterThan(0);
})

