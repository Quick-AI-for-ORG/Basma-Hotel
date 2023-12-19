function addReservationRow(optionst,userst,roomst) {
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
  const users = JSON.parse(userst);
  const rooms = JSON.parse(roomst);
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
      cell.innerHTML = "Not Paid";
      continue;
    }
    if (placeholders[i] == "Arrival Date") {
      var input = document.createElement("input");
      input.type = "date";
      input.min = new Date().toISOString().split("T")[0];
      input.name = "arrivalDate";
      input.classList.add("form-control");
      cell.appendChild(input);
      continue;
    }
    if (placeholders[i] == "Departure Date") {
      var input = document.createElement("input");
      input.type = "date";
      input.min = new Date().toISOString().split("T")[0];
      input.name = "departureDate";
      input.classList.add("form-control");
      cell.appendChild(input);
      continue;
    }
    if (placeholders[i] == "Price") {
      cell.innerHTML = "Automatically Calculated";
      continue;
    }
    if (placeholders[i] == "Adults") {
      var input = document.createElement("input");
      input.type = "number";
      input.name = "numberOfAdults";
      input.value=1
      input.classList.add("form-control");
      cell.appendChild(input);
      continue;
    }
    if (placeholders[i] == "Children") {
      var input = document.createElement("input");
      input.type = "number";
      input.value=0
      input.name = "numberOfChildren";
      input.classList.add("form-control");
      cell.appendChild(input);
      continue;
    }
    if (placeholders[i] == "Guest Email") {
          var selectElement = document.createElement("select");
          selectElement.name = "guestEmail";
          selectElement.classList.add("form-control", "dropdown-content");
          selectElement.multiple = false;
          for (var j = 0; j < users.length; j++) {
            var optionElement = document.createElement("option");
optionElement.value = users[j].email;
optionElement.textContent = users[j].email;
selectElement.appendChild(optionElement);
          }
          cell.appendChild(selectElement);
      continue;
    }
    if (placeholders[i] == "Room Title") {
      var selectElement = document.createElement("select");
      selectElement.name = "roomTitle";
      selectElement.classList.add("form-control", "dropdown-content");
      selectElement.multiple = false;
      for (var j = 0; j < rooms.length; j++) {
        var optionElement = document.createElement("option");
        optionElement.value = rooms[j].title;
        optionElement.textContent = rooms[j].title;
        selectElement.appendChild(optionElement);
      }
      cell.appendChild(selectElement);
  continue;
    }
    var tableContainer = document.querySelector(".table-container");
    tableContainer.style.maxWidth = "100%";
  }

  var actionsCell = newRow.insertCell(placeholders.length);
  actionsCell.innerHTML =
    '<div class="btn-group" role="group">' +
    '<button class="btn btn-danger" onclick="deleteReservationRow(this)">Delete</button>' +
    "</div>";

  document.getElementById("saveButtonContainer").style.display = "block";
  saveReservationRow()
}

function saveReservationRow() {
  console.log("Save reservation button clicked!");

  var table = document
    .querySelector(".projects-table")
    .getElementsByTagName("tbody")[0];
  console.log("Table:", table);
  var lastRow = table.rows[table.rows.length - 1];
var roomTitle = lastRow.cells[0].querySelector("select").value;
var guestEmail = lastRow.cells[1].querySelector("select").value;
var arrivalDate = lastRow.cells[2].querySelector("input").value;
var departureDate = lastRow.cells[3].querySelector("input").value;
var numberOfAdults = lastRow.cells[5].querySelector("input").value;
var numberOfChildren = lastRow.cells[6].querySelector("input").value;
var options = Array.from(lastRow.cells[8].querySelector("select").options).map(option => option.value);

if (roomTitle && guestEmail && arrivalDate && departureDate && numberOfAdults && numberOfChildren) {
    var reservationForm = document.createElement('form');
    reservationForm.style.visibility = 'hidden';
    reservationForm.method = 'post';
    reservationForm.action = '/admin/addReservation';
    var formFields = {
        'roomTitle': roomTitle,
        'guestEmail': guestEmail,
        'arrivalDate': arrivalDate,
        'departureDate': departureDate,
        'numberOfAdults': numberOfAdults,
        'numberOfChildren': numberOfChildren,
    };
    for (var fieldName in formFields) {
        if (formFields.hasOwnProperty(fieldName)) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = fieldName;
            input.value = formFields[fieldName];
            reservationForm.appendChild(input);
        }
    }
    options.forEach(function (option) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = '';
        checkbox.checked = options.includes(option);
        checkbox.checked = true; 
        var label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(option));

        reservationForm.appendChild(label);
    });
    document.body.appendChild(reservationForm);
    reservationForm.submit()
  }else {
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
