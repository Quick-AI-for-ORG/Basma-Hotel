function addCharacteristicsRow() {
  var table = document
    .getElementById("roomTable")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.rows.length);

  // Create grid columns for each cell
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);

  // Add a custom class to the grid columns
  cell1.className = "custom-col";
  cell2.className = "custom-col";
  cell3.className = "custom-col";

  // Insert form controls inside the grid columns
  cell1.innerHTML =
    '<input type="text" class="form-control" placeholder="Characteristic">';
  cell2.innerHTML =
    '<input type="text" class="form-control" style="font-size: large;" placeholder="Icon">';
  cell3.innerHTML =
    '<div class="btn-group d-flex justify-content-center"" role="group">' +
    '<button class="btn btn-primary" style="margin-right: 10px;" onclick="toggleReadOnly(this)">Edit</button>' +
    '<button class="btn btn-danger" onclick="deleteCharacteristicRow(this)">Delete</button>' +
    "</div>";

  document.getElementById("saveButtonContainer").style.cssText =
    "display: block; margin-right: 70px;";
}

function saveCharacteristicRow() {
  var table = document
    .getElementById("roomTable")
    .getElementsByTagName("tbody")[0];
  var lastRow = table.rows[table.rows.length - 1];

  var characteristic = lastRow.cells[0].querySelector("input").value;
  var iconInput = lastRow.cells[1].querySelector("input");
  var icon = iconInput.value;

  if (characteristic && icon) {
    console.log("Saving Characteristics data:");
    console.log("Characteristic: " + characteristic);
    console.log("Icon: " + icon);

    // Create a new <i> element
    var iconElement = document.createElement("i");
    iconElement.className = "fa-solid fa-" + icon;

    // Replace the content of the <td> with the <i> element
    lastRow.cells[1].innerHTML = "";
    lastRow.cells[1].appendChild(iconElement);

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
