export function timestampToHour(timestamp) {
    /**
     * Transforms 2021-01-11T22:41:04.000+00:00 into 22:41
     */
    var time = new Date(timestamp);
    var hours = '0' + time.getHours();
    var minutes = '0' + time.getMinutes();
    return hours.substr(hours.length - 2) + ':' + minutes.substr(minutes.length - 2)
}

export function hourToTimestamp(hour) {
    /**
     * Transforms 22:41 into 2021-01-11T22:41:04.000+00:00
     */
    var date = new Date();
    date.setHours(hour.split(':')[0]);
    date.setMinutes(hour.split(':')[1]);
    return date;
}