import { SkierDirection } from "./game.interface";

export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const JUMPING_RAMP = 'ramp'
export const JUMP_SEQUENCE = 'jump1';
export const JUMP_SEQUENCE2 = 'jump2';
export const JUMP_SEQUENCE3 = 'jump3';
export const JUMP_SEQUENCE4 = 'jump4';
export const JUMP_SEQUENCE5 = 'jump5';
export const RHINO_DEFAULT = 'rhino_default';
export const RHINO_SEQUENCE1 = 'rhino_lift_eat_1';
export const RHINO_SEQUENCE2 = 'rhino_lift_eat_2';
export const RHINO_SEQUENCE3 = 'rhino_lift_eat_3';
export const RHINO_SEQUENCE4 = 'rhino_lift_eat_4';
export const RHINO_SEQUENCE5 = 'rhino_lift_eat_5';
export const RHINO_SEQUENCE6 = 'rhino_lift_eat_6';
export const RHINO_MOVEMENT = 'rhino_move1';
export const RHINO_MOVEMENT2 = 'rhino_move2';
export const BOSS_MODE = 'boss';

export const SKIER_STARTING_SPEED = 10;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;
export const RHINO_SPEED = 5.00;


export const ASSETS = {
    [SKIER_CRASH]: 'img/skier_crash.png',
    [SKIER_LEFT]: 'img/skier_left.png',
    [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
    [SKIER_DOWN]: 'img/skier_down.png',
    [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
    [SKIER_RIGHT]: 'img/skier_right.png',
    [TREE]: 'img/tree_1.png',
    [TREE_CLUSTER]: 'img/tree_cluster.png',
    [ROCK1]: 'img/rock_1.png',
    [ROCK2]: 'img/rock_2.png',
    [JUMPING_RAMP]: 'img/jump_ramp.png',
    [JUMP_SEQUENCE]: 'img/skier_jump_1.png',
    [JUMP_SEQUENCE2]: 'img/skier_jump_2.png',
    [JUMP_SEQUENCE3]: 'img/skier_jump_3.png',
    [JUMP_SEQUENCE4]: 'img/skier_jump_4.png',
    [JUMP_SEQUENCE5]: 'img/skier_jump_5.png',
    [RHINO_DEFAULT]: 'img/rhino_default.png',
    [RHINO_SEQUENCE1]: 'img/rhino_lift_eat_1.png',
    [RHINO_SEQUENCE2]: 'img/rhino_lift_eat_2.png',
    [RHINO_SEQUENCE3]: 'img/rhino_lift_eat_3.png',
    [RHINO_SEQUENCE4]: 'img/rhino_lift_eat_4.png',
    [RHINO_SEQUENCE5]: 'img/rhino_lift_mouth_open.png',
    [RHINO_SEQUENCE6]: 'img/rhino_lift.png',
    [RHINO_MOVEMENT]: 'img/rhino_run_left.png',
    [RHINO_MOVEMENT2]: 'img/rhino_run_left_2.png',
    [BOSS_MODE]:'img/boss-icon.png'

};

export const SKIER_DIRECTIONS = {
    CRASH: 0,
    LEFT: 1,
    LEFT_DOWN: 2,
    DOWN: 3,
    RIGHT_DOWN: 4,
    RIGHT: 5,
    JUMP: 6
};

export const RHINO_DIRECTIONS = {
    LEFT: 1,
    LEFT_NEXT_LEG: 2,
    EAT: 3,
    DOWN: 4,
    RIGHT: 5,
    STOP: 7,
    CAUGHT_SKIER: 8
}

export const SKIER_DIRECTION_ASSET: SkierDirection = {
    [SKIER_DIRECTIONS.CRASH]: SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT]: SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN]: SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN]: SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN]: SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT]: SKIER_RIGHT,
    [SKIER_DIRECTIONS.JUMP]: [JUMP_SEQUENCE, JUMP_SEQUENCE2, JUMP_SEQUENCE3, JUMP_SEQUENCE4, JUMP_SEQUENCE5]
};

export const RHINO_DIRECTION_ASSETS = {
    [RHINO_DIRECTIONS.LEFT]: [RHINO_MOVEMENT,RHINO_MOVEMENT2],
    [RHINO_DIRECTIONS.EAT]: [RHINO_SEQUENCE1, RHINO_SEQUENCE2, RHINO_SEQUENCE3, RHINO_SEQUENCE4, RHINO_SEQUENCE5, RHINO_SEQUENCE6]
}



export const KEYS = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    PAUSE: 80,
    R: 82,
    J: 74
};

