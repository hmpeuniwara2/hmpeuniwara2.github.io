// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// Ketika humberger menu di klik
document.querySelector("#humberger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di luar sidebar untukmenghilangkan nav
const humberger = document.querySelector("#humberger-menu");

document.addEventListener("click", function (e) {
  if (!humberger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// --- LOGIKA SEARCH BOX LIQUID GLASS ---
const searchBtn = document.querySelector("#search");
const searchBox = document.querySelector("#search-box");
const hamburgerBtn = document.querySelector("#humberger-menu"); // <-- Tambahan untuk mengambil ikon hamburger

if (searchBtn && searchBox && hamburgerBtn) {
  // 1. Saat ikon search ditekan
  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    searchBox.classList.add("active");
    searchBtn.classList.add("hidden");
    if (hamburgerBtn) {
      hamburgerBtn.classList.add("hidden");
    }

    // Beri sedikit jeda waktu (misal 100 milidetik) agar animasi terbuka selesai dulu baru fokus
    setTimeout(function () {
      searchBox.focus();
    }, 100);
  });

  // 2. Saat mengklik sembarang tempat di luar search box
  document.addEventListener("click", function (e) {
    if (!searchBtn.contains(e.target) && !searchBox.contains(e.target)) {
      searchBox.classList.remove("active");
      searchBtn.classList.remove("hidden");
      hamburgerBtn.classList.remove("hidden"); // <-- Munculkan kembali ikon hamburger
    }
  });
}

// JavaScript for Scroll Animation
document.addEventListener("DOMContentLoaded", function () {
  const faders = document.querySelectorAll(".fade-in");

  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll,
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
});

// LOGIKA FORM DASHBOARD BENDAHARA
// Ganti teks di bawah ini dengan URL Web App dari Google Apps Script Anda yang baru
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxlVbB7JXdkodW54xEU67JF3dfv2g77TBdPOUtaVcnVDpC-mwbVdgyUYdtnkMHS3ISsIA/exec";
const form = document.getElementById("formKeuangan");
const btnSubmit = document.getElementById("btnSubmit");
const statusMessage = document.getElementById("statusMessage");

// Cek apakah elemen form ada di halaman (agar tidak error saat dipanggil di index.html)
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Ubah status tombol saat memproses
    btnSubmit.innerText = "Menyimpan data...";
    btnSubmit.disabled = true;
    statusMessage.innerText = "";

    // Mengambil semua data dari form secara otomatis
    let requestBody = new FormData(form);

    fetch(scriptURL, { method: "POST", body: requestBody })
      .then((response) => {
        statusMessage.innerText =
          "✅ Transaksi berhasil dicatat di Spreadsheet!";
        statusMessage.style.backgroundColor = "#dcfce7";
        statusMessage.style.color = "#166534";
        form.reset(); // Kosongkan form setelah sukses
        btnSubmit.innerText = "Simpan ke Spreadsheet";
        btnSubmit.disabled = false;
      })
      .catch((error) => {
        statusMessage.innerText =
          "❌ Gagal menyimpan data. Periksa koneksi Anda.";
        statusMessage.style.backgroundColor = "#fee2e2";
        statusMessage.style.color = "#991b1b";
        btnSubmit.innerText = "Simpan ke Spreadsheet";
        btnSubmit.disabled = false;
      });
  });
}

// KATEGORI DINAMIS BERDASARKAN JENIS ARUS KAS
// ==========================================
const jenisArusKasSelect = document.getElementById("jenis");
const kategoriSelect = document.getElementById("kategori");

