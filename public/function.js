async function cariNIK() {
    const nik = document.getElementById('nik').value.trim();
    const hasilDiv = document.getElementById('hasil');

    if (nik.length !== 16 || isNaN(nik)) {
        hasilDiv.style.display = 'block';
        hasilDiv.innerHTML = '<p style="color:red">NIK tidak valid!</p>';
        return;
    }
    try {
        const res = await fetch(`/nik?nik=${nik}`);
        const data = await res.json();

        if (res.ok) {
            hasilDiv.style.display = 'block';

            const nikValue = nik; // ambil NIK dari input
            const tanggalRaw = parseInt(nikValue.substr(6, 2), 10);
            const bulanRaw = parseInt(nikValue.substr(8, 2), 10);
            const tahunRaw = parseInt(nikValue.substr(10, 2), 10);

            let tgl = tanggalRaw;
            let jenisKelamin = "Laki-laki";
            if (tgl > 40) {
                tgl = tgl - 40;
                jenisKelamin = "Perempuan";
            }

            // tentukan tahun (misalnya 00–29 = 2000–2029, sisanya 1900–1999)
            const tahun = tahunRaw <= 29 ? 2000 + tahunRaw : 1900 + tahunRaw;

            hasilDiv.innerHTML = `
        <h3>Hasil Pencarian</h3>
        <p><strong>Tanggal Lahir:</strong> ${String(tgl).padStart(2, '0')}-${String(bulanRaw).padStart(2, '0')}-${tahun}</p>
        <p><strong>Jenis Kelamin:</strong> ${jenisKelamin}</p>
        <p><strong>Provinsi:</strong> ${data.provinsi}</p>
        <p><strong>Kab/Kota:</strong> ${data.kabkot}</p>
        <p><strong>Kecamatan:</strong> ${data.kecamatan}</p>
        <p><strong>Kode Pos:</strong> ${data.kodepos}</p>
        <p><strong>Uniqcode:</strong> ${data.uniqcode}</p>
    `;
        }
 else {
            hasilDiv.style.display = 'block';
            hasilDiv.innerHTML = `<p style="color:red">${data.message}</p>`;
        }
    } catch (err) {
        hasilDiv.style.display = 'block';
        hasilDiv.innerHTML = '<p style="color:red">Terjadi kesalahan server.</p>';
    }
}

async function randomNIK() {
    const res = await fetch('/data.json');
    const data = await res.json();

    const provList = Object.keys(data.provinsi);
    const provKey = provList[Math.floor(Math.random() * provList.length)];
    const provName = data.provinsi[provKey];

    const kabKeys = Object.keys(data.kabkot).filter(k => k.startsWith(provKey));
    if (!kabKeys.length) { alert('Tidak ada kab/kota untuk provinsi ' + provName); return; }
    const kabKey = kabKeys[Math.floor(Math.random() * kabKeys.length)];
    const kabName = data.kabkot[kabKey];

    const kecKeys = Object.keys(data.kecamatan).filter(k => k.startsWith(kabKey));
    if (!kecKeys.length) { alert('Tidak ada kecamatan untuk kab/kota ' + kabName); return; }
    const kecKey = kecKeys[Math.floor(Math.random() * kecKeys.length)];
    const [kecName, kodePos] = data.kecamatan[kecKey].split(' -- ');

    // bulan random (1–12)
    const mm = Math.floor(Math.random() * 12) + 1;
    // tanggal random (1–31)
    let dd = Math.floor(Math.random() * 31) + 1;

    // tentukan jenis kelamin
    const isFemale = Math.random() < 0.5;
    if (isFemale) dd += 40;

    const day = String(dd).padStart(2, '0');
    const month = String(mm).padStart(2, '0');
    const year = String(Math.floor(Math.random() * 100)).padStart(2, '0');
    const uniq = String(Math.floor(Math.random() * 10000)).padStart(4, '0');

    const nik = provKey + kabKey.substring(2, 4) + kecKey.substring(4, 6) +
        day + month + year + uniq;

    document.getElementById('nik').value = nik;
    document.getElementById('kodepos').value = kodePos;

    cariNIK();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnRandom').addEventListener('click', randomNIK);
    document.getElementById('btnCari').addEventListener('click', cariNIK);
});
