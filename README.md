# Ticky Tacky - Design Preview

![Design preview for the Launch countdown timer coding challenge](./design/design-preview.png)

This repo provides my implementation of the classic tic tac toe game. Tic-tac-toe, noughts and crosses, or Xs and Os is a paper-and-pencil game for two players who take turns marking the spaces in a three-by-three grid with X or O. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot on mobile](#screenshot-on-mobile)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learnt](#what-i-learnt)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Interact with a three by three grid, in such a way that conforms to the rules of the tic tac toe game.
- Keep track of game scores, even after shutting down the browser.
- **Bonus**: Introduce interactive media elements to make the game more engaging

### Screenshot on Mobile

![Screenshots](./design/mobile-preview.png)

### Links

- Solution URL: [Github](https://github.com/Minard-NG/Tic-Tac/blob/main/index.html)
- Live Site URL: [Hosted with Netlify](https://tickytacky.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS3
- JavaScript
- Flexbox
- Mobile-first workflow
- Git and GitHub

### What I learnt

The high level markup for this project is fairly simple.  

```html
<html>
  <head>
  </head>
  <body>
    <div id='overlay'>
      <div id="confirm_modal">
        Used to create the web structure for the custom game onboarding modal
      </div>
    </div>
    <header>Contains the page's header information</header>
    <main>All the awesome game buttons went in here</main>
    <footer>Contains the reset button</footer>
  </body>
</html>
```

Using google fonts to add custom fonts for my web projects has been a defacto for me. So I had tried accessing the google fonts website to add custom fonts while developing this project, but all the time I tried, the site would not open on my device. Still researching what the issue is, but in the mean time, I decided to implement the custom 'Red Hat' font, used for this project by dowloading it from font squirrel and using the @font-face selector. It provided a good work around but I noticed some lag whenever the page loads when I deployed it.

#### Code snippet for custom font:

```css
@font-face {
  font-family: "Red Hat";
  src: url("/font/red-hat/RedHatDisplay-Bold.otf") format("opentype");
  font-weight: 700;
  font-style: normal;
}
```

The game flow logic, an onclick event handler is binded to every game button. The helps to check if the button has been clicked before. If not, it updates the innerText of the button accordingly.

```js
let currentPlayer = 'X'; //Player X starts the game

function play(evt){
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
            currentPlayer = 'O';
        } else {
            currentPlayer = 'X';
        }

}
```

For the game logic, I implemented a pretty naive brute-force algorithm, were I fetch all the game buttons and continuously check if a winning position has been attained whenever a player makes a valid click. This algorithm helped checked for win and lose cases but for a deuce case, things get a little different. I check for a condition where no player has won the game and all the space on the 3 x 3 grid is filled. The commentary in the header is also updated dynamically as the game is played.

#### Code snippet for win case:

```js
function checkWin() {
    const btn1 = document.getElementById('btn1').innerText;
    const btn2 = document.getElementById('btn2').innerText;
    const btn3 = document.getElementById('btn3').innerText;
  //and so on

    //check for win state 1,2,3
    if ((btn1 === 'X' && btn2 === 'X' && btn3 === 'X') || (btn1 === 'O' && btn2 === 'O' && btn3 === 'O')) {
        return true;
    }
//and so on
}
```

#### Code snippet for deuce case:

```js
function play(){ //event handler binded to the game buttons

    //start with a deuce status of true
    let deuceStatus = true;

    //check for if a win condition was met
    winStatus = checkWin()

    //check if the 3 x 3 grid is filled
        btnList.forEach(function (btn) {
            if (btn.innerText === '') {
                deuceStatus = false;
            }
        });

    //if 3 x 3 grid is filled and no player has won then perform the action for a deuce
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
```

Developing the interactive harmburger presented an interesting opportunity to do some CSS3 animation which is something I trying to learn more about and also do some DOM manipulation. The key concept was to style three spans to have the harmburger-button shape and on click the first and third span rotates a certain amount of degrees to form a cross while the second span loses visibility. Here is my approach: 

### Code Snippet showing the html structure for the harmburger-button
```html
  <div id="ctBtn" class="controls">
      <div id="hmBtn" class="harmburger--show">
          <span></span><span></span><span></span>
      </div>
      <i class="fas fa-volume-up" title="click to mute background music"></i>
  </div>
```

### Code Snippet Showing the CSS Styles

```css
.controls {
  position: absolute;
  right: 0px;
  top: 1.15rem;
  width: 1.775rem;
  height: 1.4375rem;
  font-size: 1.875rem;
   overflow-y: hidden;
  
}
.controls:hover{
    cursor: pointer;
}
.ct--animate{
    animation: ctanime 200ms linear forwards;
}
.controls .fas{
    padding-top: 1.25rem;
    font-size: 1.4rem;
}
@keyframes ctanime{
    from{
        height: 1.875rem;
    }
    to{
        height: 4.6875rem;      
    }
}
.harmburger--show span,
.harmburger--toggle span {
  display: block;
  width: 1.625rem;
  height: 0.125rem;
  border-bottom: 0.1875rem solid white;
}
.harmburger--show span:not(:last-child) {
  margin-bottom: 0.25rem;
}
.harmburger--show span:nth-child(1) {
  animation: fade-out-1 200ms ease-in-out forwards;
}
.harmburger--show span:nth-child(2) {
  animation: fade-out-2 200ms ease-in-out forwards;
}
.harmburger--show span:nth-child(3) {
  animation: fade-out-3 200ms ease-in-out forwards;
}
.harmburger--toggle span:nth-child(1) {
  animation: fade-in-1 200ms ease-in-out forwards;
}
.harmburger--toggle span:nth-child(2) {
  animation: fade-in-2 200ms ease-in-out forwards;
}
.harmburger--toggle span:nth-child(3) {
  animation: fade-in-3 200ms ease-in-out forwards;
}
@keyframes fade-out-1 {
  from {
    margin-top:11px;
    transform: rotate(45deg);
    transform-origin: 40% 0%;
  }
  to {
    margin-top: 0;
    transform: rotate(0deg);
    transform-origin: center;
  }
}

@keyframes fade-out-2 {
    from {
        opacity: 0;
        visibility: hidden;
    }
    to {
        opacity: 1;
        visibility: visible;
    }
  }

@keyframes fade-out-3 {
  from {
    transform: rotate(-45deg);
    transform-origin: 18% 70%;
  }
  to {
    transform: rotate(0deg);
    transform-origin: center;
  }
}

@keyframes fade-in-1 {
  to {
    margin-top:11px;
    transform: rotate(45deg);
    transform-origin: 40% 0%;
  }
}

@keyframes fade-in-2 {
  to {
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes fade-in-3 {
  to {
    transform: rotate(-45deg);
    transform-origin: 18% 70%;
  }
}
```

### Code Snippet for the JS that toggles the classList appropriately.

```js
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
```

To keep track of the player's scores such that game scores are preserved in memory, even when the player closes the browser, I had to utilize the localStorage api. First I check if the localStorage api is supported on the player's browser. If so, I check if there is an existing score variable before creating a new one.  This ensures that the data stored in the localStorage is preserved whenever the player refreshes the page, which would reload the script and potentially overwrite the previous score varible if the check is not performed.

### Code Snippet

```js
//fetch span with score info
let Xscore = document.getElementById('Xscore');
let Oscore = document.getElementById('Oscore');

//Using localStorage to keep track of the score

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
```

Whenever a win case is met, I check for the currentPlayer and update the scores in localStorage accordingly (__by first fetching the value of the respective player's score from localStorage, converting it to Number type and adding 1 to it, then reassigning the player's score in localStorage the updated value__).

```js
if(winStatus===true){
  //other codes, doing other awesome stuffs
  if (temp === 'X') {
    up_score = Number(localStorage.x ) + 1;
    localStorage.setItem('x',up_score) ;
    Xscore.innerText = localStorage.getItem('x');
    } else {
      up_score = Number(localStorage.o ) + 1;
      localStorage.setItem('o',up_score) ;
      Oscore.innerText = localStorage.getItem('o');
    }
}
```

Engaging sound effects where added to the project using the html audio element. utilizing the htmlmedia api which provides play(), pause(), vloume, loop etc functionalities.

 The mobile first approach, was utilized while developing this project; where I build for smaller devices and implement media queries to enhance the layout/features for larger devices. I found it very helpful.



### Continued development

Would continue to learn more about CSS3 animations and improve my knowledge of algorithms. 

### Useful resources

- [Mixit | SoundEffects](https://mixkit.co/) - Really found this website helpful in getting the the free sound effects for the game.

## Author

- Frontend Mentor - [@Minard-NG](https://www.frontendmentor.io/profile/Minard-NG)
- LinkedIn - [Michael Nwankwo](https://www.linkedin.com/in/michael-nwankwo/)

## Acknowledgments

Special thanks to my frontend tutor, Mr Qazeem for tasking me with this project and providing helpful hints when I hit roadblocks.