if (jenisArusKasSelect && kategoriSelect) {
  jenisArusKasSelect.addEventListener("change", function () {
    const selectedJenis = this.value;

    // Kosongkan pilihan kategori sebelumnya
    kategoriSelect.innerHTML =
      '<option value="" disabled selected>Pilih Kategori...</option>';

    if (selectedJenis === "Kas Masuk") {
      // Kategori khusus Kas Masuk
      const kategoriMasuk = ["Iuran Anggota", "Sumbangan", "Lainnya"];
      kategoriMasuk.forEach((kat) => {
        let option = document.createElement("option");
        option.value = kat;
        option.textContent = kat;
        kategoriSelect.appendChild(option);
      });
    } else if (selectedJenis === "Kas Keluar") {
      // Kategori khusus Kas Keluar
      const kategoriKeluar = [
        "Dana Usaha",
        "Belanja Operasional Kegiatan",
        "Lainnya",
      ];
      kategoriKeluar.forEach((kat) => {
        let option = document.createElement("option");
        option.value = kat;
        option.textContent = kat;
        kategoriSelect.appendChild(option);
      });
    }
  });

  // FORMAT OTOMATIS TITIK RUPIAH PADA INPUT NOMINAL
  const inputNominal = document.getElementById("nominal");

  if (inputNominal) {
    inputNominal.addEventListener("input", function (e) {
      // Hanya ambil karakter angka saja, hapus semua simbol/huruf lain
      let angka = this.value.replace(/[^,\d]/g, "").toString();

      // Format angka dengan pemisah titik
      let split = angka.split(",");
      let sisa = split[0].length % 3;
      let rupiah = split[0].substr(0, sisa);
      let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

      if (ribuan) {
        let separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
      }

      // Masukkan kembali nilai yang sudah berformat titik ke dalam input
      this.value = rupiah;
    });
  }

  // ANIMASI SAAT DIGULIR (SCROLL)
  document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // Elemen akan mulai beranimasi saat 10% bagiannya terlihat di layar
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show"); // Menambahkan kelas 'show' saat digulir ke area pandang
          // observer.unobserve(entry.target); // Buka komentar ini jika animasi hanya ingin dimunculkan sekali saja
        }
      });
    }, observerOptions);

    // Daftarkan semua elemen yang memiliki kelas .animate-on-scroll
    const targetElements = document.querySelectorAll(".animate-on-scroll");
    targetElements.forEach((el) => observer.observe(el));
  });
}

// FORMAT OTOMATIS TITIK RUPIAH PADA INPUT NOMINAL
const inputNominal = document.getElementById("nominal");

if (inputNominal) {
  inputNominal.addEventListener("input", function (e) {
    // Hanya ambil karakter angka saja, hapus semua simbol/huruf lain
    let angka = this.value.replace(/[^,\d]/g, "").toString();

    // Format angka dengan pemisah titik
    let split = angka.split(",");
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    // Masukkan kembali nilai yang sudah berformat titik ke dalam input
    this.value = rupiah;
  });
}

// LOGIKA MENYEMBUNYIKAN KOLOM NAMA & ANGKATAN SAAT KAS KELUAR
const dropdownJenis = document.getElementById("jenis");
const wadahNama = document.getElementById("wadah-nama");
const inputNama = document.getElementById("nama");
const wadahAngkatan = document.getElementById("wadah-angkatan"); // Tambahan untuk angkatan
const inputAngkatan = document.getElementById("angkatan"); // Tambahan untuk angkatan

if (dropdownJenis && wadahNama && wadahAngkatan) {
  dropdownJenis.addEventListener("change", function () {
    if (this.value === "Kas Keluar") {
      // Sembunyikan wadah nama dan angkatan
      wadahNama.style.display = "none";
      wadahAngkatan.style.display = "none";

      // Kosongkan isinya agar data bersih saat dikirim
      inputNama.value = "";
      inputAngkatan.value = "";
    } else {
      // Tampilkan kembali jika memilih Kas Masuk (atau yang lainnya)
      wadahNama.style.display = "block";
      wadahAngkatan.style.display = "block";
    }
  });
}

// --- FITUR PENCARIAN MENYELURUH DI SEMUA BAGIAN HALAMAN ---
const inputPencarian = document.getElementById("search-box");
const daftarItem = document.querySelectorAll(".item-pencarian");

if (inputPencarian) {
  // Menyimpan teks asli dari setiap elemen pencarian saat pertama kali dimuat
  daftarItem.forEach(function (item) {
    if (!item.getAttribute("data-original")) {
      item.setAttribute("data-original", item.innerHTML);
    }
  });

  inputPencarian.addEventListener("input", function () {
    const kataKunci = inputPencarian.value.toLowerCase().trim();

    daftarItem.forEach(function (item) {
      const teksAsli = item.getAttribute("data-original");
      const fullText = item.innerText.toLowerCase();

      // Jika kotak pencarian dikosongkan, kembalikan ke bentuk semula
      if (kataKunci === "" || kataKunci.length < 2) {
        item.innerHTML = teksAsli;
        return;
      }

      // Jika kata kunci ditemukan di dalam bagian tersebut
      if (fullText.includes(kataKunci)) {
        // Kita gunakan teknik pencarian aman untuk membungkus kata yang cocok dengan <mark>
        item.innerHTML = teksAsli; // Reset dulu

        // Cari teks di dalam elemen tersebut dan beri highlight kuning
        highlightText(item, kataKunci);

        // Otomatis geser layar mulus ke bagian tersebut
        item.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        // Jika tidak cocok, kembalikan ke teks asli
        item.innerHTML = teksAsli;
      }
    });
  });
}

