function padWithZeros(num, length) {
    let str = num.toString();
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
}


module.exports = padWithZeros