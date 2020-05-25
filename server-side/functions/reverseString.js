//  Just reverse some string
function reverseString(str) {
    if(str === "") {
        return "";
    }
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}

module.exports = reverseString;