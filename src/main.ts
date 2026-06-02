//import { projects as data } from './projects';
import { themeClickListeners, loadSavedTheme, scrollToViewListener, closeSideBars } from "./utils";

const themeButton = document.getElementById('themeButton') as HTMLButtonElement;
const themeImage = document.getElementById('themeImage') as HTMLImageElement;
const themeButtonMobile = document.getElementById('themeButtonMobile') as HTMLButtonElement;
const themeImageMobile  = document.getElementById('themeImageMobile') as HTMLImageElement;
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const about = document.getElementById('about');
const proj = document.getElementById('proj');
const explore = document.getElementById('explore') as HTMLButtonElement;
const learn = document.getElementById('learn') as HTMLButtonElement;

export function openSidebar() {
  sidebar?.classList.remove("right-[-100%]");
  sidebar?.classList.add("right-0");

  overlay?.classList.remove("hidden");
}

export function closeSidebar() {
  sidebar?.classList.remove("right-0");
  sidebar?.classList.add("right-[-100%]");

  overlay?.classList.add("hidden");
}

menuBtn?.addEventListener("click", openSidebar);

function updateContent(){

    if(window.matchMedia("(max-width: 1200px").matches){
        if(explore){
            explore.innerHTML = 'Projects <span class=" sm:pl-2 text-xl sm:text-2xl md:text-2xl">&rarr;</span>'
        }
        if(learn){
            learn.innerHTML = 'More'
        }
    }
    else{
        if(explore){
            explore.innerHTML = 'My Works <span class="pl-2 md:text-4xl">&rarr;</span>'
        }
        if(learn){
            learn.innerHTML = 'Learn More'
        }
    }

}

closeSideBars([overlay!, closeBtn!]);
scrollToViewListener([{clicked: explore, to: proj!}, {clicked: learn, to: about!}]);
themeClickListeners([{button: themeButton, image: themeImage}, {button: themeButtonMobile, image: themeImageMobile}]);
loadSavedTheme();
updateContent();
window.addEventListener('resize', updateContent);