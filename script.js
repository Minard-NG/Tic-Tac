//fetch all game button
let btnList = document.querySelectorAll('.gameBtn')

//loop through and bind an event handler for click
btnList.forEach(function (btn) {
    btn.addEventListener('click', play);
});

/**************  Sound effect scripting *********************/

//fetch audio element for game background music
//and set the background music defaults
let back_music = document.querySelector('#bck--music');
// back_music.play();
back_music.volume = 0.33;
back_music.loop = true;

//fetch audio elements for player specific sound effects
let playerX_sound = document.querySelector('#playerx--music');
let playerO_sound = document.querySelector('#playero--music');

//fetch audio element for win/deuce/reset/notification sound effects
let notif_sound = document.querySelector('#notif--music');
let win_sound = document.querySelector('#win--music');
let deuce_sound = document.querySelector('#deuce--music');
let reset_sound = document.querySelector('#reset--music');


/**
harmburger toggling  animation and sound scripting
 */

let hmBtn = document.querySelector('#hmBtn');
let ctBtn = document.getElementById('ctBtn')

hmBtn.addEventListener('click', function(){
    notif_sound.play()
    if(hmBtn.classList.contains('harmburger--toggle')){
        hmBtn.classList.add('harmburger--show')
        hmBtn.classList.remove('harmburger--toggle')
        ctBtn.classList.remove('ct--animate')
       
    }else{
        hmBtn.classList.remove('harmburger--show')
        hmBtn.classList.add('harmburger--toggle')
        ctBtn.classList.add('ct--animate')
        
    }
});

//user access controls for background music
volBtn = document.querySelector('.fas');

volBtn.addEventListener('click', function(){

    if(volBtn.classList.contains('fa-volume-up')){
        volBtn.classList.remove('fa-volume-up');
        volBtn.classList.add('fa-volume-mute');
        volBtn.title = "click to ummute background music"
        back_music.pause();
    }else{
        notif_sound.play()
        volBtn.classList.add('fa-volume-up');
        volBtn.classList.remove('fa-volume-mute');
        volBtn.title = "click to mute background music"
        back_music.play();
    }
})




//fetch reset button
let resetBtn = document.getElementById('resetBtn');

//fetch small tag in the document
let commentary = document.querySelector('#commentary');

//fetch span with score info
let Xscore = document.getElementById('Xscore');
let Oscore = document.getElementById('Oscore')

//Using Localstorage to keep track of the score

if(typeof(Storage !== undefined)){
    if(!localStorage.x){
        localStorage.x = '0';
    }
    if(!localStorage.o){
        localStorage.o = '0';
    }
    Xscore.innerText=localStorage.x;
    Oscore.innerText = localStorage.o;

}else{
    commentary.innerText = "Browser does not support client-side storage to keep track of scores";
}


//bind an event handler to it
resetBtn.addEventListener('click', resetB)

//Variables to manage the state of game
let currentPlayer = 'X';
let winStatus = false;
// let deuceStatus = true;

