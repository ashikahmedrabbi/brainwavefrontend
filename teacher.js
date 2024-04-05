const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("teacherId");
    
    fetch(`https://brainwave-zc9o.onrender.com/teacher/list/${param}`)
      .then((res) => res.json())
      .then((data) => displayDetails(data));

      fetch(`https://brainwave-zc9o.onrender.com/teacher/reviews/?teacher_id=${param}`)
      .then((res) => res.json())
      .then((data) => teacherReview(data));
  };
  
  const teacherReview = (reviews) => {
    reviews.forEach((review) => {
      const parent = document.getElementById("doc-details-review");
      const div = document.createElement("div");
      div.classList.add("review-card");
      div.innerHTML = `
            
                <h4>${review.reviewer}</h4>
                <h4>${review.teacher}
                <p>
                 ${review.body.slice(0, 100)}
                </p>
                <h6>${review.rating}</h6>
            `;
      parent.appendChild(div);
    });
  };
  
  const displayDetails = (teacher) => {
    console.log(teacher);
    const parent = document.getElementById("doc-details");
    const div = document.createElement("div");
    div.classList.add("doc-details-container");
    div.innerHTML = `
      <div class="teacher-img ">
      <img class="img-thumbnail" src=${teacher.image} alt="" />
    </div>
    <div class="doc-info">
      <h1>${teacher.full_name} </h1>
      ${teacher.teaching_area.map((item) => {
        return `<button class="doc-detail-btn">${item}</button>`;
      })}
      ${teacher.designation.map((item) => {
        return `<h4 >${item}</h4>`;
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
     Take Appointment
    </button>
    </div>
      `;
    parent.appendChild(div);
  };
  
  
getparams();

