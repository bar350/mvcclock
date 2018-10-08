class SetTimeCommand {
    constructor(hour, minute, currentTime, controller) {
        this.newHour = hour
        this.newMinute = minute
        this.currentTime = currentTime
        this.controller = controller
    }

    doIt() {
        this.controller.model.setTime(this.newHour, this.newMinute)
    }

    undoIt() {
        this.controller.model.setTime(this.currentTime.hour, this.currentTime.minute)
    }
}

export default SetTimeCommand