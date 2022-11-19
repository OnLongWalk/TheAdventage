import { _decorator, Component, Node, math, Vec3, tweenUtil, tween, Tween, UITransform, RigidBody2D } from 'cc';
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

    private rightDir = new math.Vec3(1, 1, 1)

    private leftDir = new math.Vec3(-1, 1, 1)

    private _isRight: boolean = false

    private _isLeft: boolean = false

    private _isJump: boolean = false

    private _speed: number = 5

    private _jumpSpeed: math.Vec2 = math.v2(0, 8.5)

    private _rightMove: math.Vec3 = new Vec3(this._speed, 0, 0)

    private _leftMove: math.Vec3 = new Vec3(-this._speed, 0, 0)

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
            this.player.scale = this.rightDir
            this.move(this._rightMove)
        }
        if (this._isJump) {
            this.jump()
        }
        if (this._isLeft) {
            this.player.scale = this.leftDir
            this.move(this._leftMove)
        }
        this.currentTime = deltaTime
    }

    move(moveDistance: math.Vec3): void {
        this.player.translate(moveDistance)
    }

    jump(): void {
        let rigidBody: RigidBody2D = this.player.getComponent(RigidBody2D)
        if (rigidBody.linearVelocity.y < 0.0001 && rigidBody.linearVelocity.y > -0.0001) {
            rigidBody.linearVelocity = rigidBody.linearVelocity.add(this._jumpSpeed)
        }
        this.isJump = false
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
        this.player.scale = math.v3(1, 1, 1)
        this.player.getComponent(RigidBody2D).linearVelocity = math.v2(0, 0)
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

