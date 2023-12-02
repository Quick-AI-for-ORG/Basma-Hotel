function addGuestRow() {
  var table = document
    .getElementById("guestTable")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.rows.length);

  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);
  var cell6 = newRow.insertCell(5);
  var cell7 = newRow.insertCell(6);
  var cell8 = newRow.insertCell(7);
  var cell9 = newRow.insertCell(8);

  cell1.innerHTML =
    '<input type="text" class="form-control" placeholder="First Name">';
  cell2.innerHTML =
    '<input type="text" class="form-control" placeholder="Last Name">';
  cell3.innerHTML =
    '<input type="text" class="form-control" placeholder="Email">';
  cell4.innerHTML =
    '<input type="text" class="form-control" placeholder="Password">';
  cell5.innerHTML =
    '<input type="text" class="form-control" placeholder="Phone">';
  cell6.innerHTML =
    '<input type="text" class="form-control" placeholder="Role">';
  cell7.innerHTML =
    '<input type="text" class="form-control" placeholder="Bio">';
  cell8.innerHTML =
    '<input type="text" class="form-control" placeholder="Address">';
  cell9.innerHTML =
    '<div class="btn-group" role="group">' +
    '<button class="btn btn-primary" style="margin-right: 10px;" onclick="toggleReadOnly(this)">Edit</button>' +
    '<button class="btn btn-danger" onclick="deleteGuestRow(this)">Delete</button>' +
    "</div>";

  // Show the Save button container
  document.getElementById("saveButtonContainer").style.display = "block";
}

function saveGuestRow() {
  var table = document
    .getElementById("guestTable")
    .getElementsByTagName("tbody")[0];
  var lastRow = table.rows[table.rows.length - 1];

  var firstName = lastRow.cells[0].querySelector("input").value;
  var lastName = lastRow.cells[1].querySelector("input").value;
  var email = lastRow.cells[2].querySelector("input").value;
  var password = lastRow.cells[3].querySelector("input").value;
  var phone = lastRow.cells[4].querySelector("input").value;

  // Check if all fields are filled
  if (firstName && lastName && email && password && phone) {
    // You can now save the data or perform any other actions with the data
    console.log("Saving guest data:");
    console.log("First Name: " + firstName);
    console.log("Last Name: " + lastName);
    console.log("Email: " + email);
    console.log("Password: " + password);
    console.log("Phone: " + phone);

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

function deleteGuestRow(button) {
  var row = button.closest("tr");
  row.parentNode.removeChild(row);
}

function toggleReadOnly(button) {
  var row = button.closest("tr");
  var cells = row.cells;

  for (var i = 0; i < cells.length - 1; i++) {
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
