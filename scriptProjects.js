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
    .from(".hero h1",{
        y: "-20px",
        opacity: 0,
        duration: 0.3,
    })
    .from(".shape",{
        opacity: 0,
        duration: 0.3,
    })
    .from(".worksWrapper",{
        x: "10px",
        opacity: 0,
        duration: 0.5,
    })
    .from(".projectsWrapper",{
        x: "10px",
        opacity: 0,
        duration: 0.5,
    })
    .from("footer",{
        opacity: 0,
        duration: 1,
    },"<0.3")
    .from(".socials > a",{
        opacity: 0,
        y: "10px",
        duration: 1,
        stagger: 0.3
    },"<0.3")

//Star Rotate
    gsap.to(".square",{
        repeat: -1, 
        yoyo: true,
        rotation:360,
        duration:3,
        yoyoEase: "power1.inOut",
        ease: "power1.inOut",
        stagger: 0.3,
    })
    gsap.to(".diamond",{
        repeat: -1, 
        yoyo: true,
        rotation:-135,
        duration:3,
        stagger: 0.1,
        yoyoEase: "power1.inOut",
        ease: "power1.inOut"
    },"<")
    gsap.timeline({repeat: -1, yoyo: true,stagger: 0.2,})
    .to(".circle",{
        scale: 0.5,
        duration:1.5,
        yoyoEase: "power1.inOut",
        ease: "power1.inOut"
    },"<")
    .to(".circle",{
        scale: 0.8,
        duration:1.5,
        yoyoEase: "power1.inOut",
        ease: "power1.inOut"
    },"1.5")

// Horizontal Scroller

let sections = gsap.utils.toArray(".card");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1) - 40,
  ease: "none",
  scrollTrigger: {
    trigger: ".projectsWrapper",
    pin: true,
    scrub: 0.8,
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: "+=832",
    start: "top top",
  }
});
