document.addEventListener("DOMContentLoaded", function () {
  const eventsData = [
    { id: 1, name: "Concert", price: 50 },
    { id: 2, name: "Sport", price: 75 },
    { id: 3, name: "Theatre", price: 40 },
  ];

  // connect HTML element to JS (DOM)
  const eventsContainer = document.getElementById("events");
  const selectedTickets = {};

  // create events and setup intial ticket data
  // this will be displayed inside the div with id events
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

  // update ticket info, function is set on the global window object i.e the browser window
  window.updateTickets = function (eventId, price) {
    // grab correct HTML element
    const input = document.getElementById(`input-${eventId}`);
    const count = parseInt(input.value, 10);

    if (count < 0) {
      alert("Please enetr a valid number of tickets");
      input.value = 0;
      return;
    }

    selectedTickets[eventId].count = count;
    // set total price to count * the price of the ticket
    selectedTickets[eventId].total = count * price;

    // can for updateTotal function which updates the total cost and shows summary
    updateTotal();
  };

  function updateTotal() {
    // grab correct HTML element
    const totalDiv = document.getElementById("selectedTickets");
    // initiate variables with values
    let grandTotal = 0;
    let summaryHtml = "";

    // loop through all selected tickets and update data + show summary
    Object.keys(selectedTickets).forEach((id) => {
      const ticket = selectedTickets[id];
      if (ticket.count > 0) {
        grandTotal += ticket.total;
        summaryHtml = `<p>${ticket.count} tickets for ${ticket.name} - $${ticket.total}</p>`;
      }
    });
    totalDiv.innerHTML = `Total cost: $${grandTotal}<br>${summaryHtml}`;
  }

  // grab HTML form element
  const bookingForm = document.getElementById("bookingForm");
  bookingForm.addEventListener("submit", function (event) {
    // CRUTIAL!!!!! when working with forms
    // if we dont call event.preventDefault() the browser will reload right away when the button gets clicked
    // which is not what we wont and will make our app behave strange
    // event is the parameter passed to the function, can also be called just e
    event.preventDefault();
    const summary = document.getElementById("selectedTickets").innerHTML;
    if (summary.includes("tickets for")) {
      alert(
        `Booking confirmed! Here is your summary:\n\n${summary.replace(
          // regex that removes the <p> </p> and <br> so it wont show in the alert
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
