import Event from './Event.js'

class TimeModel {
    /* The TimeModel is responsible for 2 things
       First it is responsible for maintaining the variables related to the time
       Second it is responsible for updating those variables each second

       The TimeModel has an attribute that is an Event class which can be subscribed to
       in order to get time updates. In this design the Controller subscribes to this event.
     */
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

    /* Function which does the updating of a time
       The function takes a Javascript Date object as the parameter
       And updates all the attributes of the object from the parameter
       Then calls the notify so any subscribers will know of the change.
     */
    updateTime(timeObj) {
        this.hour = timeObj.getHours()
        this.minute = timeObj.getMinutes()
        this.second = timeObj.getSeconds()
        this.year = timeObj.getFullYear()
        this.month = timeObj.getMonth() + 1
        this.day = timeObj.getDate()
        this.updateTimeEvent.notify();
    }

    /* Helper function to return the current time */
    getTime() {
        return Object.assign({}, {hour: this.hour,
            minute: this.minute,
            second: this.second,
            year: this.year,
            month: this.month,
            day: this.day});
    }

    /* Helper functions to update the time */
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


    /* Functions to manage increasing the time every second regardless of what time it is.
     * This function relies upon Javascripts Date function to be able to handle when the seconds
      * are increased past 60 */
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