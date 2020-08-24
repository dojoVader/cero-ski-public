import "babel-polyfill"
import { Game } from "../Core/Game";
import { AssetManager } from "../Core/AssetManager";


let game: Game = null;

beforeAll( done => {
    game = new Game();
    game.load().then(() => {
        done();
        game.init();
        game.run();
    });
});

test('Check that there are items to be rendered', () => {
    expect(game.obstacleManager.getObstacles().length).toBeGreaterThan(0);
});

