import { themeClickListeners, loadSavedTheme, scrollToViewListener, closeSideBars, sendEmail } from "./utils";

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
const contact = document.getElementById('contact');
const hero = document.getElementById('hero');
const send = document.getElementById('send') as HTMLButtonElement;
const explore = document.getElementById('explore') as HTMLButtonElement;
const aboutLink = document.getElementById('aboutLink') as HTMLAnchorElement;
const projLink = document.getElementById('projLink') as HTMLAnchorElement;
const contactLink = document.getElementById('contactLink') as HTMLAnchorElement;
const heroLink = document.getElementById('heroLink') as HTMLAnchorElement;
const aboutMobile = document.getElementById('aboutMobile') as HTMLAnchorElement;
const projMobile = document.getElementById('projMobile') as HTMLAnchorElement;
const contactMobile = document.getElementById('contactMobile') as HTMLAnchorElement;
const heroMobile = document.getElementById('heroMobile') as HTMLAnchorElement;
const form = document.getElementById('contact-form') as HTMLFormElement;
const successT = document.getElementById('success-toast') as HTMLElement;
const errorT = document.getElementById('error-toast') as HTMLElement;
const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;

const cd = 120 * 1000;

form?.addEventListener('submit', async (e) =>{
    e.preventDefault();
 
    submitBtn.disabled = true;

    const lastSubmit = localStorage.getItem('lastSubmit');
    if(lastSubmit){
      const elapsed = Date.now() - Number(lastSubmit);

      if(elapsed < cd){
        alert("You just sent an Email. Try again after a few minutes.")
        return;
      }
    }

     const token = (
        document.querySelector(
            '[name="cf-turnstile-response"]'
        ) as HTMLInputElement
    )?.value;

    if (!token) {
        alert('Please complete the verification.');
        return;
    }

    const formData = new FormData(form);
    const success =  await sendEmail(formData, successT, errorT);

    if(success){
      form.reset();
    }
});

function updateBtn(){

  const lastSubmit = localStorage.getItem('lastSubmit');

    if (!lastSubmit) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        return;
    }

    const remaining = cd - (Date.now() - Number(lastSubmit));

    if(remaining > 0 ){
        submitBtn.disabled = true;
        submitBtn.textContent = `Wait ${Math.ceil(remaining/1000)}s`;
    }else{
      submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
}

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

closeSideBars([overlay!, closeBtn!]);
scrollToViewListener([
                        {clicked: send, to: contact!}, 
                        {clicked: explore, to: proj!}, 
                        {clicked: heroLink!, to: hero!}, 
                        {clicked: aboutLink!, to: about!}, 
                        {clicked: projLink, to: proj!}, 
                        {clicked: contactLink, to: contact!},
                        {clicked: heroMobile, to: hero!},
                        {clicked: aboutMobile, to: about!}, 
                        {clicked: projMobile, to: proj!},
                        {clicked: contactMobile, to: contact!}
                    ]);
themeClickListeners([
                        {button: themeButton, image: themeImage}, 
                        {button: themeButtonMobile, image: themeImageMobile}
                    ]);
loadSavedTheme([themeImage, themeImageMobile]);
setInterval(updateBtn, 1000);
updateBtn();