function addCharacteristicsRow() {
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

  document.getElementById("saveButtonContainer").style.display = "block";
}

function saveCharacteristicRow() {
  var table = document
    .getElementById("roomTable")
    .getElementsByTagName("tbody")[0];
  var lastRow = table.rows[table.rows.length - 1];

  var characteristic = lastRow.cells[0].querySelector("input").value; // Corrected attribute name
  var icon = lastRow.cells[1].querySelector("input").value;

  if (characteristic && icon) {
    console.log("Saving Characteristics data:");
    console.log("Characteristic: " + characteristic); // Corrected variable name
    console.log("icon: " + icon);

    document.getElementById("saveButtonContainer").style.display = "none";

    makeFieldsReadOnly(lastRow.cells);

    document.getElementById("errorMessage").innerHTML = "";
  } else {
    document.getElementById("errorMessage").innerHTML =
      "Please fill in all fields before saving.";
  }
}

function deleteCharacteristicRow(button) {
  var row = button.closest("tr");
  row.parentNode.removeChild(row);
}

function toggleReadOnly(button) {
  var row = button.closest("tr");
  var cells = row.cells;

  for (var i = 0; i < cells.length - 2; i++) {
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
