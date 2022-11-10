import { _decorator, Component, Node, Input } from 'cc';
import { Context } from './Context';
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

    start() {
        this.gameStartPage()
        this.startGameButton.on(Input.EventType.TOUCH_START, this.gamePage, this)
    }

    update(deltaTime: number) {

    }
    public gameStartPage(): void {
        this.gameStartNode.active = true
        this.gameNode.active = false
        this.gameOverNode.active = false
    }

    public gamePage(): void {
        this.gameStartNode.active = false
        this.gameNode.active = true
        this.gameOverNode.active = false
    }

    public gameOverPage(): void {
        this.gameStartNode.active = false
        this.gameNode.active = false
        this.gameOverNode.active = true
    }
}

