var original = null;
var story = [];
var replacements = [];
var modified = null;

function pasteStory(){
  let storyBox = document.getElementById("storyInput");
  original = storyBox.value;
  storyBox.value = "";
  story = original.split(" ");
  let storyshow = document.getElementById("storyShow");
  // storyshow.innerText = story;
  modified = makeNumberedString(story);
  storyshow.innerHTML = modified;
  storyBox.style.display="none";
  //let Instructions =     document.getElementById("instructions");
  setLocalStorage();
  window.location.replace("changes.html");
  getLocalStorage();
  
}

function makeNumberedString(story){
  modified = "";
  for (let word = 0; word < story.length; word++){
    modified += story[word] + "<span>" + word + "</span> ";
  }
  return modified;
}

function nextPOS(){
  let Index = document.getElementById("index").value;
  let OrigWord = document.getElementById("origWord").value;
  let pOS = document.getElementById("POS").value;
  let metaWord = [Index, OrigWord, pOS];
  // Check if word matches before adding. 
  replacements.push(metaWord);
  localStorage.setItem('replacements', JSON.stringify(replacements));
  alert(replacements);
  modified = makeReplacedString();
  let storyshow = document.getElementById("storyShow");
  storyshow.innerHTML = modified;
}

function makeReplacedString(){
  modified = "";
  story = JSON.parse(localStorage.getItem("story"));
  replacements = JSON.parse(localStorage.getItem('replacements'));
  for (let w = 0; w < story.length; w++){
    replaced = false;
    for (let r = 0; r < replacements.length; r++) {
      if (replacements[r][0] == w){
        modified += "<strong>" + replacements[r][2] + "</strong><span>" + w + "</span> ";
        replaced = true;    
      }
    }
    if (replaced == false) {
      modified += story[w] + "<span>" + w + "</span> ";
    }
  }
  return modified;
}

function setLocalStorage() {
  localStorage.setItem('original', original);
  localStorage.setItem('story', JSON.stringify(story));
  localStorage.setItem('replacements', JSON.stringify(replacements));
}

function getLocalStorage(){
  original = localStorage.getItem('original');
  story = JSON.parse(localStorage.getItem("story"));
  replacements = JSON.parse(localStorage.getItem('replacements'));
}