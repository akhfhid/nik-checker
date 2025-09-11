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
            hasilDiv.innerHTML = `
        <h3>Hasil Pencarian</h3>
        <p><strong>Tanggal Lahir:</strong> ${data.tanggal}</p>
        <p><strong>Jenis Kelamin:</strong> ${data.jenisKelamin}</p>
        <p><strong>Provinsi:</strong> ${data.provinsi}</p>
        <p><strong>Kab/Kota:</strong> ${data.kabkot}</p>
        <p><strong>Kecamatan:</strong> ${data.kecamatan}</p>
        <p><strong>Kode Pos:</strong> ${data.kodepos}</p>
        <p><strong>Uniqcode:</strong> ${data.uniqcode}</p>
      `;
        } else {
            hasilDiv.style.display = 'block';
            hasilDiv.innerHTML = `<p style="color:red">${data.message}</p>`;
        }
    } catch (err) {
        hasilDiv.style.display = 'block';
        hasilDiv.innerHTML = '<p style="color:red">Terjadi kesalahan server.</p>';
    }
}

// ---------- GENERATE RANDOM NIK ----------
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

    const mm = Math.floor(Math.random() * 12) + 1;
    const maxDay = new Date(2099, mm, 0).getDate();
    let dd = Math.floor(Math.random() * maxDay) + 1;
    if (Math.random() < 0.5) dd += 40;

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