import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

// biar bisa akses file HTML di /public
app.use(express.static("public"));

// Load data.json
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

app.get("/nik", (req, res) => {
    const { nik } = req.query;

    if (!nik || nik.length !== 16 || isNaN(nik)) {
        return res.status(400).json({ message: "NIK tidak valid" });
    }

    const tanggal = nik.substring(6, 8);
    const bulan = nik.substring(8, 10);
    const tahun = nik.substring(10, 12);
    const provinsi = nik.substring(0, 2);
    const kabkot = nik.substring(0, 4);
    const kecamatan = nik.substring(0, 6);
    const uniqcode = nik.substring(12, 16);

    let jenisKelamin = "LAKI-LAKI";
    if (parseInt(tanggal) > 40) {
        jenisKelamin = "PEREMPUAN";
    }

    const provinsiee = data.provinsi?.[provinsi] || "Tidak Diketahui";
    const kabkottt = data.kabkot?.[kabkot] || "Tidak Diketahui";
    const kecamatanraw =
        data.kecamatan?.[kecamatan] || "Tidak Diketahui--0000";

    const [kecamatann, kodepos] = kecamatanraw.split("--");

    res.json({
        tanggal: `${tanggal}/${bulan}/${tahun}`,
        jenisKelamin,
        provinsi: provinsiee,
        kabkot: kabkottt,
        kecamatan: kecamatann,
        kodepos,
        uniqcode,
    });
});

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
