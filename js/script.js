const navbar=document.querySelector("nav");
const progress=document.getElementById("progress-bar");

/* ===== MOBILE MENU (HAMBURGER) ===== */
const hamburger=document.getElementById("hamburger");
const navMenu=document.querySelector(".nav-menu");

if(hamburger && navMenu){

    hamburger.addEventListener("click",()=>{
        const isOpen=navMenu.classList.toggle("show");
        hamburger.classList.toggle("active",isOpen);
        hamburger.setAttribute("aria-expanded",isOpen?"true":"false");
        document.body.classList.toggle("nav-open",isOpen);
    });

    // Đóng menu khi bấm chọn 1 mục
    navMenu.querySelectorAll("a").forEach(link=>{
        link.addEventListener("click",()=>{
            navMenu.classList.remove("show");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded","false");
            document.body.classList.remove("nav-open");
        });
    });

    // Đóng menu khi bấm ra ngoài
    document.addEventListener("click",(e)=>{
        const clickInsideNav=navbar.contains(e.target);
        if(!clickInsideNav && navMenu.classList.contains("show")){
            navMenu.classList.remove("show");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded","false");
            document.body.classList.remove("nav-open");
        }
    });

    // Đóng menu khi resize màn hình về desktop
    window.addEventListener("resize",()=>{
        if(window.innerWidth>700){
            navMenu.classList.remove("show");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded","false");
            document.body.classList.remove("nav-open");
        }
    });
}

window.addEventListener("scroll",()=>{
    if(window.scrollY>80){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }
    if(progress){
        let winScroll=document.documentElement.scrollTop;
        let height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
        let scrolled=(winScroll/height)*100;
        progress.style.width=scrolled+"%";
    }
});

const cursor=document.querySelector(".cursor-glow");
document.addEventListener("mousemove",(e)=>{
cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";
});

window.addEventListener("load",()=>{
setTimeout(()=>{
document.getElementById("loader").classList.add("hide");
},1500);
});

const theme=document.getElementById("themeToggle");
theme.onclick=()=>{
document.body.classList.toggle("dark");
if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark");
theme.innerHTML="☀️";
}else{
localStorage.setItem("theme","light");
theme.innerHTML="🌙";
}
}

if(localStorage.getItem("theme")=="dark"){
document.body.classList.add("dark");
theme.innerHTML="☀️";
}

const topBtn=document.getElementById("topBtn");
window.onscroll=()=>{
if(document.documentElement.scrollTop>300){
topBtn.style.display="block";
}else{
topBtn.style.display="none";
}
}

topBtn.onclick=()=>{
window.scrollTo({
top:0,
behavior:"smooth"
});
}

const imgs=document.querySelectorAll(".gallery img");
const lightbox=document.querySelector(".lightbox");
const lightboxImg=document.querySelector(".lightbox img");

imgs.forEach(img=>{
img.onclick=()=>{
lightbox.style.display="flex";
lightboxImg.src=img.src;
}
});

lightbox.onclick=()=>{
lightbox.style.display="none";
}

// Hiệu ứng "hiện dần khi cuộn tới" cho các phần tử .reveal
const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));
}