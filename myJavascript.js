/*navigator.clipboard.readText().then(
    clipText => document.querySelector(".editor").innerText += clipText);*/
let keyArr = [13 ,16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45, 46, 91, 92, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145, 181, 182, 183, 116, 91]
let buff=[];
let undoarr = [];
let wasspace = false;
const textArea = document.getElementById("textArea");
function isLetter(num) {
    result = false;
    for(let i = 0; i < keyArr.length; i++) {
        if(keyArr[i] == num){
            result = false;
            console.log(num);
            break;
        }else{
            result = true;
        }
    }
    return result;
}
document.addEventListener('keydown',logkey);
textArea.innerHTML = "_";
function logkey(e){
    /*textArea.textContent += e.key;*/
    let text = "";
    if(e.keyCode == 32 /*&& e.target == document.body*/) {
        e.preventDefault();
    }
    if(e.keyCode == 32){
        text = textArea.innerHTML;
        text = text.slice(0,-1);
        textArea.innerHTML = text;
        if(wasspace == true){
            text = "&nbsp_";
            wasspace=true;
            textArea.innerHTML +=text;
        }else{
            text = " _"
            wasspace=true;
            textArea.innerHTML +=text;
        }
        undoarr.push("space");
    }
    else if(e.keyCode == 9 /*&&e.target == document.body*/) {
        e.preventDefault();
        text = "&nbsp&nbsp&nbsp&nbsp";
        wasspace=true;
        textArea.innerHTML +=text;
        for(let i=0; i<4; i++){
            undoarr.push("space");
        }
    }else if(e.keyCode == 8){
        text = textArea.innerHTML;
        wasspace=false;
        console.log(text.substring(text.length-6))
        if(text.substring(text.length-6) == "&nbsp;"){
            undoarr.push(text.substring(text.length-6,))
            text=text.slice(0,-6);
            text+="_"
            textArea.innerHTML = text;
            console.log(text);
        }else if(text.substring(text.length-7) == "&nbsp;_"){
            undoarr.push(text.substring(text.length-7,text.length-1))
            text=text.slice(0, -7);
            text+="_";
            textArea.innerHTML = text;
        }
        else{
            if(text.substring(text.length-2,text.length-1) != ""){
                undoarr.push(text.substring(text.length-2,text.length-1))
            }
            text = text.slice(0,-2);
            text+="_"
            textArea.innerHTML =text;
        }
        console.log(undoarr);
    }
    else if(isLetter(e.keyCode)){
        if(e.keyCode == 222 || e.keyCode == 191){
            e.preventDefault()
        }
        undoarr.push("write");
        buff.push(e.key + "_")
        text = textArea.innerHTML; 
        text=text.slice(0,-1);
        textArea.innerHTML = text + buff.shift();
        wasspace=false;
    }
    //console.log(textArea.innerHTML);
    if(undoarr.length==20){
        undoarr.shift();
    }
}

function undo(){
    let text1 = undoarr.pop();
    if(text1 == "write" || text1 == "space"){
        let text = textArea.innerHTML;
        if(text.substring(text.length-6) == "&nbsp;"){
            text=text.slice(0,-6);
            text+="_"
            textArea.innerHTML = text;
            console.log(text);
        }else if(text.substring(text.length-7) == "&nbsp;_"){
            text=text.slice(0, -7);
            text+="_";
            textArea.innerHTML = text;
        }
        else{
            text = text.slice(0,-2);
            text+="_"
            textArea.innerHTML =text;
        }
        console.log(undoarr);
    }else if(text1 == undefined){

    }else{
        let text = textArea.innerHTML; 
        text=text.slice(0,-1);
        textArea.innerHTML = text + text1;
        console.log(undoarr);
    }
}