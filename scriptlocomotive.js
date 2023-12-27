var timeout;
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
function firstPageAnim(){
   var t1 = gsap.timeline();
   t1.from("#nav",{
   y: '-10',
   opacity:0,
   duration:1.5,
   ease:Expo.easeInOut,

   })
   .to(".boundingelem",{
    y: 0,
    duration:2,
    ease:Expo.easeInOut,
    stagger:.2,
   

 
    })
    .from("#herofooter",{
        y: -10,
        duration:1.5,
        opacity:0,
        
        ease:Expo.easeInOut,
        
     
        })
}


function miniCircleOval(){
 // define defualt scale value
    var xscale =1;
    var yscale =1;

// create variable for safe the difference values of x and y exess
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove",function(dets){

//This function we define before we run the scrollminicirle value and set the in 100second
//beacuse mouse stop doesn't have any function so that's why we use this function that we give 
//the time to run the scrollminicircle function then afetr run it's value come to defult value 1
// and when function stop means  mousestop stop run we cleartimeout
// hu jay gaaja sy wapes set h

           clearTimeout(timeout);
// we use settime out that our addListerner run after 100 miliscecond and safe this settimeout value 
//in timeout variabel:here we clear settimeout function that's why use this variable
        
    // here I use Gsap prebuild function gsap.utils.clam().This function is use for set the scaling values 
    //bydefult th ex and y value is 1 here we giv ethe value 0.8 and 1.2 taht in the plus value whaterver change
    //come but we set1.2 same in nagitive is 0.8
    xscale =gsap.utils.clamp(.8,1.2,dets.clientX - xprev);
    yscale =gsap.utils.clamp(.8,1.2,dets.clientY - yprev);
       
    xprev =dets.clientX;
    yprev = dets.clientY;
// here we pass argument to the function which we create for circle move and style transform

    scrollminicircle(xscale,yscale);

timeout=setTimeout(function(){
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1, 1)`;
 },100) 
 });

}
function scrollminicircle(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}
miniCircleOval()
scrollminicircle()
firstPageAnim()
// teeno element ko sleect karo, uske baad teeno par ek mousemove lagao, jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo, 
//ab mouse ki x y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye

document.querySelectorAll(".elem").forEach((elem )=> {
    //yaha ma roatet set kr rahi hu jo x exces pr hu ga or ek variable bana ya jo current x ki value ko safe kary ga
//or jab new mouse move hu ga tu phe who is is ki previous value my sy - hu jay ga.uper dy gy commet ky hisab sy 
//kam kiya he fisrt image ko y pr set kiya phr rotate ky liy X pr

    
    var rotate = 0;
     var diffrotate = 0;
     elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power3,
          duration: 0.5,
        });
      });
    
  elem.addEventListener("mousemove",function(dets){






  // here we use the method getboundingclientRect this is use for know the detailes about your div or element that where is located on X AND Y exses
  // dets.clientY that I can know where is my mouse on y exses
    var diff = dets.clientY -elem.getBoundingClientRect().top
    diffrotate = dets.clientX - rotate;
    rotate=dets.clientX
    gsap.to(elem.querySelector("img"),{
    opacity:1,
    ease:Power3,
    top:diff,
    left:dets.clientX,
    rotate:gsap.utils.clamp(-20,20,diffrotate*0.5)
    })
  }
)   
});