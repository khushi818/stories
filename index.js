import { Stories } from './utils.js'

let currentIndex = 0;
const storyElements = [];

function showStory(index) {
  if (index < 0 || index >= storyElements.length) return;

  storyElements.forEach((li) => {
    li.style.display ="none";
    li.style.opacity = "0";
    li.style.transition = "opacity 0.4s ease";
  });

  const current = storyElements[index];
  current.style.display = "block";

  
  requestAnimationFrame(() => {
    current.style.opacity = "1";
  });

  currentIndex = index;
}

function showNext() {
    if (currentIndex < Stories.length - 1) {
      showStory(currentIndex + 1);
    }
    else {
        showStory(0)
    }
  }

function showPrevious() {
    if (currentIndex > 0) {
      showStory(currentIndex - 1);
    }
    else {
        showStory(Stories.length -1)
    }
}


// after 5 sec it moves to new story
setInterval(()=>{
    if(currentIndex === (Stories.length - 1) ) {
        showStory(0)
    }
    else{
    showStory(currentIndex + 1)
    }
},5000)

document.addEventListener("DOMContentLoaded", () => {
    const StoryList = document.getElementById('story-list');

    Stories.forEach((src, index) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Story ${index + 1}`;
    img.loading = "lazy";
    img.className = `stories-${index+ 1}`;
    img.width = 1080;
    img.height = 1920;
    li.appendChild(img);
    li.style.display = "none";
    StoryList.appendChild(li);
    storyElements.push(li);
  });


    document.body.addEventListener("click", (e) => {
    const half = window.innerWidth / 2;
    if (e.clientX > half) {
      showNext();
    } else {
      showPrevious();
    }
  });

   document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrevious();
  });

  showStory(currentIndex, StoryList)
})

