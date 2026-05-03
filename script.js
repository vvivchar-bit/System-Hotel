const rooms = [
    {
        number: 101,
        type: "Стандарт",
        price: 900,
        status: "Вільний"
    },
    {
        number: 102,
        type: "Стандарт",
        price: 900,
        status: "Заброньований"
    },
    {
        number: 201,
        type: "Люкс",
        price: 1800,
        status: "Вільний"
    },
    {
        number: 202,
        type: "Люкс",
        price: 1800,
        status: "Зайнятий"
    },
    {
        number: 301,
        type: "Сімейний",
        price: 1400,
        status: "Вільний"
    },
    {
        number: 302,
        type: "Сімейний",
        price: 1400,
        status: "Заброньований"
    }
];

const bookings = [];

const roomsList = document.getElementById("roomsList");
const bookingsList = document.getElementById("bookingsList");
const bookingForm = document.getElementById("bookingForm");

function getStatusClass(status) {
    if (status === "Вільний") {
        return "status-free";
    }

    if (status === "Заброньований") {
        return "status-booked";
    }

    return "status-busy";
}

function renderRooms(roomArray) {
    roomsList.innerHTML = "";

    if (roomArray.length === 0) {
        roomsList.innerHTML = "<p>Номерів за заданими параметрами не знайдено.</p>";
        return;
    }

    roomArray.forEach(room => {
        const roomCard = document.createElement("div");
        roomCard.className = "room-card";

        roomCard.innerHTML = `
            <h3>Номер ${room.number}</h3>
            <p><strong>Тип:</strong> ${room.type}</p>
            <p><strong>Ціна:</strong> ${room.price} грн/доба</p>
            <p><strong>Статус:</strong> 
                <span class="${getStatusClass(room.status)}">${room.status}</span>
            </p>
        `;

        roomsList.appendChild(roomCard);
    });
}

function renderBookings() {
    bookingsList.innerHTML = "";

    if (bookings.length === 0) {
        bookingsList.innerHTML = "<p>Поки що бронювань немає.</p>";
        return;
    }

    bookings.forEach(booking => {
        const bookingItem = document.createElement("div");
        bookingItem.className = "booking-item";

        bookingItem.innerHTML = `
            <p><strong>Клієнт:</strong> ${booking.clientName}</p>
            <p><strong>Телефон:</strong> ${booking.clientPhone}</p>
            <p><strong>Номер:</strong> ${booking.roomNumber}</p>
            <p><strong>Дата бронювання:</strong> ${booking.date}</p>
        `;

        bookingsList.appendChild(bookingItem);
    });
}

function filterRooms() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const statusValue = document.getElementById("statusFilter").value;

    const filteredRooms = rooms.filter(room => {
        const matchesType = room.type.toLowerCase().includes(searchValue);
        const matchesStatus = statusValue === "all" || room.status === statusValue;

        return matchesType && matchesStatus;
    });

    renderRooms(filteredRooms);
}

function resetFilters() {
    document.getElementById("searchInput").value = "";
    document.getElementById("statusFilter").value = "all";

    renderRooms(rooms);
}

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const clientName = document.getElementById("clientName").value.trim();
    const clientPhone = document.getElementById("clientPhone").value.trim();
    const roomNumber = Number(document.getElementById("roomNumber").value);

    const room = rooms.find(item => item.number === roomNumber);

    if (!room) {
        alert("Номер з таким номером кімнати не знайдено.");
        return;
    }

    if (room.status !== "Вільний") {
        alert("Цей номер недоступний для бронювання.");
        return;
    }

    room.status = "Заброньований";

    const booking = {
        clientName: clientName,
        clientPhone: clientPhone,
        roomNumber: roomNumber,
        date: new Date().toLocaleDateString("uk-UA")
    };

    bookings.push(booking);

    bookingForm.reset();

    renderRooms(rooms);
    renderBookings();

    alert("Номер успішно заброньовано.");
});

renderRooms(rooms);
renderBookings();