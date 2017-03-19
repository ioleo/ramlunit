export declare class Time {
    seconds: number;
    nanoseconds: number;
    constructor(since?: Time);
    toArray(): [number, number];
    toString(): string;
}
