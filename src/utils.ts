import type { themePair, scrollPair } from "./type";
import { closeSidebar } from './main';
import { projects, devIcons } from "./projects";
import emailjs  from "@emailjs/browser";

const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

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
export function renderProjectCards(target : HTMLElement){
    target.innerHTML = 
    projects.map((project) =>  `
        
        <div class="flex flex-col justify-center group rounded-4xl gap-5 w-[95%]  h-140 text-(--white) p-6 lg:p-7 border border-gray-800
                    sm:w-[50%] sm:h-150
                    md:w-[50%] md:h-160
                    lg:w-[40%] lg:h-170
                    dark:hover:bg-(--black) dark:hover:text-(--white) hover:bg-(--white) hover:text-(--black) 
                    dark:bg-(--white) bg-(--black) dark:text-(--black)
                    transform-gpu
                    hover:-translate-y-2
                    hover:transform:[perspective(1000px)_rotateX(4deg)_rotateY(-4deg)]
                    hover:shadow-[0_25px_50px_rgba(0,0,0,0.35)]
                    dark:hover:shadow-[0_25px_50px_rgba(255,255,255,0.15)]
                    duration-300 transition-all">
          <div class="flex flex-col gap-4">
            <p class="font-bold text-3xl text-center
                      md:text-4.5xl
                      lg:text-5xl">
              ${project.title}
            </p>
            <p class="font-bold font-inter text-center 
                      text-base
                      lg:text-xl">
              ${project.desc}
            </p>
          </div>
          <div class="flex items-center justify-center w-full">
            <img class="dark:border-(--white) border-(--black) rounded-2xl border 
                        max-w-full max-h-full 
                        shadow-[0_0_20px_rgba(59,130,246,0.7),0_0_20px_rgba(59,130,246,0.2)]
                        hover:shadow-[0_0_30px_rgba(59,130,246,0.4),0_0_30px_rgba(59,130,246,0.4)]
                        transition-all duration-300
                        group-hover:scale-105" 
                        src="${project.imagePath}" alt="">
          </div>
          
          <div class="flex flex-row flex-wrap gap-4 justify-center">
          ${project.stacks.map((stack) => 
            `
            <div class="flex flex-row  gap-2 items-center font-medium px-4 py-1 rounded-2xl
                      dark:bg-black dark:text-(--white) bg-(--white) text-(--black) group-hover:bg-(--black) group-hover:text-(--white) dark:group-hover:bg-(--white) dark:group-hover:dark:text-(--black) 
                      transition-all duration-300
                        text-sm
                        md:text-base
                        lg:text-lg">
                ${devIcons[stack.toLowerCase()]} | ${stack}
              </div>
            `
          ).join("")}
            </div>
          <div class="flex flex-row gap-2 font-semibold mt-auto
                      text-sm
                      md:text-base
                      lg:text-lg">
            <a  target="_blank" href="${project.code}" target=>Code Base &rarr;</a>
            |
            <a target="_blank" href="${project.demo}">Live Demo &rarr;</a>
          </div>
        </div>
        `
    ).join("")
}

export async function sendEmail (formData : FormData, successT : HTMLElement, errorT : HTMLElement): Promise<boolean>{

    const name = formData.get('name');
    const email = formData.get('email');;
    const message = formData.get('message');

    try{
         if(!name || !email || !message){
            throw new Error('Missing Fields');
            }
        await emailjs.send
            (service, template, 
                {
                    name: name.toString(),
                    email: email.toString(),
                    message: message.toString()
                }, 
            key);

            localStorage.setItem('lastSubmit', Date.now().toString())
            showToast(successT, errorT);
            return true;
    }catch(error)
    {
        console.error(error);
        showToast(successT, errorT, false);
        return false;
    }

}

function showToast(success : HTMLElement, error : HTMLElement, isSuccess = true){

    if(isSuccess){
        success.classList.remove('hidden');
        success.classList.add('flex'); 
    }else{
        error.classList.remove('hidden');
        error.classList.add('flex');
    }
    setTimeout(() => {
        success.classList.remove('flex');
        success.classList.add('hidden'); 
        error.classList.remove('flex');
        error.classList.add('hidden');
    }, 5000);
}

