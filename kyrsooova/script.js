document.addEventListener("DOMContentLoaded", () => {
    const carCatalog = document.getElementById("carCatalog");
    const modal = document.getElementById("modal");
    const modalDetails = document.getElementById("modalDetails");
    const closeModal = document.getElementById("closeModal");

    // Завантаження даних з JSON
    fetch("cars.json")
        .then(response => response.json())
        .then(cars => {
            displayCars(cars);
            setupFilters(cars);
        })
        .catch(error => {
            carCatalog.innerHTML = "<p>Помилка завантаження даних.</p>";
            console.error("Error fetching cars data:", error);
        });

    // Функція відображення карток автомобілів
    function displayCars(cars) {
        carCatalog.innerHTML = "";
        cars.forEach(car => {
            const carCard = document.createElement("div");
            carCard.className = "card";
            carCard.innerHTML = `
                <h2>${car.brand} ${car.model}</h2>
                <p>Рік: ${car.year}</p>
                <p>Тип: ${car.type}</p>
                <p>Ціна: $${car.price}</p>
                ${car.electric ? "<p>Electric</p>" : ""}
            `;
            carCard.addEventListener("click", () => showModal(car));
            carCatalog.appendChild(carCard);
        });
    }
    function displayCars(cars) {
        carCatalog.innerHTML = ''; // Очистка перед виведенням
    
        cars.forEach(car => {
            const carCard = document.createElement('div');
            carCard.classList.add('car-card');
    
            // Вставка HTML-шаблону для картки з зображенням
            carCard.innerHTML = `
                <img src="${car.image}" alt="${car.brand} ${car.model}" class="car-image">
                <h2>${car.brand} ${car.model}</h2>
                <p>Рік: ${car.year}</p>
                <p>Тип кузова: ${car.type}</p>
                <p>Ціна: $${car.price}</p>
                ${car.electric ? '<p class="electric-label">Electric</p>' : ''}
            `;
    
            // Додавання обробника події для модального вікна
            carCard.addEventListener('click', () => showCarDetails(car));
    
            carCatalog.appendChild(carCard);
        });
    }
    

    // Функція для фільтрів
    function setupFilters(cars) {
        // Приклад: встановлення унікальних значень для фільтрів
        const brands = [...new Set(cars.map(car => car.brand))];
        const brandFilter = document.getElementById("brandFilter");
        brands.forEach(brand => {
            const option = document.createElement("option");
            option.value = brand;
            option.textContent = brand;
            brandFilter.appendChild(option);
        });

        // Події для пошуку, фільтрації та сортування
        document.getElementById("search").addEventListener("input", () => applyFilters(cars));
        document.getElementById("brandFilter").addEventListener("change", () => applyFilters(cars));
        document.getElementById("typeFilter").addEventListener("change", () => applyFilters(cars));
        document.getElementById("minYear").addEventListener("input", () => applyFilters(cars));
        document.getElementById("maxYear").addEventListener("input", () => applyFilters(cars));
        document.getElementById("electricFilter").addEventListener("change", () => applyFilters(cars));
        document.getElementById("sortOrder").addEventListener("change", () => applyFilters(cars));
    }


    // Функція для застосування фільтрів та сортування
    function applyFilters(cars) {
        const searchText = document.getElementById("search").value.toLowerCase();
        const brand = document.getElementById("brandFilter").value;
        const type = document.getElementById("typeFilter").value;
        const minYear = parseInt(document.getElementById("minYear").value) || 0;
        const maxYear = parseInt(document.getElementById("maxYear").value) || new Date().getFullYear();
        const onlyElectric = document.getElementById("electricFilter").checked;
        const sortOrder = document.getElementById("sortOrder").value;

        let filteredCars = cars.filter(car => {
            return (
                (!brand || car.brand === brand) &&
                (!type || car.type === type) &&
                (!onlyElectric || car.electric) &&
                car.year >= minYear &&
                car.year <= maxYear &&
                car.model.toLowerCase().includes(searchText)
            );
        });

        // Сортування
        filteredCars.sort((a, b) => {
            if (sortOrder === "priceAsc") return a.price - b.price;
            if (sortOrder === "priceDesc") return b.price - a.price;
            if (sortOrder === "yearAsc") return a.year - b.year;
            if (sortOrder === "yearDesc") return b.year - a.year;
        });

        displayCars(filteredCars);
    }
    function showCarDetails(car) {
        // Отримання елементів модального вікна
        const carModal = document.getElementById('carModal');
        const modalImage = document.getElementById('modalImage');
        const modalBrandModel = document.getElementById('modalBrandModel');
        const modalYear = document.getElementById('modalYear');
        const modalType = document.getElementById('modalType');
        const modalPrice = document.getElementById('modalPrice');
        const modalElectric = document.getElementById('modalElectric');
        const modalFeatures = document.getElementById('modalFeatures');
    
        // Заповнення даних про автомобіль
        modalImage.src = car.image;
        modalImage.alt = `${car.brand} ${car.model}`;
        modalBrandModel.textContent = `${car.brand} ${car.model}`;
        modalYear.textContent = `Рік випуску: ${car.year}`;
        modalType.textContent = `Тип кузова: ${car.type}`;
        modalPrice.textContent = `Ціна: $${car.price}`;
        modalElectric.textContent = car.electric ? 'Електричний' : 'Не електричний';
    
        // Відображення списку особливостей
        modalFeatures.innerHTML = ''; // Очищення попередніх значень
        car.features.forEach(feature => {
            const listItem = document.createElement('li');
            listItem.textContent = feature;
            modalFeatures.appendChild(listItem);
        });
    
        // Показати модальне вікно
        carModal.style.display = 'block';
    }
    
    // Закриття модального вікна при натисканні на кнопку закриття
    document.querySelector('.close-btn').addEventListener('click', () => {
        document.getElementById('carModal').style.display = 'none';
    });
    
    // Закриття модального вікна при натисканні за його межами
    window.addEventListener('click', (event) => {
        const carModal = document.getElementById('carModal');
        if (event.target === carModal) {
            carModal.style.display = 'none';
        }
    });
    
    // Функція для відображення модального вікна
    function showModal(car) {
        modalDetails.innerHTML = `
            <h2>${car.brand} ${car.model}</h2>
            <p>Рік: ${car.year}</p>
            <p>Тип: ${car.type}</p>
            <p>Ціна: $${car.price}</p>
            <p>${car.electric ? "Electric" : "Не електричний"}</p>
            <h3>Особливості:</h3>
            <ul>${car.features.map(feature => `<li>${feature}</li>`).join("")}</ul>
        `;
        modal.style.display = "flex";
    }


    closeModal.addEventListener("click", () => (modal.style.display = "none"));
    window.addEventListener("click", (event) => {
        if (event.target === modal) modal.style.display = "none";
    });
});
