const loadServices = () => {
  fetch("https://brainwave-zc9o.onrender.com/service/")
    // fetch("https://testing-8az5.onrender.com/services/")
    .then((res) => res.json())
    .then((data) => displayService(data))
    .catch((err) => console.log(err));
};

const displayService = (services) => {
  services.forEach((service) => {
    const parent = document.getElementById("service-container");
    const li = document.createElement("li");
    li.innerHTML = `
        <div class="card shadow h-100">
                  <div class="ratio ratio-16x9">
                    <img
                      src=${service.image}
                      class="card-img-top"
                      loading="lazy"
                      alt="..."
                    />
                  </div>
                  <div class="card-body p-3 p-xl-5">
                    <h3 class="card-title h5">${service.name}</h3>
                    <p class="card-text">
                      ${service.description.slice(0, 140)}
                    </p>
                    <a href="#" class="btn btn-primary">Details</a>
                  </div>
                </div>
        `;
    parent.appendChild(li);
  });
};

const loadteachers = (search) => {
  document.getElementById("teachers").innerHTML = "";
  document.getElementById("spinner").style.display = "block";
  console.log(search);
  fetch(
    `https://brainwave-zc9o.onrender.com/teacher/list/?search=${
      search ? search : ""
    }`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.results.length > 0) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "none";
        displyteachers(data?.results);
      } else {
        document.getElementById("teachers").innerHTML = "";
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "block";
      }
    });
};

const displyteachers = (teachers) => {
  teachers?.forEach((teacher) => {
    const parent = document.getElementById("teachers");
    const div = document.createElement("div");
    // div.classList.add("doc-card");
    div.innerHTML = `
    
         

    <div class="col ">
    <div class="card mt-4 ">
      <img
        src=${teacher.image}
        class="card-img-top img-thumbnail doc-img" width="300" height="100"
        alt="..."
      />
      <div class="card-body">
        
        <div class="d-flex justify-content-between align-items-center card-title px-2">
        <div>
        <h5>${teacher?.full_name}</h5>
      </div>
      <div>
      <p class="mt-2 fw-bold">${teacher?.designation[0]}</p>
      </div>
        </div>
        <div class="px-3">
        <p class="">
        This is a longer card with supporting text below as a natural
        lead-in to additional content. This content is a little bit
        longer.
      </p>
      <p>
                
      ${teacher?.teaching_area?.map((item) => {
        return `<button class=" btn btn-outline-info my-1 px-1">${item}</button>`;
      })}
      </p>
        
      <button type="button" class="text-black btn btn-light  mb-4">
      <a  class="text-decoration-none" target="_blank" href="teacher.html?id=${
        teacher.id
      }">Details <i class="fa-solid fa-arrow-right"></i></a> 
      </button>

    </div>
      </div>
    </div>
  </div>

        `;

    parent.appendChild(div);
  });
};

const loadDesignation = () => {
  fetch("https://brainwave-zc9o.onrender.com/teacher/designation/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("drop-deg");
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        li.innerHTML = `
            <li onclick="loadteachers('${item.name}')"> ${item.name}</li>
              `;
        parent.appendChild(li);
      });
    });
};
const loadSpecialization = () => {
  fetch("https://brainwave-zc9o.onrender.com/teacher/teachingarea/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("drop-spe");
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        li.innerHTML = `
            <li onclick="loadteachers('${item.name}')"> ${item.name}</li>
              `;
        parent.appendChild(li);
      });
    });
};

const handleSearch = () => {
  const value = document.getElementById("search").value;
  loadteachers(value);
};

const loadReview = () => {
  fetch("https://brainwave-zc9o.onrender.com/teacher/reviews/")
    .then((res) => res.json())
    .then((data) => displayReview(data));
};

const displayReview = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById("review-container");
    const div = document.createElement("div");
    div.classList.add("review-card");
    div.innerHTML = `
            
            <h4>${review.reviewer}</h4>
            
            <p>
             ${review.body.slice(0, 100)}
            </p>
            <h6>${review.rating}</h6>
        `;
    parent.appendChild(div);
  });
};

const handleLogin = (event) => {
  event.preventDefault();
  const username = getValue("login-username");
  const password = getValue("login-password");
  console.log(username, password);
  if ((username, password)) {
    fetch("https://brainwave-zc9o.onrender.com/student/login/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.token && data.user_id) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);
          window.location.href = "index.html";
        }
      });
  }
};

// --------------------------------------------------------------------------------//

// Check if the user is logged in
const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return token !== null; // Assuming you store a token in localStorage when the user is logged in
};

// Function to toggle visibility of login/logout buttons
const toggleNavbarButtons = () => {
  const loginButton = document.getElementById("loginButton");
  const logoutButton = document.getElementById("logoutButton");

  if (isLoggedIn()) {
    // If user is logged in, show logout button and hide login button
    logoutButton.style.display = "block";
    loginButton.style.display = "none";
  } else {
    // If user is not logged in, show login button and hide logout button
    logoutButton.style.display = "none";
    loginButton.style.display = "block";
  }
};

// Call the toggleNavbarButtons function when the page loads
document.addEventListener("DOMContentLoaded", toggleNavbarButtons);

// Optionally, you can also call toggleNavbarButtons whenever a user logs in or logs out
// For example, after a successful login or logout operation

// --------------------------------------------------------------------------------//

loadDesignation();
loadSpecialization();
loadServices();
loadteachers();
loadReview();
