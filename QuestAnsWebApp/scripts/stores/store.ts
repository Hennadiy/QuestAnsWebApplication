import { EventEmitter } from 'events';

export class Store extends EventEmitter {
    private readonly CHANGE_EVENT = "change"

    constructor() {
        super();
    }

    public addChangeListener(callback: Function): void {
        this.on(this.CHANGE_EVENT, callback);
    }

    public removeChangeListener(callback: Function): void {
        this.removeListener(this.CHANGE_EVENT, callback);
    }

    public emitChange(): void {
        this.emit(this.CHANGE_EVENT)
    }
}