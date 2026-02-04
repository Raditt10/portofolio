# Personal Portfolio Website

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-GreenSock-88CE02?style=flat&logo=greensock&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Personal Portfolio** adalah website interaktif yang dirancang untuk menampilkan profil profesional, keahlian teknis, pengalaman, serta koleksi proyek yang telah dikerjakan oleh **Rafaditya Syahputra**. Website ini dibangun dengan fokus pada performa tinggi, animasi yang halus, dan tampilan yang responsif.

## 📌 Deskripsi Project
Website ini berfungsi sebagai identitas digital (personal branding) yang memuat:
* **Showcase Project:** Galeri proyek-proyek unggulan seperti *Kul-Kul*, *Irmaverse*, dan lainnya.
* **Informasi Profesional:** Riwayat pendidikan, pencapaian kompetisi, dan sertifikasi.
* **Tech Stack:** Visualisasi teknologi dan tools yang dikuasai.
* **Kontak:** Sarana bagi pengunjung untuk mengunduh CV atau menghubungi via media sosial.

## 🛠️ Tech Stack
Teknologi modern yang digunakan dalam pengembangan:

* **Frontend Framework:** React.js
* **Build Tool:** Vite
* **Styling:** Tailwind CSS (untuk layout responsif dan modern)
* **Animation:** GSAP (GreenSock Animation Platform) untuk interaksi visual yang dinamis
* **Icons & Assets:** SVG Custom & React Icons

## 🚀 Fitur Utama
* **Hero Section Interaktif**: Animasi pembuka menggunakan GSAP dan efek teks (SplitText/ShinyText).
* **Custom Cursor**: Kursor kustom untuk meningkatkan pengalaman pengguna (UX).
* **Project Gallery**: Tampilan grid atau slide untuk daftar portofolio dengan detail teknologi.
* **Responsive Design**: Tampilan yang optimal di Desktop, Tablet, dan Mobile.
* **Lazy Loading**: Komponen dimuat secara efisien untuk performa maksimal.
* **Downloadable CV**: Fitur akses langsung ke dokumen Curriculum Vitae.

## 📁 Struktur Folder
Gambaran struktur direktori utama project ini:

```text
portofolio/
├── public/
│   ├── img/               # Aset gambar (Project, Logo Tech Stack, Foto Profil)
│   ├── file/              # Dokumen publik (CV.pdf)
├── src/
│   ├── assets/            # Aset statis komponen
│   ├── components/        # Komponen UI (Hero, Navbar, Footer, dll)
│   │   ├── assets/        # Komponen kecil (Cards, Modal, Text Effects)
│   ├── constant/          # Data statis (list project, sosmed, dll)
│   ├── App.jsx            # Komponen utama aplikasi
│   ├── main.jsx           # Entry point React
│   └── index.css          # Global style & Tailwind directives
├── index.html             # HTML entry point
├── vite.config.js         # Konfigurasi Vite
└── package.json           # Daftar dependensi project
```

##⚙️ Instalasi & Setup

Ikuti langkah berikut untuk menjalankan project di komputer lokal:
Prasyarat

Pastikan Anda telah menginstal:

    Node.js (versi LTS disarankan)

    NPM atau PNPM

## Langkah Instalasi

    Clone Repository
    Bash

    git clone [https://github.com/username/portofolio.git](https://github.com/username/portofolio.git)
    cd portofolio

    Instal Dependensi
    Bash

    npm install
    # atau jika menggunakan pnpm
    pnpm install

    Jalankan Mode Development
    Bash

    npm run dev

    Website akan berjalan di http://localhost:5173 (port default Vite).

    Build untuk Production Untuk membuat versi produksi yang siap deploy:
    Bash

    npm run build

##🔐 Konfigurasi Aset

Pastikan file gambar dan dokumen diletakkan di folder yang sesuai agar dapat diakses:

    Gambar Project & Tech Stack: public/img/

    File CV: public/file/ (Sesuaikan nama file di codingan jika Anda mengganti file CV).

##🤝 Kontribusi

Jika Anda ingin mengembangkan lebih lanjut atau memperbaiki bug:

    Fork repository ini.

    Buat branch baru.

    Commit perubahan Anda.

    Push ke branch tersebut.

    Buat Pull Request.

##📄 Lisensi

Project ini dilisensikan di bawah MIT License.

Dikembangkan oleh [Xealuyaa]
