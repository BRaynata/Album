# Buku Kenangan Kita

Website pribadi untuk menyimpan kenangan indah bersama pasangan. Dibuat dengan HTML, CSS, JavaScript, dan Node.js.

## Fitur

- Halaman utama dengan tampilan romantis
- Galeri foto kenangan
- Halaman admin untuk menambah dan menghapus kenangan
- Desain responsif untuk semua perangkat
- Upload foto dan cerita kenangan
- Filter kenangan berdasarkan tanggal

## Persyaratan

- Node.js (versi 14 atau lebih baru)
- npm (Node Package Manager)

## Instalasi

1. Clone repository ini:
```bash
git clone [URL_REPOSITORY]
cd memory-book
```

2. Install dependensi:
```bash
npm install
```

3. Jalankan server:
```bash
npm start
```

4. Buka browser dan akses:
```
http://localhost:3000
```

## Penggunaan

### Halaman Utama
- Menampilkan kenangan terbaru
- Navigasi ke galeri dan halaman admin

### Galeri
- Melihat semua kenangan
- Filter kenangan berdasarkan tanggal
- Klik foto untuk melihat detail

### Halaman Admin
- Tambah kenangan baru (foto dan cerita)
- Hapus kenangan yang sudah ada
- Preview foto sebelum upload

## Struktur Folder

```
memory-book/
├── public/
│   ├── images/        # Folder untuk menyimpan foto
│   ├── index.html     # Halaman utama
│   ├── gallery.html   # Halaman galeri
│   ├── style.css      # File CSS
│   └── script.js      # JavaScript untuk halaman utama & galeri
├── admin/
│   ├── admin.html     # Halaman admin
│   └── admin.js       # JavaScript untuk halaman admin
├── server.js          # Backend server
├── memories.json      # Database kenangan
├── package.json       # Dependensi
└── README.md         # Dokumentasi
```

## Teknologi yang Digunakan

- Frontend:
  - HTML5
  - CSS3 (Flexbox & Grid)
  - JavaScript (ES6+)
  - Google Fonts

- Backend:
  - Node.js
  - Express.js
  - Multer (untuk upload file)

## Kontribusi

Silakan buat pull request untuk kontribusi. Untuk perubahan besar, buka issue terlebih dahulu untuk mendiskusikan perubahan yang diinginkan.

## Lisensi

[MIT](https://choosealicense.com/licenses/mit/) 