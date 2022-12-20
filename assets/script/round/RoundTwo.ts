import { _decorator, Component, Node, math } from 'cc';
import { Round } from './Round.ts';
import { RoundInfo } from './RoundInfo';
const { ccclass, property } = _decorator;

@ccclass('RoundTwo')
export class RoundTwo extends Round {
    start() {
        
    }
    
    update(deltaTime: number) {
        
    }

    public initConfig(): RoundInfo {
        return {
            playerPosition: math.v2(185, 120),
            destinationPosition: math.v2(-190, -145),
            mustFinishTaskNum: 3
        };
    }
}