// Fungsi pembantu untuk melakukan highlight teks secara aman di dalam elemen HTML
function highlightText(element, keyword) {
  const innerHTML = element.innerHTML;
  // Membuat regex yang tidak sensitif huruf besar/kecil
  const regex = new RegExp(`(${keyword})`, "gi");
  // Mengganti teks yang cocok dengan tag <mark> kuning
  element.innerHTML = innerHTML.replace(
    regex,
    '<mark style="background-color: #fef08a; padding: 2px 4px; border-radius: 3px; color: inherit;">$1</mark>',
  );
}

// --- SISTEM PENCARIAN ANTAR HALAMAN DUA ARAH ---
if (inputPencarian) {
  // 1. Deteksi saat menekan tombol 'Enter' di kotak pencarian
  inputPencarian.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const kataKunci = inputPencarian.value.toLowerCase().trim();

      if (kataKunci !== "") {
        const halamanAktif = window.location.pathname;

        // Kata kunci yang mengarah ke halaman Bendahara
        const keywordBendahara = [
          "bendahara",
          "keuangan",
          "kas",
          "transaksi",
          "dana",
          "uang",
        ];
        // Kata kunci yang mengarah ke halaman Sekretariat
        const keywordSekretariat = [
          "sekretariat",
          "surat",
          "proposal",
          "dokumen",
        ];

        // Cek jika kata kunci cocok dengan menu Bendahara (dan kita sedang tidak di bendahara.html)
        if (
          keywordBendahara.some((word) => kataKunci.includes(word)) &&
          !halamanAktif.includes("bendahara.html")
        ) {
          window.location.href = `bendahara.html`;
        }
        // Cek jika kata kunci cocok dengan menu Sekretariat (dan kita sedang tidak di sekretariat.html)
        else if (
          keywordSekretariat.some((word) => kataKunci.includes(word)) &&
          !halamanAktif.includes("sekretariat.html")
        ) {
          window.location.href = `sekretariat.html`;
        }
        // Jika tidak masuk ke menu lain, tetap lakukan pencarian lokal di index.html (jika di index)
        else if (!halamanAktif.includes("index.html")) {
          window.location.href = `index.html?cari=${encodeURIComponent(kataKunci)}`;
        }
      }
    }
  });

  // 2. Otomatis tangkap parameter pencarian jika datang dari halaman lain
  window.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const kataKunciDariURL = urlParams.get("cari");
    const targetBagian = urlParams.get("target");

    if (kataKunciDariURL) {
      inputPencarian.value = kataKunciDariURL;
      const event = new Event("input", { bubbles: true });
      inputPencarian.dispatchEvent(event);
    }

    if (targetBagian) {
      let elemenTujuan = null;

      // Menentukan elemen mana yang dituju berdasarkan target URL
      if (targetBagian === "proker") {
        elemenTujuan =
          document.getElementById("proker") ||
          document.querySelector(".kartu-berita");
      } else if (targetBagian === "sambutan") {
        elemenTujuan =
          document.getElementById("sambutan") ||
          document.querySelector(".sambutan");
      } else if (targetBagian === "sejarah") {
        elemenTujuan =
          document.querySelector(".sejarah-kiri") ||
          document.querySelector("h2");
      }

      // Jika elemen tujuannya ada, geser layar secara mulus ke sana
      if (elemenTujuan) {
        setTimeout(function () {
          elemenTujuan.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300); // Beri jeda sedikit agar halaman selesai dimuat
      }
    }
  });
}

// --- FITUR REKOMENDASI MENU / SEARCH SUGGESTIONS ---
const daftarMenu = [
  { nama: "Home", url: "index.html" },
  { nama: "Proker & Kegiatan", url: "index.html?target=proker" },
  { nama: "Sambutan Ketua & Wakil", url: "index.html?target=sambutan" },
  { nama: "Bendahara / Keuangan", url: "bendahara.html" },
  { nama: "Sekretariat / Surat", url: "sekretariat.html" },
  { nama: "Sejarah Singkat", url: "index.html?target=sejarah" },
];

