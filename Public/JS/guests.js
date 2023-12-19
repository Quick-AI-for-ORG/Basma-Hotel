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
  enableSaveButton();
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

  // Show the Save button container
  enableSaveButton();
}

function deleteGuestRow(button) {
  var row = button.closest("tr");
  row.parentNode.removeChild(row);

  // Show the Save button container
  enableSaveButton();
}

// function toggleReadOnly(button) {
//   var row = button.closest("tr");
//   var cells = row.cells;

//   for (var i = 0; i < cells.length - 1; i++) {
//     var input = cells[i].querySelector("input");
//     input.readOnly = !input.readOnly;
//   }

//   // Show the Save button container
//   enableSaveButton();
// }

// function makeFieldsReadOnly(cells) {
//   for (var i = 0; i < cells.length - 1; i++) {
//     var input = cells[i].querySelector("input");
//     input.readOnly = true;
//   }
// }

function enableSaveButton() {
  var table = document.getElementById("guestTable");
  var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

  // Check if there is at least one editable field in any row
  var enableSave = false;
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].cells;
    for (var j = 0; j < cells.length - 1; j++) {
      var input = cells[j].querySelector("input");
      if (!input.readOnly) {
        enableSave = true;
        break;
      }
    }
    if (enableSave) {
      break;
    }
  }

  // Show or hide the Save button container based on the flag
  document.getElementById("saveButtonContainer").style.display = enableSave
    ? "block"
    : "none";
}

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
  // enableSaveButton();
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
