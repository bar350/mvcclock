class SetNowCommand {
    constructor(currentTime, controller) {
        this.currentTime = currentTime
        this.controller = controller
    }

    doIt() {
        this.controller.model.setNow()
    }

    undoIt() {
        this.controller.model.setDate(this.currentTime.year, this.currentTime.month, this.currentTime.day)
        this.controller.model.setTime(this.currentTime.hour, this.currentTime.minute)
        this.controller.model.setSeconds(this.currentTime.second)
    }
}

export default SetNowCommand