if (inputPencarian) {
  let suggestionBox = document.getElementById("search-suggestions");
  if (!suggestionBox) {
    suggestionBox = document.createElement("ul");
    suggestionBox.id = "search-suggestions";
    suggestionBox.className = "suggestions-list";
    inputPencarian.parentNode.appendChild(suggestionBox);
  }

  inputPencarian.addEventListener("input", function () {
    const query = inputPencarian.value.toLowerCase().trim();
    suggestionBox.innerHTML = "";

    if (query === "") return;

    const hasilFilter = daftarMenu.filter((menu) =>
      menu.nama.toLowerCase().includes(query),
    );

    hasilFilter.forEach((menu) => {
      const li = document.createElement("li");
      li.textContent = menu.nama;

      li.addEventListener("click", function () {
        inputPencarian.value = menu.nama;
        suggestionBox.innerHTML = "";
        window.location.href = menu.url;
      });

      suggestionBox.appendChild(li);
    });
  });

  document.addEventListener("click", function (e) {
    if (
      !inputPencarian.contains(e.target) &&
      !suggestionBox.contains(e.target)
    ) {
      suggestionBox.innerHTML = "";
    }
  });
}

// --- LOGIKA PROTEKSI PASSWORD HALAMAN BENDAHARA ---
document.addEventListener("DOMContentLoaded", function () {
  const passwordModal = document.getElementById("password-modal");
  const secretContent = document.getElementById("secret-content");
  const inputPassword = document.getElementById("input-password");
  const btnLogin = document.getElementById("btn-login");
  const errorMsg = document.getElementById("error-msg");

  // Pastikan elemen password modal khusus bendahara ada di halaman ini
  if (
    passwordModal &&
    document.body.contains(document.getElementById("formKeuangan"))
  ) {
    console.log("Halaman Bendahara Berhasil Dideteksi!");
    const PASSWORD_BENDAHARA = "hmpe2026"; // Sesuaikan password yang diinginkan

    function cekBendahara() {
      if (inputPassword.value === PASSWORD_BENDAHARA) {
        passwordModal.style.display = "none";
        secretContent.style.display = "block"; // Menggunakan block khusus bendahara agar dashboard tidak gepeng
        sessionStorage.setItem("isBendaharaLoggedIn", "true");
      } else {
        if (errorMsg) errorMsg.style.display = "block";
        inputPassword.value = "";
      }
    }

    if (btnLogin) {
      btnLogin.addEventListener("click", cekBendahara);
    }

    if (inputPassword) {
      inputPassword.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          cekBendahara();
        }
      });
    }
  }
});

// --- LOGIKA PROTEKSI PASSWORD HALAMAN SEKRETARIAT ---
const PASSWORD_RAHASIA = "hmpe2026"; // Anda bisa ubah password-nya di sini

function cekPassword() {
  const inputEl = document.getElementById("input-password");
  const errorMsg = document.getElementById("error-msg");

  if (!inputEl) return;

  const inputVal = inputEl.value;

  if (inputVal === PASSWORD_RAHASIA) {
    document.getElementById("password-modal").style.display = "none";
    document.getElementById("secret-content").style.display = "flex";
    // Menggunakan sessionStorage standar yang otomatis reset jika tab/halaman ditutup
    sessionStorage.setItem("isSecretLoggedIn", "true");
  } else {
    if (errorMsg) errorMsg.style.display = "block";
    inputEl.value = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("password-modal");
  const secretContent = document.getElementById("secret-content");
  const inputEl = document.getElementById("input-password");
  const btnLogin = document.getElementById("btn-login");

  if (modal && secretContent) {
    // PERUBAHAN:
    // Hapus sessionStorage setiap kali halaman sekretariat dimuat ulang/baru dibuka,
    // KECUALI jika Anda ingin sesi bertahan selama tab browser tidak ditutup.
    // Jika ingin setiap kali klik menu Sekretariat (pindah halaman) langsung minta password:
    sessionStorage.removeItem("isSecretLoggedIn");

    if (btnLogin) {
      btnLogin.addEventListener("click", cekPassword);
    }

    if (inputEl) {
      inputEl.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          cekPassword();
        }
      });
    }
  }
});
