class Event {
    /* The Event class handles the interclass updating information so that other classes can subscribe to events. */
    constructor(sender) {
        this._sender = sender;
        this._listeners = [];
    }

    attach(listener) {
        this._listeners.push(listener);
    }
    notify(args) {
        for (var i = 0; i < this._listeners.length; i += 1) {
            this._listeners[i](this._sender, args);
        }
    }
}

export default Event