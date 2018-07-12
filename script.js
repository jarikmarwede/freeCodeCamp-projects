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

function loadProjects() {
  for (let i = 0; i < FRONT_END_PROJECTS.length; i++) {
    let name = FRONT_END_PROJECTS[i].name;
    let link = FRONT_END_PROJECTS[i].link;
    let sourcecode = FRONT_END_PROJECTS[i].src;
    html = "<div class='project-card'><p class='project-name'>" + name + "</p><a class='btn' href='" + link + "' target='_blank'><p><i class='fas fa-desktop'></i> View</p></a><a class='btn' href='" + sourcecode + "' target='_blank'><p><i class='fas fa-code'></i> Source</p></a></div>";
    $("#front-end-projects").append(html);
  }
}

$(document).ready(function() {
  loadProjects();
});
