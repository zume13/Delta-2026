const themeButton = document.getElementById('themeButton');
const themeImage = document.getElementById('themeImage') as HTMLImageElement;

const explore = document.getElementById('explore');

    explore?.addEventListener('click', () => {
        document.getElementById('proj')?.scrollIntoView({behavior:"smooth"})
    })

const learn = document.getElementById('learn');

    learn?.addEventListener('click', () => {
     document.getElementById('about')?.scrollIntoView({behavior:"smooth"})
})

function updateContent(){

    if(window.matchMedia("(max-width: 1200px").matches){
        if(explore){
            explore.innerHTML = 'Projects <span class="pl-3 text-4xl">&rarr;</span>'
        }
        if(learn){
            learn.innerHTML = 'More'
        }
    }
    else{
        if(explore){
            explore.innerHTML = 'My Works <span class="pl-3 text-4xl">&rarr;</span>'
        }
        if(learn){
            learn.innerHTML = 'Learn More'
        }
    }

}

const toggleTheme = () => {
    
    const isDark = document.documentElement.classList.toggle('dark');

    themeImage.src = isDark ? '/src/assets/light.png' : '/src/assets/dark.png';

    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light')

}

themeButton?.addEventListener('click', toggleTheme);

if(localStorage.getItem('theme') === 'dark'){
    document.documentElement.classList.add('dark')
}

updateContent();
window.addEventListener('resize', updateContent);