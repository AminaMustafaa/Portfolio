// CURSOR
const cur=document.getElementById('cur'),curR=document.getElementById('curR');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function loop(){
  rx+=(mx-rx)*.1;ry+=(my-ry)*.1;
  cur.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;
  curR.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(loop);
})();

// PHOTO
document.getElementById('imgWrap').addEventListener('click',()=>document.getElementById('imgInput').click());
document.getElementById('imgInput').addEventListener('change',function(){
  const f=this.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=e=>{
    const img=document.getElementById('heroImg');
    img.src=e.target.result;img.style.display='block';
    document.querySelector('#imgWrap span').style.display='none';
  };
  r.readAsDataURL(f);
});

// SCROLL REVEAL
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}});
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// ACTIVE NAV ON SCROLL
const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nav-links a');
const onScroll=()=>{
  let cur='';
  sections.forEach(s=>{
    if(window.scrollY>=s.offsetTop-120)cur=s.id;
  });
  navLinks.forEach(a=>{
    a.classList.toggle('active',a.getAttribute('href')==='#'+cur);
  });
};
window.addEventListener('scroll',onScroll,{passive:true});

// LANGUAGE
let lang='en';
function setLang(l){
  lang=l;
  document.getElementById('btnEN').classList.toggle('on',l==='en');
  document.getElementById('btnES').classList.toggle('on',l==='es');
  document.querySelectorAll('[data-en]').forEach(el=>{
    const val=el.getAttribute('data-'+l);
    if(!val)return;
    if(el.tagName==='INPUT'||el.tagName==='BUTTON')el.value=val;
    else el.innerHTML=val;
  });
}

// SMOOTH SCROLL for nav links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}
  });
});
