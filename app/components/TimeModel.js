import Event from './Event.js'

class TimeModel {
    constructor() {
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.year = 0;
        this.month = 0;
        this.day = 0;
        this.updateTimeEvent = new Event(this);

        this.init();
    }

    updateTime(timeObj) {
        this.hour = timeObj.getHours()
        this.minute = timeObj.getMinutes()
        this.second = timeObj.getSeconds()
        this.year = timeObj.getFullYear()
        this.month = timeObj.getMonth() + 1
        this.day = timeObj.getDate()
        this.updateTimeEvent.notify();
    }

    getTime() {
        return Object.assign({}, {hour: this.hour,
            minute: this.minute,
            second: this.second,
            year: this.year,
            month: this.month,
            day: this.day});
    }

    setDate(year, month, day) {
        var d = new Date(year, month-1, day, this.hour, this.minute, this.second);
        this.updateTime(d);
    }

    setTime(hour, minute) {
        var d = new Date(this.year, this.month-1, this.day, hour, minute, this.second);
        this.updateTime(d);
    }

    setSeconds(seconds) {
        var d = new Date(this.year, this.month-1, this.day, this.hour, this.minute, seconds);
        this.updateTime(d);
    }


    setNow() {
        var d = new Date;
        this.updateTime(d);
    }

    _increaseTime() {
        var t = new Date(this.year, this.month-1, this.day, this.hour, this.minute, this.second);
        t.setSeconds(t.getSeconds() + 1);
        this.updateTime(t)
    }

    init() {
        this.setNow()
        this.callIncrease = this._increaseTime.bind(this)
        setInterval(this.callIncrease, 1000)
    }
}

export default TimeModel