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
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Om Kiran Kar | Solution Provider";
            $("#favicon").attr("href", "/assets/images/MyFavicon.ico");
        }
        else {
            document.title = "Om Kiran Kar | Solution Provider";
            $("#favicon").attr("href", "/assets/images/MyLogo1.png");
        }
    });


// fetch projects start
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            return data
        });
}

function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";

    projects.forEach(project => {
      projectsHTML += `
        <div class="grid-item ${project.category}">
          <div class="box tilt" onclick="openProjectPopup('${project.name}', '${project.desc}', '${project.image}', '${project.links.view}')">
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
          </div>
        </div>`;
    });

    projectsContainer.innerHTML = projectsHTML;

    // Initialize Isotope on the container
    var $grid = $('.box-container').isotope({
      itemSelector: '.grid-item',
      layoutMode: 'fitRows'
    });

    // Use imagesLoaded to ensure Isotope layout is properly calculated after each image loads
    $grid.imagesLoaded().progress(function() {
      $grid.isotope('layout');
    });

    // Filter items on button click.
    $('.button-group').on('click', 'button', function () {
      $('.button-group').find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    });
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


getProjects().then(data => {
    showProjects(data);
})
// fetch projects end

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/67a79287825083258e123d13/1ijj98oot';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat

// Function to send analytics event
function trackButtonClick(category) {
    gtag('event', 'click', {
        'event_category': 'Project Filter',
        'event_label': category
    });
}

// Attach event listeners to project filter buttons
document.querySelectorAll('.button-group .btn').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-filter');
        trackButtonClick(category);
    });
});

//Analytics end

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