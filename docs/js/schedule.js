document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const titleElement = card.querySelector('h3');
        if (titleElement) { // записуємо data-title картки
            card.setAttribute('data-title', titleElement.textContent.toLowerCase().trim());
        }
    });

    const months = [
        "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
        "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
    ];
    let currentMonthIndex = 5;
    const currentYear = new Date().getFullYear();

    const btnPrev = document.getElementById('prevMonth');
    const btnNext = document.getElementById('nextMonth');
    const currentMonthTitle = document.querySelector('.schedule__month-nav .current');
    const cardDates = document.querySelectorAll('.card__date');

    //     cardMonthTitles.forEach(span => {
    //         span.textContent = months[currentMonthIndex]; // Замінити місяць в афіші
    //         // піднімаємось до всієї карти, щоб оновити data-date
    //         const card = span.closest('.card');
    //         if (card) {
    //             const oldDate = card.getAttribute('data-date');
    //             if (oldDate) {
    //                 // Беремо зі старої день, додаємо новий місяць
    //                 const day = oldDate.split('-')[2];
    //                 const newDate = `${currentYear}-${monthString}-${day}`;
    //                 card.setAttribute('data-date', newDate);
    //             }
    //         }
    //     });

    //     filterCards();
    // }
    

    function updateMonthUI() {
        currentMonthTitle.textContent = months[currentMonthIndex]; // Оновлюємо поточний місяць

        // Оновлюємо попередній, наступній місяць
        const prevIndex = (currentMonthIndex === 0) ? 11 : currentMonthIndex - 1;
        const nextIndex = (currentMonthIndex === 11) ? 0 : currentMonthIndex + 1;
        btnPrev.innerHTML = `&lsaquo; ${months[prevIndex]}`;
        btnNext.innerHTML = `${months[nextIndex]} &rsaquo;`;

        // Форматуємо місяцб для data-date щоб було 03, 11
        const monthString = String(currentMonthIndex + 1).padStart(2, '0');

        cardDates.forEach(span => {
            const card = span.closest('.card');
            if (card) {
                const oldDate = card.getAttribute('data-date');
                if (oldDate) {
                    // Беремо зі старої дати день, додаємо новий місяць
                    const day = oldDate.split('-')[2];
                    const newDate = `${currentYear}-${monthString}-${day}`;
                    card.setAttribute('data-date', newDate);
                    
                    // Оновлюємо текст форматі дд.мм.рррр
                    span.textContent = `${day}.${monthString}.${currentYear}`;
                }
            }
        });

        filterCards();
    }

    btnPrev.addEventListener('click', () => {
        currentMonthIndex = (currentMonthIndex === 0) ? 11 : currentMonthIndex - 1;
        updateMonthUI();
    });

    btnNext.addEventListener('click', () => {
        currentMonthIndex = (currentMonthIndex === 11) ? 0 : currentMonthIndex + 1;
        updateMonthUI();
    });

    const filtersForm = document.getElementById('filtersForm');
    const searchInput = document.getElementById('searchInput');
    const stageSelect = document.getElementById('stageSelect');
    const genreSelect = document.getElementById('genreSelect');
    const dateInput = document.getElementById('dateInput');

    function filterCards() {
        const searchText = searchInput.value.toLowerCase().trim();
        const selectedStage = stageSelect.value;
        const selectedGenre = genreSelect.value;
        const selectedDate = dateInput.value; // Буде YYYY-MM-DD
        // Далі фільтруєм всі картки
        cards.forEach(card => {
            const title = card.getAttribute('data-title');
            const stage = card.getAttribute('data-stage');
            const genre = card.getAttribute('data-genre');
            const date = card.getAttribute('data-date');
            // Шукаєм по назві, жанр і сцена такі як обрали або стоїть all, дата співпадає або не обрали
            const matchSearch = title.includes(searchText);
            const matchStage = (selectedStage === 'all') || (stage === selectedStage);
            const matchGenre = (selectedGenre === 'all') || (genre === selectedGenre);
            const matchDate = !selectedDate || (date === selectedDate);

            if (matchSearch && matchStage && matchGenre && matchDate) {
                card.classList.remove('is-hidden');
            } else {
                card.classList.add('is-hidden'); // Якщо десь отримал false ховаєм картку
            }
        });
    }
    // При змінні фільтрів одразу фільтруєм
    searchInput.addEventListener('input', filterCards);
    stageSelect.addEventListener('change', filterCards);
    genreSelect.addEventListener('change', filterCards);
    dateInput.addEventListener('change', filterCards);

    filtersForm.addEventListener('reset', () => {
        setTimeout(() => { // Невелика затримка перед скиданням фільтрів
            filterCards();
        }, 10);
    });

    updateMonthUI();
});