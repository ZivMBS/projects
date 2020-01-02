const canvas = document.getElementById("canvas");
const input = document.getElementsByTagName("input")[0];
const ctx = canvas.getContext("2d");
const dimensions = [97, 31];
const tileSize = canvas.clientWidth / dimensions[0];
const buttons = new Image();
buttons.src = "imgs/buttons.png";
let cursor = [tileSize, tileSize];

input.value = "Type text here.";
window.onload = () => {
    generate(input.value, ctx);
    generateLetters();
};

const dictionary = [
    {k: "A", v: ["IpUY/jGI"], i: [0, 2], r: /A/},             {k: "B", v: ["9GMfRjHw"], i: [0, 3], r: /[Bb]/},
    {k: "C", v: ["dGEIQhFw"], i: [0, 4], r: /[Cc]/},          {k: "D", v: ["5KMYxjLg"], i: [0, 5], r: /[Dd]/},
    {k: "E", v: ["/CEPQhD4"], i: [0, 6], r: /E/},             {k: "F", v: ["/CEPQhCA"], i: [0, 7], r: /[Ff]/},
    {k: "G", v: ["dGELxjNo"], i: [1, 24, 20, 26], r: /G/},    {k: "L", v: ["AIRCIRD4"], i: [1, 2], r: /L/},
    {k: "M", v: ["jHe61jGI"], i: [0, 10], r: /[Mm]/},         {k: "O", v: ["dGMYxjFw"], i: [17], r: /[Oo]/},
    {k: "P", v: ["9nOfYxjA"], i: [1, 29], r: /[Pp]/},         {k: "R", v: ["9GMfUlKI"], i: [1, 24, 19, 24], r: /[Rr]/},
    {k: "X", v: ["jFRCKVGI"], i: [0, 8], r: /[Xx]/},          {k: "Y", v: ["jFSiEIQg"], i: [0, 9], r: /[Yy]/},
    {k: "a", v: ["ABNZSlZI"], i: [1, 24, 18, 17], r: /a/},    {k: "e", v: ["AB0Y/hFw"], i: [1, 24, 19, 20], r: /e/},
    {k: "g", v: ["AB8YxeFw"], i: [1, 24, 20, 22], r: /g/},    {k: "h", v: ["hCFsxjGI"], i: [1, 24, 17, 23], r: /[Hh]/},
    {k: "i", v: ["AwHGMYzw"], i: [1, 11], r: /[Ii]/},         {k: "k", v: ["hCMqYpKI"], i: [1, 24, 19, 22], r: /[Kk]/},
    {k: "t", v: ["QjyEIQkw"], i: [1, 24, 20, 25], r: /[Tt]/}, {k: "u", v: ["ACMYxjNo"], i: [1, 24, 18, 24], r: /[Uu]/},
    //calculator constants
    {k: "mp",  v: ["ADVa1rWo", "AAHox9CA"], i: [1, 24, 17, 18], r: /mp/},       {k: "mn", v: ["ADVa1rWo", "AAFsxjGI"], i: [1, 24, 17, 19], r: /[Mm][Nn]/},
    {k: "me",  v: ["ADVa1rWo", "AB0Y/hFw"], i: [1, 24, 17, 20], r: /me/},       {k: "ao", v: ["AB0TpjNo", "AADoxjFw"], i: [1, 24, 17, 22], r: /ao/},
    {k: "re",  v: ["AC2YQhCA", "AB0Y/hFw"], i: [1, 24, 18, 18], r: /re/},       {k: "NA", v: ["jnNaznGI", "AADox/GI"], i: [1, 24, 19, 21], r: /[Nn][Aa]/},
    {k: "Vm",  v: ["jGMVKUQg", "ADVa1rWo"], i: [1, 24, 19, 23], r: /[Vv][Mm]/}, {k: "Co", v: ["AB0YQhFw", "AADoxjFw"], i: [1, 24, 19, 25], r: /co/},
    {k: "Go",  v: ["dGELxjNo", "AADoxjFw"], i: [1, 24, 20, 23], r: /Go/},       {k: "Zo", v: ["+EQiIRD4", "AADoxjFw"], i: [1, 24, 20, 24], r: /[Zz][Oo]/},
    {k: "atm", v: ["AB0TpjNo", "QjyEIQkw", "ADVa1rWo"], i: [1, 24, 21, 17], r: /a[Tt]m/}, {k: "Ans", v: ["IpUY/jGI", "AC2YxjGI", "AB0YODFw"], i: [27], r: /[Aa][Nn][Ss]/},
    //numbers
    {k: "0", v: ["dGMYxjFw"], i: [17], r: /0/},     {k: "1", v: ["IwhCEIRw"], i: [18], r: /[l1]/},
    {k: "2", v: ["dGIRERD4"], i: [19], r: /[Zz2]/}, {k: "3", v: ["dGITBjFw"], i: [20], r: /3/},
    {k: "4", v: ["EYylS+IQ"], i: [21], r: /4/},     {k: "5", v: ["/CHohDFw"], i: [22], r: /[Ss5]/},
    {k: "6", v: ["MiEPRjFw"], i: [23], r: /6/},     {k: "7", v: ["/EIhCIQg"], i: [24], r: /7/},
    {k: "8", v: ["dGMXRjFw"], i: [25], r: /8/},     {k: "9", v: ["dGMXhCJg"], i: [26], r: /9/},
    //special characters
    {k: "(", v: ["ERCEIQQQ"], i: [12], r: /\(/},   {k: ")", v: ["QQQhCERA"], i: [8], r: /\)/},
    {k: "-", v: ["AAAPgAAA"], i: [31], r: /-/},    {k: " ", v: ["AAAHAAAA"], i: [2], r: / /},
    {k: ":", v: ["AxgAMYAA"], i: [0, 13], r: /:/}, {k: ".", v: ["AAAAAAxg"], i: [28], r: /\./},
    {k: ",", v: ["AAAAMYRA"], i: [1, 8], r: /,/},  {k: "!", v: ["IQhCEAQg"], i: [1, 15], r: /!/},
    {k: "+", v: ["AAhPkIAA"], i: [30], r: /\+/},   {k: "=", v: ["AAHwfAAA"], i: [0, 14], r: /=/}
];

