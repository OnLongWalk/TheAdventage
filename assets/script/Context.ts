import { _decorator, Component, Node, math, Vec3, tweenUtil, tween, Tween, UITransform, RigidBody2D, NodeEventType, Contact2DType, Collider2D, IPhysics2DContact, Sprite } from 'cc';
import { Round } from './round/Round.ts';
import { RoundInfo } from './round/RoundInfo';
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

    private _currentRound: Node

    private _mustFinishTaskNum: number

    start() {
        // 目前用Cocos的碰撞监听会有死循环，先自己实现
        // 注册碰撞监听
        // const c: Collider2D = this.player.getComponent(Collider2D)
        // c.on(Contact2DType.END_CONTACT, this.handleCrush, this)

    }

    update(deltaTime: number) {
        // 判断是否触碰任务节点
        if (this._currentRound) {
            this.finishTask()
        }
        // 判断是否结束游戏
        if (this.isArriveDestination() && this.isFinishTask()) {
            this.gamePass()
        }
        // 按钮控制人物移动
        if (this._isRight) {
            this.player.scale = this.rightDir
            this.move(this._rightMove)
        }
        if (this._isLeft) {
            this.player.scale = this.leftDir
            this.move(this._leftMove)
        }
        // 跳跃
        if (this._isJump) {
            this.jump()
        }
        this.currentTime = deltaTime
    }

    onDestroy(): void {
         
    }

    move(moveDistance: math.Vec3): void {
        this.player.translate(moveDistance)
    }

    jump(): void {
        let rigidBody: RigidBody2D = this.player.getComponent(RigidBody2D)
        if (rigidBody.linearVelocity.y < 0.01 && rigidBody.linearVelocity.y > -0.01) {
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

    // 游戏重新开始或开始都走这个方法初始化参数
    gameStart(): void {
        // 初始化参数
        this._isRight = false
        this._isLeft = false
        this._isJump = false
        this.player.scale = math.v3(1, 1, 1)
        this.player.getComponent(RigidBody2D).linearVelocity = math.v2(0, 0)
        // 加载当前一局游戏的配置
        const config: RoundInfo = this._currentRound.getComponent(Round).initConfig()
        this.player.setPosition(config.playerPosition.x, config.playerPosition.y)
        this.destination.setPosition(config.destinationPosition.x, config.destinationPosition.y)
        this._mustFinishTaskNum = config.mustFinishTaskNum
    }

    returnGameStartPage(): void {
        this.gameStart()
        this.uIMain.gameStartPage()
    }
    
    // handleCrush(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     const tag: number = otherCollider.tag
    //     if (tag == 0) {
    //         return
    //     }
    //     this._mustFinishTaskNum--
    //     otherCollider.node.active = false
    //     console.log("save the people!!!")
    // }

    private isArriveDestination(): boolean {
        const playBoundingBox = this.player.getComponent(UITransform).getBoundingBox()
        const targetBox = this.destination.getComponent(UITransform).getBoundingBox()
        return targetBox.containsRect(playBoundingBox)
    }

    private isFinishTask(): boolean {
        return this._mustFinishTaskNum == 0
    }

    private finishTask() {
        const taskParent: Node = this._currentRound.getChildByName("task")
        const currentTasks: readonly Node[] = taskParent.children
        for (const task of currentTasks) {
            if (!task.active) {
                continue
            }
            const taskBox: math.Rect = task.getComponent(UITransform).getBoundingBox()
            const playBoundingBox: math.Rect = this.player.getComponent(UITransform).getBoundingBox()
            if (taskBox.intersects(playBoundingBox)) {
                task.active = false
                this._mustFinishTaskNum--
                return
            }
        }
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

    set currentRound(val: Node) {
        this._currentRound = val
    }

    get currentRound(): Node {
        return this._currentRound
    }

}

