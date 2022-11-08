import { _decorator, Component, Node, Input } from 'cc';
import { Context } from '../Context';
const { ccclass, property } = _decorator;

@ccclass('MoveControl')
export class MoveControl extends Component {
    @property(Context)
    private context: Context

    @property(Node)
    private leftButton: Node

    @property(Node)
    private rightButton: Node

    @property(Node)
    private upButton: Node

    @property(Node)
    private attackButton: Node

    private isEnable: boolean = false

    start() {
        this.leftButton.on(Input.EventType.TOUCH_START, this.leftStart, this)
        this.leftButton.on(Input.EventType.TOUCH_END, this.leftEnd, this)
        this.rightButton.on(Input.EventType.TOUCH_START, this.rightStart, this)
        this.rightButton.on(Input.EventType.TOUCH_END, this.rightEnd, this)
        this.upButton.on(Input.EventType.TOUCH_START, this.jumpStart, this)
        this.attackButton.on(Input.EventType.TOUCH_START, null, this.attackButton)
        this.attackButton.on(Input.EventType.TOUCH_END, null, this.attackButton)
    }

    rightStart() {
        this.context.isRight = true
        console.log("touch start")
    }

    rightEnd() {
        this.context.isRight = false
        console.log("touch end")
    }

    jumpStart() {
        if (!this.context.isJump) {
            this.context.isJump = true
        }
    }

    leftStart() {
        this.context.isLeft = true
    }

    leftEnd() {
        this.context.isLeft = false
    }
}

