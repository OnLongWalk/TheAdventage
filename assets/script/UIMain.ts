import { _decorator, Component, Node, Input } from 'cc';
import { Context } from './Context';
import { RoundManger } from './round/RoundManger';
const { ccclass, property } = _decorator;

@ccclass('UIMain')
export class UIMain extends Component {
    @property(Node)
    private gameStartNode: Node

    @property(Node)
    private gameNode: Node

    @property(Node)
    private gameOverNode: Node

    @property(Node)
    private startGameButton: Node

    @property(Node)
    private selectRoundUi: Node

    @property(RoundManger)
    private roundManager: RoundManger

    start() {
        this.gameStartPage()
        this.startGameButton.on(Input.EventType.TOUCH_START, this.selectRoundPage, this)
    }

    update(deltaTime: number) {

    }
    public gameStartPage(): void {
        this.deactiveAllUI()
        this.gameStartNode.active = true
    }

    public gamePage(): void {
        this.deactiveAllUI()
        this.gameNode.active = true
    }

    public gameOverPage(): void {
        this.deactiveAllUI()
        this.gameOverNode.active = true
    }

    public selectRoundPage(): void {
        this.deactiveAllUI()
        this.selectRoundUi.active = true
    }

    private deactiveAllUI(): void {
        this.gameStartNode.active = false
        this.gameNode.active = false
        this.gameOverNode.active = false
        this.selectRoundUi.active = false
    }

    // 后续可以优化为通过脚本为每一个button加上click监听事件，现在暂时在编辑器指定加载这个函数
    public loadRound(event: Event, customEventData: string): void {
        this.roundManager.loadRound(customEventData)
        this.gamePage()
        console.log(this.gameNode.getChildByName("control").active)
    }
}

