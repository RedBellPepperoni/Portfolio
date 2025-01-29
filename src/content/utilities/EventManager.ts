//https://gist.github.com/MaxSchaefer/b620370123d2488ed824e778ce3d76be

interface Arguments 
{
    [name: string]: string
}

export class EventManager 
{
    private static instance: EventManager;

    private events: {[name: string]: Function[]}

    private constructor() 
    {
        this.events = {};
    }

    public static getInstance() {
        if (!EventManager.instance)
            EventManager.instance = new EventManager();
        return EventManager.instance;
    }

    public register(name: string, callback: Function) 
    {
        name = name.toLowerCase();
        if (!this.events[name])
            this.events[name] = [];
        this.events[name].push(callback);
    }

    public unregister(name: string, searchCallback: Function)
    {
        name = name.toLowerCase();
        if (!this.events[name])
            return;
        const callbackIndex: number = this.events[name].findIndex((callback) => {
            if (JSON.stringify(callback) === JSON.stringify(searchCallback))
                return true;
            return false;
        }) - 1;
        this.events[name].splice(callbackIndex, 1);
    }

    public dispatch(name: string, args : Arguments) 
    {
        name = name.toLowerCase();
        if (!this.events[name])
            return;
        for (const callback of this.events[name]) {
            callback(args);
        }
    }
}