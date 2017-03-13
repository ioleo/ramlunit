export class Time {
    seconds: number
    nanoseconds: number

    constructor(since?: Time) {
        const [seconds, nanoseconds] = (since)
            ? process.hrtime(since.toArray())
            : process.hrtime()

        this.seconds = seconds
        this.nanoseconds = nanoseconds
    }

    toArray(): [number, number] {
        return [this.seconds, this.nanoseconds]
    }

    toString(): string {
        const time = this.seconds + (this.nanoseconds / 100000000)

        return time.toString()
    }
}