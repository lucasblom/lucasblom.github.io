document.addEventListener("DOMContentLoaded", () => {
  scramble(document.querySelector("h3"));
});

/*Scrambles Name in NavBar*/
const scramble = (element) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  document.querySelector("h3").onmouseover = (event) => {
    let iterations = 0;

    const interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iterations) {
            return event.target.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
      if (iterations >= event.target.dataset.value.length) {
        clearInterval(interval);
      }
      iterations += 1 / 5;
    }, 30);
  };
};


/* Mouse Trailer */
const tailer = document.getElementById("trailer");
/* Switches trailer icon depending on type of interactible object */
const getTrailerClass = type => {
  switch(type) {
    default:
      return "fa-solid fa-arrow-up-right-from-square";
    case "video":
      return "fa-solid fa-play";
    case "nav-title":
      return "fa-solid fa-arrow-pointer";
    case "switch":
      return "fa-solid fa-repeat";
    case "mail":
      return "fa-regular fa-envelope";
    case "phone":
      return "fa-solid fa-phone";
    case "github":
      return "fa-brands fa-github";
    case "codepen":
      return "fa-brands fa-codepen";
  }
}
  /* Tracking Mousemovement and centering trailer */
const animateTrailer = (e, interacting) => {
    const x = e.clientX - trailer.offsetWidth / 2,
        y = e.clientY - trailer.offsetHeight /2;
  
  /* If mouse hist animatible object trailersize increases by 4x */
  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 4:1})`
  }

  /* 
      Makes the mousetrailer lag behing
      fill: forwards in used because if left you the mouse will return to 0,0 when animation is done
      fill forwards prevents this action
   */
  trailer.animate(keyframes, {
    duration: 800,
    fill: "forwards"
  });
}

window.onmousemove = e => {
  /* resets mousetrailer to empty if not on interactible object*/
  const interactible = e.target.closest(".interactible"),
        interacting = interactible !== null;
  
  const icon = document.getElementById("trailer-icon");
  
  /* calls animateTrailer function */
  animateTrailer(e, interacting);
  
  /* depending on the type of interactible object the trailer will change */
  trailer.dataset.type = interacting ? interactible.dataset.type : "";
  if(interacting) {
    icon.className = getTrailerClass(interactible.dataset.type);
  }
}

/* Switching Themes */
/* TODO */
