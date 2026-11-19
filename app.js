/**
 * Voc1Maps - Peta Digital Interaktif SMK Negeri 1 Cilegon
 * Aplikasi panduan navigasi real-time berbasis sekolah.
 * Koordinat SMKN 1 Cilegon: -6.046173455310091, 106.0519980548539
 */

// ==========================================
// 1. DATABASE LOKASI & RUANGAN SEKOLAH
// ==========================================
const SCHOOL_COORDINATES = {
  lat: -6.046173455310091,
  lng: 106.0519980548539
};

// Kalibrasi batas geografis SMKN 1 Cilegon untuk proyeksi denah (WGS84 -> Persentase X/Y)
const GPS_BOUNDS = {
  north: -6.045000,
  south: -6.046850,
  west: 106.051000,
  east: 106.052400
};

const schoolEntrance = { x: 84.5, y: 76.2 }; // Titik Pos Gerbang Utama

const places = [
  // --- GERBANG, POS, PARKIR & TAMAN ---
  {
    id: "pos-gerbang",
    name: "Pos Gerbang Utama",
    aliases: ["pos satpam", "gerbang", "pintu masuk", "security", "pos"],
    category: "Fasilitas",
    roleCategories: ["Tamu Sekolah", "Murid Baru", "Wali Murid", "Guru & Staff"],
    block: "Area Masuk",
    floor: "Lantai Dasar",
    floorColor: "green",
    detail: "Pintu masuk & pos keamanan utama SMKN 1 Cilegon",
    description: "Titik akses utama bagi seluruh warga sekolah dan tamu. Pos pemeriksaan keamanan, buku tamu, dan informasi awal lokasi.",
    facilities: ["Petugas Keamanan 24 Jam", "Buku Tamu Digital", "Informasi Denah", "CCTV"],
    icon: "gate",
    x: 84.5,
    y: 76.2
  },
  {
    id: "taman-utama",
    name: "Taman Sekolah",
    aliases: ["taman", "taman depan", "area hijau", "taman gerbang"],
    category: "Fasilitas",
    roleCategories: ["Tamu Sekolah", "Murid Baru"],
    block: "Area Depan",
    floor: "Lantai Dasar",
    detail: "Area hijau asri depan sekolah",
    description: "Ruang terbuka hijau di samping gerbang utama yang memberikan udara segar dan suasana nyaman bagi lingkungan sekolah.",
    facilities: ["Bangku Taman", "Pepohonan Rindang", "Lampu Penerangan"],
    icon: "field",
    x: 78.5,
    y: 81.0
  },
  {
    id: "parkir-guru",
    name: "Parkir Guru & Karyawan",
    aliases: ["parkir guru", "parkir mobil", "parkir motor guru", "parkiran"],
    category: "Fasilitas",
    roleCategories: ["Guru & Staff", "Tamu Sekolah"],
    block: "Samping Blok A",
    floor: "Lantai Dasar",
    detail: "Area parkir khusus dewan guru dan staf",
    description: "Kawasan parkir khusus kendaraan roda dua dan roda empat untuk guru, staf tata usaha, dan tamu dinas.",
    facilities: ["Kanopi Pelindung", "Akses Jalan Utama", "CCTV Keamanan"],
    icon: "gate",
    x: 73.0,
    y: 56.5
  },
  {
    id: "parkir-kepsek",
    name: "Parkir Kepala Sekolah",
    aliases: ["parkir kepsek", "parkir pimpinan"],
    category: "Fasilitas",
    roleCategories: ["Guru & Staff"],
    block: "Samping R. Kepsek",
    floor: "Lantai Dasar",
    detail: "Area parkir pimpinan sekolah",
    description: "Area parkir kendaraan khusus Kepala Sekolah SMKN 1 Cilegon.",
    facilities: ["Akses Langsung Ruang Kepsek", "Atap Kanopi"],
    icon: "gate",
    x: 58.0,
    y: 71.0
  },

  // --- KANTOR & PUSAT ADMINISTRASI ---
  {
    id: "ruang-kepsek",
    name: "Ruang Kepala Sekolah",
    aliases: ["kepsek", "kepala sekolah", "r. kepsek", "pimpinan"],
    category: "Gedung",
    roleCategories: ["Tamu Sekolah", "Wali Murid", "Guru & Staff"],
    block: "Gedung Utama",
    floor: "Lantai Dasar",
    detail: "Kantor pimpinan SMKN 1 Cilegon",
    description: "Ruang kerja dan ruang penerimaan tamu resmi pimpinan SMK Negeri 1 Cilegon.",
    facilities: ["Ruang Tamu Pimpinan", "Pendingin AC", "Meja Rapat Terbatas", "Display Prestasi"],
    icon: "people",
    x: 67.5,
    y: 71.0
  },
  {
    id: "ruang-tu",
    name: "Ruang Tata Usaha (TU)",
    aliases: ["tu", "tata usaha", "administrasi", "r. tu", "bayar spp", "legalisir", "surat"],
    category: "Fasilitas",
    roleCategories: ["Wali Murid", "Murid Baru", "Guru & Staff", "Tamu Sekolah"],
    block: "Gedung Utama",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Layanan administrasi, surat menyurat & kesiswaan",
    description: "Pusat pelayanan administrasi sekolah, surat keterangan siswa, legalisir ijazah, administrasi PPDB, dan keuangan sekolah.",
    facilities: ["Loket Pelayanan", "Ruang Tunggu", "Komputer Administrasi", "Arsip Siswa", "Pendingin AC"],
    icon: "people",
    x: 68.5,
    y: 66.8
  },
  {
    id: "ruang-guru",
    name: "Ruang Guru",
    aliases: ["guru", "r. guru", "kantor guru", "dewan guru", "piket"],
    category: "Fasilitas",
    roleCategories: ["Guru & Staff", "Murid Baru", "Wali Murid"],
    block: "Gedung Barat",
    floor: "Lantai Dasar",
    detail: "Kantor dewan pendidik SMKN 1 Cilegon",
    description: "Ruang kerja guru mata pelajaran umum dan kejuruan, konsultasi siswa, serta persiapan materi kegiatan belajar mengajar (KBM).",
    facilities: ["Meja Kerja Guru", "Ruang Piket", "Loker Guru", "WiFi Sekolah", "Pendingin AC"],
    icon: "people",
    x: 34.8,
    y: 57.8
  },
  {
    id: "ruang-kesiswaan",
    name: "Ruang Kesiswaan",
    aliases: ["kesiswaan", "wakasek kesiswaan", "r. ksswaan", "tatib", "disiplin"],
    category: "Fasilitas",
    roleCategories: ["Wali Murid", "Murid Baru", "Guru & Staff"],
    block: "Gedung Tengah",
    floor: "Lantai Dasar",
    detail: "Pembinaan kesiswaan, kedisiplinan & ekstrakurikuler",
    description: "Kantor pembinaan karakter, tata tertib siswa, izin masuk/keluar, dan koordinasi kegiatan ekstrakurikuler siswa.",
    facilities: ["Meja Konseling", "Data Pelanggaran & Prestasi", "Ruang Staf Kesiswaan"],
    icon: "people",
    x: 54.2,
    y: 66.0
  },
  {
    id: "ruang-sarana",
    name: "Ruang Sarana & Prasarana",
    aliases: ["sarana", "sarpras", "logistik", "inventaris"],
    category: "Fasilitas",
    roleCategories: ["Guru & Staff"],
    block: "Gedung Tengah",
    floor: "Lantai Dasar",
    detail: "Pengelolaan perlengkapan & fasilitas sekolah",
    description: "Pusat pengelolaan inventaris, perawatan fasilitas sekolah, peminjaman alat, dan pengadaan sarana pembelajaran.",
    facilities: ["Gudang Alat", "Sistem Manajemen Inventaris", "Meja Staf Sarpras"],
    icon: "tools",
    x: 57.5,
    y: 66.0
  },
  {
    id: "ruang-osis",
    name: "Ruang OSIS",
    aliases: ["osis", "organisasi siswa", "sekretariat osis"],
    category: "Fasilitas",
    roleCategories: ["Murid Baru"],
    block: "Blok A Utara",
    floor: "Lantai Dasar",
    detail: "Sekretariat OSIS & MPK",
    description: "Pusat rapat kerja, koordinasi kegiatan kesiswaan, acara sekolah, dan sekretariat pengurus Organisasi Siswa Intra Sekolah.",
    facilities: ["Meja Kerja Pengurus", "Papan Rencana Kegiatan", "Inventaris Acara"],
    icon: "people",
    x: 71.0,
    y: 47.5
  },
  {
    id: "ruang-pmr",
    name: "Ruang PMR / UKS",
    aliases: ["pmr", "uks", "ruang kesehatan", "pertolongan pertama", "sakit", "obat"],
    category: "Fasilitas",
    roleCategories: ["Murid Baru", "Guru & Staff", "Tamu Sekolah"],
    block: "Depan Bengkel Mesin",
    floor: "Lantai Dasar",
    detail: "Unit Kesehatan Sekolah & Palang Merah Remaja",
    description: "Fasilitas kesehatan darurat siswa dan staf sekolah, pertolongan pertama pada kecelakaan/sakit saat KBM atau upacara.",
    facilities: ["Tempat Tidur Pasien", "Kotak Obat P3K Lengkap", "Tabung Oksigen", "Timbangan & Pengukur Tinggi"],
    icon: "people",
    x: 48.5,
    y: 71.0
  },

  // --- LABORATORIUM & KOMPUTER ---
  {
    id: "lab-komputer",
    name: "Laboratorium Komputer",
    aliases: ["lab kom", "l. kom", "lab komputer", "komputer", "lab pc", "unbk", "anbk", "cbt"],
    category: "Fasilitas",
    roleCategories: ["Murid Baru", "Guru & Staff"],
    block: "Gedung Tengah",
    floor: "Lantai Dasar",
    detail: "Laboratorium komputer umum & ujian CBT",
    description: "Lab komputasi multimedia untuk pembelajaran informatika, simulasi kejuruan, ANBK, dan sertifikasi keahlian.",
    facilities: ["40 Unit Komputer Core i7", "Jaringan LAN Gigabit & Internet Cepat", "AC Sentral", "LCD Proyektor"],
    icon: "computer",
    x: 49.0,
    y: 66.0
  },
  {
    id: "ruang-ict",
    name: "Ruang ICT & Server",
    aliases: ["ict", "ruang server", "jaringan", "noc", "wifi"],
    category: "Fasilitas",
    roleCategories: ["Guru & Staff"],
    block: "Gedung Tengah",
    floor: "Lantai Dasar",
    detail: "Pusat pengendali jaringan & server SMKN 1 Cilegon",
    description: "Network Operation Center (NOC) sekolah, router mikrotik, server website sekolah, database nilai, dan manajemen WiFi sekolah.",
    facilities: ["Rack Server", "UPS Kapasitas Tinggi", "Firewall", "Pemantau CCTV Terpusat"],
    icon: "computer",
    x: 61.0,
    y: 66.0
  },
  {
    id: "lab-kimia",
    name: "Laboratorium Kimia",
    aliases: ["lab kimia", "l. kim", "kimia", "reagen", "lab sains"],
    category: "Fasilitas",
    roleCategories: ["Murid Baru", "Guru & Staff"],
    block: "Blok C",
    floor: "Lantai Dasar",
    detail: "Praktikum kimia sains & kejuruan",
    description: "Ruang pengujian dan praktikum reaksi kimia, analisa larutan, dan pengenalan instrumen kimia bersertifikasi K3.",
    facilities: ["Lemari Asam", "Meja Praktikum Keramik", "Wastafel Kimia", "Shower Darurat", "Peralatan Gelas Lab"],
    icon: "tools",
    x: 50.5,
    y: 48.5
  },
  {
    id: "lab-fisika",
    name: "Laboratorium Fisika",
    aliases: ["lab fisika", "l. fis", "fisika", "alat ukur"],
    category: "Fasilitas",
    roleCategories: ["Murid Baru", "Guru & Staff"],
    block: "Blok C",
    floor: "Lantai Dasar",
    detail: "Praktikum fisika terapan teknik",
    description: "Laboratorium pengukuran besaran mekanika, listrik magnet, gelombang optik, dan kalor untuk dasar-dasar teknik.",
    facilities: ["Kit Praktikum Fisika", "Osiloskop", "Neraca Digital", "Multitester", "Proyektor"],
    icon: "tools",
    x: 58.0,
    y: 48.5
  },

  // --- BENGKEL KEJURUAN ---
  {
    id: "bengkel-otomotif",
    name: "Bengkel Otomotif",
    aliases: ["otomotif", "tkr", "bengkel mobil", "teknik kendaraan ringan", "bengkel otomotif", "tsm"],
    category: "Gedung",
    roleCategories: ["Murid Baru", "Guru & Staff", "Tamu Sekolah"],
    block: "Gedung Otomotif",
    floor: "Lantai Dasar",
    detail: "Praktik Teknik Kendaraan Ringan & Otomotif",
    description: "Bengkel modern berstandar industri dengan sarana service kendaraan roda empat, spooring balancing, tune up mesin EFI, dan kelistrikan body.",
    facilities: ["Car Lift 2 Post & 4 Post", "Engine Scanner OBD-II", "Tune Up Tester", "Kompresor Industri"],
    icon: "tools",
    x: 66.2,
    y: 34.0
  },
  {
    id: "ruang-e1",
    name: "Ruang E1 (Teori Otomotif)",
    aliases: ["e1", "kelas e1", "teori otomotif"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Gedung Otomotif",
    floor: "Lantai Dasar",
    detail: "Ruang teori kejuruan otomotif",
    description: "Ruang pembelajaran teori dan simulasi sistem kelistrikan & mesin otomotif sebelum praktik kerja di bengkel.",
    facilities: ["Whiteboard", "Proyektor", "Trainer Kelistrikan", "AC"],
    icon: "class",
    x: 66.2,
    y: 39.0
  },
  {
    id: "bengkel-mesin",
    name: "Bengkel Mesin (Pemesinan)",
    aliases: ["bengkel mesin", "mesin bubut", "cnc", "frais", "teknik pemesinan", "bubut"],
    category: "Gedung",
    roleCategories: ["Murid Baru", "Guru & Staff", "Tamu Sekolah"],
    block: "Gedung Mesin",
    floor: "Lantai Dasar",
    detail: "Praktik bubut, frais, CNC & manufaktur presisi",
    description: "Sentra manufaktur dan pemesinan dengan puluhan mesin bubut konvensional, mesin frais universal, serta mesin CNC Milling & Turning industri.",
    facilities: ["16 Unit Mesin Bubut", "6 Unit Mesin Frais", "2 Unit CNC Lathe & Milling", "Alat Ukur Mikrometer & Dial Indicator"],
    icon: "tools",
    x: 48.5,
    y: 76.5
  },
  {
    id: "bengkel-tgm",
    name: "Bengkel TGM (Teknik Gambar Mesin)",
    aliases: ["tgm", "gambar mesin", "cad", "cam", "desain teknik", "bengkel tgm"],
    category: "Gedung",
    roleCategories: ["Murid Baru", "Guru & Staff"],
    block: "Gedung TGM",
    floor: "Lantai Dasar",
    detail: "Studio Desain Pemodelan CAD & Manufaktur",
    description: "Studio perancangan 2D CAD dan 3D Modeling mechanical design dengan software industri seperti AutoCAD, Inventor, dan SolidWorks.",
    facilities: ["Workstation Komputer CAD", "Plotter Ukuran A0/A1", "Meja Gambar Manual", "3D Printer Prototyping"],
    icon: "tools",
    x: 66.0,
    y: 80.5
  },
  {
    id: "bengkel-rpl",
    name: "Bengkel RPL (Software Engineering)",
    aliases: ["rpl", "bengkel rpl", "rekayasa perangkat lunak", "coding", "lab rpl", "programmer", "it", "software"],
    category: "Gedung",
    roleCategories: ["Murid Baru", "Guru & Staff", "Tamu Sekolah"],
    block: "Gedung RPL",
    floor: "Lantai Dasar",
    detail: "Sentra Rekayasa Perangkat Lunak, Web & Mobile Dev",
    description: "Laboratorium software engineering berkonsep tech startup untuk pembuatan aplikasi web, Android, iOS, Cloud computing, dan AI.",
    facilities: ["Dual-Monitor Coding Stations", "Internet Fiber Optic Dedicated", "Smart TV Interactive Screen", "AC Dingin"],
    icon: "computer",
    x: 32.5,
    y: 87.2
  },
  {
    id: "bengkel-tfl",
    name: "Bengkel TFL (Fabrikasi Logam & Las)",
    aliases: ["tfl", "las", "fabrikasi logam", "welding", "bengkel tfl"],
    category: "Gedung",
    roleCategories: ["Murid Baru", "Guru & Staff"],
    block: "Gedung TFL",
    floor: "Lantai Dasar",
    detail: "Teknik Fabrikasi Logam & Pengelasan SMAW, GMAW, GTAW",
    description: "Bengkel pengelasan bersertifikasi industri untuk pengelasan busur listrik, las argon TIG, MIG/MAG, dan pemotongan plasma cutting.",
    facilities: ["Booth Pengelasan Standar K3", "Mesin Las Inverter Multi-Proses", "Mesin Bending Plat", "Plasma Cutting"],
    icon: "tools",
    x: 36.5,
    y: 83.0
  },
  {
    id: "gedung-o",
    name: "Gedung O (Ruang Praktik Kejuruan)",
    aliases: ["gedung o", "blok o", "ruang o"],
    category: "Gedung",
    roleCategories: ["Murid Baru", "Guru & Staff"],
    block: "Blok O",
    floor: "Lantai Dasar",
    detail: "Ruang pengujian kejuruan & perakitan",
    description: "Ruang perakitan benda kerja, assembling teknik, dan uji kelayakan produk manufaktur.",
    facilities: ["Meja Kerja Bangku", "Ragum", "Alat Ukur Teknis"],
    icon: "building",
    x: 48.0,
    y: 83.5
  },
  {
    id: "ruang-l3",
    name: "Ruang L3",
    aliases: ["l3", "ruang l3", "kelas l3"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok L",
    floor: "Lantai Dasar",
    detail: "Ruang teori praktik kejuruan logam & las",
    description: "Ruang pembekalan materi Keselamatan dan Kesehatan Kerja (K3) serta gambar teknik sambungan las.",
    facilities: ["Papan Tulis", "Alat Peraga Pengelasan", "Kipas Angin"],
    icon: "class",
    x: 29.5,
    y: 83.0
  },
  {
    id: "gedung-coe",
    name: "Gedung COE (Center of Excellence)",
    aliases: ["coe", "gedung coe", "center of excellence", "aula coe", "gedung baru"],
    category: "Gedung",
    roleCategories: ["Tamu Sekolah", "Murid Baru", "Wali Murid", "Guru & Staff"],
    block: "Gedung COE",
    floor: "Lantai Dasar",
    detail: "Pusat Keunggulan Vokasi & Teaching Factory",
    description: "Gedung modern bantuan Kemendikbudristek untuk teaching factory terintegrasi, seminar vokasi, dan pameran karya teknologi siswa.",
    facilities: ["Showroom Produk Siswa", "Studio Multimedia", "Ruang Mini Teater", "AC Sentral", "Akses Disabilitas"],
    icon: "building",
    x: 25.5,
    y: 66.0
  },
  {
    id: "ruang-j1",
    name: "Ruang J1 (Gedung COE)",
    aliases: ["j1", "ruang j1", "kelas j1"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Gedung COE",
    floor: "Lantai Dasar",
    detail: "Ruang pembelajaran multimedia COE",
    description: "Ruang kelas modern berkonsep collaborative learning dilengkapi proyektor dan audio.",
    facilities: ["Meja Fleksibel", "Audio System", "Proyektor", "AC"],
    icon: "class",
    x: 35.0,
    y: 66.0
  },
  {
    id: "ruang-j4",
    name: "Ruang J4 (Gedung COE)",
    aliases: ["j4", "ruang j4", "kelas j4"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Gedung COE",
    floor: "Lantai Dasar",
    detail: "Ruang inovasi & inkubasi bisnis siswa",
    description: "Ruang kerja tim kewirausahaan dan inkubasi startup siswa binaan program Center of Excellence.",
    facilities: ["Smart Board", "Internet Kecepatan Tinggi", "AC"],
    icon: "class",
    x: 16.0,
    y: 66.0
  },
  {
    id: "jurusan-elektro",
    name: "Ruang Jurusan Teknik Elektro",
    aliases: ["elektro", "jurusan elektro", "titl", "teknik instalasi tenaga listrik"],
    category: "Gedung",
    roleCategories: ["Murid Baru", "Guru & Staff"],
    block: "Blok Elektro",
    floor: "Lantai Dasar",
    detail: "Praktik Instalasi Penerangan & Tenaga Listrik (TITL)",
    description: "Sentra keahlian teknik elektro, kontrol motor listrik, PLC (Programmable Logic Controller), dan instalasi otomasi industri.",
    facilities: ["Trainer PLC Omron/Siemens", "Papan Praktik Instalasi Bangunan", "Osiloskop Listrik"],
    icon: "tools",
    x: 18.5,
    y: 70.8
  },

  // --- RUANG KELAS BLOK A ---
  {
    id: "kelas-a1",
    name: "Kelas A1",
    aliases: ["a1", "kelas a1", "10 mesin 1", "x mesin 1", "10 ipa 1"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok A",
    floor: "Lantai Dasar",
    detail: "Blok A · lantai dasar",
    description: "Ruang kelas reguler lantai dasar yang menghadap langsung ke arah lapangan upacara dengan sirkulasi udara baik.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor", "Kipas Angin"],
    icon: "class",
    x: 66.5,
    y: 61.5
  },
  {
    id: "kelas-a2",
    name: "Kelas A2",
    aliases: ["a2", "kelas a2", "10 mesin 2", "x mesin 2", "10 ipa 2", "kelas 10 ipa 2"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok A",
    floor: "Lantai Dasar",
    detail: "Blok A · lantai dasar (Kelas 10 IPA 2)",
    description: "Ruang kelas reguler di sayap tengah Blok A dengan pencahayaan alami optimal.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor", "Kipas Angin"],
    icon: "class",
    x: 66.5,
    y: 56.5
  },
  {
    id: "kelas-a3",
    name: "Kelas A3",
    aliases: ["a3", "kelas a3", "10 otomotif 1", "x otomotif 1", "10 ipa 3"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok A",
    floor: "Lantai Dasar",
    detail: "Blok A · lantai dasar",
    description: "Ruang kelas reguler dekat akses tangga penghubung lantai atas Blok A.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor", "Kipas Angin"],
    icon: "class",
    x: 66.5,
    y: 52.8
  },
  {
    id: "kelas-a4",
    name: "Kelas A4",
    aliases: ["a4", "kelas a4", "11 mesin 1", "xi mesin 1"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok A",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok A · lantai atas (Lantai 2)",
    description: "Ruang kelas lantai 2 dengan pemandangan terbuka menghadap lapangan upacara sekolah.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor", "Kipas Angin"],
    icon: "class",
    x: 69.0,
    y: 60.0
  },
  {
    id: "kelas-a5",
    name: "Kelas A5",
    aliases: ["a5", "kelas a5", "11 mesin 2", "xi mesin 2"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok A",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok A · lantai atas (Lantai 2)",
    description: "Ruang kelas lantai 2 dengan suasana belajar yang tenang dan nyaman.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor", "Kipas Angin"],
    icon: "class",
    x: 69.0,
    y: 55.0
  },
  {
    id: "kelas-a6",
    name: "Kelas A6",
    aliases: ["a6", "kelas a6", "11 otomotif 1", "xi otomotif 1"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok A",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok A · lantai atas (Lantai 2)",
    description: "Ruang kelas lantai 2 ujung utara Blok A dekat akses toilet siswa.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor", "Kipas Angin"],
    icon: "class",
    x: 69.0,
    y: 50.8
  },

  // --- RUANG KELAS BLOK B ---
  {
    id: "kelas-b5",
    name: "Kelas B5",
    aliases: ["b5", "kelas b5", "10 elektro 1", "x elektro 1"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok B",
    floor: "Lantai Dasar",
    detail: "Blok B · lantai dasar",
    description: "Ruang kelas di sayap selatan lapangan upacara dekat laboratorium komputer.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 42.8,
    y: 66.0
  },
  {
    id: "kelas-b2",
    name: "Kelas B2",
    aliases: ["b2", "kelas b2", "11 elektro 1", "xi elektro 1"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok B",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok B · lantai atas (Lantai 2)",
    description: "Ruang kelas lantai atas Blok B di atas ruang B5 dengan sudut pandang strategis.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 42.8,
    y: 66.0
  },

  // --- RUANG KELAS BLOK C ---
  {
    id: "kelas-c4",
    name: "Kelas C4",
    aliases: ["c4", "kelas c4", "12 kimia", "xii kimia"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok C",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok C · lantai atas (atas Lab Kimia)",
    description: "Ruang kelas lantai atas Blok C di utara lapangan upacara.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 50.5,
    y: 48.5
  },
  {
    id: "kelas-c3",
    name: "Kelas C3",
    aliases: ["c3", "kelas c3", "12 fisika", "xii fisika"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok C",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok C · lantai atas (atas Lab Fisika)",
    description: "Ruang kelas lantai atas Blok C sisi timur.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 58.0,
    y: 48.5
  },

  // --- RUANG KELAS BLOK D ---
  {
    id: "kelas-d1",
    name: "Kelas D1",
    aliases: ["d1", "kelas d1", "10 rpl 1", "x rpl 1"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok D",
    floor: "Lantai Dasar",
    detail: "Blok D · lantai dasar",
    description: "Ruang kelas di koridor timur sekolah dekat area taman dan gerbang.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 81.5,
    y: 62.5
  },
  {
    id: "kelas-d2",
    name: "Kelas D2",
    aliases: ["d2", "kelas d2", "10 rpl 2", "x rpl 2"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok D",
    floor: "Lantai Dasar",
    detail: "Blok D · lantai dasar",
    description: "Ruang kelas di koridor timur sekolah.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 81.5,
    y: 58.8
  },
  {
    id: "kelas-d3",
    name: "Kelas D3",
    aliases: ["d3", "kelas d3", "10 tkj 1", "x tkj 1"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok D",
    floor: "Lantai Dasar",
    detail: "Blok D · lantai dasar",
    description: "Ruang kelas di koridor timur sekolah.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 81.5,
    y: 55.0
  },
  {
    id: "kelas-d4",
    name: "Kelas D4",
    aliases: ["d4", "kelas d4", "10 tkj 2", "x tkj 2"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok D",
    floor: "Lantai Dasar",
    detail: "Blok D · lantai dasar",
    description: "Ruang kelas di koridor timur sekolah.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 81.5,
    y: 50.0
  },
  {
    id: "ruang-r5",
    name: "Ruang R.5",
    aliases: ["r5", "r.5", "ruang r5"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok D",
    floor: "Lantai Dasar",
    detail: "Blok D · lantai dasar",
    description: "Ruang kelas pembelajaran umum di ujung utara Blok D.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard"],
    icon: "class",
    x: 81.5,
    y: 46.5
  },
  {
    id: "kelas-d6",
    name: "Kelas D6",
    aliases: ["d6", "kelas d6", "11 rpl 1", "xi rpl 1"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok D",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok D · lantai atas (Lantai 2)",
    description: "Ruang kelas di lantai 2 Blok D menghadap area parkir dan lapangan.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 83.5,
    y: 60.5
  },
  {
    id: "kelas-d7",
    name: "Kelas D7",
    aliases: ["d7", "kelas d7", "11 rpl 2", "xi rpl 2"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok D",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok D · lantai atas (Lantai 2)",
    description: "Ruang kelas di lantai 2 Blok D.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 83.5,
    y: 56.8
  },
  {
    id: "kelas-d8",
    name: "Kelas D8",
    aliases: ["d8", "kelas d8", "11 tkj 1", "xi tkj 1"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok D",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok D · lantai atas (Lantai 2)",
    description: "Ruang kelas di lantai 2 Blok D.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 83.5,
    y: 53.0
  },
  {
    id: "ruang-r9",
    name: "Ruang R.9",
    aliases: ["r9", "r.9", "ruang r9"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok D",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok D · lantai atas (Lantai 2)",
    description: "Ruang kelas pembelajaran di lantai atas sayap utara Blok D.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard"],
    icon: "class",
    x: 83.5,
    y: 47.8
  },
  {
    id: "kelas-d10",
    name: "Kelas D10",
    aliases: ["d10", "kelas d10", "11 tkj 2", "xi tkj 2"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok D",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok D · lantai atas (Lantai 2)",
    description: "Ruang kelas paling utara di lantai 2 Blok D.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 83.5,
    y: 43.8
  },

  // --- RUANG KELAS BLOK F ---
  {
    id: "kelas-f1",
    name: "Kelas F1",
    aliases: ["f1", "kelas f1", "10 logam 1", "x logam 1"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok F",
    floor: "Lantai Dasar",
    detail: "Blok F · lantai dasar",
    description: "Ruang kelas di gedung sayap utara sekolah.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard"],
    icon: "class",
    x: 67.5,
    y: 27.2
  },
  {
    id: "kelas-f2",
    name: "Kelas F2",
    aliases: ["f2", "kelas f2", "10 logam 2", "x logam 2"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok F",
    floor: "Lantai Dasar",
    detail: "Blok F · lantai dasar",
    description: "Ruang kelas di gedung sayap utara sekolah.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard"],
    icon: "class",
    x: 67.5,
    y: 23.0
  },
  {
    id: "kelas-f3",
    name: "Kelas F3",
    aliases: ["f3", "kelas f3", "12 rpl 1", "xii rpl 1"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok F",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok F · lantai atas (paling utara)",
    description: "Ruang kelas lantai atas deret horizontal paling utara sekolah.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 67.5,
    y: 17.2
  },
  {
    id: "kelas-f4",
    name: "Kelas F4",
    aliases: ["f4", "kelas f4", "12 rpl 2", "xii rpl 2"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok F",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok F · lantai atas (paling utara)",
    description: "Ruang kelas lantai atas deret horizontal paling utara sekolah.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 62.0,
    y: 17.2
  },
  {
    id: "kelas-f5",
    name: "Kelas F5",
    aliases: ["f5", "kelas f5", "12 tkj 1", "xii tkj 1"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok F",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok F · lantai atas (paling utara)",
    description: "Ruang kelas lantai atas deret horizontal paling utara sekolah.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 54.5,
    y: 17.2
  },
  {
    id: "kelas-f6",
    name: "Kelas F6",
    aliases: ["f6", "kelas f6", "12 tkj 2", "xii tkj 2"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok F",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok F · lantai atas (ujung barat)",
    description: "Ruang kelas lantai atas ujung barat Blok F.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 48.5,
    y: 17.2
  },

  // --- RUANG KELAS BLOK G, H, K, M ---
  {
    id: "kelas-g1",
    name: "Kelas G1",
    aliases: ["g1", "kelas g1"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok G",
    floor: "Lantai Dasar",
    detail: "Blok G · samping barat GSG",
    description: "Ruang kelas di koridor barat gedung serbaguna.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard"],
    icon: "class",
    x: 39.2,
    y: 41.5
  },
  {
    id: "kelas-g2",
    name: "Kelas G2",
    aliases: ["g2", "kelas g2"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok G",
    floor: "Lantai Dasar",
    detail: "Blok G · samping barat GSG",
    description: "Ruang kelas di koridor barat gedung serbaguna dekat koperasi.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard"],
    icon: "class",
    x: 39.2,
    y: 39.0
  },
  {
    id: "kelas-g3",
    name: "Kelas G3",
    aliases: ["g3", "kelas g3"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok G",
    floor: "Lantai Dasar",
    detail: "Blok G · samping barat GSG",
    description: "Ruang kelas di koridor barat gedung serbaguna.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard"],
    icon: "class",
    x: 39.2,
    y: 33.5
  },
  {
    id: "kelas-h1",
    name: "Kelas H1",
    aliases: ["h1", "kelas h1"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok H",
    floor: "Lantai Dasar",
    detail: "Blok H · dekat Ruang Guru",
    description: "Ruang kelas berhadapan langsung dengan lapangan upacara sisi barat.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard"],
    icon: "class",
    x: 35.5,
    y: 51.0
  },
  {
    id: "kelas-k1",
    name: "Kelas K1",
    aliases: ["k1", "kelas k1"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok K",
    floor: "Lantai Dasar",
    detail: "Blok K · lorong jurusan elektro",
    description: "Ruang kelas di lorong jurusan elektro dekat Masjid Al Mizan.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard"],
    icon: "class",
    x: 18.5,
    y: 73.2
  },
  {
    id: "kelas-k4",
    name: "Kelas K4",
    aliases: ["k4", "kelas k4"],
    category: "Ruang kelas",
    roleCategories: ["Murid Baru"],
    block: "Blok K",
    floor: "Lantai Dasar",
    detail: "Blok K · lorong jurusan elektro",
    description: "Ruang kelas di lorong jurusan elektro.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard"],
    icon: "class",
    x: 18.5,
    y: 80.4
  },

  // --- FASILITAS UMUM, IBADAH, KANTIN & OLAHRAGA ---
  {
    id: "masjid-al-mizan",
    name: "Masjid Al Mizan",
    aliases: ["masjid", "masjid al mizan", "sholat", "tempat ibadah", "jumatan", "rohis"],
    category: "Fasilitas",
    roleCategories: ["Tamu Sekolah", "Murid Baru", "Wali Murid", "Guru & Staff"],
    block: "Kawasan Masjid",
    floor: "Lantai Dasar",
    landmark: "large",
    detail: "Masjid utama SMKN 1 Cilegon",
    description: "Pusat ibadah sholat berjamaah, sholat Jumat warga sekolah, kajian rohis, dan pembinaan karakter keagamaan.",
    facilities: ["Tempat Wudhu Luas Pria & Wanita", "Kapasitas 800 Jamaah", "Sound System Masjid", "Karpet Lembut & Kipas Angin"],
    icon: "mosque",
    x: 34.5,
    y: 75.0
  },
  {
    id: "mushola-barat",
    name: "Musholla",
    aliases: ["mushola", "musholla", "surau", "mushola barat"],
    category: "Fasilitas",
    roleCategories: ["Murid Baru", "Guru & Staff"],
    block: "Dekat Blok P",
    floor: "Lantai Dasar",
    landmark: "small",
    detail: "Musholla transit sholat warga sekolah",
    description: "Fasilitas tempat sholat pendukung yang nyaman di samping area Masjid Al Mizan.",
    facilities: ["Tempat Wudhu", "Sajadah", "Mukena"],
    icon: "mosque",
    x: 25.5,
    y: 77.5
  },
  {
    id: "perpustakaan",
    name: "Perpustakaan (Perpus)",
    aliases: ["perpus", "perpustakaan", "baca", "buku", "literasi", "pinjam buku"],
    category: "Fasilitas",
    roleCategories: ["Murid Baru", "Guru & Staff"],
    block: "Gedung Perpus",
    floor: "Lantai Dasar",
    detail: "Pusat Sumber Belajar & Literasi Digital",
    description: "Perpustakaan ber-AC lengkap dengan ribuan koleksi buku teks pelajaran, referensi kejuruan, e-library, dan area membaca santai.",
    facilities: ["Koleksi 5.000+ Judul Buku", "Area Baca Lesehan & Meja Studi", "Komputer E-Library", "Pendingin AC", "WiFi Akses Cepat"],
    icon: "book",
    x: 20.8,
    y: 84.0
  },
  {
    id: "kantin-utama",
    name: "Kantin Sekolah",
    aliases: ["kantin", "makan", "minum", "jajan", "kantin tengah", "kantin coe"],
    category: "Fasilitas",
    roleCategories: ["Murid Baru", "Guru & Staff", "Tamu Sekolah"],
    block: "Utara Gedung COE",
    floor: "Lantai Dasar",
    detail: "Pusat kuliner sehat dan higienis sekolah",
    description: "Kantin sekolah dengan aneka stand makanan berat, jajanan sehat, minuman segar, serta area meja makan bersama siswa dan guru.",
    facilities: ["10 Stand Makanan & Minuman", "Meja Makan Luas", "Wastafel Cuci Tangan", "Pembayaran Tunai & QRIS"],
    icon: "food",
    x: 20.5,
    y: 62.0
  },
  {
    id: "kantin-barat",
    name: "Kantin Barat",
    aliases: ["kantin barat", "kantin belakang"],
    category: "Fasilitas",
    roleCategories: ["Murid Baru"],
    block: "Sayap Barat",
    floor: "Lantai Dasar",
    detail: "Kantin penunjang sayap barat",
    description: "Stand jajanan cepat saji dan minuman dekat area bengkel dan kejuruan.",
    facilities: ["Stand Minuman & Snack", "Tempat Duduk Santai"],
    icon: "food",
    x: 12.8,
    y: 74.0
  },
  {
    id: "koperasi-siswa",
    name: "Koperasi Sekolah",
    aliases: ["koperasi", "kopsis", "beli seragam", "alat tulis", "atk", "fotocopy"],
    category: "Fasilitas",
    roleCategories: ["Murid Baru", "Wali Murid", "Guru & Staff"],
    block: "Blok G",
    floor: "Lantai Dasar",
    detail: "Penyedia seragam, ATK & perlengkapan sekolah",
    description: "Toko perlengkapan sekolah siswa yang menyediakan seragam resmi, badge, jas praktik, alat tulis kejuruan, buku tugas, dan fotokopi.",
    facilities: ["Perlengkapan Seragam Lengkap", "ATK Murah", "Layanan Fotokopi & Cetak", "Pembayaran QRIS"],
    icon: "food",
    x: 39.2,
    y: 36.8
  },
  {
    id: "lapangan-upacara",
    name: "Lapangan Upacara & Olahraga",
    aliases: ["lapangan", "lapangan upacara", "upacara", "olahraga", "futsal", "basket", "senam"],
    category: "Fasilitas",
    roleCategories: ["Murid Baru", "Guru & Staff", "Tamu Sekolah", "Wali Murid"],
    block: "Pusat Sekolah",
    floor: "Lantai Dasar",
    detail: "Pusat upacara bendera, apel & kegiatan olahraga",
    description: "Lapangan serbaguna outdoor berukuran luas di tengah-tengah kampus untuk upacara Senin, peringatan hari besar, senam, dan olahraga basket/futsal.",
    facilities: ["Tiang Bendera Resmi", "Ring Basket Standar", "Garis Lapangan Futsal/Voli", "Pencahayaan Sorot Lapangan"],
    icon: "field",
    x: 51.5,
    y: 57.5
  },
  {
    id: "gedung-serba-guna",
    name: "Gedung Serba Guna (GSG)",
    aliases: ["gsg", "gedung serba guna", "aula", "auditorium", "wisuda", "pertemuan", "rapat"],
    category: "Gedung",
    roleCategories: ["Tamu Sekolah", "Wali Murid", "Guru & Staff", "Murid Baru"],
    block: "Gedung GSG",
    floor: "Lantai Dasar",
    detail: "Aula utama pertemuan akbar & pentas seni",
    description: "Gedung auditorium indoor berkapasitas 1.500 orang untuk wisuda kelulusan, rapat wali murid, pameran bursa kerja (Job Fair), dan pentas seni.",
    facilities: ["Panggung Utama Luas", "Sound System Line Array", "Lighting Panggung", "Kapasitas 1.500 Kursi", "Tribun Penonton"],
    icon: "building",
    x: 50.8,
    y: 37.0
  },
  {
    id: "toilet-siswa",
    name: "Toilet Siswa (Dekat Lapangan)",
    aliases: ["toilet", "wc", "kamar mandi", "toilet siswa", "toilet cowok", "toilet cewek"],
    category: "Fasilitas",
    roleCategories: ["Murid Baru", "Tamu Sekolah"],
    block: "Utara Blok A",
    floor: "Lantai Dasar",
    detail: "Fasilitas sanitasi siswa dekat lapangan upacara",
    description: "Kamar mandi dan toilet terpisah untuk siswa pria dan wanita yang senantiasa bersih dan higienis.",
    facilities: ["Kamar Mandi Terpisah Pria/Wanita", "Kloset Bersih", "Wastafel & Cermin", "Air Bersih Mengalir"],
    icon: "restroom",
    x: 66.5,
    y: 47.5
  },
  {
    id: "toilet-umum",
    name: "Toilet Guru & Tamu (Blok A)",
    aliases: ["toilet guru", "wc guru", "toilet tamu", "toilet"],
    category: "Fasilitas",
    roleCategories: ["Guru & Staff", "Tamu Sekolah", "Wali Murid"],
    block: "Selatan Blok A",
    floor: "Lantai Dasar",
    detail: "Toilet guru, staf dan tamu sekolah",
    description: "Fasilitas toilet yang terawat di dekat ruang tata usaha dan ruang dewan guru.",
    facilities: ["Kloset Duduk & Jongkok", "Wastafel", "Sabun Cuci Tangan"],
    icon: "restroom",
    x: 67.5,
    y: 63.2
  },
  {
    id: "toilet-perpus",
    name: "Toilet Siswa (Dekat Perpus)",
    aliases: ["wc perpus", "toilet perpus", "toilet belakang"],
    category: "Fasilitas",
    roleCategories: ["Murid Baru"],
    block: "Dekat Perpus",
    floor: "Lantai Dasar",
    detail: "Toilet siswa sayap selatan dekat perpustakaan",
    description: "Fasilitas sanitasi pendukung di kawasan selatan sekolah dekat perpustakaan dan bengkel RPL.",
    facilities: ["Air Bersih", "Kloset Bersih"],
    icon: "restroom",
    x: 20.0,
    y: 88.0
  }
];

// SVG Icon dictionary
const icons = {
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Zm0 0V19m4-12h8m-8 4h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  mosque: '<path d="M3 20h18M5 20v-7h14v7M8 13V9l4-3 4 3v4m-4-7V3m-2 17v-4h4v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  food: '<path d="M4 11h16l-1.5 9h-13L4 11Zm2-3a6 6 0 0 1 12 0M12 2v2m-5 5h.01M17 9h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  field: '<rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M12 4v16m0-11a3 3 0 1 0 0 6" stroke="currentColor" stroke-width="1.7"/>',
  restroom: '<circle cx="8" cy="5" r="2" stroke="currentColor" stroke-width="1.7"/><path d="M6 9h4l1 5H5l1-5Zm2 5v6m8-15v5m-2 0 2-3 2 3m-4 0v7m4-7v7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  building: '<path d="M3 20h18M5 20V8l7-4 7 4v12M9 20v-6h6v6M9 9h.01M15 9h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  tools: '<path d="m14.5 6.5 3 3M5 20l8.5-8.5m-3-3a5 5 0 0 0 6.8 6.8l3.2 3.2a2 2 0 0 0 2.8-2.8l-3.2-3.2A5 5 0 0 0 13 5l-2.5 2.5L8 5 5 8l2.5 2.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  gate: '<path d="M4 20V5h16v15M4 9h16M8 5v15m8-15v15M2 20h20" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  people: '<circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.7"/><path d="M3 20v-1a6 6 0 0 1 12 0v1m2-9a3 3 0 1 0 0-6m1 9a5 5 0 0 1 3 4v1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  class: '<path d="M3 20h18M5 20V6h14v14M8 9h2m4 0h2m-8 4h2m4 0h2m-8 7v-4h4v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  computer: '<rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 21h8m-4-4v4m-5-9 3-3 2 2 3-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>'
};

function iconMarkup(key, size = 18) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">${icons[key] || icons.building}</svg>`;
}

// ==========================================
// 2. GRAF JALUR JALAN & ROUTING (DIJKSTRA)
// ==========================================
// Node persimpangan jalan & selasar denah SMKN 1 Cilegon
const waypoints = {
  gate: { x: 88.0, y: 76.2 },
  pos: { x: 84.5, y: 76.2 },
  j_taman_n: { x: 77.0, y: 76.2 },
  j_taman_s: { x: 74.0, y: 83.0 },
  j_tgm: { x: 66.0, y: 76.2 },

  // Blok D & Jalur Timur
  j_blok_d_s: { x: 78.0, y: 72.0 },
  j_blok_d_m: { x: 78.0, y: 56.0 },
  j_blok_d_n: { x: 78.0, y: 46.0 },
  j_blok_d_far: { x: 78.0, y: 43.8 },

  // Parkir Guru & Blok A
  j_parkir_guru: { x: 73.0, y: 64.0 },
  j_blok_a_s: { x: 64.0, y: 64.0 },
  j_blok_a_m: { x: 64.0, y: 56.0 },
  j_blok_a_n: { x: 64.0, y: 47.0 },

  // Area Kantor & Bengkel Mesin
  j_kepsek: { x: 64.0, y: 73.0 },
  j_mesin_e: { x: 54.0, y: 76.2 },
  j_pmr: { x: 54.0, y: 71.0 },
  j_mesin_w: { x: 44.0, y: 76.2 },

  // Jalur Tengah & Lapangan Upacara
  j_tengah_s: { x: 51.0, y: 66.0 },
  j_lapangan_c: { x: 51.5, y: 57.5 },
  j_tengah_n: { x: 51.0, y: 46.0 },
  j_lapangan_w: { x: 39.0, y: 57.0 },
  j_lapangan_sw: { x: 39.0, y: 66.0 },

  // Jalur Utara (GSG & Otomotif & Blok F)
  j_gsg_e: { x: 58.0, y: 45.0 },
  j_otomotif: { x: 58.0, y: 35.0 },
  j_gsg_w: { x: 43.0, y: 45.0 },
  j_blok_g: { x: 43.0, y: 36.0 },
  j_blok_f_s: { x: 58.0, y: 24.0 },
  j_blok_f_n: { x: 58.0, y: 17.5 },
  j_blok_f_w: { x: 48.5, y: 17.5 },
  j_blok_f_e: { x: 67.5, y: 17.5 },

  // Jalur Barat (COE, Kantin, Masjid, Perpus)
  j_coe: { x: 26.0, y: 66.0 },
  j_kantin: { x: 21.0, y: 63.0 },
  j_masjid_e: { x: 43.0, y: 76.2 },
  j_masjid_n: { x: 35.0, y: 69.0 },
  j_masjid_w: { x: 25.5, y: 76.2 },
  j_selatan_o: { x: 44.0, y: 83.0 },
  j_bengkel_rpl: { x: 33.0, y: 83.0 },
  j_perpus: { x: 21.0, y: 83.0 },
  j_kantin_barat: { x: 13.0, y: 74.0 },
  j_blok_m: { x: 12.0, y: 84.0 }
};

// Hubungan jalur (Edges antar node jalan)
const corridorEdges = [
  ["gate", "pos"],
  ["pos", "j_taman_n"],
  ["j_taman_n", "j_taman_s"],
  ["j_taman_n", "j_blok_d_s"],
  ["j_blok_d_s", "j_blok_d_m"],
  ["j_blok_d_m", "j_blok_d_n"],
  ["j_blok_d_n", "j_blok_d_far"],
  ["j_taman_n", "j_tgm"],
  ["j_tgm", "j_kepsek"],
  ["j_kepsek", "j_mesin_e"],
  ["j_taman_n", "j_parkir_guru"],
  ["j_parkir_guru", "j_blok_a_s"],
  ["j_blok_a_s", "j_blok_a_m"],
  ["j_blok_a_m", "j_blok_a_n"],
  ["j_blok_a_n", "j_tengah_n"],
  ["j_blok_d_n", "j_blok_a_n"],
  ["j_mesin_e", "j_pmr"],
  ["j_pmr", "j_tengah_s"],
  ["j_mesin_e", "j_mesin_w"],
  ["j_mesin_w", "j_selatan_o"],
  ["j_selatan_o", "j_bengkel_rpl"],
  ["j_bengkel_rpl", "j_perpus"],
  ["j_perpus", "j_blok_m"],
  ["j_tengah_s", "j_lapangan_c"],
  ["j_lapangan_c", "j_tengah_n"],
  ["j_tengah_s", "j_lapangan_sw"],
  ["j_lapangan_sw", "j_lapangan_w"],
  ["j_lapangan_w", "j_gsg_w"],
  ["j_lapangan_sw", "j_coe"],
  ["j_coe", "j_kantin"],
  ["j_coe", "j_masjid_n"],
  ["j_mesin_w", "j_masjid_e"],
  ["j_masjid_e", "j_masjid_n"],
  ["j_masjid_e", "j_masjid_w"],
  ["j_masjid_w", "j_kantin_barat"],
  ["j_masjid_w", "j_perpus"],
  ["j_tengah_n", "j_gsg_e"],
  ["j_gsg_e", "j_otomotif"],
  ["j_otomotif", "j_blok_f_s"],
  ["j_blok_f_s", "j_blok_f_n"],
  ["j_blok_f_n", "j_blok_f_w"],
  ["j_blok_f_n", "j_blok_f_e"],
  ["j_tengah_n", "j_gsg_w"],
  ["j_gsg_w", "j_blok_g"]
];

// Jarak metrik perkiraan (SMKN 1 Cilegon sekitar 160m lebar x 240m panjang)
function metricDistance(p1, p2) {
  const dx = (p2.x - p1.x) * 1.6;
  const dy = (p2.y - p1.y) * 2.4;
  return Math.sqrt(dx * dx + dy * dy);
}

// Menemukan node terdekat dalam graf
function findNearestNode(point) {
  let nearest = null;
  let minDist = Infinity;
  for (const [id, node] of Object.entries(waypoints)) {
    const dist = metricDistance(point, node);
    if (dist < minDist) {
      minDist = dist;
      nearest = id;
    }
  }
  return nearest;
}

// Algoritma Dijkstra mencari rute tercepat melewati koridor sekolah
function findWalkingRoute(startPoint, endPoint) {
  const startNode = findNearestNode(startPoint);
  const endNode = findNearestNode(endPoint);

  if (!startNode || !endNode) {
    return [startPoint, endPoint];
  }

  // Bangun graph adjacency
  const graph = {};
  for (const id of Object.keys(waypoints)) {
    graph[id] = [];
  }
  for (const [u, v] of corridorEdges) {
    if (waypoints[u] && waypoints[v]) {
      const weight = metricDistance(waypoints[u], waypoints[v]);
      graph[u].push({ node: v, weight });
      graph[v].push({ node: u, weight });
    }
  }

  // Dijkstra
  const distances = {};
  const previous = {};
  const pq = new Set(Object.keys(waypoints));

  for (const id of Object.keys(waypoints)) {
    distances[id] = Infinity;
    previous[id] = null;
  }
  distances[startNode] = 0;

  while (pq.size > 0) {
    let closestNode = null;
    let shortest = Infinity;
    for (const node of pq) {
      if (distances[node] < shortest) {
        shortest = distances[node];
        closestNode = node;
      }
    }

    if (closestNode === null || closestNode === endNode) break;
    pq.delete(closestNode);

    for (const neighbor of graph[closestNode]) {
      if (pq.has(neighbor.node)) {
        const alt = distances[closestNode] + neighbor.weight;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          previous[neighbor.node] = closestNode;
        }
      }
    }
  }

  // Rekonstruksi rute
  const pathNodes = [];
  let curr = endNode;
  while (curr) {
    pathNodes.unshift(curr);
    curr = previous[curr];
  }

  // Bentuk path titik koordinat
  const fullPath = [startPoint];
  for (const id of pathNodes) {
    fullPath.push(waypoints[id]);
  }
  fullPath.push(endPoint);

  // Bersihkan titik ganda yang sangat berdekatan
  const cleanPath = [fullPath[0]];
  for (let i = 1; i < fullPath.length; i++) {
    const prev = cleanPath[cleanPath.length - 1];
    const currPt = fullPath[i];
    if (metricDistance(prev, currPt) > 1.5) {
      cleanPath.push(currPt);
    }
  }

  return cleanPath;
}

// Konversi path array [{x, y}] menjadi SVG path data string
function pathToSvgD(path) {
  if (!path || path.length < 2) return "";
  return path.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`).join(" ");
}

// Menghitung panjang total rute dalam meter
function calculateTotalDistance(path) {
  let total = 0;
  for (let i = 0; i < path.length - 1; i++) {
    total += metricDistance(path[i], path[i + 1]);
  }
  return total;
}

// ==========================================
// 3. STATE APLIKASI
// ==========================================
let activeCategory = "Semua";
let activeRole = "Murid Baru";
let selectedPlace = null;
let currentRoute = [];
let routeProgressIndex = 0;

// Posisi pengguna saat ini di peta
let userPosition = { ...schoolEntrance };
let isGpsActive = false;
let watchId = null;
let isSimulating = false;
let simulationInterval = null;

// Zoom & Pan state
let mapScale = 1;
let mapTranslate = { x: 0, y: 0 };
let isPanning = false;
let panStart = { x: 0, y: 0 };
let showAllRoomLabels = false;

// Audio context untuk chime sampai tujuan
let audioCtx = null;

// ==========================================
// 4. ELEMEN DOM
// ==========================================
const placeList = document.getElementById("placeList");
const searchInput = document.getElementById("placeSearch");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const mapPin = document.getElementById("mapPin");
const userPin = document.getElementById("userPin");
const mapWrap = document.getElementById("mapImageWrap");
const mapViewport = document.getElementById("mapViewport");
const toast = document.getElementById("toast");
const allLabelsWrap = document.getElementById("allLabelsWrap");
const routePath = document.getElementById("routePath");
const routeOutline = document.getElementById("routeOutline");
const routeArrow = document.getElementById("routeArrow");

let toastTimer = null;

// ==========================================
// 5. FUNGSI UI & INTERAKSI
// ==========================================
function showToast(message, duration = 3000) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), duration);
}

// Play notification sound saat tiba di tujuan
function playArrivalChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const now = audioCtx.currentTime;
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(783.99, now + 0.18); // G5
    osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.35); // C6

    gainNode.gain.setValueAtTime(0.01, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.start(now);
    osc1.stop(now + 0.35);
    osc2.start(now + 0.18);
    osc2.stop(now + 0.7);

    if ("vibrate" in navigator) {
      navigator.vibrate([150, 80, 200]);
    }
  } catch (e) {
    console.warn("Audio playback not permitted yet", e);
  }
}

// Filter daftar ruangan berdasarkan pencarian dan kategori
function getFilteredPlaces() {
  const query = searchInput.value.trim().toLocaleLowerCase("id");
  return places.filter(place => {
    // Filter Kategori
    const matchCategory = (activeCategory === "Semua") || (place.category === activeCategory);
    if (!matchCategory) return false;

    // Filter Pencarian
    if (!query) return true;

    const nameMatch = place.name.toLocaleLowerCase("id").includes(query);
    const detailMatch = place.detail.toLocaleLowerCase("id").includes(query);
    const blockMatch = place.block.toLocaleLowerCase("id").includes(query);
    const floorMatch = place.floor.toLocaleLowerCase("id").includes(query);
    const aliasMatch = place.aliases && place.aliases.some(a => a.toLocaleLowerCase("id").includes(query));

    return nameMatch || detailMatch || blockMatch || floorMatch || aliasMatch;
  });
}

// Render daftar tempat di sidebar
function renderPlaceList() {
  const results = getFilteredPlaces();
  const resultCountEl = document.getElementById("resultCount");
  if (resultCountEl) {
    resultCountEl.textContent = `${results.length} lokasi`;
  }

  if (clearSearchBtn) {
    clearSearchBtn.style.display = searchInput.value.trim() ? "flex" : "none";
  }

  if (!results.length) {
    placeList.innerHTML = `
      <div class="empty-state">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <p><strong>Ruangan tidak ditemukan</strong></p>
        <span>Coba kata kunci lain seperti <em>"Kelas 10"</em>, <em>"RPL"</em>, <em>"Lab Komputer"</em>, atau <em>"Masjid"</em>.</span>
      </div>`;
    return;
  }

  placeList.innerHTML = results.map(place => {
    const isSelected = selectedPlace && selectedPlace.id === place.id;
    const isUpperFloor = place.floorColor === "blue";
    return `
      <button type="button" class="place-item${isSelected ? " selected" : ""}" data-id="${place.id}" aria-pressed="${isSelected}">
        <span class="place-icon ${isUpperFloor ? "icon-blue" : ""}">${iconMarkup(place.icon, 18)}</span>
        <span class="place-copy">
          <span class="place-title">${place.name}</span>
          <span class="place-meta">
            <span class="badge ${isUpperFloor ? "badge-blue" : "badge-gray"}">${place.floor}</span>
            <span>${place.block}</span>
          </span>
        </span>
        <span class="place-arrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="m9 18 6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </button>`;
  }).join("");

  placeList.querySelectorAll(".place-item").forEach(button => {
    button.addEventListener("click", () => {
      const target = places.find(p => p.id === button.dataset.id);
      if (target) {
        selectPlace(target, true);
      }
    });
  });
}

// Render semua label ruangan di denah
function renderAllRoomLabels() {
  if (!allLabelsWrap) return;
  allLabelsWrap.innerHTML = places.map(p => `
    <div class="map-label-tag" style="left: ${p.x}%; top: ${p.y}%;" data-id="${p.id}" title="${p.name}">
      <span class="tag-dot ${p.floorColor === "blue" ? "dot-blue" : ""}"></span>
      <span class="tag-text">${p.name}</span>
    </div>
  `).join("");

  allLabelsWrap.querySelectorAll(".map-label-tag").forEach(tag => {
    tag.addEventListener("click", (e) => {
      e.stopPropagation();
      const p = places.find(item => item.id === tag.dataset.id);
      if (p) selectPlace(p, true);
    });
  });
}

// Perbarui posisi titik "Anda di sini" di peta
function updateUserMarkerPosition(x, y, heading = 0) {
  userPosition.x = x;
  userPosition.y = y;

  if (userPin) {
    userPin.hidden = false;
    userPin.style.display = "flex";
    userPin.style.left = `${x}%`;
    userPin.style.top = `${y}%`;
    const headingEl = document.getElementById("userHeadingArrow");
    if (headingEl) {
      headingEl.style.transform = `rotate(${heading}deg)`;
    }
  }

  // Jika sedang menavigasi ke tujuan, perbarui sisa jarak dan rute
  if (selectedPlace) {
    updateNavigationStatus();
  }
}

// Pilih lokasi tujuan dan gambar rute
function selectPlace(place, autoRoute = true) {
  selectedPlace = place;

  // Tampilkan Pin Tujuan
  if (mapPin) {
    mapPin.hidden = false;
    mapPin.style.display = "flex";
    mapPin.style.left = `${place.x}%`;
    mapPin.style.top = `${place.y}%`;
    mapPin.dataset.floor = place.floorColor || "green";
    document.getElementById("pinLabel").textContent = place.name;
    document.getElementById("pinFloorBadge").textContent = place.floor;
  }

  // Perbarui Kartu Tujuan di Bawah
  document.getElementById("destinationTitle").textContent = place.name;
  document.getElementById("destinationMeta").textContent = `${place.block} · ${place.floor} · ${place.detail}`;
  document.getElementById("infoButton").style.display = "inline-flex";

  // Perbarui daftar terpilih
  renderPlaceList();

  if (autoRoute) {
    generateAndDrawRoute();
  }
}

// Hitung rute dari posisi pengguna ke tujuan dan render SVG
function generateAndDrawRoute() {
  if (!selectedPlace) return;

  currentRoute = findWalkingRoute(userPosition, selectedPlace);
  const pathD = pathToSvgD(currentRoute);

  routePath.setAttribute("d", pathD);
  routeOutline.setAttribute("d", pathD);

  // Hitung metrik jarak & waktu jalan
  const distMeter = Math.round(calculateTotalDistance(currentRoute));
  const walkingMinutes = Math.max(1, Math.ceil(distMeter / 75)); // Kecepatan jalan ~75 meter/menit

  document.getElementById("distanceValue").textContent = `${distMeter} m`;
  document.getElementById("timeValue").textContent = `± ${walkingMinutes} mnt`;

  const navControlWrap = document.getElementById("navControlWrap");
  if (navControlWrap) {
    navControlWrap.style.display = "flex";
  }

  // Set teks tombol simulasi
  const simBtn = document.getElementById("simWalkButton");
  if (simBtn) {
    simBtn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M13 4v16M6 11l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span>Simulasi Jalan</span>
    `;
  }

  showToast(`Rute ke ${selectedPlace.name} berhasil dimuat (${distMeter} meter).`);
}

// Update sisa jarak selama pengguna bergerak dan deteksi tiba di tujuan
function updateNavigationStatus() {
  if (!selectedPlace || !currentRoute.length) return;

  // Hitung jarak langsung dari posisi pengguna sekarang ke tujuan
  const directDist = metricDistance(userPosition, selectedPlace);

  // Cek apakah sudah sampai (radius toleransi <= 8 meter)
  if (directDist <= 8.5) {
    onArrivalAtDestination();
    return;
  }

  // Jika masih menavigasi, hitung sisa jarak via waypoint
  const remainingDist = Math.round(directDist);
  document.getElementById("distanceValue").textContent = `${remainingDist} m`;
  const remainingMinutes = Math.max(1, Math.ceil(remainingDist / 75));
  document.getElementById("timeValue").textContent = `± ${remainingMinutes} mnt`;
}

// Notifikasi Tiba di Tujuan (Step 7 Algoritma)
function onArrivalAtDestination() {
  if (isSimulating) {
    stopWalkingSimulation();
  }

  playArrivalChime();

  // Buka Modal Sukses Sampai
  const arrivalModal = document.getElementById("arrivalModal");
  if (arrivalModal && selectedPlace) {
    document.getElementById("arrivalRoomName").textContent = selectedPlace.name;
    document.getElementById("arrivalRoomDetail").textContent = `${selectedPlace.block} (${selectedPlace.floor}) — ${selectedPlace.detail}`;
    document.getElementById("arrivalRoomDesc").textContent = selectedPlace.description;
    arrivalModal.classList.add("active");
  }

  showToast(`🎉 Anda telah sampai di ${selectedPlace.name}!`, 4500);

  // Reset rute setelah sampai
  document.getElementById("distanceValue").textContent = "0 m";
  document.getElementById("timeValue").textContent = "Sampai";
}

// ==========================================
// 6. SIMULASI JALAN (WALKING SIMULATION)
// ==========================================
function startWalkingSimulation() {
  if (!selectedPlace || currentRoute.length < 2) {
    showToast("Pilih ruangan tujuan terlebih dahulu.");
    return;
  }

  isSimulating = true;
  routeProgressIndex = 0;

  const simBtn = document.getElementById("simWalkButton");
  if (simBtn) {
    simBtn.classList.add("active");
    simBtn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/></svg>
      <span>Jeda Simulasi</span>
    `;
  }

  showToast("Simulasi navigasi berjalan aktif...");

  // Interpolasi titik-titik rute dengan kecepatan halus
  const waypointsToWalk = [...currentRoute];
  let currentSegment = 0;
  let segmentProgress = 0;
  const stepRate = 0.05; // Kecepatan gerak per tick

  window.clearInterval(simulationInterval);
  simulationInterval = window.setInterval(() => {
    if (currentSegment >= waypointsToWalk.length - 1) {
      stopWalkingSimulation();
      onArrivalAtDestination();
      return;
    }

    const pA = waypointsToWalk[currentSegment];
    const pB = waypointsToWalk[currentSegment + 1];

    segmentProgress += stepRate;

    if (segmentProgress >= 1) {
      segmentProgress = 0;
      currentSegment++;
    }

    const curX = pA.x + (pB.x - pA.x) * segmentProgress;
    const curY = pA.y + (pB.y - pA.y) * segmentProgress;

    // Hitung sudut rotasi arah hadap
    const angleRad = Math.atan2(pB.y - pA.y, pB.x - pA.x);
    const angleDeg = (angleRad * 180 / Math.PI) + 90;

    updateUserMarkerPosition(curX, curY, angleDeg);

    // Potong rute SVG sesuai posisi sekarang
    const remainingPath = [{ x: curX, y: curY }, ...waypointsToWalk.slice(currentSegment + 1)];
    const pathD = pathToSvgD(remainingPath);
    routePath.setAttribute("d", pathD);
    routeOutline.setAttribute("d", pathD);
  }, 65);
}

function stopWalkingSimulation() {
  isSimulating = false;
  window.clearInterval(simulationInterval);
  simulationInterval = null;

  const simBtn = document.getElementById("simWalkButton");
  if (simBtn) {
    simBtn.classList.remove("active");
    simBtn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/></svg>
      <span>Lanjut Jalan</span>
    `;
  }
}

// ==========================================
// 7. SISTEM GPS GEOLOCATION NYATA
// ==========================================
// Proyeksikan koordinat GPS WGS84 ke persentase denah sekolah
function gpsToMapCoords(lat, lng) {
  const latRatio = (GPS_BOUNDS.north - lat) / (GPS_BOUNDS.north - GPS_BOUNDS.south);
  const lngRatio = (lng - GPS_BOUNDS.west) / (GPS_BOUNDS.east - GPS_BOUNDS.west);

  const x = Math.max(5, Math.min(95, lngRatio * 100));
  const y = Math.max(5, Math.min(95, latRatio * 100));

  return { x, y };
}

// Hitung jarak haversine antara dua koordinat GPS (meter)
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Radius bumi dalam meter
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function toggleGpsTracking() {
  if (!("geolocation" in navigator)) {
    showToast("Perangkat Anda tidak mendukung layanan Geolocation.");
    return;
  }

  const statusEl = document.getElementById("locationStatus");
  const pulseEl = document.querySelector(".location-pulse");
  const locateBtn = document.getElementById("locateButton");

  if (isGpsActive && watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    isGpsActive = false;
    statusEl.textContent = "GPS tidak aktif";
    pulseEl.style.background = "#2a9b67";
    locateBtn.classList.remove("active");
    showToast("Pelacakan GPS dihentikan.");
    return;
  }

  statusEl.textContent = "Mencari sinyal GPS...";
  locateBtn.classList.add("loading");

  watchId = navigator.geolocation.watchPosition(
    position => {
      isGpsActive = true;
      locateBtn.classList.remove("loading");
      locateBtn.classList.add("active");
      pulseEl.style.background = "#2563eb";

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const accuracy = Math.round(position.coords.accuracy);

      // Hitung jarak ke gerbang SMKN 1 Cilegon
      const distToSchool = haversineDistance(lat, lng, SCHOOL_COORDINATES.lat, SCHOOL_COORDINATES.lng);

      if (distToSchool <= 450) {
        // Berada di dalam lingkungan sekolah!
        const projected = gpsToMapCoords(lat, lng);
        statusEl.textContent = `Akurasi ±${accuracy}m · Di Area Sekolah`;
        updateUserMarkerPosition(projected.x, projected.y);
      } else {
        // Berada di luar lingkungan sekolah
        const km = (distToSchool / 1000).toFixed(1);
        statusEl.textContent = `${km} km dari sekolah (Simulasi Gerbang)`;
        // Tetap pasang posisi di gerbang untuk kemudahan uji coba
        updateUserMarkerPosition(schoolEntrance.x, schoolEntrance.y);
      }
    },
    error => {
      locateBtn.classList.remove("loading");
      locateBtn.classList.remove("active");
      isGpsActive = false;
      watchId = null;
      statusEl.textContent = "Izin lokasi diperlukan";

      const errorMsg = {
        1: "Izin akses lokasi ditolak. Silakan izinkan lokasi di browser.",
        2: "Sinyal GPS tidak tersedia saat ini.",
        3: "Waktu permintaan lokasi habis."
      };
      showToast(errorMsg[error.code] || "Gagal mengambil lokasi GPS.");
    },
    { enableHighAccuracy: true, maximumAge: 3000, timeout: 15000 }
  );
}

// ==========================================
// 8. KONTROL ZOOM, PAN & TRANSFORM PETA
// ==========================================
function updateMapTransform() {
  if (mapWrap) {
    mapWrap.style.transform = `translate(${mapTranslate.x}px, ${mapTranslate.y}px) scale(${mapScale})`;
  }
}

function zoomMap(delta) {
  mapScale = Math.min(2.5, Math.max(0.75, mapScale + delta));
  updateMapTransform();
}

function resetMapFit() {
  mapScale = 1;
  mapTranslate = { x: 0, y: 0 };
  updateMapTransform();
  showToast("Tampilan peta diatur ulang.");
}

// Setup Event Drag / Pan pada Map Viewport
function setupMapPanAndZoom() {
  if (!mapViewport) return;

  mapViewport.addEventListener("mousedown", (e) => {
    if (e.target.closest("button") || e.target.closest(".map-label-tag")) return;
    isPanning = true;
    panStart = { x: e.clientX - mapTranslate.x, y: e.clientY - mapTranslate.y };
    mapViewport.style.cursor = "grabbing";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isPanning) return;
    mapTranslate.x = e.clientX - panStart.x;
    mapTranslate.y = e.clientY - panStart.y;
    updateMapTransform();
  });

  window.addEventListener("mouseup", () => {
    isPanning = false;
    mapViewport.style.cursor = "grab";
  });

  // Touch support untuk HP
  let touchStartDist = 0;
  mapViewport.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      isPanning = true;
      panStart = { x: e.touches[0].clientX - mapTranslate.x, y: e.touches[0].clientY - mapTranslate.y };
    } else if (e.touches.length === 2) {
      isPanning = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartDist = Math.hypot(dx, dy);
    }
  }, { passive: true });

  mapViewport.addEventListener("touchmove", (e) => {
    if (isPanning && e.touches.length === 1) {
      mapTranslate.x = e.touches[0].clientX - panStart.x;
      mapTranslate.y = e.touches[0].clientY - panStart.y;
      updateMapTransform();
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.hypot(dx, dy);
      if (touchStartDist > 0) {
        const factor = newDist / touchStartDist;
        mapScale = Math.min(2.5, Math.max(0.75, mapScale * factor));
        touchStartDist = newDist;
        updateMapTransform();
      }
    }
  }, { passive: true });

  mapViewport.addEventListener("touchend", () => {
    isPanning = false;
    touchStartDist = 0;
  });

  // Wheel zoom
  mapViewport.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.12 : 0.12;
    zoomMap(delta);
  }, { passive: false });

  // Klik langsung di denah untuk memindahkan "Posisi Saya" secara manual jika diinginkan
  mapWrap.addEventListener("click", (e) => {
    if (isPanning) return;
    const rect = mapWrap.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Jika pengguna mengklik dengan tombol Alt / opsi klik khusus, atau via dialog
    if (e.shiftKey) {
      updateUserMarkerPosition(clickX, clickY);
      showToast("Titik lokasi Anda dipindahkan.");
      if (selectedPlace) generateAndDrawRoute();
    }
  });
}

// ==========================================
// 9. MODAL & DETAIL RUANGAN
// ==========================================
function openRoomDetailModal(place) {
  if (!place) return;
  const modal = document.getElementById("roomModal");
  if (!modal) return;

  document.getElementById("modalRoomName").textContent = place.name;
  document.getElementById("modalRoomCategory").textContent = place.category;
  document.getElementById("modalRoomFloor").textContent = place.floor;
  document.getElementById("modalRoomFloor").className = `badge ${place.floorColor === "blue" ? "badge-blue" : "badge-gray"}`;
  document.getElementById("modalRoomBlock").textContent = place.block;
  document.getElementById("modalRoomDesc").textContent = place.description;

  const facilitiesList = document.getElementById("modalFacilitiesList");
  if (facilitiesList && place.facilities) {
    facilitiesList.innerHTML = place.facilities.map(f => `<li><span class="bullet">✓</span> ${f}</li>`).join("");
  }

  // Tombol navigasi di modal
  const navBtn = document.getElementById("modalNavButton");
  if (navBtn) {
    navBtn.onclick = () => {
      modal.classList.remove("active");
      selectPlace(place, true);
    };
  }

  modal.classList.add("active");
}

function setupModals() {
  // Modal Ruangan
  const roomModal = document.getElementById("roomModal");
  const closeRoomModal = document.getElementById("closeRoomModal");
  if (closeRoomModal && roomModal) {
    closeRoomModal.addEventListener("click", () => roomModal.classList.remove("active"));
  }

  // Modal Tentang Voc1Maps
  const aboutModal = document.getElementById("aboutModal");
  const helpBtn = document.getElementById("helpButton");
  const closeAboutBtn = document.getElementById("closeAboutModal");
  if (helpBtn && aboutModal) {
    helpBtn.addEventListener("click", () => aboutModal.classList.add("active"));
  }
  if (closeAboutBtn && aboutModal) {
    closeAboutBtn.addEventListener("click", () => aboutModal.classList.remove("active"));
  }

  // Modal Sampai di Tujuan
  const arrivalModal = document.getElementById("arrivalModal");
  const closeArrivalBtn = document.getElementById("closeArrivalModal");
  const searchAnotherBtn = document.getElementById("searchAnotherBtn");
  if (closeArrivalBtn && arrivalModal) {
    closeArrivalBtn.addEventListener("click", () => arrivalModal.classList.remove("active"));
  }
  if (searchAnotherBtn && arrivalModal) {
    searchAnotherBtn.addEventListener("click", () => {
      arrivalModal.classList.remove("active");
      searchInput.focus();
    });
  }

  // Tutup modal jika klik overlay backdrop
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.classList.remove("active");
    }
  });

  // Tombol Info di bar tujuan
  const infoBtn = document.getElementById("infoButton");
  if (infoBtn) {
    infoBtn.addEventListener("click", () => {
      if (selectedPlace) openRoomDetailModal(selectedPlace);
    });
  }
}

// ==========================================
// 10. SETUP ROLE & REKOMENDASI PENGGUNA
// ==========================================
function setupRoleSelector() {
  const roleSelect = document.getElementById("userRoleSelect");
  const roleBadge = document.getElementById("currentRoleBadge");
  const roleAvatar = document.getElementById("userAvatarIcon");

  if (!roleSelect) return;

  const roleMeta = {
    "Murid Baru": { letter: "M", title: "Murid Baru" },
    "Wali Murid": { letter: "W", title: "Wali Murid" },
    "Tamu Sekolah": { letter: "T", title: "Tamu Sekolah" },
    "Guru & Staff": { letter: "G", title: "Guru & Staff" }
  };

  roleSelect.addEventListener("change", (e) => {
    activeRole = e.target.value;
    const meta = roleMeta[activeRole] || { letter: "U", title: activeRole };

    if (roleBadge) roleBadge.textContent = meta.title;
    if (roleAvatar) roleAvatar.textContent = meta.letter;

    showToast(`Profil pengguna diubah ke: ${activeRole}`);
  });
}

// ==========================================
// 11. INISIALISASI UTAMA
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Render daftar awal
  renderPlaceList();
  renderAllRoomLabels();
  setupMapPanAndZoom();
  setupModals();
  setupRoleSelector();

  // Inisialisasi posisi awal pengguna di Gerbang Utama
  updateUserMarkerPosition(schoolEntrance.x, schoolEntrance.y);

  // Kategori filter chips
  document.querySelectorAll(".category-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".category-chip.active")?.classList.remove("active");
      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      renderPlaceList();
    });
  });

  // Input pencarian ruangan dengan auto-search
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderPlaceList();
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const results = getFilteredPlaces();
        if (results.length > 0) {
          selectPlace(results[0], true);
          showToast(`Menampilkan lokasi: ${results[0].name}`);
        } else {
          showToast(`Ruangan "${searchInput.value}" tidak ditemukan.`);
        }
      }
    });
  }

  // Clear button pada search
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      renderPlaceList();
      searchInput.focus();
    });
  }

  // Tombol GPS
  const locateBtn = document.getElementById("locateButton");
  if (locateBtn) {
    locateBtn.addEventListener("click", toggleGpsTracking);
  }

  // Tombol Zoom & Reset
  document.getElementById("zoomIn")?.addEventListener("click", () => zoomMap(0.15));
  document.getElementById("zoomOut")?.addEventListener("click", () => zoomMap(-0.15));
  document.getElementById("resetFit")?.addEventListener("click", resetMapFit);

  // Toggle Semua Label Ruangan
  const toggleLabelsBtn = document.getElementById("toggleLabelsBtn");
  if (toggleLabelsBtn) {
    toggleLabelsBtn.addEventListener("click", () => {
      showAllRoomLabels = !showAllRoomLabels;
      allLabelsWrap.classList.toggle("show", showAllRoomLabels);
      toggleLabelsBtn.classList.toggle("active", showAllRoomLabels);
      showToast(showAllRoomLabels ? "Label semua ruangan ditampilkan" : "Label ruangan disembunyikan");
    });
  }

  // Tombol Rute
  const directionBtn = document.getElementById("directionButton");
  if (directionBtn) {
    directionBtn.addEventListener("click", () => {
      if (!selectedPlace) {
        showToast("Silakan pilih ruangan tujuan pada daftar atau denah.");
        return;
      }
      generateAndDrawRoute();
    });
  }

  // Tombol Simulasi Berjalan
  const simWalkBtn = document.getElementById("simWalkButton");
  if (simWalkBtn) {
    simWalkBtn.addEventListener("click", () => {
      if (isSimulating) {
        stopWalkingSimulation();
      } else {
        startWalkingSimulation();
      }
    });
  }

  // Tombol Setel Posisi ke Gerbang
  document.getElementById("resetUserToGateBtn")?.addEventListener("click", () => {
    updateUserMarkerPosition(schoolEntrance.x, schoolEntrance.y);
    showToast("Posisi Anda diatur ke Gerbang Utama.");
    if (selectedPlace) generateAndDrawRoute();
  });

  // Tombol Bagikan Lokasi
  const shareBtn = document.getElementById("shareButton");
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const title = "Voc1Maps — SMK Negeri 1 Cilegon";
      const text = selectedPlace
        ? `Temukan lokasi ${selectedPlace.name} (${selectedPlace.block}, ${selectedPlace.floor}) di SMK Negeri 1 Cilegon dengan Voc1Maps!`
        : "Jelajahi peta interaktif & navigasi SMK Negeri 1 Cilegon dengan Voc1Maps.";

      if (navigator.share) {
        try {
          await navigator.share({ title, text, url: window.location.href });
        } catch (e) {
          if (e.name !== "AbortError") showToast("Gagal membagikan tautan.");
        }
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${text} ${window.location.href}`);
        showToast("Tautan peta disalin ke clipboard!");
      } else {
        showToast("Silakan bagikan URL aplikasi ini.");
      }
    });
  }
});
