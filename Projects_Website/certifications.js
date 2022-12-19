const CODEPEN_LINK = "<a href=\"https://codepen.io/collection/Doeyvj/\" target=\"_blank\"><i class=\"fab fa-codepen\"></i> CodePen</a>";

const CERTIFICATIONS = [
  {
    container_id: "responsive-web-design-certification",
    name: "Responsive Web Design Certification",
    description: `The projects for <a href=\"https://www.freecodecamp.org/certification/jarikmarwede/responsive-web-design\">this certification</a> are hosted on Netlify. Older versions of the projects can be found on ${CODEPEN_LINK}.`,
    projects: [
      {
        name: "Personal Portfolio Webpage",
        link:
            "./Responsive_Web_Design_Certification/Personal_Portfolio_Webpage/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Responsive_Web_Design_Certification/Personal_Portfolio_Webpage"
      },
      {
        name: "Product Landing Page",
        link:
            "./Responsive_Web_Design_Certification/Product_Landing_Page/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Responsive_Web_Design_Certification/Product_Landing_Page"
      },
      {
        name: "Survey Form",
        link: "./Responsive_Web_Design_Certification/Survey_Form/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Responsive_Web_Design_Certification/Survey_Form"
      },
      {
        name: "Technical Documentation Page",
        link:
            "./Responsive_Web_Design_Certification/Technical_Documentation_Page/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Responsive_Web_Design_Certification/Technical_Documentation_Page"
      },
      {
        name: "Tribute Page",
        link: "./Responsive_Web_Design_Certification/Tribute_Page/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Responsive_Web_Design_Certification/Tribute_Page"
      }
    ]
  },
  {
    container_id: "javascript-algorithms-and-data-structures-certification",
    name: "Javascript Algorithms and Data Structures Certification",
    description: "The projects for <a href=\"https://www.freecodecamp.org/certification/jarikmarwede/javascript-algorithms-and-data-structures\" target=\"_blank\">this certification</a> are algorithm challenges which are not in this repository but can be found on <a href=\"https://www.freecodecamp.org/jarikmarwede\" target=\"_blank\">freeCodeCamp</a>.",
    projects: []
  },
  {
    container_id: "front-end-development-libraries-certification",
    name: "Front End Development Libraries Certification",
    description: "The projects for <a href=\"https://www.freecodecamp.org/certification/jarikmarwede/front-end-development-libraries\">this certification</a> are hosted on Netlify.",
    projects: [
      {
        name: "Random Quote Machine",
        link:
            "./Front_End_Libraries_Certification/Random_Quote_Machine/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front_End_Libraries_Certification/Random_Quote_Machine"
      },
      {
        name: "Markdown Previewer",
        link: "./Front_End_Libraries_Certification/Markdown_Previewer/index.html",
        src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front_End_Libraries_Certification/Markdown_Previewer"
      },
      {
        name: "Drum Machine",
        link: "./Front_End_Libraries_Certification/Drum_Machine/index.html",
        src: "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front_End_Libraries_Certification/Drum_Machine"
      },
      {
        name: "JavaScript Calculator",
        link:
            "./Front_End_Libraries_Certification/JavaScript_Calculator/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front_End_Libraries_Certification/JavaScript_Calculator"
      },
      {
        name: "Pomodoro Clock",
        link: "./Front_End_Libraries_Certification/Pomodoro_Clock/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front_End_Libraries_Certification/Pomodoro_Clock"
      }
    ]
  },
  {
    container_id: "back-end-development-and-apis-certification",
    name: "Back End Development and APIs Certification",
    description: "The APIs of the projects for <a href=\"https://www.freecodecamp.org/certification/jarikmarwede/back-end-development-and-apis\">this certification</a> are implemented as serverless functions and hosted on Netlify. Their code can be found in the serverless_functions directory.",
    projects: [
      {
        name: "File Metadata Microservice",
        link:
            "./Back_End_Development_and_APIs_Certification/File_Metadata_Microservice/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Apis_And_Microservices_Certification/File_Metadata_Microservice"
      },
      {
        name: "Request Header Parser Microservice",
        link:
            "./Back_End_Development_and_APIs_Certification/Request_Header_Parser_Microservice/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Apis_And_Microservices_Certification/Request_Header_Parser_Microservice"
      },
      {
        name: "Timestamp Microservice",
        link:
            "./Back_End_Development_and_APIs_Certification/Timestamp_Microservice/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Apis_And_Microservices_Certification/Timestamp_Microservice"
      },
      {
        name: "URL Shortener Microservice",
        link:
            "./Back_End_Development_and_APIs_Certification/URL_Shortener_Microservice/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Apis_And_Microservices_Certification/URL_Shortener_Microservice"
      },
      {
        name: "Exercise Tracker",
        link: "./Back_End_Development_and_APIs_Certification/Exercise_Tracker/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Apis_And_Microservices_Certification/Exercise_Tracker"
      }
    ]
  },
  {
    container_id: "front-end-certification",
    name: "Legacy Front End Certification",
    description: `The projects for <a href=\"https://www.freecodecamp.org/certification/jarikmarwede/legacy-front-end\">this certification</a> are hosted on Netlify. Some projects for this certification are also a part of the <a href=\"#responsive-web-design-certification\">Responsive Web Design Certification</a> and the <a href=\"#front-end-development-libraries-certification\">Front End Libraries Certification</a> and can only be found over there. Older versions of the projects can be found on ${CODEPEN_LINK}.`,
    projects: [
      {
        name: "Local Weather",
        link: "./Front_End_Development_Certification/Local_Weather/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front_End_Development_Certification/Local_Weather"
      },
      {
        name: "Simon Game",
        link: "./Front_End_Development_Certification/Simon_Game/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front_End_Development_Certification/Simon_Game"
      },
      {
        name: "Tic Tac Toe Game",
        link: "./Front_End_Development_Certification/Tic_Tac_Toe_Game/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front_End_Development_Certification/Tic_Tac_Toe_Game"
      },
      {
        name: "Twitch API",
        link: "./Front_End_Development_Certification/Twitch_API/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front_End_Development_Certification/Twitch_API"
      },
      {
        name: "Wikipedia Viewer",
        link: "./Front_End_Development_Certification/Wikipedia_Viewer/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Front_End_Development_Certification/Wikipedia_Viewer"
      }
    ]
  },
  {
    container_id: "back-end-certification",
    name: "Legacy Back End Certification",
    description: "The APIs of the projects for this certification are implemented as serverless functions and hosted on Netlify. Their code can be found in the serverless_functions directory. Some projects for this certification are also part of the <a href=\"#back-end-development-and-apis-certification\">Back End Development and APIs Certification</a> and can only be found over there.",
    projects: [
      {
        name: "Image Search Abstraction Layer",
        link:
            "./Back_End_Development_Certification/Image_Search_Abstraction_Layer/index.html",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Back_End_Development_Certification/Image_Search_Abstraction_Layer"
      },
      {
        name: "Voting App",
        link: "https://jm-voting-app.herokuapp.com",
        src:
            "https://github.com/jarikmarwede/freeCodeCamp-projects/tree/master/Back_End_Development_Certification/Voting_App"
      }
    ]
  }
];

Object.freeze(CERTIFICATIONS);

export { CERTIFICATIONS as default };
