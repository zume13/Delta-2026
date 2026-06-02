import type { themePair, scrollPair } from "./type";
import { closeSidebar } from './main';

export const toggleTheme = (target : HTMLImageElement) => {
    
    const isDark = document.documentElement.classList.toggle('dark');
        target.src = isDark ? '/src/assets/light.png' : '/src/assets/dark.png';
  
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light')

}

export const themeClickListeners = (pairs : themePair[]) => {
    if(pairs){

        pairs.forEach((pair) =>{
            pair.button.addEventListener('click', () => toggleTheme(pair.image));
        });

    }else{
        console.error('null theme elements');
    }
}

export function loadSavedTheme(){
    if(localStorage.getItem('theme') === 'dark'){
        document.documentElement.classList.add('dark')
    }
}

export function scrollToViewListener(targets : scrollPair[]){
    targets.forEach((target) => {
        if(target.clicked && target.to){
            target.clicked.addEventListener("click", () => target.to.scrollIntoView({behavior:"smooth"}));
        }else{
            console.error('clicked/to is null')
        }
    })
}

export function closeSideBars(targets : HTMLElement[]){
    targets.forEach((target) => {
        if(target){
            target.addEventListener('click', closeSidebar)
        }else{
            console.error(`target ${target} is null`);
        }
        
    })
}