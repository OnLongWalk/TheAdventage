import { _decorator, Component, Node, math, Vec3, tweenUtil, tween, Tween, UITransform } from 'cc';
import { UIMain } from './UIMain';
const { ccclass, property } = _decorator;

@ccclass('Context')
export class Context extends Component {
    @property(Node)
    private player: Node

    @property(Node)
    private destination: Node

    @property(UIMain)
    private uIMain: UIMain

    private _currentTime: number

    private _isRight: boolean = false

    private _isLeft: boolean = false

    private _isJump: boolean = false

    private _speed: number = 5

    private _jumpHeight: number = 35

    private _rightMove: math.Vec3 = new Vec3(this._speed, 0, 0)

    private _leftMove: math.Vec3 = new Vec3(-this._speed, 0, 0)

    private _jumpMove: math.Vec3 = new Vec3(0, this._jumpHeight, 0)

    private targetBox: math.Rect

    start() {
        this.gameStart()
        this.targetBox = this.destination.getComponent(UITransform).getBoundingBox()
    }

    update(deltaTime: number) {
        // 判断是否结束游戏
        if (this.isArriveDestination() && this.isFinishTask()) {
            this.gamePass()
        }
        // 按钮控制人物移动
        if (this._isRight) {
            this.move(this._rightMove)
        }
        if (this._isJump) {
            this.jump()
        }
        if (this._isLeft) {
            this.move(this._leftMove)
        }
        this.currentTime = deltaTime
    }

    move(moveDistance: math.Vec3): void {
        this.player.translate(moveDistance)
    }

    jump(): void {
        let action: Tween<Node> = tween(this.player)
        action.by(0.1, { position: this._jumpMove }).call(() => { this._isJump = false }).start()
    }

    gameOver(): void {
        this.uIMain.gameOverPage()
    }

    gamePass(): void {
        alert("通关成功")
        this.gameStart()
        this.uIMain.gameStartPage()
    }

    gameStart(): void {
        this._isRight = false
        this._isLeft = false
        this._isJump = false
        this.player.setPosition(-235, -60, 0)
    }

    returnGameStartPage(): void {
        this.gameStart()
        this.uIMain.gameStartPage()
    }

    private isArriveDestination(): boolean {
        const playBoundingBox: math.Rect = this.player.getComponent(UITransform).getBoundingBox()
        return this.targetBox.containsRect(playBoundingBox)
    }

    private isFinishTask(): boolean {
        return true
    }

    set isRight(val: boolean) {
        this._isRight = val
    }


    set isLeft(val: boolean) {
        this._isLeft = val
    }

    set currentTime(val: number) {
        this._currentTime = val
    }

    set isJump(val: boolean) {
        this._isJump = val
    }

    get isJump(): boolean {
        return this._isJump
    }
}

