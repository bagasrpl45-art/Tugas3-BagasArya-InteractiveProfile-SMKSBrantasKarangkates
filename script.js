const btnTema = document.querySelector('#btnToggleTema');
const bodyHalaman = document.querySelector('body');

btnTema.addEventListener('click', function() {
    // toogle akan menambah class 'light-mode' jika belum ada,
    // dan menghapusnya jika sudah ada.
    bodyHalaman.classList.toggle('light-mode');

    //Opsi tambahan: Ubah teks ikon di dalam tombol
    if (bodyHalaman.classList.contains('light-mode')) {
        btnTema.textContent = '🌙 Mode Gelap';
    } else {
        btnTema.textContent = '☀️ Mode Terang';
    }
});

const btnBukaModal = document.querySelector('#btnBukaModal');
const elemenModal = document.querySelector('#modalKontak');
const btnTutupModal = document.querySelector('#btnTutupModal');

btnBukaModal.addEventListener('click', function(event) {
    event.preventDefault(); //Mencegah link pindah halaman / Buka email
    elemenModal.classList.add('show'); //Tampilkan modal
});

btnTutupModal.addEventListener('click', function() {
    elemenModal.classList.remove('show'); //Sembunyikan modal
});

const skillBadges = document.querySelectorAll('.skill-badge');
const modalSkill = document.querySelector('#modalSkill');
const skillTitle = document.querySelector('#skillTitle');
const skillDesc = document.querySelector('#skillDesc');
const btnTutupSkillModal = document.querySelector('#btnTutupSkillModal');

skillBadges.forEach(function(badge) {
    badge.addEventListener('click', function() {
        skillTitle.textContent = badge.textContent;
        skillDesc.textContent = badge.dataset.desc;
        modalSkill.classList.add('show');
    });
});

btnTutupSkillModal.addEventListener('click', function() {
    modalSkill.classList.remove('show');
});

const reviews = [
    {
        name: "*******",
        rating: 5,
        variant: "WHITE, Capdase",
        date: "26-09-2026 10:10",
        text: "Profil digital yang bagus!",
        response: "Ah biasa aja kok, Terimakasih ya."
    }
    // Tambahkan objek baru di sini untuk ulasan lain
];

function renderStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function buatKartuUlasan(review) {
    const card = document.createElement('div');
    card.className = 'review-card';

    card.innerHTML = `
        <div class="review-stars">${renderStars(review.rating)}</div>
        <div class="review-name">${review.name}</div>
        <div class="review-meta">${review.date} | Variasi: ${review.variant}</div>
        <div class="review-text">${review.text}</div>
        ${review.response ? `
        <div class="review-response">
            <div class="review-response-title">Respon Pengguna</div>
            <div class="review-response-text">${review.response}</div>
        </div>` : ''}
    `;

    return card;
}

const reviewList = document.querySelector('#reviewList');

reviews.forEach(function(review) {
    reviewList.appendChild(buatKartuUlasan(review));
});

// ===== Simulasi kirim ulasan =====
const inputUlasan = document.querySelector('#inputUlasan');
const btnKirimUlasan = document.querySelector('#btnKirimUlasan');

// ===== Pemilih rating bintang =====
const ratingStars = document.querySelectorAll('.rating-star');
let ratingTerpilih = 5; // default awal: 5 bintang

function updateTampilanBintang(rating) {
    ratingStars.forEach(function(star) {
        const nilai = parseInt(star.dataset.value);
        star.classList.toggle('active', nilai <= rating);
    });
}

updateTampilanBintang(ratingTerpilih); // tampilkan default saat halaman dimuat

ratingStars.forEach(function(star) {
    star.addEventListener('click', function() {
        ratingTerpilih = parseInt(star.dataset.value);
        updateTampilanBintang(ratingTerpilih);
    });
});

// ===== Kirim ulasan (dengan jeda simulasi & rating dinamis) =====
btnKirimUlasan.addEventListener('click', function() {
    const teks = inputUlasan.value.trim();
    if (teks === '') return;

    btnKirimUlasan.disabled = true;
    btnKirimUlasan.textContent = 'Mengirim...';

    setTimeout(function() {
        const ulasanBaru = {
            name: 'Anda',
            rating: ratingTerpilih,
            variant: '-',
            date: new Date().toLocaleString('id-ID'),
            text: teks,
            response: null
        };

        reviewList.appendChild(buatKartuUlasan(ulasanBaru));

        inputUlasan.value = '';
        ratingTerpilih = 5;
        updateTampilanBintang(ratingTerpilih);

        btnKirimUlasan.disabled = false;
        btnKirimUlasan.textContent = 'Kirim';
    }, 900);
});

// ===== Rating untuk profil digital =====
const profileRatingStars = document.querySelectorAll('.profile-rating-star');
const ratingFeedback = document.querySelector('#ratingFeedback');

profileRatingStars.forEach(function(star) {
    star.addEventListener('click', function() {
        const nilai = parseInt(star.dataset.value);

        profileRatingStars.forEach(function(s) {
            const nilaiLain = parseInt(s.dataset.value);
            s.classList.toggle('active', nilaiLain <= nilai);
        });

        ratingFeedback.textContent = `Rating kamu: ${nilai} dari 5`;
    });
});