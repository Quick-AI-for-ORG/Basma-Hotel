function addOptionRow() {
  var table = document
    .getElementById("optionTable") // Corrected table id
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.rows.length);

  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);

  cell1.innerHTML =
    '<input type="text" class="form-control" placeholder="Option">';
  cell2.innerHTML =
    '<input type="text" class="form-control" placeholder="Price">';
  cell3.innerHTML =
    '<div class="btn-group" role="group">' +
    '<button class="btn btn-danger" onclick="deleteOptionRow(this)">Delete</button>' +
    "</div>";

  document.getElementById("saveButtonContainer").style.display = "block";
}

function saveOptionRow() {
  var table = document
    .getElementById("optionTable")
    .getElementsByTagName("tbody")[0];
  var lastRow = table.rows[table.rows.length - 1];
  var option = lastRow.cells[0].querySelector("input").value;
  var price = lastRow.cells[1].querySelector("input").value;

  if (option && price) {
    document.getElementById("errorMessage").innerHTML = "";
    var form = document.createElement('form');
    form.style.visibility = 'hidden';
    form.method = 'post';
    form.action = '/admin/addOption';
    var input1 = document.createElement('input');
    input1.type = 'hidden';
    input1.name = 'option';
    input1.value = option; 
    form.appendChild(input1);
    var input2 = document.createElement('input');
    input2.type = 'hidden';
    input2.name = 'price';
    input2.value = price; 
    form.appendChild(input2);
    document.body.appendChild(form);
    form.submit();
  } else {
    document.getElementById("errorMessage").innerHTML =
      "Please fill in all fields before saving.";
  }
}


function toggleReadOnly(button) {
  var row = button.closest("tr");
  var cells = row.cells;

  for (var i = 0; i < cells.length - 1; i++) {
    // Change from cells.length - 2 to cells.length - 1
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
