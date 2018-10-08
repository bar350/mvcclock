class SetDateCommand {
    constructor(year, month, day, currentTime, controller) {
        this.newYear = year
        this.newMonth = month
        this.newDay = day
        this.currentTime = currentTime
        this.controller = controller
    }

    doIt() {
        this.controller.model.setDate(this.newYear, this.newMonth, this.newDay)
    }

    undoIt() {
        this.controller.model.setDate(this.currentTime.year, this.currentTime.month, this.currentTime.day)
    }
}

export default SetDateCommand