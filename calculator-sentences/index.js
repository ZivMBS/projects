const canvas = document.getElementById("canvas");
const input = document.getElementsByTagName("input")[0];
const button = document.getElementsByTagName("button")[0];
const ctx = canvas.getContext("2d");
const dimensions = [96, 31];
const tileSize = canvas.clientWidth / dimensions[0];
let cursor = tileSize;

const regexDictionary = [
    {key: "A", regex: /A/},    {key: "B", regex: /[Bb]/},
    {key: "C", regex: /[Cc]/}, {key: "D", regex: /[Dd]/},
    {key: "E", regex: /E/},    {key: "F", regex: /[Ff]/},
    {key: "G", regex: /G/},    {key: "L", regex: /L/},
    {key: "M", regex: /[Mm]/}, {key: "O", regex: /[Oo]/},
    {key: "P", regex: /[Pp]/}, {key: "R", regex: /[Rr]/},
    {key: "X", regex: /[Xx]/}, {key: "Y", regex: /[Yy]/},
    {key: "a", regex: /a/},    {key: "e", regex: /e/},
    {key: "g", regex: /g/},    {key: "h", regex: /[Hh]/},
    {key: "i", regex: /[Ii]/}, {key: "k", regex: /[Kk]/},
    {key: "t", regex: /[Tt]/}, {key: "u", regex: /[Uu]/},
    //calculator constants
    {key: "mp", regex: /mp/},         {key: "mn", regex: /[Mm][Nn]/},
    {key: "me", regex: /me/},         {key: "ao", regex: /ao/},
    {key: "re", regex: /re/},         {key: "NA", regex: /[Nn][Aa]/},
    {key: "Vm", regex: /[Vv][Mm]/},   {key: "Co", regex: /[Cc][Oo]/},
    {key: "Go", regex: /Go/},         {key: "Zo", regex: /[Zz][Oo]/},
    {key: "atm", regex: /a[Tt]m/},    {key: "atM", regex: /a[Tt]M/},
    {key: "AtM", regex: /A[Tt][Mm]/}, {key: "Ans", regex: /[Aa][Nn][Ss]/},
    //numbers
    {key: "0", regex: /0/},     {key: "1", regex: /[l1]/},
    {key: "2", regex: /[Zz2]/}, {key: "3", regex: /3/},
    {key: "4", regex: /4/},     {key: "5", regex: /[Ss5]/},
    {key: "6", regex: /6/},     {key: "7", regex: /7/},
    {key: "8", regex: /8/},     {key: "9", regex: /9/},
    //special characters
    {key: "-", regex: /[\- ]/}, {key: ":", regex: /:/},
    {key: ".", regex: /\./},    {key: ",", regex: /,/},
    {key: "!", regex: /!/}
];

const dictionary = [
    {key: "A", value: "IpUY/jGI"}, {key: "B", value: "9GMfRjHw"},
    {key: "C", value: "dGEIQhFw"}, {key: "D", value: "5KMYxjLg"},
    {key: "E", value: "/CEPQhD4"}, {key: "F", value: "/CEPQhCA"},
    {key: "G", value: "dGELxjNo"}, {key: "L", value: "AIRCIRD4"},
    {key: "M", value: "jHe61jGI"}, {key: "O", value: "dGMYxjFw"},
    {key: "P", value: "9nOfYxjA"}, {key: "R", value: "9GMfUlKI"},
    {key: "X", value: "jFRCKVGI"}, {key: "Y", value: "jFSiEIQg"},
    {key: "a", value: "ABNZSlZI"}, {key: "e", value: "AB0Y/hFw"},
    {key: "g", value: "AB8YxeFw"}, {key: "h", value: "hCFsxjGI"},
    {key: "i", value: "AwHGMYzw"}, {key: "k", value: "hCMqYpKI"},
    {key: "t", value: "QjyEIQkw"}, {key: "u", value: "ACMYxjNo"},
    //calculator constants
    {key: "mp", value: ["ADVa1rWo", "AAHox9CA"]}, {key: "mn", value: ["ADVa1rWo", "AAFsxjGI"]},
    {key: "me", value: ["ADVa1rWo", "AB0Y/hFw"]}, {key: "ao", value: ["AB0TpjNo", "AADoxjFw"]},
    {key: "re", value: ["AC2YQhCA", "AB0Y/hFw"]}, {key: "NA", value: ["jnNaznGI", "AADox/GI"]},
    {key: "Vm", value: ["jGMVKUQg", "ADVa1rWo"]}, {key: "Co", value: ["AB0YQhFw", "AADoxjFw"]},
    {key: "Go", value: ["dGELxjNo", "AADoxjFw"]}, {key: "Zo", value: ["+EQiIRD4", "AADoxjFw"]},
    {key: "atm", value: ["AB0TpjNo", "QjyEIQkw", "ADVa1rWo"]}, {key: "Ans", value: ["IpUY/jGI", "AC2YxjGI", "AB0YODFw"]},
    //numbers
    {key: "0", value: "dGMYxjFw"}, {key: "1", value: "IwhCEIRw"},
    {key: "2", value: "dGIRERD4"}, {key: "3", value: "dGITBjFw"},
    {key: "4", value: "EYylS+IQ"}, {key: "5", value: "/CHohDFw"},
    {key: "6", value: "MiEPRjFw"}, {key: "7", value: "/EIhCIQg"},
    {key: "8", value: "dGMXRjFw"}, {key: "9", value: "dGMXhCJg"},
    //special characters
    {key: "-", value: "AAAPgAAA"}, {key: " ", value: "AAAPgAAA"},
    {key: ":", value: "AxgAMYAA"}, {key: ".", value: "AAAAAAxg"},
    {key: ",", value: "AAAAMYRA"}, {key: "!", value: "IQhCEAQg"}
];

