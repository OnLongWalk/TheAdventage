import { _decorator, Component, Node } from 'cc';
import { RoundInfo } from './RoundInfo';
const { ccclass, property } = _decorator;

@ccclass('Round')
export class Round extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    public initConfig(): RoundInfo {
        return null
    }
}

