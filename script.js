//Page Load Animation
gsap.from(".pages",{
    y: "-20px",
    opacity: 0,
    stagger: 0.1,
    duration: 0.3,
});

gsap.from(".youtube-container",{
    y: "20px",
    opacity: 0,
    delay: 0.7,
    duration: 0.5,
});

gsap.from(".videoDesc",{
    ease: "power4.out",
    x: "100vw",
    delay: 0.3,
    duration: 1,
});


// Background text Animation
const TextAnimation = document.getElementById("TextAnimation");
let BackgroundTexts = ["SoundDesign", "ViewDemoReel", "Implementation", "UnityUnrealEngine", "FoleyFieldRecording"];


let TextOrder = 0;
TextAnimation.innerHTML = BackgroundTexts[TextOrder];
let TextAni = new SplitType(TextAnimation);
createTimeline();

function createTimeline() {
    SplitType.revert(TextAnimation);
    TextAnimation.style.opacity = 0;
    if (TextOrder >= (BackgroundTexts.length - 1)){
        TextOrder = 0;
    }
    else{
        TextOrder ++;
    }
    console.log(BackgroundTexts[TextOrder]);
    TextAnimation.innerHTML = BackgroundTexts[TextOrder];
    TextAni = new SplitType(TextAnimation);

    gsap.timeline({
        onComplete: () => {
            createTimeline();
        }
        })
        .set(TextAnimation,{
            opacity: 100,
            x: 0,
        })
        .set(".char",{
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        })
        .to(".char",{
            x: -30,
            stagger: 0.1,
            duration: 0.5,
            clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
        })
        .to(".char",{
            stagger: 0.1,
            duration: 0.3,
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
        })
}

//Subttle move Animation
const youtube = document.getElementsByClassName("youtube-container")[0];
var rect = youtube.getBoundingClientRect();

let xTo = gsap.quickTo(youtube, "x", {duration: 0.5, ease: "power2"}),
    yTo = gsap.quickTo(youtube, "y", {duration: 0.5, ease: "power2"});

window.addEventListener("mousemove", e => {
    xTo((e.clientX - rect.left)/20);  
    yTo((e.clientY - rect.top)/20);  
});

