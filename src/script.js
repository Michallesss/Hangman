const alphabet=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let word = prompt("Podaj słowo albo zdanie:","");
//let word="test data";
word=word.toUpperCase();
let hashedword=hash(word);
let how_many_lost=0; //how many not founded letters

let yes=new Audio("sounds/yes.mp3");
let no=new Audio("sounds/no.mp3");
let win=new Audio("sounds/win.mp3");
let lose=new Audio("sounds/lose.mp3");

function hash(word) {
    let hashed="";
    for(i=0; i<word.length; i++) {
        if(word.charAt(i)==" ") { //js jest zje any i nie mozna po prostu word[i] albo trzeba uzyc split() zaby mozna bylo odwolywac sie do indexow
            hashed=hashed+" ";
        }
        else {
            hashed=hashed+"_";
        }
    }
    return hashed;
}

String.prototype.SetChar=function(location, char) {
    if(location > this.length-1) {
        return this.toString();
    }
    else {
        return this.substr(0, location) + char + this.substr(location+1);
    }
}

function check(nr) {
    let founded=false;

    for(i=0; i<word.length; i++) {
        if(word.charAt(i)==alphabet[nr]) {
            hashedword=hashedword.SetChar(i, alphabet[nr]);
            //coutword();
            founded=true;
        }
    }

    if(founded) {
        let element="nr"+nr;
        document.getElementById(element).style.background="#003300";
        document.getElementById(element).style.cursor="not-allowed";
        document.getElementById(element).onclick="";
        yes.play();

        coutword();
    }
    else {
        let element="nr"+nr;
        document.getElementById(element).style.background="#330000";
        document.getElementById(element).style.cursor="not-allowed";
        document.getElementById(element).onclick="";
        no.play();

        how_many_lost++;
        if(how_many_lost<9) {
            document.getElementById("gallows").innerHTML="<img src='imgs/s"+how_many_lost+".jpg' alt='szubienica'>"; 
        }
        else {
            //lose
            document.getElementById("alphabet").innerHTML="You Lose<br> <span class='reset' onclick='location.reload()'>Play again</span>";
            document.getElementById("gallows").innerHTML="<img src='imgs/s"+how_many_lost+".jpg' alt='szubienica'>";
            lose.play();
        }
    }

    //win
    if(hashedword==word) {
        document.getElementById("alphabet").innerHTML="You Won!!<br> <span class='reset' onclick='location.reload()'>Play again</span>";
        win.play();
    }
}

function coutword() {
    document.getElementById("board").innerHTML=hashedword;
    console.log("Hashed word: "+hashedword+".");
    console.log("Orginal word: "+word+" .");
}

window.onload=function start() { //couting alphabet buttons
    let content="";
    for(i=0; i<=25; i++) {
        content=content+"<div class='letter' id='nr"+i+"' onclick='check("+i+");'>"+alphabet[i]+"</div>";
    }
    document.getElementById("alphabet").innerHTML=content;

    coutword();
}