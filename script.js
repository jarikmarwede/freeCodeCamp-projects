const FRONT_END_PROJECTS = [
  {
    name: "JavaScript Calculator",
    link:
      "./Front End Development Certification/JavaScript Calculator/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/JavaScript%20Calculator"
  },
  {
    name: "Local Wheather",
    link: "./Front End Development Certification/Local Weather/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/Local%20Weather"
  },
  {
    name: "Pomodoro Clock",
    link: "./Front End Development Certification/Pomodoro Clock/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/Pomodoro%20Clock"
  },
  {
    name: "Random Quote Machine",
    link:
      "./Front End Development Certification/Random Quote Machine/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/Random%20Quote%20Machine"
  },
  {
    name: "Simon Game",
    link: "./Front End Development Certification/Simon Game/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/Simon%20Game"
  },
  {
    name: "Tic Tac Toe Game",
    link: "./Front End Development Certification/Tic Tac Toe Game/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/Tic%20Tac%20Toe%20Game"
  },
  {
    name: "Twitch API",
    link: "./Front End Development Certification/Twitch API/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/Twitch%20API"
  },
  {
    name: "Wikipedia Viewer",
    link: "./Front End Development Certification/Wikipedia Viewer/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/Wikipedia%20Viewer"
  }
];
const BACK_END_PROJECTS = [
  {
    name: "Image Search Abstraction Layer",
    link:
      "./Back End Development Certification/Image Search Abstraction Layer/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Back%20End%20Development%20Certification/Image%20Search%20Abstraction%20Layer"
  },
  {
    name: "Voting App",
    link: "https://jm-voting-app.glitch.me",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Back%20End%20Development%20Certification/Voting%20App"
  }
];
const RESPONSIVE_WEB_DESIGN_PROJECTS = [
  {
    name: "Personal Portfolio Webpage",
    link:
      "./Responsive Web Design Certification/Personal Portfolio Webpage/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Responsive%20Web%20Design%20Certification/Personal%20Portfolio%20Webpage"
  },
  {
    name: "Product Landing Page",
    link:
      "./Responsive Web Design Certification/Product Landing Page/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Responsive%20Web%20Design%20Certification/Product%20Landing%20Page"
  },
  {
    name: "Survey Form",
    link: "./Responsive Web Design Certification/Survey Form/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Responsive%20Web%20Design%20Certification/Survey%20Form"
  },
  {
    name: "Technical Documentation Page",
    link:
      "./Responsive Web Design Certification/Technical Documentation Page/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Responsive%20Web%20Design%20Certification/Technical%20Documentation%20Page"
  },
  {
    name: "Tribute Page",
    link: "./Responsive Web Design Certification/Tribute Page/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Responsive%20Web%20Design%20Certification/Tribute%20Page"
  }
];
const APIS_AND_MICROSERVICES_PROJECTS = [
  {
    name: "File Metadata Microservice",
    link:
      "./Apis And Microservices Certification/File Metadata Microservice/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Back%20End%20Development%20Certification/File%20Metadata%20Microservice"
  },
  {
    name: "Request Header Parser Microservice",
    link:
      "./Apis And Microservices Certification/Request Header Parser Microservice/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Back%20End%20Development%20Certification/Request%20Header%20Parser%20Microservice"
  },
  {
    name: "Timestamp Microservice",
    link:
      "./Apis And Microservices Certification/Timestamp Microservice/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Back%20End%20Development%20Certification/Timestamp%20Microservice"
  },
  {
    name: "URL Shortener Microservice",
    link:
      "./Apis And Microservices Certification/URL Shortener Microservice/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Back%20End%20Development%20Certification/URL%20Shortener%20Microservice"
  },
  {
    name: "Exercise Tracker",
    link: "./Apis And Microservices Certification/Exercise Tracker/index.html",
    src:
      "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Apis%20And%20Microservices%20Certification/Exercise%20Tracker"
  }
];
const CERTIFICATIONS = [
  { projects: FRONT_END_PROJECTS, container_id: "front-end-projects" },
  { projects: BACK_END_PROJECTS, container_id: "back-end-projects" },
  {
    projects: RESPONSIVE_WEB_DESIGN_PROJECTS,
    container_id: "responsive-web-design-projects"
  },
  {
    projects: APIS_AND_MICROSERVICES_PROJECTS,
    container_id: "apis-and-microservices-projects"
  }
];
Object.freeze(FRONT_END_PROJECTS);
Object.freeze(BACK_END_PROJECTS);
Object.freeze(RESPONSIVE_WEB_DESIGN_PROJECTS);
Object.freeze(APIS_AND_MICROSERVICES_PROJECTS);
Object.freeze(CERTIFICATIONS);

function loadProjects() {
  for (
    let certificationIndex = 0;
    certificationIndex < CERTIFICATIONS.length;
    certificationIndex++
  ) {
    let certification = CERTIFICATIONS[certificationIndex];
    let currentProjects = certification.projects;

    for (let i = 0; i < currentProjects.length; i++) {
      const name = currentProjects[i].name;
      const link = currentProjects[i].link;
      const sourcecode = currentProjects[i].src;
      const projectHtml =
        "<div class='project-card'><h3 class='project-name'>" +
        name +
        "</h3><div class='project-btns'><a class='btn' href='" +
        link +
        "'><p><i class='fas fa-desktop'></i> View</p></a><a class='btn' href='" +
        sourcecode +
        "' target='_blank'><p><i class='fas fa-code'></i> Source</p></a></div></div>";

      const container = document.getElementById(certification.container_id);
      container.innerHTML += projectHtml;
    }
  }
}

window.addEventListener(
  "DOMContentLoaded",
  function() {
    loadProjects();
  },
  false
);
