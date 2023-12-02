function addcharecteristicsRow() {
  var table = document
    .getElementById("roomTable")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.rows.length);

  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);

  cell1.innerHTML =
    '<input type="text" class="form-control" placeholder="Charecteristic">';
  cell2.innerHTML =
    '<input type="text" class="form-control" placeholder="Icon">';
  cell3.innerHTML =
    '<div class="btn-group" role="group">' +
    '<button class="btn btn-primary" style="margin-right: 10px;" onclick="toggleReadOnly(this)">Edit</button>' +
    '<button class="btn btn-danger" onclick="deleteRoomRow(this)">Delete</button>' +
    "</div>";

  // Show the Save button container
  document.getElementById("saveButtonContainer").style.display = "block";
}

function saveCharecteristicRow() {
  var table = document
    .getElementById("roomTable")
    .getElementsByTagName("tbody")[0];
  var lastRow = table.rows[table.rows.length - 1];

  var Charecteristic = lastRow.cells[0].querySelector("input").value;
  var icon = lastRow.cells[1].querySelector("input").value;

  // Check if all fields are filled
  if (Charecteristic && icon) {
    // You can now save the data or perform any other actions with the data
    console.log("Saving Charecteristics data:");
    console.log("Charecteristic: " + Charecteristic);
    console.log("icon: " + icon);

    // Hide the Save button container after saving
    document.getElementById("saveButtonContainer").style.display = "none";

    // Make the fields read-only
    makeFieldsReadOnly(lastRow.cells);

    // Clear the error message
    document.getElementById("errorMessage").innerHTML = "";
  } else {
    document.getElementById("errorMessage").innerHTML =
      "Please fill in all fields before saving.";
  }
}

function deleteCharecteristicRow(button) {
  var row = button.closest("tr");
  row.parentNode.removeChild(row);
}

function toggleReadOnly(button) {
  var row = button.closest("tr");
  var cells = row.cells;

  for (var i = 0; i < cells.length - 2; i++) {
    // Exclude the last cell (buttons)
    var input = cells[i].querySelector("input");
    input.readOnly = !input.readOnly;
  }
}

function makeFieldsReadOnly(cells) {
  for (var i = 0; i < cells.length - 1; i++) {
    var input = cells[i].querySelector("input");
    input.readOnly = true;
  }
}
