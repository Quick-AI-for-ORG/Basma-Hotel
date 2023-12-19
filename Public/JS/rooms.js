function addRoomRow(x) {
  var characteristics = JSON.parse(x);
  var table = document
    .getElementById("roomTable")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.rows.length);

  for (var i = 0; i < 6; i++) {
    var cell = newRow.insertCell(i);
    cell.innerHTML =
      '<input type="text" class="form-control" placeholder="' +
      getPlaceholderText(i) +
      '">';
  }

  var selectElement = document.createElement("select");
  selectElement.classList.add("form-control", "dropdown-content");
  selectElement.multiple = true;

  for (var j = 0; j < characteristics.length; j++) {
    var optionElement = document.createElement("option");
    optionElement.value = characteristics[j].characteristic;
    optionElement.textContent = characteristics[j].characteristic;
    selectElement.appendChild(optionElement);
  }

  var characteristicsCell = newRow.insertCell(6);
  characteristicsCell.appendChild(selectElement);

  var actionsCell = newRow.insertCell(7);
  actionsCell.innerHTML =
    '<div class="btn-group" role="group">' +
    '<button class="btn btn-primary btn-edit" style="margin-right: 10px;" onclick="toggleReadOnly(this)">Edit</button>' +
    '<button class="btn btn-danger" onclick="deleteRoomRow(this)">Delete</button>' +
    "</div>";

  // Show the Save button container only when "Add Room" is clicked
  document.getElementById("saveButtonContainer").style.display = "block";

  // Show the top Save button only when "Add Room" is clicked
  document.getElementById("saveButtonContainer").style.display = "block";
  document.getElementById("saveButton").style.display = "block";
}

// Rest of your code remains unchanged

function getPlaceholderText(index) {
  var placeholders = [
    "Title",
    "Quantity",
    "Starting Price",
    "Capacity",
    "Description",
    "Executive",
  ];
  return placeholders[index] || "";
}

function saveRoomRow() {
  var table = document
    .getElementById("roomTable")
    .getElementsByTagName("tbody")[0];
  var lastRow = table.rows[table.rows.length - 1];

  var cells = lastRow.cells;
  var inputValues = Array.from(cells).map(
    (cell) => cell.querySelector("input").value
  );

  var selectedOptions = lastRow.cells[6].querySelectorAll(
    "select option:checked"
  );
  var characteristics = Array.from(selectedOptions).map(
    (option) => option.value
  );

  if (inputValues.every(Boolean) && characteristics.length > 0) {
    console.log("Saving room data:");
    inputValues.forEach((value, index) =>
      console.log(getPlaceholderText(index) + ": " + value)
    );
    console.log("Characteristics: " + characteristics);

    document.getElementById("saveButtonContainer").style.display = "none";
    makeFieldsReadOnly(cells);
    document.getElementById("errorMessage").innerHTML = "";
  } else {
    document.getElementById("errorMessage").innerHTML =
      "Please fill in all fields before saving.";
  }
}

function deleteRoomRow(button) {
  var row = button.closest("tr");
  row.parentNode.removeChild(row);
  // Show the Save button container only if there is at least one editable field
  enableSaveButton();
}

// function toggleReadOnly(button) {
//   var row = button.closest("tr");
//   var cells = row.cells;

//   for (var i = 0; i < cells.length - 2; i++) {
//     var input = cells[i].querySelector("input");
//     input.readOnly = !input.readOnly;
//   }

//   // Toggle the edit mode class on the row
//   row.classList.toggle("edit-mode");

//   // Change the text of the button to "Save" if in edit mode, and "Edit" otherwise
//   var editButton = row.querySelector(".btn-primary");
//   editButton.textContent = editButton.textContent === "Edit" ? "Save" : "Edit";

//   // Toggle the Save button based on the edit mode
//   toggleSaveButton();
// }

// function toggleSaveButton() {
//   var table = document.getElementById("roomTable");
//   var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

//   var showSaveButton = Array.from(rows).some((row) => {
//     var cells = row.cells;
//     return Array.from(cells)
//       .slice(0, -2)
//       .some((cell) => !cell.querySelector("input").readOnly);
//   });

//   var saveButton = document.getElementById("saveButton");
//   saveButton.textContent = showSaveButton ? "Save All" : "Save Selected";
//   document.getElementById("saveButtonContainer").style.display = showSaveButton
//     ? "block"
//     : "none";
// }

function makeFieldsReadOnly(cells) {
  for (var i = 0; i < cells.length - 2; i++) {
    var input = cells[i].querySelector("input");
    input.readOnly = true;
  }
}

function enableSaveButton() {
  var table = document.getElementById("roomTable");
  var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

  var enableSave = Array.from(rows).some((row) => {
    var cells = row.cells;
    return Array.from(cells)
      .slice(0, -2)
      .some((cell) => !cell.querySelector("input").readOnly);
  });

  document.getElementById("saveButtonContainer").style.display = enableSave
    ? "block"
    : "none";
}

// rooms.js

function toggleReadOnly(button) {
  var row = button.closest("tr");

  // Toggle input fields between readonly and editable
  var inputFields = row.querySelectorAll("input");
  inputFields.forEach(function (input) {
    input.readOnly = !input.readOnly;
  });

  // Change the button text and class
  if (button.textContent == "Edit") {
    button.textContent = "Save";
    button.classList.remove("btn-primary");
    button.classList.add("btn-success");
  } else {
    button.textContent = "Edit";
    button.classList.remove("btn-success");
    button.classList.add("btn-primary");
  }

  // Show or hide the Save button container
  enableSaveButton();
}

function saveRoomRow() {
  // Add logic to save the changes made to the row (e.g., update data on the server)

  // Toggle the input fields and dropdown back to readonly
  var inputFields = document.querySelectorAll("#roomTable input");
  inputFields.forEach(function (input) {
    input.readOnly = true;
  });

  var selectFields = document.querySelectorAll("#roomTable select");
  selectFields.forEach(function (select) {
    select.disabled = true;
  });

  // Change the edit buttons back to their initial state
  var editButtons = document.querySelectorAll(".btn-edit");
  editButtons.forEach(function (button) {
    button.textContent = "Edit";
    button.classList.remove("btn-success");
    button.classList.add("btn-primary");
  });

  // Hide the save button container
  document.getElementById("saveButtonContainer").style.display = "none";
}
