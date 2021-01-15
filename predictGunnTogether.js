function getOffset(date) {
    var offset = 0;
    //hmmm ig we set a reference date and then predict
    // the offset based on how many holidays have gone by
    if (date > new Date("September 2 2020"))
        offset++;
    else
        return offset;
    if (date > new Date("November 11 2020"))
        offset++;
    else
        return offset;
    if (date > new Date("November 18 2020"))
        offset++;
    else
        return offset;
    if (date > new Date("November 25 2020"))
        offset++;
    else
        return offset;
    if (date > new Date("January 12 2021"))
        offset += 4; //else return offset;
    return offset;
}
function predictGunnTogether(date) {
    if (date.getDate() == 18 && date.getMonth() == 10 && date.getFullYear() == 2020)
        return "SELF";
    // now figure out how many wednesdays have passed during the school year so far (including today)
    // the first one was on August 19th, 2020
    var first = new Date("August 12 2020");
    var gtMissed = getOffset(date);
    console.log(gtMissed);
    // @ts-ignore
    var wedPassed = (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(first.getFullYear(), first.getMonth(), first.getDate())) / 60000 / 60 / 24 / 7;
    console.log(wedPassed);
    var gtPassed = wedPassed - gtMissed;
    console.log(gtPassed);
    return "Period " + (((gtPassed + 4) % 7) || 7);
}
