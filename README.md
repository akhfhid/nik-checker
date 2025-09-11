```markdown
# 🆔 NIK Checker  
> Validasi & pencarian Nomor Induk Kependudukan dalam satu endpoint.

Backend sederhana untuk memeriksa keabsahan NIK (16 digit) sekaligus mengembalikan hasilnya dalam format JSON.

---

## ✨ Fitur
- Validasi panjang & format NIK (harus 16 digit numerik)
- Pencarian & parsing informasi dasar dari NIK*
- Response cepat dalam bentuk JSON
- Mudah di-hosting lokal maupun di cloud

\* *versi mendatang: ekstraksi wilayah, tanggal lahir, dsb.*

---

## 🚀 Instalasi & Menjalankan Lokal
1. Clone repo
   ```bash
   git clone https://github.com/username/nik-checker.git
   cd nik-checker
   ```
2. Install dependensi
   ```bash
   npm install
   ```
3. Jalankan server
   ```bash
   npm start
   ```
   Server otomatis berjalan di [http://localhost:3000](http://localhost:3000)

---

## 📌 Contoh Penggunaan
### Validasi NIK
**Request**  
```
GET /api/cek-nik?nik=3201010101010001
```

**Response 200 – Valid**
```json
{
  "status": "valid",
  "nik": "3201010101010001",
  "message": "NIK valid dan sesuai format"
}
```

**Response 400 – Invalid**
```json
{
  "status": "invalid",
  "nik": "123",
  "message": "NIK tidak valid!"
}
```

---

## 🛠️ Stack Teknologi
- Node.js
- Express.js

---

## 📄 Lisensi
MIT License — bebas pakai, modifikasi & sebarluaskan.