//this function handles the game flow
function play(evt) {

    //this variable manages the duece state for the game
    let deuceStatus = true;

    //this check ensures the button triggering the click event
    //has not been clicked before
    if (!evt.target.innerText) {
        //update the innerText of the button clicked
        evt.target.innerText = currentPlayer;
         
        let temp = currentPlayer;

        //toggle the currentPlayer state
        if (currentPlayer === 'X') {
            playerX_sound.play();
            currentPlayer = 'O';
        } else {
            playerO_sound.play();
            currentPlayer = 'X';
        }

        //check for if a win condition was met
        winStatus = checkWin()

        //check for a deuce status
        btnList.forEach(function (btn) {
            if (btn.innerText === '') {
                deuceStatus = false;
            }
        });

        //update players score 
        let up_score;
        if (winStatus) {
            commentary.innerText = `Epic play! Player ${temp} won the last round`;
            win_sound.play();
            if (temp === 'X') {
                up_score = Number(localStorage.x ) + 1;
                localStorage.setItem('x',up_score) ;
                Xscore.innerText = localStorage.getItem('x');
            } else {
                up_score = Number(localStorage.o ) + 1;
                localStorage.setItem('o',up_score) ;
                Oscore.innerText = localStorage.getItem('o');
            }

            //reset the game board without resetting the players score
            setTimeout(function () {
                currentPlayer = 'X';
                btnList.forEach(function (btn) {
                    btn.innerText = '';
                })
            }, 600)
        }
       //reset the game board without resetting the players score
        if (deuceStatus && !winStatus) {
            commentary.innerText = `No lucky champ! It's a Deuce!`;
            deuce_sound.play();
            setTimeout(function () {
                currentPlayer = 'X';
                btnList.forEach(function (btn) {
                    btn.innerText = '';
                })
            }, 600)
        }


    }
}

//this function hides the onboarding modal to start the game
function hideModal(){
    let overlay = document.getElementById('overlay');

    overlay.classList.add('confirm_modal_anime');
    back_music.play();
}


//this function resets the game to initial state
function resetB() {
    //initialize player to X 
    currentPlayer = 'X';
    btnList.forEach(function (btn) {
        btn.innerText = '';
    })
    commentary.innerText = '';
    localStorage.setItem('x', '0');
    localStorage.setItem('o', '0');
    Xscore.innerText = localStorage.x;
    Oscore.innerText = localStorage.o;
    reset_sound.play()
}


//this function handles the winning logic for the game
function checkWin() {
    const btn1 = document.getElementById('btn1').innerText;
    const btn2 = document.getElementById('btn2').innerText;
    const btn3 = document.getElementById('btn3').innerText;
    const btn4 = document.getElementById('btn4').innerText;
    const btn5 = document.getElementById('btn5').innerText;
    const btn6 = document.getElementById('btn6').innerText;
    const btn7 = document.getElementById('btn7').innerText;
    const btn8 = document.getElementById('btn8').innerText;
    const btn9 = document.getElementById('btn9').innerText;

    //check for win state 1,2,3
    if ((btn1 === 'X' && btn2 === 'X' && btn3 === 'X') || (btn1 === 'O' && btn2 === 'O' && btn3 === 'O')) {
        return true;
    }
    //check for win state 4,5,6
    if ((btn4 === 'X' && btn5 === 'X' && btn6 === 'X') || (btn4 === 'O' && btn5 === 'O' && btn6 === 'O')) {
        return true;
    }
    //check for win state 7,8,9
    if ((btn7 === 'X' && btn8 === 'X' && btn9 === 'X') || (btn7 === 'O' && btn8 === 'O' && btn9 === 'O')) {
        return true;
    }
    //check for win state 1,4,7
    if ((btn1 === 'X' && btn4 === 'X' && btn7 === 'X') || (btn1 === 'O' && btn4 === 'O' && btn7 === 'O')) {
        return true;
    }
    //check for win state 2,5,8
    if ((btn2 === 'X' && btn5 === 'X' && btn8 === 'X') || (btn2 === 'O' && btn5 === 'O' && btn8 === 'O')) {
        return true;
    }
    //check for win state 3,6,9
    if ((btn3 === 'X' && btn6 === 'X' && btn9 === 'X') || (btn3 === 'O' && btn6 === 'O' && btn9 === 'O')) {
        return true;
    }
    //check for win state 1,5,9
    if ((btn1 === 'X' && btn5 === 'X' && btn9 === 'X') || (btn1 === 'O' && btn5 === 'O' && btn9 === 'O')) {
        return true;
    }
    //check for win state 3,5,7
    if ((btn3 === 'X' && btn5 === 'X' && btn7 === 'X') || (btn3 === 'O' && btn5 === 'O' && btn7 === 'O')) {
        return true;
    }
    return false;
}