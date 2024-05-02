const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("teacherId");
  loadTime(param);
  fetch(`https://brainwave-zc9o.onrender.com/teacher/list/${param}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data));
  fetch(
    `https://brainwave-zc9o.onrender.com/teacher/reviews/?teacher_id=${param}`
  )
    .then((res) => res.json())
    .then((reviews) => teacherReview(data));
};
const teacherReview = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById("doc-details-review");
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
const displayDetails = (teacher) => {
  const parent = document.getElementById("doc-details");
  const div = document.createElement("div");
  div.classList.add("doc-details-container");
  div.innerHTML = `
    <div class="teacher-img">
      <img class="" src="${teacher.image}" alt="${teacher.full_name}" />
    </div>
    <div class="doc-info">
      <h1>${teacher.full_name}</h1>
      ${teacher.teaching_area.map((item) => {
        return `<button class="doc-detail-btn">${item}</button>`;
      })}
      ${teacher.designation.map((item) => {
        return `<h4>${item}</h4>`;
      })}
      <p class="w-50">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quibusdam
        quis excepturi tempore. Eius, qui!
      </p>
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
  const param = new URLSearchParams(window.location.search).get("teacherId");
  const status = document.getElementsByName("status");
  const selected = Array.from(status).find((button) => button.checked);
  const Subject_name = document.getElementById("Subject_name").value;
  const time = document.getElementById("time-container");
  const selectedTime = time.options[time.selectedIndex];
  const student_id = localStorage.getItem("student_id");
  const info = {
    appointment_type: selected.value,
    appointment_status: "Pending",
    time: selectedTime.value,
    Subject_name: Subject_name,
    cancel: false,
    student: student_id,
    teacher: param,
  };

  console.log(info);
  fetch("http://127.0.0.1:8000/demo_class/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      // window.location.href = `pdf.html?teacherId=${param}`;
      // handlePdf();
      // console.log(data);
    });
};

const loadstudentId = () => {
  const user_id = localStorage.getItem("user_id");

  fetch(`https://brainwave-zc9o.onrender.com/student/list/?user_id=${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("student_id", data[0].id);
    });
};

loadTime();
getparams();
