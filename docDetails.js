const loadPatientId = () => {
    const user_id = localStorage.getItem("user_id");
  
    fetch(`https://brainwave-zc9o.onrender.com/student/list/?user_id=${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("student_id", data[0].id);
      });
  };
  
  loadPatientId();