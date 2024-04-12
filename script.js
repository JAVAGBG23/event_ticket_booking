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
});
