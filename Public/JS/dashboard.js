function addReservationRow(optionst) {
  var tableBody = document.querySelector(".projects-table tbody");

  var newRow = tableBody.insertRow();
  // var maxWidth = "1500%";
  newRow.style.maxWidth = "55%";
  // var tableContainer = document.querySelector(".table-container");

  // tableContainer.style.maxWidth = maxWidth;
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
  var cellWidths = [
    "8%", // Room Title
    "8%", // Guest Email
    "8%", // Arrival Date
    "8%", // Departure Date
    "8%", // Price
    "8%", // Adults
    "8%", // Children
    "8%", // Payment Status
    "8%", // Options
  ];

  const options = JSON.parse(optionst);
  for (var i = 0; i < placeholders.length; i++) {
    var cell = newRow.insertCell(i);
    cell.style.width = cellWidths[i];
    if (placeholders[i] == "Options") {
      var selectElement = document.createElement("select");
      selectElement.name = "options";
      selectElement.classList.add("form-control", "dropdown-content");
      selectElement.multiple = true;
      for (var j = 0; j < options.length; j++) {
        var optionElement = document.createElement("option");
        optionElement.value = options[j].option;
        optionElement.textContent = options[j].option;
        selectElement.appendChild(optionElement);
      }
      cell.appendChild(selectElement);
      continue;
    }
    if (placeholders[i] == "Payment Status") {
      var selectElement = document.createElement("select");
      selectElement.classList.add("form-control", "dropdown-content");
      selectElement.multiple = false;
      var optionElement = document.createElement("option");
      optionElement.value = "Paid";
      optionElement.textContent = "Paid";
      selectElement.appendChild(optionElement);
      optionElement = document.createElement("option");
      optionElement.value = "Not Paid";
      optionElement.textContent = "Not Paid";
      selectElement.appendChild(optionElement);
      cell.appendChild(selectElement);
      selectElement.name = "paid";
      continue;
    }
    if (placeholders[i] == "Arrival Date") {
      var input = document.createElement("input");
      input.type = "date";
      input.name = "arrivalDate";
      input.classList.add("form-control");
      cell.appendChild(input);
      continue;
    }
    if (placeholders[i] == "Departure Date") {
      var input = document.createElement("input");
      input.type = "date";
      input.name = "departureDate";
      input.classList.add("form-control");
      cell.appendChild(input);
      continue;
    }
    if (placeholders[i] == "Price") {
      cell.innerHTML = "Automatically Calculated";
    }
    if (placeholders[i] == "Adults") {
      var input = document.createElement("input");
      input.type = "number";
      input.name = "numberOfAdults";
      input.classList.add("form-control");
      cell.appendChild(input);
      continue;
    }
    if (placeholders[i] == "Children") {
      var input = document.createElement("input");
      input.type = "number";
      input.name = "numberOfChildren";
      input.classList.add("form-control");
      cell.appendChild(input);
      continue;
    }
    if (placeholders[i] == "Guest Email") {
      var input = document.createElement("input");
      input.type = "email";
      input.name = "guestEmail";
      input.classList.add("form-control");
      cell.appendChild(input);
      continue;
    }
    if (placeholders[i] == "Room Title") {
      var input = document.createElement("input");
      input.type = "text";
      input.name = "roomTitle";
      input.classList.add("form-control");
      cell.appendChild(input);
      continue;
    }
    var tableContainer = document.querySelector(".table-container");
    tableContainer.style.maxWidth = "100%";
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

  var inputFields = row.querySelectorAll("input");
  inputFields.forEach(function (input) {
    if (input.name != "email") {
      input.readOnly = !input.readOnly;
    }
  });
  button.style.display = "none";
  var saveButton = row.querySelector(".btn-success");
  if (saveButton) {
    saveButton.style.display = "block";
  }
}

function enableSaveButton() {
  var table = document.getElementById("reservationsTable");
  var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

  var enableSave = Array.from(rows).some((row) => {
    var cells = row.cells;
    return Array.from(cells)
      .slice(0, -1)
      .some((cell) => !cell.querySelector("input").readOnly);
  });

  document.getElementById("saveButtonContainer").style.display = enableSave
    ? "block"
    : "none";
}
