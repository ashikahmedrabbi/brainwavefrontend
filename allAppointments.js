const loadAllAppointment = () => {
    const student_id = localStorage.getItem("student_id");
    fetch(
      `https://brainwave-zc9o.onrender.com/demo_class/?student_id=${student_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.forEach((item) => {
          const parent = document.getElementById("table-body");
          const tr = document.createElement("tr");
          tr.innerHTML = `
              <td>${item.id}</td>
              <td>${item.symptom}</td>
              <td>${item.appointment_type}</td>
            
             
              <td>${item.appointment_status}</td>
              <td>${item.doctor}</td>
              ${
                item.appointment_status == "Pending"
                  ? `<td class="text-danger">X</td>`
                  : `<td ">X</td>`
              }
              <td>1200</td>
             
              `;
          parent.appendChild(tr);
        });
      });
  };
  
  loadAllAppointment();