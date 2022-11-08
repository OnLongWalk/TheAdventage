import { _decorator, Component, Node, math, Vec3, tweenUtil, tween, Tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Context')
export class Context extends Component {
    @property(Node)
    private player: Node

    private _currentTime: number

    private _isRight: boolean = false

    private _isLeft: boolean = false

    private _isJump: boolean = false

    private _speed: number = 5

    private _jumpHeight: number = 50

    private _rightMove: math.Vec3 = new Vec3(this._speed, 0, 0)

    private _leftMove: math.Vec3 = new Vec3(-this._speed, 0, 0)

    private _jumpMove: math.Vec3 = new Vec3(0, this._jumpHeight, 0)

    start() {

    }

    update(delta: number) {
        if (this._isRight) {
            this.move(this._rightMove)
        }
        if (this._isJump) {
            this.jump()
        }
        if (this._isLeft) {
            this.move(this._leftMove)
        }
        this.currentTime = delta
    }

    move(moveDistance: math.Vec3): void {
        this.player.translate(moveDistance)
    }

    jump(): void {
        let action: Tween<Node> = tween(this.player)
        action.by(0.25, {position: this._jumpMove}).call(() => {this._isJump = false}).start()
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

