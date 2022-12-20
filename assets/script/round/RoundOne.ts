import { _decorator, Component, Node, Vec2, math } from 'cc';
import { Round } from './Round.ts';
import { RoundInfo } from './RoundInfo';
const { ccclass, property } = _decorator;

@ccclass('RoundOne')
export class RoundOne extends Round {
    start() {

    }

    update(deltaTime: number) {

    }

    public initConfig(): RoundInfo {
        return {
            playerPosition: math.v2(-410, -150),
            destinationPosition: math.v2(370, 175),
            mustFinishTaskNum: 0
        }
    }
}

