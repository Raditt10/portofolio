import fs from 'fs';
import path from 'path';
import readline from 'readline';

const imgDir = path.join(process.cwd(), 'public', 'img');
const indexFile = path.join(process.cwd(), 'constant', 'index.js');
const ignoredFile = path.join(process.cwd(), '.ignored-images.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise(resolve => rl.question(query, resolve));

function extractItems(content, arrayName) {
  const blockRegex = new RegExp(`const ${arrayName}\\s*=\\s*\\[([\\s\\S]*?)\n\\]`);
  const match = content.match(blockRegex);
  if (!match) return [];
  
  const items = [];
  // More lenient regex to capture id, gambar, and judul (allowing optional spaces before colons, etc)
  const itemMatches = [...match[1].matchAll(/\{\s*id:\s*(\d+),[\s\S]*?gambar:\s*['"]?([^'",\s]+)['"]?[\s\S]*?judul\s*:\s*['"]([^'"]+)['"]/g)];
  for (const m of itemMatches) {
    items.push({
      id: parseInt(m[1]),
      gambar: m[2],
      judul: m[3],
      fullMatch: m[0]
    });
  }
  return items;
}

async function main() {
  let ignoredImages = [];
  if (fs.existsSync(ignoredFile)) {
    ignoredImages = JSON.parse(fs.readFileSync(ignoredFile, 'utf-8'));
  } else {
    try {
      const allFiles = fs.readdirSync(imgDir);
      ignoredImages = allFiles.filter(f => {
        return ['avatar2.png', 'cover.jpg', 'vite.svg', 'meow.jpg', 'radit2.jpg'].includes(f) || f.startsWith('galer') || f.startsWith('galor') || f.startsWith('bocil');
      });
      fs.writeFileSync(ignoredFile, JSON.stringify(ignoredImages, null, 2));
    } catch {}
  }

  let indexContent = fs.readFileSync(indexFile, 'utf-8');
  let hasChanges = false;

  console.log(`\n=================================================`);
  console.log(`\x1b[36m[Menu Utama - Manajemen Gambar Portfolio]\x1b[0m`);
  console.log(`=================================================`);
  console.log(`1. Pindai dan Tambahkan Gambar Baru`);
  console.log(`2. Ganti Gambar pada Project / Sertifikat yang Sudah Ada`);
  let mainOption = await question('Pilih (1/2): ');

  if (mainOption === '2') {
    console.log(`\nMau ganti gambar di bagian mana?`);
    console.log(`1. Sertifikat (dataCerti)`);
    console.log(`2. Project (projectsData)`);
    let subOption = await question('Pilih (1/2): ');

    let arrayName = subOption === '1' ? 'dataCerti' : 'projectsData';
    let items = extractItems(indexContent, arrayName);

    if (items.length === 0) {
      console.log(`❌ Tidak ada data terdeteksi pada ${arrayName}. Format mungkin berbeda dari yang diharapkan.`);
      rl.close();
      return;
    }

    console.log(`\n--- Daftar ${arrayName} ---`);
    for (const item of items) {
      console.log(`[ID: ${item.id}] ${item.judul} (Gambar saat ini: ${item.gambar || "(kosong)"})`);
    }

    let idToReplace = await question('\nMasukkan ID yang ingin diganti gambarnya: ');
    const selectedItem = items.find(i => i.id == parseInt(idToReplace));
    if (!selectedItem) {
      console.log(`❌ ID tidak ditemukan.`);
      rl.close();
      return;
    }

    const files = fs.readdirSync(imgDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.svg'));
    console.log(`\n--- Pilih Gambar Baru ---`);
    const availableImages = files.filter(f => !ignoredImages.includes(f));
    for (let i = 0; i < availableImages.length; i++) {
        console.log(`${i + 1}. ${availableImages[i]}`);
    }
    let imgIdxStr = await question('Pilih nomor gambar baru: ');
    let imgIdx = parseInt(imgIdxStr) - 1;
    
    if (imgIdx >= 0 && imgIdx < availableImages.length) {
      let newImage = availableImages[imgIdx];
      const blockRegex = new RegExp(`(const ${arrayName}\\s*=\\s*\\[[\\s\\S]*?\n\\])`);
      const blockMatch = indexContent.match(blockRegex);
      if (blockMatch) {
        let blockStr = blockMatch[1];
        // Regex to explicitly target the 'gambar' property in the object with the specific 'id'
        const oldObjRegex = new RegExp(`(\\{\\s*id:\\s*${selectedItem.id},[\\s\\S]*?gambar:\\s*['"]?)([^'",\s]*)(['"]?)`);
        let newBlockStr = blockStr.replace(oldObjRegex, (match, prefix, oldImg, suffix) => {
             // If suffix is empty (meaning no quotes originally), we add quotes around the new image.
             return `${prefix}${suffix ? '' : '"'}${newImage}${suffix ? suffix : '"'}`;
        });
        indexContent = indexContent.replace(blockStr, newBlockStr);
        hasChanges = true;
        console.log(`\n\x1b[32m✅ Berhasil mengganti gambar "${selectedItem.judul}" menjadi "${newImage}"!\x1b[0m`);
      }
    } else {
      console.log(`❌ Nomor gambar tidak valid.`);
    }

  } else {
    const files = fs.readdirSync(imgDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.svg'));
    let foundNew = false;
    
    for (const file of files) {
      if (ignoredImages.includes(file)) continue;
      if (indexContent.includes(`"${file}"`) || indexContent.includes(`'${file}'`)) continue;

      foundNew = true;
      console.log(`\n=================================================`);
      console.log(`\x1b[36m[Pendeteksi Gambar Otomatis]\x1b[0m Ditemukan file baru -> \x1b[33m${file}\x1b[0m`);
      console.log(`=================================================`);
      console.log(`Mau dimasukkan ke mana gambar ini?`);
      console.log(`1. Sertifikat (dataCerti)`);
      console.log(`2. Project (projectsData)`);
      console.log(`3. Abaikan (Pilih ini jika bagian dari Gallery / Techstack / Icon)`);
      console.log(`4. Lewati untuk saat ini`);
      
      let answer = await question('Pilih (1/2/3/4): ');

      if (answer === '1') {
        let judul = await question('Masukkan Judul Sertifikat (Kosongkan untuk default nama gambar): ');
        if (!judul) judul = `Sertifikat Baru (${file.replace(/\.[^/.]+$/, "")})`;
        let link = await question('Masukkan Link Sertifikat (Kosongkan untuk default GDrive link aslinya): ');
        if (!link) link = "https://drive.google.com/drive/folders/1lQhCp73UNCH-Ky69UEpVG6vwcLmMPa2v";
        
        const regex = /(const dataCerti\s*=\s*\[[\s\S]*?)(\n\])/;
        const match = indexContent.match(regex);
        if (match) {
          let maxId = 0;
          const idMatches = [...match[1].matchAll(/id:\s*(\d+)/g)];
          if (idMatches.length > 0) {
            maxId = Math.max(...idMatches.map(m => parseInt(m[1])));
          }
          const nextId = maxId > 0 ? maxId + 1 : 1;

          const newEntry = `
  {
    id: ${nextId},
    gambar: "${file}",
    judul : "${judul}",
    link: "${link}"
  },`;
          indexContent = indexContent.replace(regex, `$1${newEntry}$2`);
          hasChanges = true;
          console.log(`\x1b[32m✅ Berhasil ditambahkan ke array Sertifikat!\x1b[0m`);
        }
      } else if (answer === '2') {
        let judul = await question('Masukkan Judul Project: ');
        if (!judul) judul = `Project Baru (${file.replace(/\.[^/.]+$/, "")})`;
        let parag = await question('Masukkan Deskripsi Pendek: ');
        let linkDemo = await question('Masukkan Link Demo (opsional, enter untuk "#"): ');
        if (!linkDemo) linkDemo = "#";
        let linkCode = await question('Masukkan Link Code Repo (opsional, enter untuk "#"): ');
        if (!linkCode) linkCode = "#";
        let isComingSoonStr = await question('Apakah format Coming Soon? (y/n, opsional): ');
        let isComingSoon = isComingSoonStr.toLowerCase() === 'y' ? `,\n    isComingSoon: true` : "";

        const regex = /(const projectsData\s*=\s*\[[\s\S]*?)(\n\])/;
        const match = indexContent.match(regex);
        if (match) {
          let maxId = 0;
          const idMatches = [...match[1].matchAll(/id:\s*(\d+)/g)];
          if (idMatches.length > 0) {
            maxId = Math.max(...idMatches.map(m => parseInt(m[1])));
          }
          const nextId = maxId > 0 ? maxId + 1 : 1;

          const newEntry = `
  {
    id: ${nextId},
    gambar: "${file}",
    judul: "${judul}",
    parag: "${parag}",
    tech: ["Tech1", "Tech2"],
    linkDemo: "${linkDemo}",
    linkCode: "${linkCode}"${isComingSoon}
  },`;
          indexContent = indexContent.replace(regex, `$1${newEntry}$2`);
          hasChanges = true;
          console.log(`\x1b[32m✅ Berhasil ditambahkan ke array Project!\x1b[0m`);
        }
      } else if (answer === '3') {
        ignoredImages.push(file);
        fs.writeFileSync(ignoredFile, JSON.stringify(ignoredImages, null, 2));
        console.log(`\x1b[31m❌ Gambar ${file} dimasukkan ke daftar abaikan (.ignored-images.json).\x1b[0m`);
      } else {
        console.log(`⏩ Gambar dilewati.`);
      }
    }

    if (!foundNew) {
      console.log(`\n\x1b[33m💡 Tidak ada gambar baru yang ditemukan atau semua gambar sudah didaftarkan.\x1b[0m`);
    }
  }

  if (hasChanges) {
    fs.writeFileSync(indexFile, indexContent);
    console.log(`\n\x1b[32m🎉 Proses Selesai! File \x1b[1mconstant/index.js\x1b[0m \x1b[32mtelah diperbarui otomatis.\x1b[0m`);
  } else {
    console.log(`\n✨ Proses Selesai! Tidak ada perubahan.`);
  }

  rl.close();
}

main();
