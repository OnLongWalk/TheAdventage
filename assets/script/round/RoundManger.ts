import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Context } from '../Context';
import { Round } from './Round.ts';
const { ccclass, property } = _decorator;

@ccclass('RoundManger')
export class RoundManger extends Component {

    @property([Prefab])
    private rounds: Prefab[]

    @property(Node)
    private gameNode: Node

    private roundPerfbMap: RoundMap

    @property(Node)
    private gameManager: Node

    private currentRound: Node

    start() {

    }

    onLoad() {
        this.roundPerfbMap = {
            "round1": this.rounds[0],
            "round2": this.rounds[1],
        }
    }

    update(deltaTime: number) {

    }


    public loadRound(customEventData: string): void {
        if (this.roundPerfbMap[customEventData]) {
            if (this.currentRound) {
                this.gameNode.removeChild(this.currentRound)
                this.currentRound.destroy()
            }
            const context: Context = this.gameManager.getComponent(Context)
            const rounNode: Node = instantiate(this.roundPerfbMap[customEventData])
            this.gameNode.insertChild(rounNode, 0)
            context.currentRound = rounNode
            context.gameStart()
            rounNode.active = true
            this.currentRound = rounNode
        }
    }

    public reloadRound(): void {
        if (!this.currentRound) {
            return
        }
        this.loadRound(this.currentRound.name)
    }

}

interface RoundMap {
    [key: string]: Prefab
}