button.addEventListener("click", () => {generate(input.value.trim())});
input.addEventListener("keydown", evt => {evt.keyCode == 13 ? generate(input.value.trim()) : false});

//TODO: check mark to prioritize special cases over normal letters
function generate(input) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    cursor = tileSize;
    let regex = /([Aa][Tt][Mm]|[Aa][Nn][Ss])|(m[pe]|[Mm][Nn]|re|[Nn][Aa]|[Vv][Mm]|[acG]o|[Zz][Oo])|([A-GLMOPRXYaeghiktu])|([a-gmoprxyAEGHIKTU])|([0-9])|([.,\-:()! ])|([SsZzl])/g;
    let matchedInput = input.match(regex);

    if (matchedInput !== null) {
        for (let match of matchedInput) {
            let longestMatch;
            for (let regex of regexDictionary) {
                if (match.match(regex.regex) !== null && match.length <= regex.key.length)
                    longestMatch = regex;
            }
            
            if (findInDictionary(longestMatch.key, true)) {
                let word = findInDictionary(longestMatch.key, true);
                if (word.key.length > 1) {
                    for (let letter in word.key) {
                        drawCharacter(base64tobin(word.value[letter]));
                    }
                } else drawCharacter(base64tobin(word.value));
            } else if (findInDictionary(longestMatch.key)) {
                let word = findInDictionary(longestMatch.key);
                for (let letter in word.key) {
                    drawCharacter(base64tobin(findInDictionary(longestMatch.key[letter]).value));
                }
            }
        }
    }
}

/*gets binary representation of the character and prints it, each character is 5x9 bits.*/
function drawCharacter(character) {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 5; x++) {
            if (character[y*5 + x] != "0")
                ctx.fillRect(cursor + x * tileSize, (y+1) * tileSize, tileSize, tileSize);
        }
    }
    cursor += 6 * tileSize;
}

function findInDictionary(input, matchExactly = false) {
    let output;
    if (matchExactly) {
        //iterates through array and finds entry with the same key as input
        for (let i = 0; i < dictionary.length; i++) {
            output = dictionary.find(word => {return word.key == input});
        }
    } else {
        for (let word of dictionary) {
            if (input == word.key)
                output = dictionary.find(word => {return word.key == input});
            else if (input.toLowerCase() == word.key.toLowerCase())
                output = dictionary.find(word => {return word.key.toLowerCase() == input.toLowerCase()});
        }
    }
    return output;
}

//converts input from base64 to binary
function base64tobin(input) {
    let regex = /[A-Z]|[a-z]|[0-9]|[/+]/g;
    let arr = input.match(regex).join("");
    let output = "";

    for (let l of arr) {
        if (l.match(/[A-Z]/)) output += (l.charCodeAt()-65).toString(2).padStart(6, "0");
        if (l.match(/[a-z]/)) output += (l.charCodeAt()-71).toString(2).padStart(6, "0");
        if (l.match(/[0-9]/)) output += (l.charCodeAt()+04).toString(2).padStart(6, "0");
        if (l == "+") output += "111110";
        if (l == "/") output += "111111";
    }

    return output;
}

function flipLetterCase(letter) {
    return letter.toString().split("").map(function(c) {
        return c === c.toUpperCase()
        ? c.toLowerCase()
        : c.toUpperCase()
    }).join("");
}
