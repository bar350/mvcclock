import TimeModel from './TimeModel.js'
import SetSecondsCommand from './SetSecondsCommand.js'
import SetTimeCommand from './SetTimeCommand.js'
import SetNowCommand from './SetNowCommand.js'
import SetDateCommand from './SetDateCommand.js'

class TimeController {
    constructor() {
        this.model = new TimeModel();
        this.views = [];
        this.redo = [];
        this.redoPointer = -1;

        this.init();
    }

    init() {
        this.setupHandlers().enableModel();
    }

    setupHandlers() {

        this.updateTimeHandler = this.sendUpdate.bind(this);
        this.setTimeHandler = this.setTime.bind(this);
        this.setSecondHandler = this.setSecond.bind(this);
        this.setDateHandler = this.setDate.bind(this);
        this.setNowHandler = this.setNow.bind(this);
        this.undoHandler = this.undo.bind(this);
        this.redoHandler = this.redoIt.bind(this);
        return this;
    }

    enableModel() {
        this.model.updateTimeEvent.attach(this.updateTimeHandler);
    }

    enableView(view) {
        if(typeof view.setTimeEvent !== 'undefined') {
            view.setTimeEvent.attach(this.setTimeHandler);
        }
        if(typeof view.setSecondEvent !== 'undefined') {
            view.setSecondEvent.attach(this.setSecondHandler);
        }
        if(typeof view.setDateEvent !== 'undefined') {
            view.setDateEvent.attach(this.setDateHandler);
        }
        if(typeof view.setNowEvent !== 'undefined') {
            view.setNowEvent.attach(this.setNowHandler);
        }
        if(typeof view.undoEvent !== 'undefined') {
            view.undoEvent.attach(this.undoHandler);
        }
        if(typeof view.redoEvent !== 'undefined') {
            view.redoEvent.attach(this.redoHandler);
        }

        return this;
    }

    addView(view) {
        this.views.push(view)
        this.enableView(view)
    }

    sendUpdate(sender, args) {
        var curr = this.model.getTime()
        this.views.forEach(function(element) {
            if(typeof element.updateDate !== 'undefined') {
                element.updateDate(curr)
            }
        });
    }

    setTime(sender, args) {
        var curr = this.model.getTime()
        var command = new SetTimeCommand(args.hour, args.minute, curr, this)
        this.redo.push(command)
        this.redoPointer += 1
        this.redo = this.redo.slice(0, this.redoPointer+1)
        command.doIt()
    }

    setSecond(sender, args) {
        var curr = this.model.getTime()
        var command = new SetSecondsCommand(args.seconds, curr, this)
        this.redo.push(command)
        this.redoPointer += 1
        this.redo = this.redo.slice(0, this.redoPointer+1)
        command.doIt()
    }

    setDate(sender, args) {
        var curr = this.model.getTime()
        var command = new SetDateCommand(args.year, args.month, args.day, curr, this)
        this.redo.push(command)
        this.redoPointer += 1
        this.redo = this.redo.slice(0, this.redoPointer+1)
        command.doIt()
    }

    setNow(sender, args) {
        var curr = this.model.getTime()
        var command = new SetNowCommand(curr, this)
        this.redo.push(command)
        this.redoPointer += 1
        this.redo = this.redo.slice(0, this.redoPointer+1)
        command.doIt()
    }

    undo(sender, args) {
        if(this.redoPointer > -1) {
            console.log('undo')
            var cmd = this.redo[this.redoPointer]
            this.redoPointer -= 1
            cmd.undoIt()
        }
    }

    redoIt(sender, args) {
        if(this.redoPointer < this.redo.length) {
            console.log('redo')
            var cmd = this.redo[this.redoPointer+1]
            this.redoPointer += 1
            cmd.doIt()
        }
    }

}

export default TimeController