input.addEventListener("input", () => {generate(input.value, ctx)});
input.addEventListener("keydown", evt => {evt.keyCode == 13 ? generate(input.value, ctx) : false});

function generate(input, context) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    let regex = /a[Tt]m|[Aa][Nn][Ss]|m[pe]|[Mm][Nn]|re|[Nn][Aa]|[Vv][Mm]|[acG]o|[Zz][Oo]|[A-GLMOPRXYaeghiktu]|[a-gmoprxyAEGHIKTU]|[0-9]|[.,\-:!+=() ]|[SsZzl]/g;
    let matchedInput = input.match(regex);

    if (matchedInput !== null) {
        for (let match of matchedInput) {
            let longestMatch;
            for (let regex of dictionary) {
                if (match.match(regex.r) !== null && match.length <= regex.k.length)
                    longestMatch = regex;
            }

            if (findInDictionary(longestMatch.k, true)) {
                let word = findInDictionary(longestMatch.k, true);
                for (let l in word.k) {
                    drawCharacter(base64tobin([word.v[l]]), context);
                }
            } else if (findInDictionary(longestMatch.k)) {
                let word = findInDictionary(longestMatch.k);
                for (let l in word.k) {
                    drawCharacter(base64tobin(findInDictionary(longestMatch.k[l]).v), context);
                }
            }
        }
    }
    cursor[0] = tileSize;
}

//gets binary representation of the character and prints it, each character is 5x9 bits.
function drawCharacter(character, context) {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 5; x++) {
            if (character[y*5 + x] != "0")
                context.fillRect(cursor[0] + x * tileSize, cursor[1] + y * tileSize, tileSize, tileSize);
        }
    }
    cursor[0] += 6 * tileSize;
}

function findInDictionary(input, matchExactly = false) {
    let output;
    if (matchExactly) {
        //iterates through array and finds entry with the same key as input
        for (let i = 0; i < dictionary.length; i++) {
            output = dictionary.find(word => {return word.k == input});
        }
    } else {
        for (let word of dictionary) {
            if (input == word.k)
                output = dictionary.find(word => {return word.k == input});
            else if (input.toLowerCase() == word.k.toLowerCase())
                output = dictionary.find(word => {return word.k.toLowerCase() == input.toLowerCase()});
        }
    }
    return output;
}

//converts input from base64 to binary
function base64tobin(input) {
    let str = input.join("");
    let output = "";

    for (let l of str) {
        if (l.match(/[A-Z]/)) output += (l.charCodeAt()-65).toString(2).padStart(6, "0");
        if (l.match(/[a-z]/)) output += (l.charCodeAt()-71).toString(2).padStart(6, "0");
        if (l.match(/[0-9]/)) output += (l.charCodeAt()+ 4).toString(2).padStart(6, "0");
        if (l == "+") output += "111110";
        if (l == "/") output += "111111";
    }

    return output;
}


//DOM manipulation
const modal_bg = document.getElementsByClassName("modal-bg")[0];
document.getElementsByClassName("close-modal")[0].addEventListener("click", () => {
    modal_bg.style.display = "none";
});
document.getElementsByClassName("open-modal")[0].addEventListener("click", () => {
    modal_bg.style.display = "block";
});
modal_bg.addEventListener("click", evt => {
    if (evt.target.classList[0] == "modal-bg")
        modal_bg.style.display = "none";
});
window.addEventListener("keydown", evt => {
    if (evt.keyCode == 27)
        modal_bg.style.display = "none";
});

//TODO FINISH THIS
function generateLetters() {
    for (let i = 0; i < dictionary.length; i++) {
        let can = document.createElement("canvas");
        let con = can.getContext("2d");
        can.width = tileSize*19;
        can.height = tileSize*11;

        con.clearRect(0, 0, can.width, can.height);
        cursor[0] = tileSize;

        for (let l = 0; l < dictionary[i].v.length; l++) {
            let character = base64tobin([dictionary[i].value[l]]);
            drawCharacter(character, con);
        }

        //writes letters in modal
        let list = document.createElement("ul");
        list.classList.add("letter");
        list.appendChild(can);

        let input = document.createElement("div");
        list.appendChild(input);
        
        //shows how to write each letter
        for (let x of dictionary[i].i) {
            let canvas1 = document.createElement("canvas");
            let context1 = canvas1.getContext("2d");
            canvas1.width = 68; canvas1.height = 60;
            context1.drawImage(buttons, x*68, 0, 68, 60, 0, 0, 68, 60);
            input.appendChild(canvas1);
        }

        document.getElementsByClassName("modal")[0].appendChild(list);
    }
}

function drawLogo() {
    let con = document.getElementById("logo").getContext("2d");
    cursor[0] = tileSize;
    generate("CASIO CALCULATOR", con);
    cursor[0] += tileSize*3;
    cursor[1] += tileSize*11;
    generate("Letters Creator", con);
    cursor[1] = tileSize;
}
drawLogo();
