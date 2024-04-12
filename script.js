document.addEventListener("DOMContentLoaded", function () {
  const eventsData = [
    { id: 1, name: "Concert", price: 50 },
    { id: 2, name: "Sport", price: 75 },
    { id: 3, name: "Theatre", price: 40 },
  ];

  const eventsContainer = document.getElementById("events");
  const selectedTickets = {};

  // create events and setup intial ticket data
  eventsData.forEach((event) => {
    selectedTickets[event.id] = { name: event.name, count: 0, total: 0 };
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event");
    eventDiv.innerHTML = `<h3>${event.name}</h3>
                            <p>Price: $${event.price}</p>
                            <input type="number" min="0" value="0" id="input-${event.id}"/>
                            <button onClick="updateTickets(${event.id}, ${event.price})" >Add Tickets</button>`;
    eventsContainer.appendChild(eventDiv);
  });

  window.updateTickets = function (eventId, price) {
    const input = document.getElementById(`input-${eventId}`);
    const count = parseInt(input.value, 10);

    if (count < 0) {
      alert("Please enetr a valid number of tickets");
      input.value = 0;
      return;
    }

    selectedTickets[eventId].count = count;
    selectedTickets[eventId].total = count * price;

    updateTotal();
  };

  function updateTotal() {
    const totalDiv = document.getElementById("selectedTickets");
    let grandTotal = 0;
    let summaryHtml = "";

    Object.keys(selectedTickets).forEach((id) => {
      const ticket = selectedTickets[id];
      if (ticket.count > 0) {
        grandTotal += ticket.total;
        summaryHtml = `<p>${ticket.count} tickets for ${ticket.name} - $${ticket.total}</p>`;
      }
    });
    totalDiv.innerHTML = `Total cost: $${grandTotal}<br>${summaryHtml}`;
  }

  const bookingForm = document.getElementById("bookingForm");
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const summary = document.getElementById("selectedTickets").innerHTML;
    if (summary.includes("tickets for")) {
      alert(
        `Booking confirmed! Here is your summary:\n\n${summary.replace(
          /<\/?p>|<br>/g,
          "\n"
        )}`
      );
    } else {
      alert("No tickets selected. Please add some tickets before booking.");
      return;
    }

    bookingForm.reset();

    document
      .querySelectorAll('#events input[type="number"]')
      .forEach((input) => (input.value = 0));
    Object.keys(selectedTickets).forEach((id) => {
      selectedTickets[id].count = 0;
      selectedTickets[id].total = 0;
    });
    document.getElementById(("selectedTickets".innerHTML = ""));
  });
});
