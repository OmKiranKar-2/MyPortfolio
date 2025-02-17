$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {

          // Get and trim the field values
        var name = $("input[name='name']").val().trim();
        var email = $("input[name='email']").val().trim();
        var phone = $("input[name='phone']").val().trim();
        var message = $("textarea[name='message']").val().trim();

        // Check if every field is filled
        if (name === "" || email === "" || phone === "" || message === "") {
            alert("Please fill in all fields.");
            return false;
        }

        // Validate email with a regex
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        // Validate phone number:
        // Check if phone number is at least 10 digits long
        if (phone.length < 10) {
            alert("Please enter a valid phone number (at least 10 digits).");
            return false;
        }
        // Check if phone number contains only digits
        if (!/^\d+$/.test(phone)) {
            alert("Phone number should contain only digits.");
            return false;
        }

        emailjs.init("oXzbM5wPR4HSaGlUw");

        emailjs.sendForm('service_7ilux5f', 'template_5vx9ohs', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Om Kiran Kar | Solution Provider";
            $("#favicon").attr("href", "assets/images/MyFavicon.ico");
        }
        else {
            document.title = "Om Kiran Kar | Solution Provider";
            $("#favicon").attr("href", "/assets/images/MyLogo1.png");
        }
    });

// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Software Development", "IoT &amp; Embedded System", "Electronics &amp; RF", "Freelancing"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
            <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
            </div>
        </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 8).filter(project => project.category != "academic").forEach(project => {
        projectHTML += `
        <div class="box tilt" style="width: 380px; margin: 1rem" onclick="openProjectPopup('${project.name}', '${project.desc}', '${project.image}', '${project.links.view}')">
            <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
            <div class="content">
                <div class="tag">
                    <h3>${project.name}</h3>
                </div>
                <div class="desc">
                    <p>${project.desc.length > 100 ? project.desc.substring(0, 100) + "..." : project.desc}</p>
                    <button class="read-more" onclick="openProjectPopup('${project.name}', '${project.desc}', '${project.image}', '${project.links.view}')">Read More</button>
                </div>
            </div>
        </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    // filter items on button click
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });
}

// Open the project popup
function openProjectPopup(name, description, image, viewLink) {
    // Check if any popup is already open and remove it
    const existingPopup = document.querySelector('.project-popup');
    if (existingPopup) {
        existingPopup.remove(); // Remove existing popup before opening a new one
    }

    const popup = document.createElement('div');
    popup.classList.add('project-popup');
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close-btn" onclick="closePopup()">×</span>
            <div class="popup-header">
                <img src="/assets/images/projects/${image}.png" alt="${name}" class="popup-image"/>
                <h3>${name}</h3>
            </div>
            <p class="popup-description">${description}</p>
            <div class="popup-btns">
                <a href="${viewLink}" class="btn" target="_blank"><i class="fas fa-eye"></i> View Project</a>
                <button class="btn back-btn" onclick="closePopup()">Back</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);

    // Prevent scrolling on the body when the popup is open
    document.body.style.overflow = 'hidden';
}

// Close the popup and restore the original background and scroll behavior
function closePopup() {
    const popup = document.querySelector('.project-popup');
    if (popup) {
        popup.remove(); // Remove the popup
        document.body.style.overflow = ''; // Re-enable scrolling
        document.body.style.backgroundColor = ''; // Restore the original background color
    }
}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
 function loader() {
     document.querySelector('.loader-container').classList.add('fade-out');
 }
 function fadeOut() {
     setInterval(loader, 500);
 }
 window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src='https://embed.tawk.to/67a79287825083258e123d13/1ijj98oot';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });