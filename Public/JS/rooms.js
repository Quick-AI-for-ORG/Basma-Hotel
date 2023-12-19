function addRoomRow(x) {
  var characteristics = JSON.parse(x);

  // Assuming cell7 is the cell where you want to insert the <select> element
  var table = document
    .getElementById("roomTable")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.rows.length);

  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);
  var cell6 = newRow.insertCell(5);
  var cell7 = newRow.insertCell(6); // Replace with the correct index
  var cell8 = newRow.insertCell(7);

  cell1.innerHTML =
    '<input type="text" class="form-control" placeholder="Title">';
  cell2.innerHTML =
    '<input type="text" class="form-control" placeholder="Quantity">';
  cell3.innerHTML =
    '<input type="text" class="form-control" placeholder="Starting Price">';
  cell4.innerHTML =
    '<input type="text" class="form-control" placeholder="Capacity">';
  cell5.innerHTML =
    '<input type="text" class="form-control" placeholder="Description">';
  cell6.innerHTML =
    '<input type="text" class="form-control" placeholder="Executive">';

  var selectElement = document.createElement("select");
  selectElement.classList.add("form-control", "dropdown-content");
  selectElement.multiple = true;
  for (let j = 0; j < characteristics.length; j++) {
    var optionElement = document.createElement("option");
    optionElement.value = characteristics[j].characteristic;
    optionElement.textContent = characteristics[j].characteristic;
    selectElement.appendChild(optionElement);
  }

  cell7.appendChild(selectElement);

  cell8.innerHTML =
    '<div class="btn-group" role="group">' +
    '<button class="btn btn-primary" style="margin-right: 10px;" onclick="toggleReadOnly(this)">Edit</button>' +
    '<button class="btn btn-danger" onclick="deleteRoomRow(this)">Delete</button>' +
    "</div>";

  // Show the Save button container
  cell8.innerHTML =
    '<div class="btn-group" role="group">' +
    '<button class="btn btn-primary" style="margin-right: 10px;" onclick="toggleReadOnly(this)">Edit</button>' +
    '<button class="btn btn-danger" onclick="deleteRoomRow(this)">Delete</button>' +
    "</div>";

  // Show the Save button container
  document.getElementById("saveButtonContainer").style.display = "block";
}

function saveRoomRow() {
  var table = document
    .getElementById("roomTable")
    .getElementsByTagName("tbody")[0];
  var lastRow = table.rows[table.rows.length - 1];

  var title = lastRow.cells[0].querySelector("input").value;
  var quantity = lastRow.cells[1].querySelector("input").value;
  var startingPrice = lastRow.cells[2].querySelector("input").value;
  var capacity = lastRow.cells[3].querySelector("input").value;
  var description = lastRow.cells[4].querySelector("input").value;
  var executive = lastRow.cells[5].querySelector("input").value;

  // Use querySelectorAll to get all selected options
  var selectedOptions = lastRow.cells[6].querySelectorAll(
    "select option:checked"
  );
  // Create an array to store the selected values
  var characteristics = Array.from(selectedOptions).map(
    (option) => option.value
  );

  // Check if all fields are filled
  if (
    title &&
    quantity &&
    startingPrice &&
    capacity &&
    description &&
    executive &&
    characteristics.length > 0
  ) {
    // You can now save the data or perform any other actions with the data
    console.log("Saving room data:");
    console.log("Title: " + title);
    console.log("Quantity: " + quantity);
    console.log("Starting Price: " + startingPrice);
    console.log("Capacity: " + capacity);
    console.log("Description: " + description);
    console.log("Executive: " + executive);
    console.log("Characteristics: " + characteristics);

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

function deleteRoomRow(button) {
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
  for (var i = 0; i < cells.length - 2; i++) {
    // Exclude the last cell (buttons)
    var input = cells[i].querySelector("input");
    input.readOnly = true;
  }
}
