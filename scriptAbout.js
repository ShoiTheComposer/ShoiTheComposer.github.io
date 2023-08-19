gsap.registerPlugin(ScrollTrigger);

//Page Load Animation
gsap.timeline()
  .set("main",{
      visibility: "visible",
  })
  .from(".pages",{
      y: "-20px",
      opacity: 0,
      stagger: 0.1,
      duration: 0.3,
  })
  .from("#Hero",{
    y: "20px",
    opacity: 0,
    duration: 1,
  },"<0.3")
  .from(".bioContainer",{
      y: "20px",
      opacity: 0,
      duration: 1,
      stagger: 0.2,
  },"<0.3")
  .from(".decoWrapper",{
      opacity: 0,
      duration: 1,
  },"<0.3")

//circle animation
var radius = 100;
var speed = 2.5; //works with multiple of 0.5

TweenLite.set(".Logo", { 
  xPercent: 100, 
  yPercent: 0, 
  x: -radius, 
  y: -radius,
});

var tl1 = new TimelineMax({repeat: -1});
var tl2 = new TimelineMax({repeat: -1});

tl1.to(".Logo", {
  y: radius,
  ease: Sine.easeInOut,
  duration: speed ,
  stagger: {
    each: speed / 3,
    repeat: -1,
    yoyo: true
  }
}).progress(speed / (speed / 3)/ 10)
  .to(".Logo",{
  y: -radius,
  duration: speed ,
  ease: Sine.easeInOut,
  stagger: speed / 3,
})

tl2.to(".Logo",{
  x: radius,
  duration: speed ,
  ease: Sine.easeInOut,
  stagger: {
    each: speed / 3,
    repeat: -1,
    yoyo: true
  }
}).progress(speed / (speed / 3)/ 5)
  .to(".Logo",{
  duration: speed ,
  x: -radius,
  ease: Sine.easeInOut,
  stagger: speed / 3,
})

//Scroll Text animation
const boxes = gsap.utils.toArray(".box");
const loop = horizontalLoop(boxes, {
  paused: true,
  repeat: -1
});
loop.play()

// Scroll trigger animation
let photo_tl = gsap.timeline({
  scrollTrigger: { 
    trigger: ".bio", 
    start: "center 100%", 
    end: "center 0%",
    scrub: true,
  }})
  .set(".photo1", {
    clipPath: "inset(50% 0% 0% 0%)",
  })
  .to(".photo1", {
    clipPath: "inset(0% 0% 0% 0%)",
  })
  .to(".photo1", {
    clipPath: "inset(0% 0% 50% 0%)",
  })


// let bio = gsap.utils.toArray('.bioContainer')
// bio.forEach((item, index) => {
//   gsap.set(item, {
//     opacity: 0,
//   })

// let tl = gsap.timeline({
//   scrollTrigger: {
//   trigger: item,
//   start:"bottom 100%", 
//   toggleActions:"restart none none reverse",
//   end: "bottom 80%",
//   markers:true
//   }})
//   tl.to(item, {
//     opacity: 1,
//     duration: 0.5,
//   })
// })

/////Put at end Gsap Animation///////
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth, curX, distanceToStart, distanceToLoop, item, i;
  gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
      return xPercents[i];
    }
  });
  gsap.set(items, {x: 0});
  totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = xPercents[i] / 100 * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
      .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = vars => toIndex(curIndex+1, vars);
  tl.previous = vars => toIndex(curIndex-1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}