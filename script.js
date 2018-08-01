const FRONT_END_PROJECTS = [
  {name: "JavaScript Calculator", link: "./Front End Development Certification/JavaScript Calculator/index.html", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/JavaScript%20Calculator"},
  {name: "Local Wheather", link: "./Front End Development Certification/Local Weather/index.html", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/Local%20Weather"},
  {name: "Personal Portfolio Webpage", link: "./Front End Development Certification/Personal Portfolio Webpage/index.html", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/Personal%20Portfolio%20Webpage"},
  {name: "Pomodoro Clock", link: "./Front End Development Certification/Pomodoro Clock/index.html", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/Pomodoro%20Clock"},
  {name: "Random Quote Machine", link: "./Front End Development Certification/Random Quote Machine/index.html", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/Random%20Quote%20Machine"},
  {name: "Simon Game", link: "./Front End Development Certification/Simon Game/index.html", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/Simon%20Game"},
  {name: "Tic Tac Toe Game", link: "./Front End Development Certification/Tic Tac Toe Game/index.html", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/Tic%20Tac%20Toe%20Game"},
  {name: "Tribute Page", link: "./Front End Development Certification/Tribute Page/index.html", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/Tribute%20Page"},
  {name: "Twitch API", link: "./Front End Development Certification/Twitch API/index.html", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/Twitch%20API"},
  {name: "Wikipedia Viewer", link: "./Front End Development Certification/Wikipedia Viewer/index.html", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front%20End%20Development%20Certification/Wikipedia%20Viewer"}
]
const BACK_END_PROJECTS = [
  {name: "File Metadata Microservice", link: "https://jm-file-metadata-microservice.glitch.me", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Back%20End%20Development%20Certification/File%20Metadata%20Microservice"},
  {name: "Image Search Abstraction Layer", link: "https://jm-image-search-abstraction-layer.glitch.me", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Back%20End%20Development%20Certification/Image%20Search%20Abstraction%20Layer"},
  {name: "Request Header Parser Microservice", link: "https://jm-request-header-parser-microservice.glitch.me/api/whoami", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Back%20End%20Development%20Certification/Request%20Header%20Parser%20Microservice"},
  {name: "Timestamp Microservice", link: "https://jm-timestamp-microservice.glitch.me", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Back%20End%20Development%20Certification/Timestamp%20Microservice"},
  {name: "URL Shortener Microservice", link: "https://jm-url-shortener-microservice.glitch.me", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Back%20End%20Development%20Certification/URL%20Shortener%20Microservice"},
  {name: "Voting App", link: "https://jm-voting-app.glitch.me", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Back%20End%20Development%20Certification/Voting%20App"}
]
const RESPONSIVE_WEB_DESIGN_PROJECTS = [
  {name: "Survey Form", link: "./Responsive Web Design Certification/Survey Form/index.html", src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Responsive%20Web%20Design%20Certification/Survey%20Form"}
]
const CERTIFICATIONS = [
  {projects: FRONT_END_PROJECTS, container_id: "#front-end-projects"},
  {projects: BACK_END_PROJECTS, container_id: "#back-end-projects"},
  {projects: RESPONSIVE_WEB_DESIGN_PROJECTS, container_id: "#responsive-web-design-projects"}
]

function loadProjects() {
  for (let certificationIndex = 0; certificationIndex < CERTIFICATIONS.length; certificationIndex++) {
    let certification = CERTIFICATIONS[certificationIndex];
    let currentProjects = certification.projects;

    for (let i = 0; i < currentProjects.length; i++) {
      let name = currentProjects[i].name;
      let link = currentProjects[i].link;
      let sourcecode = currentProjects[i].src;
      projectHtml = "<div class='project-card'><h3 class='project-name'>" + name + "</h3><a class='btn' href='" + link + "' target='_blank'><p><i class='fas fa-desktop'></i> View</p></a><a class='btn' href='" + sourcecode + "' target='_blank'><p><i class='fas fa-code'></i> Source</p></a></div>";

      $(certification.container_id).append(projectHtml);
    }
  }
}

$(document).ready(function() {
  loadProjects();
});
