document.addEventListener("DOMContentLoaded", function () {
  const rooms = document.querySelectorAll(".room-card");
  const roomList = document.getElementById("roomList");
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const currentPageDisplay = document.getElementById("currentPage");
  const roomsPerPage = 6; // Number of rooms per page
  let currentPage = 1;

  // Function to show rooms for the current page
  function showRooms() {
    const startIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;
    rooms.forEach((room, index) => {
      if (index >= startIndex && index < endIndex) {
        room.style.display = "block";
      } else {
        room.style.display = "none";
      }
    });
  }

  showRooms();

  function updatePagination() {
    currentPageDisplay.innerText = currentPage;

    if (currentPage === 1) {
      prevPageButton.disabled = true;
    } else {
      prevPageButton.disabled = false;
    }

    if (currentPage * roomsPerPage >= rooms.length) {
      nextPageButton.disabled = true;
    } else {
      nextPageButton.disabled = false;
    }
  }

  prevPageButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage -= 1;
      showRooms();
      updatePagination();
    }
  });

  nextPageButton.addEventListener("click", function () {
    if (currentPage * roomsPerPage < rooms.length) {
      currentPage += 1;
      showRooms();
      updatePagination();
    }
  });

  updatePagination();
});
