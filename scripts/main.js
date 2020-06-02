function selectMenu(eventType,x) {
  const lastBtn = document.getElementsByClassName("selected")[0];
  switch (eventType) {
    case "click":
      if (lastBtn.getAttribute('class').split(" ")[1] == "clicked" ||
          lastBtn.getAttribute('class').split(" ")[2] == "clicked") {
        closeMenu(x.children[1].children[0],x);
        window.pass = true;
        window.overedBtn = "clicked";
      } else {
        x.classList.add('clicked');
        window.overedBtn = "clicked";
        window.pass = false;
        x.children[1].children[0].classList.remove('nonVisible');
      }
      break;
    case "over":
      window.overedBtn = [x,lastBtn];
      window.pass = false;
      if (lastBtn != x) {
        if(lastBtn.getAttribute('class').split(" ")[1] == "clicked" ||
           lastBtn.getAttribute('class').split(" ")[2] == "clicked") {
            lastBtn.classList.remove('clicked');
            lastBtn.children[1].children[0].classList.add('nonVisible');
        }
      }
      break;
    default:
      if(window.overedBtn != "clicked") {
        if(x.getAttribute('class').split(" ")[1] != "clicked" &&
           x.getAttribute('class').split(" ")[2] != "clicked") {
          window.overedBtn[0].children[1].classList.remove('visible');
        }
        window.overedBtn[0].classList.remove('selected');
        window.overedBtn[1].classList.add('selected');
      }
      break;
    }
    if (eventType != "out" && window.pass == false) {
      lastBtn.children[1].classList.remove('visible');
      lastBtn.classList.remove('selected');
      x.children[1].classList.add('visible');
      x.classList.add('selected');
  }
}

function gamePadAnimation(eventType,x) {
  switch (eventType) {
    case "over":
      x.classList.add("versionSelected");
      break;
    case "out":
      x.classList.remove("versionSelected");
      break;
    default:
  }
}

function closeMenu(x,navButton){
  navButton.classList.remove('clicked');
  x.classList.add('nonVisible');
  navButton.children[1].classList.remove('visible');
}

function linkClick(link) {
  let version = link.getAttribute("id");
  if( version != null) {
    headerSpan.innerHTML =' ' + version;
  }
}

function gamePadFonc() {
  
}

const headerSpan = document.getElementById("headerVersion");
const navButtons = document.getElementsByClassName("dropbox");
for (let navButton of navButtons) {
  if (navButton.getAttribute('id') != 'gamePad') {
    let jump = 0;
    for (let children of navButton.children[1].children) {
      if(jump > 0){
        children.addEventListener("click",function(e){
          e.stopPropagation();
          closeMenu(navButton.children[1].children[0],navButton);
          linkClick(this);
        });
      }
      jump++;
    }
    navButton.addEventListener("click",function(){
      selectMenu("click",this);
    });
    navButton.addEventListener("mouseenter",function(){
      selectMenu("over",this);
    });
    navButton.addEventListener("mouseleave",function(){
      selectMenu("out",this);
    });
    navButton.children[1].children[0].addEventListener("click",function(e){
      e.stopPropagation();
      closeMenu(this,navButton);
    });
  }
}

document.getElementById("gamePad").addEventListener("mouseover",function(){
  gamePadAnimation("over",this);
});
document.getElementById("gamePad").addEventListener("mouseout",function(){
  gamePadAnimation("out",this);
});
document.getElementById("gamePad").addEventListener("click",function(){
  gamePadFonc();
});
