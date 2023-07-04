const students = [ { ID: 1, name: 'Alice', age: 21, gpa: 8, degree: 'Btech', email: 'alice@example.com' },
 { ID: 2, name: 'Bob', age: 22, gpa: 5, degree: 'MBA', email: 'bob@example.com' }, 
 { ID: 3, name: 'Charlie', age: 20, gpa: 9, degree:'Arts', email: 'charlie@example.com' } 
];
// const students = [
//   {
//     ID: 1,
//     name: "Ram",
//     age: 22,
//     gpa: 8,
//     degree: "Btech",
//     email: "ram@example.com",
//   },
//   {
//     ID: 2,
//     name: "Sita",
//     age: 21,
//     gpa: 9,
//     degree: "MBA",
//     email: "sita@example.com",
//   },
//   {
//     ID: 3,
//     name: "laxman",
//     age: 20,
//     gpa: 7,
//     degree: "Arts",
//     email: "laxman@example.com",
//   },
// ];



  const studentForm = document.getElementById("studentForm");
  const studentTableBody = document.getElementById("studentTableBody");
  const searchInput = document.getElementById("searchInput");

  let editMode = false;
  let currentStudentId = null;

  renderStudents();

  studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("nameInput");
    const ageInput = document.getElementById("ageInput");
    const gpaInput = document.getElementById("gpaInput");
    const degreeInput = document.getElementById("degreeInput");
    const emailInput = document.getElementById("emailInput");

    const name = nameInput.value;
    const age = parseInt(ageInput.value);
    const gpa = parseFloat(gpaInput.value);
    const degree = degreeInput.value;
    const email = emailInput.value;

    if (editMode) {
      updateStudent(currentStudentId, name, age, gpa, degree, email);
    } else {
      addStudent(name, age, gpa, degree, email);
    }

    studentForm.reset();
    editMode = false;
    currentStudentId = null;
    renderStudents();
  });

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredStudents = students.filter(function (student) {
      return (
        student.name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.degree.toLowerCase().includes(searchTerm)
      );
    });
    renderStudents(filteredStudents);
  });

  function renderStudents(studentsArray = students) {
    studentTableBody.innerHTML = "";

    studentsArray.forEach(function (student) {
      const row = document.createElement("tr");

      const idCell = document.createElement("td");
      idCell.innerText = student.ID;
      row.appendChild(idCell);

      const nameCell = document.createElement("td");
      nameCell.innerText = student.name;
      row.appendChild(nameCell);

      const emailCell = document.createElement("td");
      emailCell.innerText = student.email;
      row.appendChild(emailCell);

      const ageCell = document.createElement("td");
      ageCell.innerText = student.age;
      row.appendChild(ageCell);

      const gpaCell = document.createElement("td");
      gpaCell.innerText = student.gpa;
      row.appendChild(gpaCell);

      const degreeCell = document.createElement("td");
      degreeCell.innerText = student.degree;
      row.appendChild(degreeCell);


      const actionsCell = document.createElement("td");

      const editButton = document.createElement("button");
      
      editButton.style.backgroundColor="black";
      editButton.style.border="none"
    
 const img1 = document.createElement("img");

 
 img1.src = "./images/edit.png";

 
 img1.alt = "Image";



 editButton.appendChild(img1);
      editButton.addEventListener("click", function () {
        fillFormForEdit(student);
      });
      actionsCell.appendChild(editButton);

      const deleteButton = document.createElement("button");
         deleteButton.id="imageContainer";
         deleteButton.style.backgroundColor="black";
         deleteButton.style.border="none"
    
    const img = document.createElement("img");

    img.src = "./images/trash.png";

    img.alt = "trash";

    deleteButton.appendChild(img);
      deleteButton.addEventListener("click", function () {
        deleteStudent(student.ID);
        renderStudents();
      });
      actionsCell.appendChild(deleteButton);

      row.appendChild(actionsCell);

      studentTableBody.appendChild(row);
    });
  }
//Add student function
  function addStudent(name, age, gpa, degree, email) {
    const newStudent = {
      ID: students.length + 1,
      name: name,
      age: age,
      gpa: gpa,
      degree: degree,
      email: email
    };

    students.push(newStudent);
  }
//edit details
  function updateStudent(studentId, name, age, gpa, degree, email) {
    const student = students.find(function (student) {
      return student.ID === studentId;
    });

    if (student) {
      student.name = name;
      student.age = age;
      student.gpa = gpa;
      student.degree = degree;
      student.email = email;
    }
  }
//delete details
  function deleteStudent(studentId) {
    const index = students.findIndex(function (student) {
      return student.ID === studentId;
    });

    if (index !== -1) {
      students.splice(index, 1);
    }
  }
// updit details fill
  function fillFormForEdit(student) {
    const nameInput = document.getElementById("nameInput");
    const ageInput = document.getElementById("ageInput");
    const gpaInput = document.getElementById("gpaInput");
    const degreeInput = document.getElementById("degreeInput");
    const emailInput = document.getElementById("emailInput");

    nameInput.value = student.name;
    ageInput.value = student.age;
    gpaInput.value = student.gpa;
    degreeInput.value = student.degree;
    emailInput.value = student.email;

    submitButton.innerText = "Edit Student";
    cancelButton.style.display = "inline-block";
    editMode = true;
    currentStudentId = student.ID;
  }

  cancelButton.addEventListener("click", function () {
    studentForm.reset();
    editMode = false;
    currentStudentId = null;
    submitButton.innerText = "Add Student";
    cancelButton.style.display = "none";
  });