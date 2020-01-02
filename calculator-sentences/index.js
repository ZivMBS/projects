const canvas=document.getElementById("canvas"),input=document.getElementsByTagName("input")[0],ctx=canvas.getContext("2d"),dimensions=[97,31],tileSize=canvas.clientWidth/dimensions[0],buttons=new Image;buttons.src="imgs/buttons.png";let cursor=[tileSize,tileSize];input.value="Type text here.",window.onload=(()=>{generate(input.value,ctx),generateLetters()});const dictionary=[{k:"A",v:["IpUY/jGI"],i:[0,2],r:/A/},{k:"B",v:["9GMfRjHw"],i:[0,3],r:/[Bb]/},{k:"C",v:["dGEIQhFw"],i:[0,4],r:/[Cc]/},{k:"D",v:["5KMYxjLg"],i:[0,5],r:/[Dd]/},{k:"E",v:["/CEPQhD4"],i:[0,6],r:/E/},{k:"F",v:["/CEPQhCA"],i:[0,7],r:/[Ff]/},{k:"G",v:["dGELxjNo"],i:[1,24,20,26],r:/G/},{k:"L",v:["AIRCIRD4"],i:[1,2],r:/L/},{k:"M",v:["jHe61jGI"],i:[0,10],r:/[Mm]/},{k:"O",v:["dGMYxjFw"],i:[17],r:/[Oo]/},{k:"P",v:["9nOfYxjA"],i:[1,29],r:/[Pp]/},{k:"R",v:["9GMfUlKI"],i:[1,24,19,24],r:/[Rr]/},{k:"X",v:["jFRCKVGI"],i:[0,8],r:/[Xx]/},{k:"Y",v:["jFSiEIQg"],i:[0,9],r:/[Yy]/},{k:"a",v:["ABNZSlZI"],i:[1,24,18,17],r:/a/},{k:"e",v:["AB0Y/hFw"],i:[1,24,19,20],r:/e/},{k:"g",v:["AB8YxeFw"],i:[1,24,20,22],r:/g/},{k:"h",v:["hCFsxjGI"],i:[1,24,17,23],r:/[Hh]/},{k:"i",v:["AwHGMYzw"],i:[1,11],r:/[Ii]/},{k:"k",v:["hCMqYpKI"],i:[1,24,19,22],r:/[Kk]/},{k:"t",v:["QjyEIQkw"],i:[1,24,20,25],r:/[Tt]/},{k:"u",v:["ACMYxjNo"],i:[1,24,18,24],r:/[Uu]/},{k:"mp",v:["ADVa1rWo","AAHox9CA"],i:[1,24,17,18],r:/mp/},{k:"mn",v:["ADVa1rWo","AAFsxjGI"],i:[1,24,17,19],r:/[Mm][Nn]/},{k:"me",v:["ADVa1rWo","AB0Y/hFw"],i:[1,24,17,20],r:/me/},{k:"ao",v:["AB0TpjNo","AADoxjFw"],i:[1,24,17,22],r:/ao/},{k:"re",v:["AC2YQhCA","AB0Y/hFw"],i:[1,24,18,18],r:/re/},{k:"NA",v:["jnNaznGI","AADox/GI"],i:[1,24,19,21],r:/[Nn][Aa]/},{k:"Vm",v:["jGMVKUQg","ADVa1rWo"],i:[1,24,19,23],r:/[Vv][Mm]/},{k:"Co",v:["AB0YQhFw","AADoxjFw"],i:[1,24,19,25],r:/co/},{k:"Go",v:["dGELxjNo","AADoxjFw"],i:[1,24,20,23],r:/Go/},{k:"Zo",v:["+EQiIRD4","AADoxjFw"],i:[1,24,20,24],r:/[Zz][Oo]/},{k:"atm",v:["AB0TpjNo","QjyEIQkw","ADVa1rWo"],i:[1,24,21,17],r:/a[Tt]m/},{k:"Ans",v:["IpUY/jGI","AC2YxjGI","AB0YODFw"],i:[27],r:/[Aa][Nn][Ss]/},{k:"0",v:["dGMYxjFw"],i:[17],r:/0/},{k:"1",v:["IwhCEIRw"],i:[18],r:/[l1]/},{k:"2",v:["dGIRERD4"],i:[19],r:/[Zz2]/},{k:"3",v:["dGITBjFw"],i:[20],r:/3/},{k:"4",v:["EYylS+IQ"],i:[21],r:/4/},{k:"5",v:["/CHohDFw"],i:[22],r:/[Ss5]/},{k:"6",v:["MiEPRjFw"],i:[23],r:/6/},{k:"7",v:["/EIhCIQg"],i:[24],r:/7/},{k:"8",v:["dGMXRjFw"],i:[25],r:/8/},{k:"9",v:["dGMXhCJg"],i:[26],r:/9/},{k:"(",v:["ERCEIQQQ"],i:[12],r:/\(/},{k:")",v:["QQQhCERA"],i:[8],r:/\)/},{k:"-",v:["AAAPgAAA"],i:[31],r:/-/},{k:" ",v:["AAAHAAAA"],i:[2],r:/ /},{k:":",v:["AxgAMYAA"],i:[0,13],r:/:/},{k:".",v:["AAAAAAxg"],i:[28],r:/\./},{k:",",v:["AAAAMYRA"],i:[1,8],r:/,/},{k:"!",v:["IQhCEAQg"],i:[1,15],r:/!/},{k:"+",v:["AAhPkIAA"],i:[30],r:/\+/},{k:"=",v:["AAHwfAAA"],i:[0,14],r:/=/}];function generate(e,t){ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);let i=e.match(/a[Tt]m|[Aa][Nn][Ss]|m[pe]|[Mm][Nn]|re|[Nn][Aa]|[Vv][Mm]|[acG]o|[Zz][Oo]|[A-GLMOPRXYaeghiktu]|[a-gmoprxyAEGHIKTU]|[0-9]|[.,\-:!+=() ]|[SsZzl]/g);if(null!==i)for(let e of i){let i;for(let t of dictionary)null!==e.match(t.r)&&e.length<=t.k.length&&(i=t);if(findInDictionary(i.k,!0)){let e=findInDictionary(i.k,!0);for(let i in e.k)drawCharacter(base64tobin([e.v[i]]),t)}else if(findInDictionary(i.k)){let e=findInDictionary(i.k);for(let r in e.k)drawCharacter(base64tobin(findInDictionary(i.k[r]).v),t)}}cursor[0]=tileSize}function drawCharacter(e,t){for(let i=0;i<9;i++)for(let r=0;r<5;r++)"0"!=e[5*i+r]&&t.fillRect(cursor[0]+r*tileSize,cursor[1]+i*tileSize,tileSize,tileSize);cursor[0]+=6*tileSize}function findInDictionary(e,t=!1){let i;if(t)for(let t=0;t<dictionary.length;t++)i=dictionary.find(t=>t.k==e);else for(let t of dictionary)e==t.k?i=dictionary.find(t=>t.k==e):e.toLowerCase()==t.k.toLowerCase()&&(i=dictionary.find(t=>t.k.toLowerCase()==e.toLowerCase()));return i}function base64tobin(e){let t=e.join(""),i="";for(let e of t)e.match(/[A-Z]/)&&(i+=(e.charCodeAt()-65).toString(2).padStart(6,"0")),e.match(/[a-z]/)&&(i+=(e.charCodeAt()-71).toString(2).padStart(6,"0")),e.match(/[0-9]/)&&(i+=(e.charCodeAt()+4).toString(2).padStart(6,"0")),"+"==e&&(i+="111110"),"/"==e&&(i+="111111");return i}input.addEventListener("input",()=>{generate(input.value,ctx)}),input.addEventListener("keydown",e=>{13==e.keyCode&&generate(input.value,ctx)});const modal_bg=document.getElementsByClassName("modal-bg")[0];function generateLetters(){let e=document.createElement("canvas"),t=e.getContext("2d");e.width=19*tileSize,e.height=11*tileSize;for(let i=0;i<dictionary.length;i++){t.clearRect(0,0,e.width,e.height),cursor[0]=tileSize;for(let e=0;e<dictionary[i].v.length;e++){drawCharacter(base64tobin([dictionary[i].v[e]]),t)}let r=document.createElement("ul");r.classList.add("letter");let n=new Image;n.src=e.toDataURL(),r.appendChild(n);let o=document.createElement("div");r.appendChild(o);for(let e of dictionary[i].i){let t=document.createElement("canvas"),i=t.getContext("2d");t.width=68,t.height=60,i.drawImage(buttons,68*e,0,68,60,0,0,68,60),o.appendChild(t)}document.getElementsByClassName("modal")[0].appendChild(r)}for(let e=0;e<dictionary.length;e++);}function drawLogo(){let e=document.getElementById("logo").getContext("2d");cursor[0]=tileSize,generate("CASIO CALCULATOR",e),cursor[0]+=3*tileSize,cursor[1]+=11*tileSize,generate("Letters Creator",e),cursor[1]=tileSize}document.getElementsByClassName("close-modal")[0].addEventListener("click",()=>{modal_bg.style.display="none"}),document.getElementsByClassName("open-modal")[0].addEventListener("click",()=>{modal_bg.style.display="block"}),modal_bg.addEventListener("click",e=>{"modal-bg"==e.target.classList[0]&&(modal_bg.style.display="none")}),window.addEventListener("keydown",e=>{27==e.keyCode&&(modal_bg.style.display="none")}),drawLogo();
