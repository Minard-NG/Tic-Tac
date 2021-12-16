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
- CSS Grid
- Mobile-first workflow
- Git and GitHub

### What I learnt

I have been reading up a couple of articles/books on the importance of semantic HTML and the very many benefits it offers, accessibility being one of major benefits. So currently I try as much to give my HTML structure enough semantic as much as I possibly can; that involves me always asking myself which HTML tag would best semantically convey the importance of every section on the webpage, while ensuring I use alt attributes for images and try to ensure the document flow is in other. Hey yo, I'm probably not yet a 100% complaint but I believe I would keep getting better as I remain more conscious of it. For this project, here is a top-level break down of the semantic layout.

```html
<header>Contains the page's header message</header>
<main>All the awesome timer stuff went in here</main>
<footer>Contains the social media links</footer>
```

The laying out of the page's background was an interesting learning process for me. It provided a good use case for me to implement the ::before and ::after CSS pseudo-selector. I used the ::before to layout the stars svg on the background while the ::after, I used to layout the hills svg on the background. It was really helpful in providing some level of structure without affecting the markup of the document. The background of the page used a linear gradient that flowed between two colors from top to bottom.

The entire page was layed out using the CSS3 grid display property. I have just learnt about CSS grid a couple of weeks ago and decided to test it out with this project, I used 3 rows / 1 column template. It did provide a neat control of the page's flow without much media queries. I'm still trying to wrap my heads around some of the custom units it provides such as: fit-content, auto-fill, minmax() etc. and its use-cases.

#### Code Snippet for the grid:

```css
.grid {
  //other styles
  display: grid;
  grid-template: 0.3fr minmax(6.25rem, 0.2fr) 0.5fr / 1fr;
}
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

The timer section of the web page was also another key section to implement CSS grid. I used 1 row / 4 columns template and the grid gap property and other alignment properties for the implementation. The header section and footer were good candidates for flexbox.

#### Code snippet for the timer grid:

```css
main {
  //other styles
  display: grid;
  grid-template: 3fr 1fr / repeat(4, 72px);
  justify-content: center;
  align-items: end;
  gap: 0.9375rem;
}
```

One key concept I experimented while developing this project was the mobile first approach, where I build for smaller devices and implement media queries to enhance the layout/features as for larger devices. I found it very helpful.

The curve on the cards presented an interesting learning opportunity. It caused me to research if CSS3 had a negative border radius property, which I found it didn't, so I did come up with an interesting work around. I created pseudo-elements for the upper section of each timer card and positioned them relative to the timer cards. Gave them equal width and height plus a border-radius of 50% to make them a circle. Applied a background-color to the pseudo-elements that blends nicely with backgound and then used the top, left, right CSS property to position the circle such that the circle overlaps neatly on the timer card while the other half blends into the background. Also applied a z-index property to give it a nice visual overlapping perspective.

#### Code snippets

```css
.upper::before {
  content: "";
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: hsl(235, 16%, 14%);
  border-radius: 50%;
  position: absolute;
  top: 46%;
  left: -2%;
}
.upper::after {
  content: "";
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: hsl(235, 16%, 14%);
  border-radius: 50%;
  position: absolute;
  top: 46%;
  right: -2%;
  z-index: 99;
}
```

Plugging in the Javascript code for the timer was really exciting. I learnt about JS date and time functions, functional programming and closure. I also learnt this little hack where you can use the slice function to easily implement a leading zero for your timer. 

#### Code Snippet showing closure and slice hack

```js
function initializeTime(endTime){

    function updateCounter(){
        let counterData = getRemainingTime(endTime);

        daySpan.innerText = ('0'+ counterData.days).slice(-2);
        hourSpan.innerText = ('0' + counterData.hours).slice(-2);
        minuteSpan.innerText = ('0' + counterData.minutes).slice(-2);
        secondSpan.innerText = ('0' + counterData.seconds).slice(-2);

        if (counterData.distance <= 0){
            clearInterval(timeInterval)
        }
    }
    updateCounter();
    let timeInterval = setInterval(updateCounter, 1000);
}
```

### Continued development

Would continue to learn more about CSS3 grid and improve my knowledge of algorithms. 

### Useful resources

- [Countdown Timer](https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/) - This is an amazing aritcle which helped me understand the JS date and time function, I love their functional programming style too.
- [Negative Border Radius in CSS?](https://stackoverflow.com/questions/45339986/negative-border-radius-in-css/45340988) - This stackoverflow question and answer was useful in helping me figure out the implementation of the curve around the cards.
- [Mozilla Docs | @font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) - Amazing documentation on MDN web docs to get you started adding custon fonts on your web pages.
- [How to change the color of an svg element?](https://stackoverflow.com/questions/22252472/how-to-change-the-color-of-an-svg-element) - Helped me figure out how to change the color of svg on hover state.
- [A useful CSS filter generator](https://codepen.io/sosuke/pen/Pjoqqp) - A cool filter generator program on codepen.io

## Author

- Frontend Mentor - [@Minard-NG](https://www.frontendmentor.io/profile/Minard-NG)
- LinkedIn - [Michael Nwankwo](https://www.linkedin.com/in/michael-nwankwo/)

## Acknowledgments

I would really love to appreciate and make a special shout to Jessica Chan, owner of the blog [coder-coder.com](https://coder-coder.com/) and youtube channel [Coder Coder](https://www.youtube.com/c/TheCoderCoder). Her useful contents, got me trying out this challenge on frontend mentors. I also really appreciate the amazing team behind frontend mentors, I'd totally recommend their platform to anyone trying to build capacity in frontend programming.
