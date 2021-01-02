export function timestampToHour(timestamp) {
    var time = new Date(timestamp);
    var hours = '0' + time.getHours();
    var minutes = '0' + time.getMinutes();
    return hours.substr(hours.length - 2) + ':' + minutes.substr(minutes.length - 2)
}

export function hourToTimestamp(hour) {
    var date = new Date();
    date.setHours(hour.split(':')[0]);
    date.setMinutes(hour.split(':')[1]);
    return date;
}