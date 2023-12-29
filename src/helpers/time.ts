export function getUnixFromDate(date: Date): number {
    return Math.floor(date.getTime() / 1000)
}

export function getDateFromUnix(unix: number): Date {
    return new Date(unix * 1000);
}