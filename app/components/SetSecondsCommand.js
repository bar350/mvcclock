class SetSecondsCommand {
    constructor(seconds, currentTime, controller) {
        this.newSecond = seconds
        this.oldSecond = currentTime.second
        this.controller = controller
    }

    doIt() {
        this.controller.model.setSeconds(this.newSecond)
    }

    undoIt() {
        this.controller.model.setSeconds(this.oldSecond)
    }
}

export default SetSecondsCommand