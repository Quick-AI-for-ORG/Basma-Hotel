function addReservationRow() {
  var tableBody = document.querySelector(".projects-table tbody");

  var newRow = tableBody.insertRow();

  var placeholders = [
    "Room Title",
    "Guest Email",
    "Arrival Date",
    "Departure Date",
    "Price",
    "Adults",
    "Children",
    "Payment Status",
    "Options",
  ];
  for (var i = 0; i < placeholders.length; i++) {
    var cell = newRow.insertCell(i);
    cell.innerHTML =
      '<input type="text" class="form-control" placeholder="' +
      placeholders[i] +
      '">';
  }

  var actionsCell = newRow.insertCell(placeholders.length);
  actionsCell.innerHTML =
    '<div class="btn-group" role="group">' +
    '<button class="btn btn-primary btn-edit" style="margin-right: 10px;" onclick="toggleReadOnly(this)">Edit</button>' +
    '<button class="btn btn-danger" onclick="deleteReservationRow(this)">Delete</button>' +
    "</div>";

  document.getElementById("saveButtonContainer").style.display = "block";
}

function saveReservationRow() {
  console.log("Save reservation button clicked!");

  var table = document
    .querySelector(".projects-table")
    .getElementsByTagName("tbody")[0];
  console.log("Table:", table);
  var lastRow = table.rows[table.rows.length - 1];

  var cells = lastRow.cells;
  var inputValues = Array.from(cells).map(
    (cell) => cell.querySelector("input").value
  );

  if (inputValues.every(Boolean)) {
    console.log("Saving reservation data:");
    inputValues.forEach((value, index) =>
      console.log("Field " + (index + 1) + ": " + value)
    );

    makeFieldsReadOnly(cells);
    document.getElementById("saveButtonContainer").style.display = "none";
  } else {
    let errorMessage = document.getElementById("errorMessage");
    errorMessage.style.display = "block";
    errorMessage.style.color = "red";
    errorMessage.innerHTML = "Please fill in all fields before saving.";
  }
}

function deleteReservationRow(button) {
  var row = button.closest("tr");
  row.parentNode.removeChild(row);
  enableSaveButton();
}

function toggleReadOnly(button) {
  var row = button.closest("tr");
  var cells = row.cells;

  for (var i = 0; i < cells.length - 1; i++) {
    var input = cells[i].querySelector("input");
    input.readOnly = !input.readOnly;
  }

  row.classList.toggle("edit-mode");

  var editButton = row.querySelector(".btn-primary");
  editButton.textContent = editButton.textContent === "Edit" ? "Save" : "Edit";
}

function makeFieldsReadOnly(cells) {
  for (var i = 0; i < cells.length - 1; i++) {
    // Exclude the last cell with buttons
    var input = cells[i].querySelector("input");
    input.readOnly = true;
  }
}

function enableSaveButton() {
  var table = document.getElementById("reservationsTable");
  var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

  var enableSave = Array.from(rows).some((row) => {
    var cells = row.cells;
    return Array.from(cells)
      .slice(0, -1) // Exclude the last cell with buttons
      .some((cell) => !cell.querySelector("input").readOnly);
  });

  document.getElementById("saveButtonContainer").style.display = enableSave
    ? "block"
    : "none";
}
