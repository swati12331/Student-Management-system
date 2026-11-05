let students = JSON.parse(localStorage.getItem("students")) || [];

const nameInput = document.getElementById("name");
const rollInput = document.getElementById("roll");
const emailInput = document.getElementById("email");
const courseInput = document.getElementById("course");

const addBtn = document.getElementById("addBtn");
const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("search");

// Display students
function displayStudents(data = students) {

    studentList.innerHTML = "";

    data.forEach((student) => {

        const row = document.createElement("tr");

        [student.name, student.roll, student.email, student.course]
            .forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        const actionCell = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editStudent(student.roll);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.backgroundColor = "red";
        deleteBtn.onclick = () => deleteStudent(student.roll);

        actionCell.append(editBtn, deleteBtn);
        row.appendChild(actionCell);

        studentList.appendChild(row);
    });
}

// Add student
addBtn.addEventListener("click", function() {

    const name = nameInput.value.trim();
    const roll = rollInput.value.trim();
    const email = emailInput.value.trim();
    const course = courseInput.value.trim();

    if (!name || !roll || !email || !course) {
        alert("Please fill all fields!");
        return;
    }

    const exists = students.some(s => s.roll === roll);

    if (exists) {
        alert("Roll Number already exists!");
        return;
    }

    const student = { name, roll, email, course };

    students.push(student);

    saveData();
    displayStudents();

    nameInput.value = "";
    rollInput.value = "";
    emailInput.value = "";
    courseInput.value = "";

    alert("Student added successfully!");
});

// Save data
function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
}

// Delete student
function deleteStudent(roll) {

    if (confirm("Are you sure you want to delete?")) {

        students = students.filter(s => s.roll !== roll);

        saveData();
        displayStudents();
    }
}

// Edit student
function editStudent(roll) {

    const student = students.find(s => s.roll === roll);

    const newRoll=prompt("Enter new roll number:",student.roll);
    if(newRoll===null) return

    const newName = prompt("Enter new name:", student.name);
    if (newName === null) return;

    const newEmail = prompt("Enter new email:", student.email);
    if (newEmail === null) return;

    const newCourse = prompt("Enter new course:", student.course);
    if (newCourse === null) return;

    if (!newName.trim() || !newRoll.trim() || ! newEmail.trim()||
     !newCourse.trim()) {
        alert("Fields cannot be empty!");
        return;
    }

    student.name = newName.trim();
    student.email = newEmail.trim();
    student.course = newCourse.trim();
    student.roll = newRoll.trim();

    saveData();
    displayStudents();

    alert("Student updated successfully!");
}

// Search student
searchInput.addEventListener("input", function() {


    const searchValue = searchInput.value.toLowerCase();

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchValue) ||
        student.roll.toLowerCase().includes(searchValue)
    );

    displayStudents(filteredStudents);
});

// Load saved students
displayStudents();