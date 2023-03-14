if (
    window.location.pathname === "/index.html" ||
    window.location.pathname === "/"
  ) {
    fetch("https://640e94b7cde47f68db32e71f.mockapi.io/users")
      .then((data) => data.json())
      .then((res) => {
        let tableBody = document.getElementById("tableBody");
        res.forEach((data, index) => {
          let row = document.createElement("tr");
          let sno = document.createElement("td");
          sno.innerText = index + 1;
          row.appendChild(sno);
          Object.keys(data).forEach((key) => {
            if (key !== "skills" && key !== "id") {
              let cell = document.createElement("td");
              cell.innerText = data[key];
              row.appendChild(cell);
            }
          });
          let action = document.createElement("td");
          action.innerHTML = `<button class="btn btn-warning" onclick="navigateEdit(${data.id})"><i class="fa-sharp fa-solid fa-pen"></i></button><button class="btn btn-danger ms-2" onclick="deleteUser(${data.id})"><i class="fa-sharp fa-solid fa-trash"></i></button>`;
          row.appendChild(action);
          tableBody.appendChild(row);
        });
      });
  } else if (window.location.pathname === "/update.html") {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    fetch("https://640e94b7cde47f68db32e71f.mockapi.io/users/" + id)
      .then((data) => data.json())
      .then((res) => {
        document.getElementById("id").value = res.id;
        document.getElementById("firstName").value = res.firstName;
        document.getElementById("lastName").value = res.lastName;
        let element = document.querySelectorAll(".checkbox");
  
        for (let i = 0; i < element.length; i++) {
          if (res.skills.length > 0) {
            for (let j of res.skills) {
              if (element[i].id === j) {
                element[i].checked = true;
              }
            }
          }
        }
        document.getElementById(res.gender).checked = true;
        document.getElementById("branch").value = res.branch;
      });
  }
  function navigateEdit(id) {
    window.location.replace("/update.html?id=" + id);
  }
  function deleteUser(id) {
    fetch("https://640e94b7cde47f68db32e71f.mockapi.io/users/" + id, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then((res) => window.location.reload());
  }
  
  function createUser(e) {
    e.preventDefault();
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let gender = document.querySelector(".radio:checked").id;
    let checkboxValue = document.querySelectorAll(".checkbox:checked");
    let skills = [];
    checkboxValue.forEach((value) => (skills = [...skills, value.id]));
    //   for (let data of checkboxValue) {
    //     skills = [...skills, data.id];
    //   }
  
    let branch = document.getElementById("branch").value;
    let obj = { firstName, lastName, gender, skills, branch };
    let id = document.getElementById("id").value;
    if (id === "0") {
      fetch("https://640e94b7cde47f68db32e71f.mockapi.io/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((data) => data.json())
        .then((res) => window.location.replace("/"));
    } else {
      fetch("https://640e94b7cde47f68db32e71f.mockapi.io/users/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((data) => data.json())
        .then((res) => window.location.replace("/"));
    }
  }