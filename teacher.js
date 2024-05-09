const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("id");
  loadTime(param);
  fetch(`https://brainwave-zc9o.onrender.com/teacher/list/${param}`)
      .then((res) => res.json())
      .then((data) => displayDetails(data));
  fetch(
      `https://brainwave-zc9o.onrender.com/teacher/reviews/?id=${param}`
  )
      .then((res) => res.json())
      
};

// const teacherReview = (reviews) => {
//   reviews.forEach((review) => {
//       const parent = document.getElementById("doc-details-review");
//       const div = document.createElement("div");
//       div.classList.add("review-card");
//       div.innerHTML = `
//           <h4>${review.reviewer}</h4>
//           <p>${review.body.slice(0, 100)}</p>
//           <h6>${review.rating}</h6>
//       `;
//       parent.appendChild(div);
//   });
// };

const displayDetails = (teacher) => {
  const parent = document.getElementById("doc-details");
  const div = document.createElement("div");
  div.classList.add("doc-details-container");
  div.innerHTML = `
      <div class="teacher-img">
          <img class="" src="${teacher.image}" alt="${teacher.full_name}" />
      </div>
      <div class="doc-info">
        <h4> Id: ${teacher.id}</h4>
          <h1>${teacher.full_name}</h1>
          ${teacher.designation.map((item) => {
              return `<h4>${item}</h4>`;
          })}
          <p class="w-100">
          A teacher, also called a schoolteacher or formally an educator, is a person who helps students to acquire knowledge, competence, or virtue, via the practice of teaching. Informally the role of teacher may be taken on by anyone. 
          </p>
        
        
        ${teacher.teaching_area.map((item) => {
            return `<button class="doc-detail-btn">${item}</button>`;
        })}
          <h4>Fees: ${teacher.fee} BDT</h4>
          <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
          >
              Request a Free Class
          </button>
      </div>
  `;
  parent.appendChild(div);
};


const loadTime = (id) => {
    fetch(
      `https://brainwave-zc9o.onrender.com/teacher/available_time/?teacher_id=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
          const parent = document.getElementById("time-container");
          const option = document.createElement("option");
          option.value = item.id;
          option.innerText = item.name;
          parent.appendChild(option);
        });
        console.log(data);
      });
  };



const handleAppointment = () => {
    const param = new URLSearchParams(window.location.search).get('id');
  
    const status = document.querySelector('input[name="status"]:checked').value;
    const subjectName = document.getElementById("Subject_name").value;
    const time = document.getElementById("time-container").value;
  
    const info = {
        class_types: status,
        class_status: "Pending",
        time: time,
        Subject: subjectName, 
        cancel: false,
        student: 1,
        teacher: param,
    };
    console.log(info);
    fetch("https://brainwave-zc9o.onrender.com/demo_class/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = `pdf.html?doctorId=${param}`;
        // handlePdf();
        // console.log(data);
      });
  };


loadTime();
getparams();
