const canvas = document.getElementById("canvas");
const input = document.getElementsByTagName("input")[0];
const button = document.getElementsByTagName("button")[0];
const ctx = canvas.getContext("2d");
const dimensions = [96, 31];
const tileSize = canvas.clientWidth / dimensions[0];
let cursor = tileSize;

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
    {key: "Vm", value: ["jGMVKUQg", "ADVa1rWo"]}, {key: "co", value: ["AB0YQhFw", "AADoxjFw"]},
    {key: "Go", value: ["dGELxjNo", "AADoxjFw"]}, {key: "Zo", value: ["+EQiIRD4", "AADoxjFw"]},
    {key: "atm", value: ["AB0TpjNo", "QjyEIQkw", "ADVa1rWo"]},
    //numbers
    {key: "0", value: "dGMYxjFw"}, {key: "1", value: "IwhCEIRw", alias: "l"},
    {key: "2", value: "dGIRERD4", alias: "Z"}, {key: "3", value: "dGITBjFw"},
    {key: "4", value: "EYylS+IQ"}, {key: "5", value: "/CHohDFw", alias: "S"},
    {key: "6", value: "MiEPRjFw"}, {key: "7", value: "/EIhCIQg"},
    {key: "8", value: "dGMXRjFw"}, {key: "9", value: "dGMXhCJg"},
    //special characters
    {key: "-", value: "AAAPgAAA", alias: " "}, {key: ":", value: "AxgAMYAA"}
];

button.addEventListener("click", () => {generate(input.value.trim())});
input.addEventListener("keydown", evt => {evt.keyCode == 13 ? generate(input.value.trim()) : false});

function generate(input) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    cursor = tileSize;

    for (let i = 0; i < input.length; i++) {
        if (dictionary.find(word => {return word.key == input[i] + input[i+1] + input[i+2]}) !== undefined) {
            //checks for constant "atm"
            let word = dictionary.find(word => {return word.key == input[i] + input[i+1] + input[i+2]});
            drawCharacter(base64tobin(word.value[0]));
            drawCharacter(base64tobin(word.value[1]));
            drawCharacter(base64tobin(word.value[2]));
            i += 2;
        } else if (dictionary.find(word => {return word.key == input[i] + input[i+1]}) !== undefined) {
            //checks for all calculator constants with 2 letters
            let word = dictionary.find(word => {return word.key == input[i] + input[i+1]});
            drawCharacter(base64tobin(word.value[0]));
            drawCharacter(base64tobin(word.value[1]));
            i++;
        } else {
            //TODO: check for every possible combination (i.e: Mn should print mn and not M)
            if (dictionary.find(word => {return word.key == input[i] || word.alias == input[i]}) !== undefined) {
                //checks for all normal cases and numbers
                let word = dictionary.find(word => {return word.key == input[i] || word.alias == input[i]});
                drawCharacter(base64tobin(word.value));
            } else if (dictionary.find(word => {return word.key == input[i].toLowerCase() || word.alias == input[i].toLowerCase()}) !== undefined) {
                //checks for lowercase key
                let word = dictionary.find(word => {return word.key == input[i].toLowerCase() || word.alias == input[i].toLowerCase()});
                drawCharacter(base64tobin(word.value));
            } else if (dictionary.find(word => {return word.key == input[i].toUpperCase() || word.alias == input[i].toUpperCase()}) !== undefined) {
                //checks for uppercase key
                let word = dictionary.find(word => {return word.key == input[i].toUpperCase() || word.alias == input[i].toUpperCase()});
                drawCharacter(base64tobin(word.value));
            }
        }
    }
}

/*gets binary representation of the character and prints it,
  each character is 5x9 bits.*/
function drawCharacter(character) {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 5; x++) {
            if (character[y*5 + x] != "0")
                ctx.fillRect(cursor + x * tileSize, (y+1) * tileSize, tileSize, tileSize);
        }
    }
    cursor += 6 * tileSize;
}

//converts input from base64 to binary
function base64tobin(input) {
    let regex = /[A-Z]|[a-z]|[0-9]|[/+]/g;
    let arr;
    let output = "";

    arr = input.match(regex);
    output = "";
    for (let l of arr) {
        if (l.match(/[A-Z]/)) output += (l.charCodeAt()-65).toString(2).padStart(6, "0");
        if (l.match(/[a-z]/)) output += (l.charCodeAt()-71).toString(2).padStart(6, "0");
        if (l.match(/[0-9]/)) output += (l.charCodeAt()+4).toString(2).padStart(6, "0");
        if (l == "+") output += "111110";
        if (l == "/") output += "111111";
    }

    return output;
}
