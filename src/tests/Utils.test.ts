import { randomInt, Rect, intersectTwoRects } from './../Core/Utils';

test('Testing that the Random Function cannot excced the max', () => {
    const value = randomInt(1, 2);
    expect(value).not.toBeNull();
    expect(value).toBeLessThan(3);
});

test('Testing that 2 Rects intersect', () => {

    // Sample Data gotten from log to show skier crashing with an obstacle
    const rect1: Rect = new Rect(-16, 7034, 16, 7042);
    const rect2: Rect = new Rect(-9, 7039.5, 35, 7062);

    const notCollidedRect = new Rect(0,0,70,0);

    const isCollided = intersectTwoRects(rect1,rect2);
    expect(isCollided).toBe(true);

    const notCollided = intersectTwoRects(rect1, notCollidedRect);
    expect(notCollided).toBe(false);
});