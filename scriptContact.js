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
    .from("main",{
        y: "5px",
        opacity: 0,
        duration: 0.5,
    })
    .from("#contact-form > *",{
        y: "10px",
        opacity: 0,
        duration: 0.3,
        stagger: 0.2,
    })
    .from("footer",{
        opacity: 0,
        duration: 1,
    })
    .from(".socials > a",{
        opacity: 0,
        y: "10px",
        duration: 1,
        stagger: 0.3
    },"<")

// Email Service
clearForm();

emailjs.init('4Q60Be-tAoPNJzADc');

window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()){
            // generate a five digit number for the contact_number variable
            this.contact_number.value = Math.random() * 100000 | 0;
            // these IDs from the previous steps
            emailjs.sendForm('service_trarpqw', 'template_qwnki5e', this)
                .then(function() {
                    console.log('SUCCESS!');
                }, function(error) {
                    console.log('FAILED...', error);
                });

            //remove lines
            clearForm();
        };
    });
}



// form validation
function validateForm() {
    var validity = true;
    //name
    if (document.forms["contact-form"]["user_name"].value == "") {
        document.getElementById("contact-form").elements[1].style.borderBottom = "2px solid red";
        document.getElementById("contact-form").elements[1].style.borderRight = "2px solid red";
        validity = false;
    }else{document.getElementById("contact-form").elements[1].style.border = "2px solid white";}

    //email
    if (!ValidateEmail(document.forms["contact-form"]["user_email"])) {
        document.getElementById("contact-form").elements[2].style.borderBottom = "2px solid red";
        document.getElementById("contact-form").elements[2].style.borderRight = "2px solid red";
        validity = false;
    }else{document.getElementById("contact-form").elements[2].style.border = "2px solid white";}

    //form
    if (document.forms["contact-form"]["message"].value == "") {
        document.getElementById("contact-form").elements[3].style.borderBottom = "2px solid red";
        document.getElementById("contact-form").elements[3].style.borderRight = "2px solid red";
        validity = false;
    }    else{document.getElementById("contact-form").elements[3].style.border = "2px solid white";}

    //valid :)
    if (validity === true){
        document.getElementById("contact-form").elements[4].innerHTML = "Success!";
        return true;
    }
    else{
        return false;
    }
}

//clear form
function clearForm(){
    document.forms["contact-form"]["user_name"].value = "";
    document.forms["contact-form"]["user_email"].value = "";
    document.forms["contact-form"]["message"].value = "";
}

//email validation
function ValidateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.value.match(validRegex)) {
        return true;
    } 
    else {
        return false;
    }
};

// Background text Animation
const TextAnimation = document.getElementById("TextAnimation");
let TextAni = new SplitType(TextAnimation);

TextAnimation.style.opacity = 0;

gsap.timeline({
    repeat: -1,
    repeatDelay: 5,
})
    .set(TextAnimation,{
        opacity: 100,
        x: 0,
    })
    .set(".char",{
        stagger: 0.1,
        duration: 0.5,
        clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
    })
    .to(".char",{
        stagger: 0.1,
        duration: 0.5,
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    })
    .set(".char",{
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    })
    .to(".char",{
        stagger: 0.1,
        duration: 0.5,
        clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
    })

//float animation
const floatAnimation = () => {
    const tlCan = new TimelineMax({repeat:-1});
    /*Can Animation*/
    tlCan
        //move top left
    .to('#TextAnimation', 3, { y:'-=20', x:'+=15',  rotation:'-=2', ease:Power1.easeInOut})
    
        //move down right
    .to('#TextAnimation', 2, { y:'+=20', x:'-=15', rotation:'-=2', ease:Power1.easeInOut})
    
    
    .to('#TextAnimation', 3, { y:'-=15',  rotation:'+=2', ease:Power1.easeInOut})
    
    .to('#TextAnimation', 3, { y:'+=15',  rotation:'+=2', ease:Power1.easeInOut})
    
    
    .to('#TextAnimation', 3, { y:'-=30', ease:Power1.easeInOut})
        
    .to('#TextAnimation', 3, { y:'+=30', ease:Power1.easeInOut})
    
    
    .to('#TextAnimation', 3, { y:'-=15', ease:Power1.easeInOut})
        
    .to('#TextAnimation', 3, { y:'+=15', ease:Power1.easeInOut})
    
    
    .to('#TextAnimation', 2, { y:'-=20', ease:Power1.easeInOut})
        
    .to('#TextAnimation', 2, { y:'+=20', ease:Power1.easeInOut})

    TweenLite.to(tlCan, 27, {ease:Power1.easeInOut})

}
floatAnimation();