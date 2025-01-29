import { EventManager } from "./EventManager.ts";

export class Time 
{
    private start: number;
    private elapsed: number;
    private current: number;
    private delta: number;
    private playing: boolean;
    private ticker: number;
    private eventManager: EventManager;

    constructor() 
    {
        this.eventManager = EventManager.getInstance();

        this.start = Date.now();
        this.elapsed = 0;
        this.current = this.start;
        this.delta = 16;
        this.playing = true;

        this.eventManager.register('tick', this.tick);
        this.tick();
    }


    
    public play(): void 
    {
        this.playing = true;
    }

    public pause(): void 
    {
        this.playing = false;
    }

    private tick(): void 
    {
        this.ticker = window.requestAnimationFrame(this.tick);

        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.elapsed += this.playing ? this.delta : 0;
        this.current = currentTime;

        // any delta time over 60ms should be clamped (slow processing)
        if (this.delta > 60) 
        {
            this.delta = 60;
        }

        if (this.playing) 
        {
            this.eventManager.dispatch("tick", { msg: this.delta.toString()}); 
        }
    }

    


    public getDeltaTime(): number
    {
        return this.delta;
    }
}
