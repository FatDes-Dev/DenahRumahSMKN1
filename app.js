/**
 * Voc1Maps - Peta Digital Interaktif SMK Negeri 1 Cilegon
 * Aplikasi panduan navigasi real-time berbasis sekolah.
 * Koordinat Resmi Gerbang Masuk: 6°02'46.9"S 106°03'08.0"E (-6.0463611, 106.0522222)
 */

// ==========================================
// 1. KOORDINAT RESMI & KALIBRASI SKALA METRIK
// ==========================================
const SCHOOL_COORDINATES = {
  lat: -6.0463611,
  lng: 106.0522222,
  dms: "6°02'46.9\"S 106°03'08.0\"E"
};

// Batas wilayah GPS SMKN 1 Cilegon (WGS84 Presisi Kalibrasi Gerbang)
const GPS_BOUNDS = {
  north: -6.044504,
  south: -6.046941,
  west:  106.050847,
  east:  106.052475
};

// Kalibrasi faktor skala meter denah SMKN 1 Cilegon:
// Luas lahan ~21.750 m²; Lebar horizontal ~135 m (rentang 75%) -> 1% X = 1.80 meter
// Panjang vertikal ~190 m (rentang 70%) -> 1% Y = 2.71 meter
const SCALE_X = 1.80;
const SCALE_Y = 2.71;

function metricDistance(p1, p2) {
  const dx = (p2.x - p1.x) * SCALE_X;
  const dy = (p2.y - p1.y) * SCALE_Y;
  return Math.hypot(dx, dy);
}

// Titik awal default di Pos Gerbang Utama
const schoolEntrance = { x: 84.5, y: 76.2, name: "Pos Gerbang Utama" };

// ==========================================
// 2. GRAF KORIDOR JALAN & SELASAR RESMI
// ==========================================
const waypoints = {
  // Gerbang & Jalan Utama Masuk
  gate: { x: 88.0, y: 76.2, name: "Pintu Masuk Gerbang Utama" },
  pos: { x: 84.5, y: 76.2, name: "Pos Keamanan / Satpam" },
  j_taman_barat: { x: 76.0, y: 76.2, name: "Jalan Utama Samping Taman" },

  // Jalan Timur (Depan Blok D)
  j_blok_d_masuk: { x: 78.5, y: 68.0, name: "Persimpangan Jalan Timur" },
  j_blok_d_1: { x: 78.5, y: 62.5, name: "Jalan Depan Kelas D1 & D6" },
  j_blok_d_2: { x: 78.5, y: 58.8, name: "Jalan Depan Kelas D2 & D7" },
  j_blok_d_3: { x: 78.5, y: 55.0, name: "Jalan Depan Kelas D3 & D8" },
  j_blok_d_4: { x: 78.5, y: 50.0, name: "Jalan Depan Kelas D4 & R.9" },
  j_blok_d_5: { x: 78.5, y: 45.0, name: "Ujung Utara Blok D (R.5 & D10)" },

  // Jalan Penghubung Utara (Blok D ke Blok A & Lapangan)
  j_utara_d_a: { x: 73.0, y: 45.0, name: "Jalan Utara Parkir Guru" },
  j_utara_a: { x: 64.0, y: 45.0, name: "Jalan Depan Toilet Siswa & OSIS" },
  j_utara_lapangan: { x: 54.0, y: 45.0, name: "Jalan Antara Lapangan & GSG" },
  j_utara_lab: { x: 49.0, y: 45.0, name: "Jalan Depan Lab Kimia & Fisika" },

  // Jalan Tengah (R. Kepsek, TU, Blok A Selatan)
  j_kepsek: { x: 68.0, y: 76.2, name: "Jalan Depan R. Kepsek & Bengkel TGM" },
  j_kepsek_pintu: { x: 67.5, y: 71.5, name: "Pintu Masuk Ruang Kepala Sekolah" },
  j_lorong_kepsek: { x: 68.0, y: 66.0, name: "Lorong Masuk R. Kepsek & TU" },
  j_blok_a_selatan: { x: 64.0, y: 66.0, name: "Selasar Selatan Blok A" },
  j_blok_a_1: { x: 64.0, y: 61.5, name: "Selasar Depan Kelas A1 & A4" },
  j_blok_a_2: { x: 64.0, y: 56.5, name: "Selasar Depan Kelas A2 & A5" },
  j_blok_a_3: { x: 64.0, y: 52.8, name: "Selasar Depan Kelas A3 & A6" },
  j_blok_a_utara: { x: 64.0, y: 47.5, name: "Selasar Utara Blok A" },

  // Jalan Poros Tengah (PMR, Mesin, Masjid)
  j_mesin_depan: { x: 58.0, y: 76.2, name: "Jalan Depan Parkir Kepsek & PMR" },
  j_mesin_tengah: { x: 48.5, y: 76.2, name: "Jalan Depan Bengkel Mesin" },
  j_masjid_persimpangan: { x: 43.0, y: 76.2, name: "Persimpangan Masjid Al Mizan" },

  // Selasar Selatan Lapangan Upacara (ICT, Sarana, Kesiswaan, Lab Komputer, B5)
  j_selatan_lapangan_e: { x: 61.0, y: 66.0, name: "Selasar Depan Ruang ICT" },
  j_selatan_lapangan_m: { x: 54.0, y: 66.0, name: "Selasar Depan Kesiswaan & Sarana" },
  j_selatan_lapangan_w: { x: 49.0, y: 66.0, name: "Selasar Depan Lab Komputer" },
  j_blok_b: { x: 43.0, y: 66.0, name: "Selasar Depan Kelas B5 & B2" },

  // Selasar Barat Lapangan Upacara (Ruang Guru, H1)
  j_barat_lapangan_s: { x: 39.0, y: 66.0, name: "Persimpangan Barat Daya Lapangan" },
  j_ruang_guru: { x: 39.0, y: 58.0, name: "Selasar Depan Ruang Guru" },
  j_ruang_h1: { x: 39.0, y: 51.0, name: "Selasar Depan Kelas H1" },
  j_barat_lapangan_n: { x: 39.0, y: 45.0, name: "Selasar Barat Laut Lapangan" },

  // Kawasan GSG & Bengkel Otomotif
  j_gsg_selatan: { x: 54.0, y: 42.0, name: "Pintu Depan Gedung Serba Guna (GSG)" },
  j_lorong_otomotif_s: { x: 60.0, y: 42.0, name: "Jalan Samping GSG & Otomotif" },
  j_lorong_otomotif_m: { x: 60.0, y: 34.0, name: "Pintu Masuk Bengkel Otomotif" },
  j_lorong_otomotif_n: { x: 60.0, y: 25.0, name: "Jalan Depan Kelas F1 & F2" },

  // Kawasan Blok F (Utara Sekolah)
  j_blok_f_utama: { x: 58.0, y: 18.0, name: "Koridor Tengah Blok F (Lantai 2)" },
  j_blok_f_barat: { x: 48.5, y: 18.0, name: "Koridor Barat Blok F (F5 & F6)" },
  j_blok_f_timur: { x: 67.5, y: 18.0, name: "Koridor Timur Blok F (F3 & F4)" },

  // Kawasan Blok G & Koperasi (Barat GSG)
  j_blok_g_masuk: { x: 43.0, y: 42.0, name: "Jalan Masuk Blok G & Koperasi" },
  j_koperasi: { x: 43.0, y: 36.8, name: "Jalan Depan Koperasi & Kelas G2" },
  j_blok_g3: { x: 43.0, y: 33.5, name: "Jalan Depan Kelas G3" },

  // Kawasan Gedung COE & Kantin
  j_coe_masuk: { x: 26.0, y: 66.0, name: "Plaza Gedung COE" },
  j_kantin_utama: { x: 26.0, y: 62.0, name: "Jalan Depan Kantin Utama" },

  // Kawasan Masjid Al Mizan
  j_masjid_pintu: { x: 38.0, y: 76.2, name: "Pelataran Masjid Al Mizan" },
  j_mushola_barat: { x: 25.5, y: 76.2, name: "Jalan Dekat Musholla & Blok P" },
  j_elektro: { x: 20.0, y: 76.2, name: "Lorong Jurusan Elektro & Kelas K" },
  j_kantin_barat: { x: 13.0, y: 76.2, name: "Jalan Depan Kantin Barat & Kelas M" },

  // Kawasan Selatan (RPL, TFL, Perpus, Gedung O)
  j_selatan_persimpangan: { x: 43.0, y: 83.0, name: "Jalur Selatan Sekolah" },
  j_gedung_o: { x: 48.0, y: 83.0, name: "Akses Gedung O" },
  j_bengkel_tfl: { x: 36.5, y: 83.0, name: "Akses Bengkel TFL & L3" },
  j_bengkel_rpl: { x: 32.5, y: 84.0, name: "Akses Bengkel RPL" },
  j_perpus: { x: 21.0, y: 83.0, name: "Plaza Perpustakaan Sekolah" },
  j_blok_m_selatan: { x: 12.0, y: 84.0, name: "Akses Kelas M3 & M4" }
};

// Hubungan jalan (Edges antar koridor)
const corridorEdges = [
  // Jalan Masuk
  ["gate", "pos"],
  ["pos", "j_taman_barat"],

  // Cabang ke Jalan Timur (Blok D)
  ["j_taman_barat", "j_blok_d_masuk"],
  ["j_blok_d_masuk", "j_blok_d_1"],
  ["j_blok_d_1", "j_blok_d_2"],
  ["j_blok_d_2", "j_blok_d_3"],
  ["j_blok_d_3", "j_blok_d_4"],
  ["j_blok_d_4", "j_blok_d_5"],
  ["j_blok_d_5", "j_utara_d_a"],
  ["j_utara_d_a", "j_utara_a"],
  ["j_utara_a", "j_utara_lapangan"],
  ["j_utara_lapangan", "j_utara_lab"],

  // Jalan Utama ke Barat (Depan Kepsek, Mesin, Masjid)
  ["j_taman_barat", "j_kepsek"],
  ["j_kepsek", "j_kepsek_pintu"],
  ["j_kepsek_pintu", "j_lorong_kepsek"],
  ["j_kepsek", "j_lorong_kepsek"],
  ["j_lorong_kepsek", "j_blok_a_selatan"],
  ["j_blok_a_selatan", "j_blok_a_1"],
  ["j_blok_a_1", "j_blok_a_2"],
  ["j_blok_a_2", "j_blok_a_3"],
  ["j_blok_a_3", "j_blok_a_utara"],
  ["j_blok_a_utara", "j_utara_a"],

  ["j_kepsek", "j_mesin_depan"],
  ["j_mesin_depan", "j_mesin_tengah"],
  ["j_mesin_tengah", "j_masjid_persimpangan"],

  // Dari persimpangan tengah ke Selasar Selatan Lapangan
  ["j_lorong_kepsek", "j_selatan_lapangan_e"],
  ["j_selatan_lapangan_e", "j_selatan_lapangan_m"],
  ["j_selatan_lapangan_m", "j_selatan_lapangan_w"],
  ["j_selatan_lapangan_w", "j_blok_b"],
  ["j_blok_b", "j_barat_lapangan_s"],

  // Hubungan ke Selasar Barat Lapangan
  ["j_barat_lapangan_s", "j_ruang_guru"],
  ["j_ruang_guru", "j_ruang_h1"],
  ["j_ruang_h1", "j_barat_lapangan_n"],
  ["j_barat_lapangan_n", "j_utara_lab"],

  // Hubungan ke GSG & Otomotif & Blok F
  ["j_utara_lapangan", "j_gsg_selatan"],
  ["j_utara_lapangan", "j_lorong_otomotif_s"],
  ["j_utara_a", "j_lorong_otomotif_s"],
  ["j_utara_a", "j_gsg_selatan"],
  ["j_utara_d_a", "j_lorong_otomotif_s"],
  ["j_lorong_otomotif_s", "j_lorong_otomotif_m"],
  ["j_lorong_otomotif_m", "j_lorong_otomotif_n"],
  ["j_lorong_otomotif_n", "j_blok_f_utama"],
  ["j_blok_f_utama", "j_blok_f_barat"],
  ["j_blok_f_utama", "j_blok_f_timur"],

  // Hubungan ke Blok G & Koperasi
  ["j_barat_lapangan_n", "j_blok_g_masuk"],
  ["j_blok_g_masuk", "j_koperasi"],
  ["j_koperasi", "j_blok_g3"],

  // Hubungan ke Gedung COE & Kantin
  ["j_barat_lapangan_s", "j_coe_masuk"],
  ["j_coe_masuk", "j_kantin_utama"],

  // Hubungan ke Masjid & Sisi Barat
  ["j_masjid_persimpangan", "j_masjid_pintu"],
  ["j_masjid_pintu", "j_mushola_barat"],
  ["j_mushola_barat", "j_elektro"],
  ["j_elektro", "j_kantin_barat"],

  // Hubungan ke Sisi Selatan (RPL, TFL, Perpus)
  ["j_masjid_persimpangan", "j_selatan_persimpangan"],
  ["j_selatan_persimpangan", "j_gedung_o"],
  ["j_selatan_persimpangan", "j_bengkel_tfl"],
  ["j_bengkel_tfl", "j_bengkel_rpl"],
  ["j_bengkel_rpl", "j_perpus"],
  ["j_perpus", "j_blok_m_selatan"],
  ["j_perpus", "j_mushola_barat"]
];

// ==========================================
// 3. DATABASE RUANGAN LENGKAP
// ==========================================
const places = [
  // --- GERBANG & FASILITAS DEPAN ---
  {
    id: "pos-gerbang",
    name: "Pos Gerbang Utama",
    aliases: ["pos satpam", "gerbang", "pintu masuk", "security", "pos"],
    category: "Fasilitas",
    doorNode: "pos",
    block: "Area Depan",
    floor: "Lantai Dasar",
    detail: "Akses utama masuk & pos keamanan sekolah",
    description: "Titik masuk utama SMKN 1 Cilegon di Jl. Kedungbaya. Pos pemeriksaan keamanan, buku tamu, dan pusat informasi.",
    facilities: ["Petugas Keamanan 24 Jam", "Buku Tamu Digital", "CCTV", "Papan Informasi"],
    icon: "gate",
    x: 84.5,
    y: 76.2
  },
  {
    id: "taman-utama",
    name: "Taman Sekolah",
    aliases: ["taman", "taman depan", "area hijau"],
    category: "Fasilitas",
    doorNode: "j_taman_barat",
    block: "Area Depan",
    floor: "Lantai Dasar",
    detail: "Area hijau asri depan gerbang",
    description: "Ruang terbuka hijau di samping gerbang utama yang memberikan udara segar bagi lingkungan sekolah.",
    facilities: ["Bangku Taman", "Pepohonan Rindang", "Lampu Penerangan"],
    icon: "field",
    x: 78.5,
    y: 81.0
  },
  {
    id: "parkir-guru",
    name: "Parkir Guru & Karyawan",
    aliases: ["parkir guru", "parkiran"],
    category: "Fasilitas",
    doorNode: "j_blok_d_2",
    block: "Samping Blok A",
    floor: "Lantai Dasar",
    detail: "Parkir kendaraan roda 2 & 4 guru dan staf",
    description: "Kawasan parkir khusus dewan guru, staf TU, dan tamu dinas.",
    facilities: ["Kanopi Pelindung", "Akses Jalan Utama", "CCTV"],
    icon: "gate",
    x: 73.0,
    y: 56.5
  },
  {
    id: "parkir-kepsek",
    name: "Parkir Kepala Sekolah",
    aliases: ["parkir kepsek"],
    category: "Fasilitas",
    doorNode: "j_mesin_depan",
    block: "Samping R. Kepsek",
    floor: "Lantai Dasar",
    detail: "Area parkir khusus pimpinan sekolah",
    description: "Area parkir kendaraan dinas Kepala Sekolah SMKN 1 Cilegon.",
    facilities: ["Kanopi Khusus", "Akses Cepat ke Ruang Kerja"],
    icon: "gate",
    x: 58.0,
    y: 71.0
  },

  // --- KANTOR & ADMINISTRASI ---
  {
    id: "ruang-kepsek",
    name: "Ruang Kepala Sekolah",
    aliases: ["kepsek", "kepala sekolah", "r. kepsek", "pimpinan"],
    category: "Gedung",
    doorNode: "j_kepsek_pintu",
    block: "Gedung Utama",
    floor: "Lantai Dasar",
    detail: "Kantor pimpinan SMKN 1 Cilegon",
    description: "Ruang kerja dan penerimaan tamu dinas resmi Kepala Sekolah.",
    facilities: ["Ruang Tamu Pimpinan", "Pendingin AC", "Meja Rapat"],
    icon: "people",
    x: 67.5,
    y: 71.0
  },
  {
    id: "ruang-tu",
    name: "Ruang Tata Usaha (TU)",
    aliases: ["tu", "tata usaha", "administrasi", "r. tu", "bayar spp", "legalisir"],
    category: "Fasilitas",
    doorNode: "j_lorong_kepsek",
    block: "Gedung Utama",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Layanan surat, administrasi siswa & keuangan",
    description: "Pusat pelayanan administrasi sekolah, surat keterangan, legalisir, dan keuangan siswa.",
    facilities: ["Loket Pelayanan", "Ruang Tunggu", "Komputer Administrasi", "Pendingin AC"],
    icon: "people",
    x: 68.5,
    y: 66.8
  },
  {
    id: "ruang-guru",
    name: "Ruang Guru",
    aliases: ["guru", "r. guru", "kantor guru", "dewan guru"],
    category: "Fasilitas",
    doorNode: "j_ruang_guru",
    block: "Gedung Barat",
    floor: "Lantai Dasar",
    detail: "Kantor dewan pendidik SMKN 1 Cilegon",
    description: "Ruang kerja guru mata pelajaran, persiapan KBM, dan konsultasi siswa.",
    facilities: ["Meja Kerja Guru", "Ruang Piket", "Loker Guru", "WiFi Sekolah", "AC"],
    icon: "people",
    x: 34.8,
    y: 57.8
  },
  {
    id: "ruang-kesiswaan",
    name: "Ruang Kesiswaan",
    aliases: ["kesiswaan", "tatib", "r. ksswaan"],
    category: "Fasilitas",
    doorNode: "j_selatan_lapangan_m",
    block: "Gedung Tengah",
    floor: "Lantai Dasar",
    detail: "Pembinaan karakter & tata tertib siswa",
    description: "Kantor pembinaan kesiswaan, penegakan tata tertib, dan izin kegiatan siswa.",
    facilities: ["Meja Konseling", "Data Siswa", "AC"],
    icon: "people",
    x: 54.2,
    y: 66.0
  },
  {
    id: "ruang-sarana",
    name: "Ruang Sarana & Prasarana",
    aliases: ["sarana", "sarpras", "logistik"],
    category: "Fasilitas",
    doorNode: "j_selatan_lapangan_m",
    block: "Gedung Tengah",
    floor: "Lantai Dasar",
    detail: "Pengelolaan inventaris & fasilitas",
    description: "Pusat logistik, perawatan sarana prasarana sekolah, dan inventaris alat.",
    facilities: ["Gudang Alat", "Sistem Manajemen Aset"],
    icon: "tools",
    x: 57.5,
    y: 66.0
  },
  {
    id: "ruang-osis",
    name: "Ruang OSIS",
    aliases: ["osis", "sekretariat osis"],
    category: "Fasilitas",
    doorNode: "j_utara_a",
    block: "Blok A Utara",
    floor: "Lantai Dasar",
    detail: "Sekretariat OSIS & MPK",
    description: "Pusat kegiatan organisasi siswa, rapat kerja, dan koordinasi acara sekolah.",
    facilities: ["Meja Rapat Pengurus", "Papan Rencana Kegiatan"],
    icon: "people",
    x: 71.0,
    y: 47.5
  },
  {
    id: "ruang-pmr",
    name: "Ruang PMR / UKS",
    aliases: ["pmr", "uks", "ruang kesehatan", "sakit", "obat"],
    category: "Fasilitas",
    doorNode: "j_mesin_depan",
    block: "Depan Bengkel Mesin",
    floor: "Lantai Dasar",
    detail: "Unit Kesehatan Sekolah & Palang Merah",
    description: "Fasilitas penanganan medis darurat pertama bagi siswa dan staf sekolah.",
    facilities: ["Tempat Tidur Pasien", "Kotak P3K Lengkap", "Tabung Oksigen", "Timbangan"],
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
    doorNode: "j_selatan_lapangan_w",
    block: "Gedung Tengah",
    floor: "Lantai Dasar",
    detail: "Lab komputer ujian CBT & informatika",
    description: "Laboratorium komputasi multimedia untuk pembelajaran informatika, simulasi kejuruan, dan ujian CBT.",
    facilities: ["40 Unit PC Core i7", "LAN Gigabit & Internet Cepat", "AC Sentral", "LCD Proyektor"],
    icon: "computer",
    x: 49.0,
    y: 66.0
  },
  {
    id: "ruang-ict",
    name: "Ruang ICT & Server",
    aliases: ["ict", "ruang server", "jaringan", "noc", "wifi"],
    category: "Fasilitas",
    doorNode: "j_selatan_lapangan_e",
    block: "Gedung Tengah",
    floor: "Lantai Dasar",
    detail: "Pusat server & infrastruktur jaringan",
    description: "Network Operation Center (NOC) sekolah, router jaringan, dan server web/database.",
    facilities: ["Server Rack", "UPS High Capacity", "Firewall", "CCTV Monitor"],
    icon: "computer",
    x: 61.0,
    y: 66.0
  },
  {
    id: "lab-kimia",
    name: "Laboratorium Kimia",
    aliases: ["lab kimia", "l. kim", "kimia"],
    category: "Fasilitas",
    doorNode: "j_utara_lab",
    block: "Blok C",
    floor: "Lantai Dasar",
    detail: "Praktikum kimia sains & terapan",
    description: "Ruang eksperimen reaksi kimia, analisa larutan, dan instrumen uji kimia K3.",
    facilities: ["Lemari Asam", "Meja Praktikum Keramik", "Wastafel Kimia", "Alat Uji Gelas"],
    icon: "tools",
    x: 50.5,
    y: 48.5
  },
  {
    id: "lab-fisika",
    name: "Laboratorium Fisika",
    aliases: ["lab fisika", "l. fis", "fisika"],
    category: "Fasilitas",
    doorNode: "j_utara_lab",
    block: "Blok C",
    floor: "Lantai Dasar",
    detail: "Praktikum fisika terapan teknik",
    description: "Laboratorium pengukuran besaran mekanika, listrik magnet, dan optika terapan.",
    facilities: ["Kit Praktikum Fisika", "Osiloskop", "Multimeter Digital", "LCD Proyektor"],
    icon: "tools",
    x: 58.0,
    y: 48.5
  },

  // --- BENGKEL KEJURUAN ---
  {
    id: "bengkel-otomotif",
    name: "Bengkel Otomotif",
    aliases: ["otomotif", "tkr", "bengkel mobil", "teknik kendaraan ringan", "tsm"],
    category: "Gedung",
    doorNode: "j_lorong_otomotif_m",
    block: "Gedung Otomotif",
    floor: "Lantai Dasar",
    detail: "Praktik service kendaraan roda empat & motor",
    description: "Bengkel modern berstandar industri untuk tune-up mesin EFI, spooring balancing, dan kelistrikan mobil.",
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
    doorNode: "j_lorong_otomotif_s",
    block: "Gedung Otomotif",
    floor: "Lantai Dasar",
    detail: "Ruang teori kejuruan otomotif",
    description: "Ruang pembelajaran teori mesin otomotif sebelum praktik kerja di bengkel.",
    facilities: ["Whiteboard", "LCD Proyektor", "Trainer Kelistrikan", "AC"],
    icon: "class",
    x: 66.2,
    y: 39.0
  },
  {
    id: "bengkel-mesin",
    name: "Bengkel Mesin (Pemesinan)",
    aliases: ["bengkel mesin", "mesin bubut", "cnc", "frais", "teknik pemesinan", "bubut"],
    category: "Gedung",
    doorNode: "j_mesin_tengah",
    block: "Gedung Mesin",
    floor: "Lantai Dasar",
    detail: "Praktik bubut konvensional, frais & CNC",
    description: "Sentra manufaktur dan pemesinan logam dengan mesin bubut, frais universal, dan mesin CNC canggih.",
    facilities: ["16 Unit Mesin Bubut", "6 Unit Mesin Frais", "2 Unit CNC Lathe & Milling", "Alat Ukur Presisi"],
    icon: "tools",
    x: 48.5,
    y: 76.5
  },
  {
    id: "bengkel-tgm",
    name: "Bengkel TGM (Teknik Gambar Mesin)",
    aliases: ["tgm", "gambar mesin", "cad", "cam", "desain teknik"],
    category: "Gedung",
    doorNode: "j_kepsek",
    block: "Gedung TGM",
    floor: "Lantai Dasar",
    detail: "Studio desain CAD & pemodelan 3D",
    description: "Studio perancangan 2D CAD dan 3D Modeling mechanical design dengan software AutoCAD & SolidWorks.",
    facilities: ["Workstation Komputer CAD", "Plotter A0/A1", "Meja Gambar Manual", "3D Printer"],
    icon: "tools",
    x: 66.0,
    y: 80.5
  },
  {
    id: "bengkel-rpl",
    name: "Bengkel RPL (Software Engineering)",
    aliases: ["rpl", "bengkel rpl", "rekayasa perangkat lunak", "coding", "lab rpl", "programmer", "software"],
    category: "Gedung",
    doorNode: "j_bengkel_rpl",
    block: "Gedung RPL",
    floor: "Lantai Dasar",
    detail: "Sentra rekayasa perangkat lunak & coding",
    description: "Laboratorium software engineering berkonsep tech startup untuk pembuatan aplikasi web, mobile, dan AI.",
    facilities: ["Dual-Monitor Coding Stations", "Dedicated High-Speed Fiber Internet", "Smart TV Screen", "AC"],
    icon: "computer",
    x: 32.5,
    y: 87.2
  },
  {
    id: "bengkel-tfl",
    name: "Bengkel TFL (Fabrikasi Logam & Las)",
    aliases: ["tfl", "las", "fabrikasi logam", "welding"],
    category: "Gedung",
    doorNode: "j_bengkel_tfl",
    block: "Gedung TFL",
    floor: "Lantai Dasar",
    detail: "Teknik pengelasan listrik SMAW, GMAW, GTAW",
    description: "Bengkel pengelasan bersertifikasi industri untuk las busur listrik, las argon TIG, dan pemotongan plasma.",
    facilities: ["Booth Pengelasan K3", "Mesin Las Inverter Multi-Proses", "Mesin Bending Plat", "Plasma Cutting"],
    icon: "tools",
    x: 36.5,
    y: 83.0
  },
  {
    id: "gedung-o",
    name: "Gedung O (Praktik Kejuruan)",
    aliases: ["gedung o", "blok o", "ruang o"],
    category: "Gedung",
    doorNode: "j_gedung_o",
    block: "Blok O",
    floor: "Lantai Dasar",
    detail: "Ruang perakitan & assembling teknik",
    description: "Ruang perakitan benda kerja teknik dan uji kelayakan produk manufaktur siswa.",
    facilities: ["Meja Kerja Bangku", "Ragum", "Alat Ukur Teknis"],
    icon: "building",
    x: 48.0,
    y: 83.5
  },
  {
    id: "ruang-l3",
    name: "Ruang L3",
    aliases: ["l3", "ruang l3"],
    category: "Ruang kelas",
    doorNode: "j_bengkel_tfl",
    block: "Blok L",
    floor: "Lantai Dasar",
    detail: "Ruang teori praktik kejuruan logam",
    description: "Ruang pembekalan materi Keselamatan Kerja (K3) serta gambar teknik sambungan las.",
    facilities: ["Papan Tulis", "Alat Peraga"],
    icon: "class",
    x: 29.5,
    y: 83.0
  },
  {
    id: "gedung-coe",
    name: "Gedung COE (Center of Excellence)",
    aliases: ["coe", "gedung coe", "center of excellence", "aula coe"],
    category: "Gedung",
    doorNode: "j_coe_masuk",
    block: "Gedung COE",
    floor: "Lantai Dasar",
    detail: "Pusat Keunggulan Vokasi & Teaching Factory",
    description: "Gedung modern teaching factory terintegrasi, seminar vokasi, dan pameran teknologi siswa.",
    facilities: ["Showroom Produk Siswa", "Studio Multimedia", "Ruang Mini Teater", "AC Sentral", "Akses Difabel"],
    icon: "building",
    x: 25.5,
    y: 66.0
  },
  {
    id: "jurusan-elektro",
    name: "Ruang Jurusan Teknik Elektro",
    aliases: ["elektro", "jurusan elektro", "titl", "listrik"],
    category: "Gedung",
    doorNode: "j_elektro",
    block: "Blok Elektro",
    floor: "Lantai Dasar",
    detail: "Instalasi Tenaga Listrik & Kontrol Motor",
    description: "Sentra keahlian teknik elektro, kontrol motor listrik, PLC, dan otomasi industri.",
    facilities: ["Trainer PLC Industri", "Papan Praktik Instalasi Bangunan", "Osiloskop Listrik"],
    icon: "tools",
    x: 18.5,
    y: 70.8
  },

  // --- RUANG KELAS BLOK A ---
  {
    id: "kelas-a1",
    name: "Kelas A1",
    aliases: ["a1", "kelas a1", "10 mesin 1", "x mesin 1"],
    category: "Ruang kelas",
    doorNode: "j_blok_a_1",
    block: "Blok A",
    floor: "Lantai Dasar",
    detail: "Blok A · lantai dasar",
    description: "Ruang kelas reguler lantai dasar menghadap lapangan upacara.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "LCD Proyektor", "Kipas Angin"],
    icon: "class",
    x: 66.5,
    y: 61.5
  },
  {
    id: "kelas-a2",
    name: "Kelas A2",
    aliases: ["a2", "kelas a2", "10 ipa 2", "kelas 10 ipa 2", "10 mesin 2", "x mesin 2"],
    category: "Ruang kelas",
    doorNode: "j_blok_a_2",
    block: "Blok A",
    floor: "Lantai Dasar",
    detail: "Blok A · lantai dasar (Kelas 10 IPA 2)",
    description: "Ruang kelas nyaman dengan ventilasi terbuka di sayap tengah Blok A.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "LCD Proyektor", "Kipas Angin"],
    icon: "class",
    x: 66.5,
    y: 56.5
  },
  {
    id: "kelas-a3",
    name: "Kelas A3",
    aliases: ["a3", "kelas a3", "10 otomotif 1", "x otomotif 1"],
    category: "Ruang kelas",
    doorNode: "j_blok_a_3",
    block: "Blok A",
    floor: "Lantai Dasar",
    detail: "Blok A · lantai dasar",
    description: "Ruang kelas reguler dekat tangga penghubung lantai 2 Blok A.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "LCD Proyektor"],
    icon: "class",
    x: 66.5,
    y: 52.8
  },
  {
    id: "kelas-a4",
    name: "Kelas A4",
    aliases: ["a4", "kelas a4", "11 mesin 1", "xi mesin 1"],
    category: "Ruang kelas",
    doorNode: "j_blok_a_1",
    block: "Blok A",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok A · lantai 2 (atas)",
    description: "Ruang kelas lantai 2 menghadap lapangan upacara.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "LCD Proyektor"],
    icon: "class",
    x: 69.0,
    y: 60.0
  },
  {
    id: "kelas-a5",
    name: "Kelas A5",
    aliases: ["a5", "kelas a5", "11 mesin 2", "xi mesin 2"],
    category: "Ruang kelas",
    doorNode: "j_blok_a_2",
    block: "Blok A",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok A · lantai 2 (atas)",
    description: "Ruang kelas lantai 2 sayap tengah Blok A.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "LCD Proyektor"],
    icon: "class",
    x: 69.0,
    y: 55.0
  },
  {
    id: "kelas-a6",
    name: "Kelas A6",
    aliases: ["a6", "kelas a6", "11 otomotif 1", "xi otomotif 1"],
    category: "Ruang kelas",
    doorNode: "j_blok_a_3",
    block: "Blok A",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok A · lantai 2 (atas)",
    description: "Ruang kelas lantai 2 ujung utara Blok A.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "LCD Proyektor"],
    icon: "class",
    x: 69.0,
    y: 50.8
  },

  // --- RUANG KELAS BLOK B ---
  {
    id: "kelas-b5",
    name: "Kelas B5",
    aliases: ["b5", "kelas b5", "10 elektro 1"],
    category: "Ruang kelas",
    doorNode: "j_blok_b",
    block: "Blok B",
    floor: "Lantai Dasar",
    detail: "Blok B · lantai dasar",
    description: "Ruang kelas di sayap selatan lapangan upacara dekat lab komputer.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 42.8,
    y: 66.0
  },
  {
    id: "kelas-b2",
    name: "Kelas B2",
    aliases: ["b2", "kelas b2", "11 elektro 1"],
    category: "Ruang kelas",
    doorNode: "j_blok_b",
    block: "Blok B",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok B · lantai 2 (atas)",
    description: "Ruang kelas lantai atas Blok B di atas ruang B5.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 42.8,
    y: 66.0
  },

  // --- RUANG KELAS BLOK C ---
  {
    id: "kelas-c4",
    name: "Kelas C4",
    aliases: ["c4", "kelas c4", "12 kimia"],
    category: "Ruang kelas",
    doorNode: "j_utara_lab",
    block: "Blok C",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok C · lantai 2 (atas Lab Kimia)",
    description: "Ruang kelas lantai atas di utara lapangan upacara.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 50.5,
    y: 48.5
  },
  {
    id: "kelas-c3",
    name: "Kelas C3",
    aliases: ["c3", "kelas c3", "12 fisika"],
    category: "Ruang kelas",
    doorNode: "j_utara_lab",
    block: "Blok C",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok C · lantai 2 (atas Lab Fisika)",
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
    doorNode: "j_blok_d_1",
    block: "Blok D",
    floor: "Lantai Dasar",
    detail: "Blok D · lantai dasar",
    description: "Ruang kelas di koridor timur sekolah dekat area gerbang.",
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
    doorNode: "j_blok_d_2",
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
    doorNode: "j_blok_d_3",
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
    doorNode: "j_blok_d_4",
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
    doorNode: "j_blok_d_5",
    block: "Blok D",
    floor: "Lantai Dasar",
    detail: "Blok D · ujung utara dasar",
    description: "Ruang kelas pembelajaran di ujung utara Blok D.",
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
    doorNode: "j_blok_d_1",
    block: "Blok D",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok D · lantai 2 (atas)",
    description: "Ruang kelas lantai 2 di atas ruang D1.",
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
    doorNode: "j_blok_d_2",
    block: "Blok D",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok D · lantai 2 (atas)",
    description: "Ruang kelas lantai 2 di atas ruang D2.",
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
    doorNode: "j_blok_d_3",
    block: "Blok D",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok D · lantai 2 (atas)",
    description: "Ruang kelas lantai 2 di atas ruang D3.",
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
    doorNode: "j_blok_d_4",
    block: "Blok D",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok D · lantai 2 (atas)",
    description: "Ruang kelas pembelajaran di lantai 2 Blok D.",
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
    doorNode: "j_blok_d_5",
    block: "Blok D",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok D · lantai 2 (atas)",
    description: "Ruang kelas paling utara lantai 2 Blok D.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 83.5,
    y: 43.8
  },

  // --- RUANG KELAS BLOK F ---
  {
    id: "kelas-f1",
    name: "Kelas F1",
    aliases: ["f1", "kelas f1"],
    category: "Ruang kelas",
    doorNode: "j_lorong_otomotif_n",
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
    aliases: ["f2", "kelas f2"],
    category: "Ruang kelas",
    doorNode: "j_lorong_otomotif_n",
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
    aliases: ["f3", "kelas f3", "12 rpl 1"],
    category: "Ruang kelas",
    doorNode: "j_blok_f_timur",
    block: "Blok F",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok F · lantai 2 paling utara",
    description: "Ruang kelas lantai 2 deret utara sekolah.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 67.5,
    y: 17.2
  },
  {
    id: "kelas-f4",
    name: "Kelas F4",
    aliases: ["f4", "kelas f4", "12 rpl 2"],
    category: "Ruang kelas",
    doorNode: "j_blok_f_utama",
    block: "Blok F",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok F · lantai 2 paling utara",
    description: "Ruang kelas lantai 2 deret utara sekolah.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 62.0,
    y: 17.2
  },
  {
    id: "kelas-f5",
    name: "Kelas F5",
    aliases: ["f5", "kelas f5", "12 tkj 1"],
    category: "Ruang kelas",
    doorNode: "j_blok_f_utama",
    block: "Blok F",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok F · lantai 2 paling utara",
    description: "Ruang kelas lantai 2 deret utara sekolah.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard", "Proyektor"],
    icon: "class",
    x: 54.5,
    y: 17.2
  },
  {
    id: "kelas-f6",
    name: "Kelas F6",
    aliases: ["f6", "kelas f6", "12 tkj 2"],
    category: "Ruang kelas",
    doorNode: "j_blok_f_barat",
    block: "Blok F",
    floor: "Lantai Atas",
    floorColor: "blue",
    detail: "Blok F · lantai 2 paling utara",
    description: "Ruang kelas lantai 2 ujung barat Blok F.",
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
    doorNode: "j_blok_g_masuk",
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
    doorNode: "j_koperasi",
    block: "Blok G",
    floor: "Lantai Dasar",
    detail: "Blok G · dekat Koperasi",
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
    doorNode: "j_blok_g3",
    block: "Blok G",
    floor: "Lantai Dasar",
    detail: "Blok G · ujung barat GSG",
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
    doorNode: "j_ruang_h1",
    block: "Blok H",
    floor: "Lantai Dasar",
    detail: "Blok H · barat lapangan",
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
    doorNode: "j_elektro",
    block: "Blok K",
    floor: "Lantai Dasar",
    detail: "Blok K · lorong elektro",
    description: "Ruang kelas di lorong jurusan elektro dekat Masjid Al Mizan.",
    facilities: ["36 Meja Kursi Siswa", "Whiteboard"],
    icon: "class",
    x: 18.5,
    y: 73.2
  },

  // --- FASILITAS UMUM, IBADAH, KANTIN & OLAHRAGA ---
  {
    id: "masjid-al-mizan",
    name: "Masjid Al Mizan",
    aliases: ["masjid", "masjid al mizan", "sholat", "tempat ibadah", "jumatan", "rohis"],
    category: "Fasilitas",
    doorNode: "j_masjid_pintu",
    block: "Kawasan Masjid",
    floor: "Lantai Dasar",
    detail: "Masjid utama SMKN 1 Cilegon",
    description: "Pusat ibadah sholat berjamaah, sholat Jumat warga sekolah, dan kajian rohis.",
    facilities: ["Tempat Wudhu Luas Pria & Wanita", "Kapasitas 800 Jamaah", "Sound System"],
    icon: "mosque",
    x: 34.5,
    y: 75.0
  },
  {
    id: "mushola-barat",
    name: "Musholla Barat",
    aliases: ["mushola", "musholla", "surau"],
    category: "Fasilitas",
    doorNode: "j_mushola_barat",
    block: "Dekat Blok P",
    floor: "Lantai Dasar",
    detail: "Musholla pendukung sayap barat",
    description: "Fasilitas tempat sholat pendukung yang nyaman di samping area Masjid Al Mizan.",
    facilities: ["Tempat Wudhu", "Sajadah", "Mukena"],
    icon: "mosque",
    x: 25.5,
    y: 77.5
  },
  {
    id: "perpustakaan",
    name: "Perpustakaan (Perpus)",
    aliases: ["perpus", "perpustakaan", "baca", "buku", "literasi"],
    category: "Fasilitas",
    doorNode: "j_perpus",
    block: "Gedung Perpus",
    floor: "Lantai Dasar",
    detail: "Pusat literasi & perpustakaan digital",
    description: "Perpustakaan ber-AC lengkap dengan ribuan koleksi buku teks pelajaran, fiksi, dan e-library.",
    facilities: ["5.000+ Koleksi Buku", "Area Baca Lesehan", "Komputer E-Library", "AC"],
    icon: "book",
    x: 20.8,
    y: 84.0
  },
  {
    id: "kantin-utama",
    name: "Kantin Sekolah",
    aliases: ["kantin", "makan", "minum", "jajan", "kantin coe"],
    category: "Fasilitas",
    doorNode: "j_kantin_utama",
    block: "Utara Gedung COE",
    floor: "Lantai Dasar",
    detail: "Pusat kuliner sehat sekolah",
    description: "Kantin sekolah dengan 10 stand makanan higienis, minuman segar, dan meja makan luas.",
    facilities: ["10 Stand Makanan & Minuman", "Meja Makan Luas", "Wastafel", "Pembayaran QRIS"],
    icon: "food",
    x: 20.5,
    y: 62.0
  },
  {
    id: "kantin-barat",
    name: "Kantin Barat",
    aliases: ["kantin barat"],
    category: "Fasilitas",
    doorNode: "j_kantin_barat",
    block: "Sayap Barat",
    floor: "Lantai Dasar",
    detail: "Kantin penunjang sayap barat",
    description: "Stand jajanan dan minuman cepat saji dekat area kejuruan.",
    facilities: ["Stand Snack & Minuman", "Area Duduk"],
    icon: "food",
    x: 12.8,
    y: 74.0
  },
  {
    id: "koperasi-siswa",
    name: "Koperasi Sekolah",
    aliases: ["koperasi", "kopsis", "seragam", "atk", "fotocopy"],
    category: "Fasilitas",
    doorNode: "j_koperasi",
    block: "Blok G",
    floor: "Lantai Dasar",
    detail: "Penyedia seragam, ATK & fotokopi",
    description: "Toko perlengkapan sekolah siswa yang menyediakan seragam, jas praktik, buku, dan fotokopi.",
    facilities: ["Seragam Resmi", "ATK Murah", "Layanan Fotokopi"],
    icon: "food",
    x: 39.2,
    y: 36.8
  },
  {
    id: "lapangan-upacara",
    name: "Lapangan Upacara & Olahraga",
    aliases: ["lapangan", "lapangan upacara", "upacara", "olahraga", "futsal", "basket"],
    category: "Fasilitas",
    doorNode: "j_selatan_lapangan_m",
    block: "Pusat Sekolah",
    floor: "Lantai Dasar",
    detail: "Pusat upacara bendera & olahraga",
    description: "Lapangan outdoor luas di pusat kampus untuk upacara Senin, apel, dan olahraga basket/futsal.",
    facilities: ["Tiang Bendera Resmi", "Ring Basket Standar", "Garis Lapangan Futsal"],
    icon: "field",
    x: 51.5,
    y: 57.5
  },
  {
    id: "gedung-serba-guna",
    name: "Gedung Serba Guna (GSG)",
    aliases: ["gsg", "gedung serba guna", "aula", "auditorium", "wisuda", "rapat"],
    category: "Gedung",
    doorNode: "j_gsg_selatan",
    block: "Gedung GSG",
    floor: "Lantai Dasar",
    detail: "Aula utama pertemuan akbar & wisuda",
    description: "Auditorium indoor berkapasitas 1.500 orang untuk wisuda, rapat wali murid, dan pentas seni.",
    facilities: ["Panggung Utama", "Sound System Line Array", "Kapasitas 1.500 Kursi"],
    icon: "building",
    x: 50.8,
    y: 37.0
  },
  {
    id: "toilet-siswa",
    name: "Toilet Siswa (Dekat Lapangan)",
    aliases: ["toilet", "wc", "kamar mandi", "toilet siswa"],
    category: "Fasilitas",
    doorNode: "j_utara_a",
    block: "Utara Blok A",
    floor: "Lantai Dasar",
    detail: "Sanitasi siswa dekat lapangan upacara",
    description: "Kamar mandi dan toilet terpisah untuk siswa pria dan wanita.",
    facilities: ["Toilet Terpisah Pria/Wanita", "Kloset Bersih", "Wastafel", "Air Bersih"],
    icon: "restroom",
    x: 66.5,
    y: 47.5
  },
  {
    id: "toilet-umum",
    name: "Toilet Guru & Tamu (Blok A)",
    aliases: ["toilet guru", "wc guru", "toilet tamu"],
    category: "Fasilitas",
    doorNode: "j_blok_a_selatan",
    block: "Selatan Blok A",
    floor: "Lantai Dasar",
    detail: "Toilet guru, staf dan tamu sekolah",
    description: "Fasilitas toilet terawat dekat ruang tata usaha dan ruang dewan guru.",
    facilities: ["Kloset Duduk & Jongkok", "Wastafel", "Sabun Cuci Tangan"],
    icon: "restroom",
    x: 67.5,
    y: 63.2
  },
  {
    id: "toilet-perpus",
    name: "Toilet Siswa (Dekat Perpus)",
    aliases: ["wc perpus", "toilet perpus"],
    category: "Fasilitas",
    doorNode: "j_perpus",
    block: "Dekat Perpus",
    floor: "Lantai Dasar",
    detail: "Toilet pendukung sayap selatan",
    description: "Fasilitas sanitasi pendukung di kawasan selatan sekolah dekat perpustakaan.",
    facilities: ["Air Bersih", "Kloset Bersih"],
    icon: "restroom",
    x: 20.0,
    y: 88.0
  }
];

// SVG Icons
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

// Menemukan node koridor terdekat
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

// Algoritma Dijkstra mencari rute tercepat koridor
function findWalkingRoute(startPoint, destinationPlace) {
  // Jika pengguna sudah berada di lokasi tujuan
  if (metricDistance(startPoint, destinationPlace) < 2) {
    return [
      { x: startPoint.x, y: startPoint.y, name: "Posisi Anda" },
      { x: destinationPlace.x, y: destinationPlace.y, name: destinationPlace.name }
    ];
  }

  const startNode = findNearestNode(startPoint);
  // Gunakan pintu koridor resmi ruangan jika tersedia
  const endNode = (destinationPlace && destinationPlace.doorNode && waypoints[destinationPlace.doorNode])
    ? destinationPlace.doorNode
    : findNearestNode(destinationPlace);

  if (!startNode || !endNode) {
    return [startPoint, destinationPlace];
  }

  const dist = {};
  const prev = {};
  const q = new Set(Object.keys(waypoints));

  for (const id of q) {
    dist[id] = Infinity;
    prev[id] = null;
  }
  dist[startNode] = 0;

  const adj = {};
  for (const id of Object.keys(waypoints)) adj[id] = [];
  for (const [u, v] of corridorEdges) {
    if (waypoints[u] && waypoints[v]) {
      const w = metricDistance(waypoints[u], waypoints[v]);
      adj[u].push({ node: v, w });
      adj[v].push({ node: u, w });
    }
  }

  while (q.size > 0) {
    let u = null;
    let minD = Infinity;
    for (const node of q) {
      if (dist[node] < minD) {
        minD = dist[node];
        u = node;
      }
    }
    if (u === null || u === endNode) break;
    q.delete(u);

    for (const edge of adj[u]) {
      if (q.has(edge.node)) {
        const alt = dist[u] + edge.w;
        if (alt < dist[edge.node]) {
          dist[edge.node] = alt;
          prev[edge.node] = u;
        }
      }
    }
  }

  const pathNodes = [];
  let curr = endNode;
  while (curr) {
    pathNodes.unshift(curr);
    curr = prev[curr];
  }

  const fullPath = [];
  // Titik awal pengguna
  fullPath.push({ x: startPoint.x, y: startPoint.y, name: "Posisi Awal Anda" });
  for (const id of pathNodes) {
    fullPath.push(waypoints[id]);
  }
  // Titik tujuan ruangan jika berbeda dari pintu
  if (destinationPlace && (metricDistance(waypoints[endNode], destinationPlace) > 1.2)) {
    fullPath.push({ x: destinationPlace.x, y: destinationPlace.y, name: destinationPlace.name });
  }

  // Bersihkan titik berulang
  const cleanPath = [fullPath[0]];
  for (let i = 1; i < fullPath.length; i++) {
    if (metricDistance(cleanPath[cleanPath.length - 1], fullPath[i]) > 1.5) {
      cleanPath.push(fullPath[i]);
    }
  }

  return cleanPath;
}

// Konversi rute ke data SVG
function pathToSvgD(path) {
  if (!path || path.length < 2) return "";
  return path.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`).join(" ");
}

// Hitung panjang rute total dalam meter
function calculateTotalDistance(path) {
  let total = 0;
  for (let i = 0; i < path.length - 1; i++) {
    total += metricDistance(path[i], path[i + 1]);
  }
  return total;
}

// ==========================================
// 4. GENERATOR PETUNJUK ARAH (TURN-BY-TURN KONSOLIDASI GOOGLE MAPS)
// ==========================================
function generateStepInstructions(path, destinationName) {
  if (!path || path.length < 2) {
    return [{
      stepIndex: 0,
      text: `Anda sudah berada tepat di lokasi: ${destinationName}`,
      distance: 0,
      icon: "arrival",
      point: path && path[0] ? path[0] : { x: 0, y: 0 },
      startSegmentIndex: 0,
      endSegmentIndex: 0
    }];
  }

  // 1. Ekstrak segmen mentah
  const rawSegments = [];
  for (let i = 0; i < path.length - 1; i++) {
    const p1 = path[i];
    const p2 = path[i + 1];
    const dist = Math.max(2, Math.round(metricDistance(p1, p2)));
    const dx = (p2.x - p1.x) * SCALE_X;
    const dy = (p2.y - p1.y) * SCALE_Y;
    let bearing = Math.atan2(dx, -dy) * (180 / Math.PI);
    if (bearing < 0) bearing += 360;

    rawSegments.push({
      from: p1,
      to: p2,
      dist,
      bearing,
      name: p2.name || "",
      pathIndex: i
    });
  }

  // 2. Gabungkan segmen lurus searah (Step Consolidation)
  // Menghindari instruksi berulang yang bikin pusing (misal: "lurus 10m, lurus 12m, lurus 10m")
  const consolidated = [];
  let curr = {
    from: rawSegments[0].from,
    to: rawSegments[0].to,
    dist: rawSegments[0].dist,
    bearing: rawSegments[0].bearing,
    name: rawSegments[0].name,
    startSegmentIndex: 0,
    endSegmentIndex: 0
  };

  for (let i = 1; i < rawSegments.length; i++) {
    const next = rawSegments[i];
    let angleDiff = next.bearing - curr.bearing;
    if (angleDiff > 180) angleDiff -= 360;
    if (angleDiff < -180) angleDiff += 360;

    // Jika perubahan arah < 28 derajat, gabungkan menjadi satu tarikan koridor lurus
    if (Math.abs(angleDiff) <= 28) {
      curr.dist += next.dist;
      curr.to = next.to;
      curr.name = next.name;
      curr.bearing = next.bearing;
      curr.endSegmentIndex = i;
    } else {
      consolidated.push(curr);
      curr = {
        from: next.from,
        to: next.to,
        dist: next.dist,
        bearing: next.bearing,
        name: next.name,
        startSegmentIndex: i,
        endSegmentIndex: i
      };
    }
  }
  consolidated.push(curr);

  // 3. Susun instruksi bahasa manusia yang alami
  const instructions = [];
  for (let i = 0; i < consolidated.length; i++) {
    const seg = consolidated[i];
    let icon = "straight";
    let text = "";

    if (i === 0) {
      icon = "straight";
      if (seg.name) {
        text = `Mulai berjalan lurus ke arah ${seg.name} sejauh ${seg.dist} meter`;
      } else {
        text = `Mulai berjalan lurus sejauh ${seg.dist} meter`;
      }
    } else {
      const prevSeg = consolidated[i - 1];
      let turnAngle = seg.bearing - prevSeg.bearing;
      if (turnAngle > 180) turnAngle -= 360;
      if (turnAngle < -180) turnAngle += 360;

      const targetLandmark = seg.name ? ` menuju ${seg.name}` : "";

      if (Math.abs(turnAngle) < 28) {
        icon = "straight";
        text = `Lurus terus${targetLandmark} sejauh ${seg.dist} meter`;
      } else if (turnAngle >= 28 && turnAngle <= 135) {
        icon = "turn-right";
        text = `Belok kanan${targetLandmark}, lanjutkan jalan ${seg.dist} meter`;
      } else if (turnAngle <= -28 && turnAngle >= -135) {
        icon = "turn-left";
        text = `Belok kiri${targetLandmark}, lanjutkan jalan ${seg.dist} meter`;
      } else {
        icon = "u-turn";
        text = `Putar arah${targetLandmark}, lanjutkan ${seg.dist} meter`;
      }
    }

    instructions.push({
      stepIndex: i,
      text,
      distance: seg.dist,
      icon,
      point: seg.to,
      startSegmentIndex: seg.startSegmentIndex,
      endSegmentIndex: seg.endSegmentIndex
    });
  }

  // Langkah akhir (Tiba)
  instructions.push({
    stepIndex: instructions.length,
    text: `Tiba di tujuan: ${destinationName} (pintu berada di dekat Anda)`,
    distance: 0,
    icon: "arrival",
    point: path[path.length - 1],
    startSegmentIndex: rawSegments.length,
    endSegmentIndex: rawSegments.length
  });

  return instructions;
}

// ==========================================
// 5. STATE APLIKASI
// ==========================================
let activeCategory = "Semua";
let activeRole = "Murid Baru";
let selectedPlace = null;
let currentRoute = [];
let routeInstructions = [];
let currentStepIndex = 0;

let userPosition = { ...schoolEntrance };
let isGpsActive = false;
let watchId = null;
let isSimulating = false;
let simulationInterval = null;

let mapScale = 1;
let mapTranslate = { x: 0, y: 0 };
let isPanning = false;
let panStart = { x: 0, y: 0 };
let showAllRoomLabels = false;

let audioCtx = null;
let toastTimer = null;

// DOM Elements
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
const directionsDrawer = document.getElementById("directionsDrawer");
const directionsList = document.getElementById("directionsList");

// ==========================================
// 6. UI & NOTIFIKASI
// ==========================================
function showToast(message, duration = 3000) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), duration);
}

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
    osc1.frequency.setValueAtTime(523.25, now);
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.15);

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(783.99, now + 0.18);
    osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.35);

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
    console.warn("Audio chime prevented:", e);
  }
}

function getFilteredPlaces() {
  const query = searchInput.value.trim().toLocaleLowerCase("id");
  return places.filter(place => {
    const matchCategory = (activeCategory === "Semua") || (place.category === activeCategory);
    if (!matchCategory) return false;
    if (!query) return true;

    const nameMatch = place.name.toLocaleLowerCase("id").includes(query);
    const detailMatch = place.detail.toLocaleLowerCase("id").includes(query);
    const blockMatch = place.block.toLocaleLowerCase("id").includes(query);
    const aliasMatch = place.aliases && place.aliases.some(a => a.toLocaleLowerCase("id").includes(query));

    return nameMatch || detailMatch || blockMatch || aliasMatch;
  });
}

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
      if (target) selectPlace(target, true);
    });
  });
}

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

function updateUserMarkerPosition(x, y, heading = 0, accuracy = null) {
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

  // Visualisasi radius lingkaran akurasi GPS (Google Maps accuracy halo)
  const accCircle = document.getElementById("userAccuracyCircle");
  if (accCircle) {
    if (accuracy && accuracy > 0 && accuracy < 80) {
      const radiusXPercent = (accuracy / SCALE_X);
      const radiusYPercent = (accuracy / SCALE_Y);
      accCircle.style.display = "block";
      accCircle.style.left = `${x}%`;
      accCircle.style.top = `${y}%`;
      accCircle.style.width = `${Math.max(16, radiusXPercent * 2)}%`;
      accCircle.style.height = `${Math.max(16, radiusYPercent * 2)}%`;
    } else {
      accCircle.style.display = "none";
    }
  }

  if (selectedPlace && !isSimulating) {
    updateNavigationStatus();
  }
}

// Render panel petunjuk arah langkah demi langkah
function renderDirectionsList() {
  if (!directionsList) return;
  if (!routeInstructions.length) {
    directionsList.innerHTML = `<div class="directions-empty">Pilih ruangan tujuan untuk melihat panduan langkah arah.</div>`;
    return;
  }

  const iconSvgs = {
    "straight": '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "turn-right": '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 19v-7a3 3 0 0 1 3-3h7m-4-4 4 4-4 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "turn-left": '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M15 19v-7a3 3 0 0 0-3-3H5m4-4-4 4 4 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "u-turn": '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 19V9a6 6 0 0 0-12 0v10m4-4-4 4-4-4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "arrival": '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  directionsList.innerHTML = routeInstructions.map((step, idx) => {
    const isCurrent = (idx === currentStepIndex);
    const isDone = (idx < currentStepIndex);
    return `
      <div class="direction-step-item${isCurrent ? " current" : ""}${isDone ? " done" : ""}">
        <div class="step-num-icon">${iconSvgs[step.icon] || iconSvgs.straight}</div>
        <div class="step-details">
          <div class="step-text">${step.text}</div>
          ${step.distance > 0 ? `<div class="step-dist">${step.distance} meter</div>` : ""}
        </div>
      </div>
    `;
  }).join("");
}

function selectPlace(place, autoRoute = true) {
  selectedPlace = place;

  if (mapPin) {
    mapPin.hidden = false;
    mapPin.style.display = "flex";
    mapPin.style.left = `${place.x}%`;
    mapPin.style.top = `${place.y}%`;
    mapPin.dataset.floor = place.floorColor || "green";
    document.getElementById("pinLabel").textContent = place.name;
    document.getElementById("pinFloorBadge").textContent = place.floor;
  }

  document.getElementById("destinationTitle").textContent = place.name;
  document.getElementById("destinationMeta").textContent = `${place.block} · ${place.floor} · ${place.detail}`;
  document.getElementById("infoButton").style.display = "inline-flex";
  document.getElementById("toggleDirectionsBtn").style.display = "inline-flex";

  renderPlaceList();

  if (autoRoute) {
    generateAndDrawRoute();
  }
}

function generateAndDrawRoute() {
  if (!selectedPlace) return;

  currentRoute = findWalkingRoute(userPosition, selectedPlace);
  const pathD = pathToSvgD(currentRoute);

  routePath.setAttribute("d", pathD);
  routeOutline.setAttribute("d", pathD);

  const totalDistMeter = Math.round(calculateTotalDistance(currentRoute));
  const walkingMinutes = Math.max(1, Math.ceil(totalDistMeter / 75));

  document.getElementById("distanceValue").textContent = `${totalDistMeter} m`;
  document.getElementById("timeValue").textContent = `± ${walkingMinutes} mnt`;

  // Hasilkan instruksi langkah arah akurat
  routeInstructions = generateStepInstructions(currentRoute, selectedPlace.name);
  currentStepIndex = 0;
  renderDirectionsList();
  if (directionsDrawer) directionsDrawer.classList.add("open");

  const navControlWrap = document.getElementById("navControlWrap");
  if (navControlWrap) navControlWrap.style.display = "flex";

  const simBtn = document.getElementById("simWalkButton");
  if (simBtn) {
    simBtn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M13 4v16M6 11l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span>Simulasi Jalan</span>
    `;
  }

  showToast(`Rute ke ${selectedPlace.name}: ${totalDistMeter} m (${walkingMinutes} mnt jalan kaki).`);
}

function updateNavigationStatus() {
  if (!selectedPlace) return;

  const directDist = metricDistance(userPosition, selectedPlace);

  if (directDist <= 6.5) {
    onArrivalAtDestination();
    return;
  }

  // Hitung ulang rute koridor terpendek dari posisi user saat ini
  const activeRoute = findWalkingRoute(userPosition, selectedPlace);
  const remainingMeters = Math.max(0, Math.round(calculateTotalDistance(activeRoute)));

  document.getElementById("distanceValue").textContent = `${remainingMeters} m`;
  const remainingMinutes = Math.max(1, Math.ceil(remainingMeters / 75));
  document.getElementById("timeValue").textContent = `± ${remainingMinutes} mnt`;

  // Perbarui garis rute di denah
  const pathD = pathToSvgD(activeRoute);
  routePath.setAttribute("d", pathD);
  routeOutline.setAttribute("d", pathD);
}

function onArrivalAtDestination() {
  if (isSimulating) {
    stopWalkingSimulation();
  }

  playArrivalChime();
  currentStepIndex = routeInstructions.length - 1;
  renderDirectionsList();

  const arrivalModal = document.getElementById("arrivalModal");
  if (arrivalModal && selectedPlace) {
    document.getElementById("arrivalRoomName").textContent = selectedPlace.name;
    document.getElementById("arrivalRoomDetail").textContent = `${selectedPlace.block} (${selectedPlace.floor}) — ${selectedPlace.detail}`;
    document.getElementById("arrivalRoomDesc").textContent = selectedPlace.description;
    arrivalModal.classList.add("active");
  }

  showToast(`🎉 Anda telah sampai di ${selectedPlace.name}!`, 4500);
  document.getElementById("distanceValue").textContent = "0 m";
  document.getElementById("timeValue").textContent = "Sampai";
}

// ==========================================
// 7. SIMULASI JALAN BERTAHAP
// ==========================================
function startWalkingSimulation() {
  if (!selectedPlace || currentRoute.length < 2) {
    showToast("Pilih ruangan tujuan terlebih dahulu.");
    return;
  }

  isSimulating = true;
  const simBtn = document.getElementById("simWalkButton");
  if (simBtn) {
    simBtn.classList.add("active");
    simBtn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/></svg>
      <span>Jeda</span>
    `;
  }

  showToast("Simulasi navigasi berjalan aktif...");

  const waypointsToWalk = [...currentRoute];
  let currentSegment = 0;
  let segmentProgress = 0;
  const stepRate = 0.045;

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
      // Sinkronisasi langkah instruksi konsolidasi
      const activeIdx = routeInstructions.findIndex(inst => currentSegment <= inst.endSegmentIndex);
      if (activeIdx !== -1 && activeIdx !== currentStepIndex) {
        currentStepIndex = activeIdx;
        renderDirectionsList();
      }
    }

    const curX = pA.x + (pB.x - pA.x) * segmentProgress;
    const curY = pA.y + (pB.y - pA.y) * segmentProgress;

    const angleRad = Math.atan2(pB.y - pA.y, pB.x - pA.x);
    const angleDeg = (angleRad * 180 / Math.PI) + 90;

    userPosition.x = curX;
    userPosition.y = curY;
    if (userPin) {
      userPin.hidden = false;
      userPin.style.display = "flex";
      userPin.style.left = `${curX}%`;
      userPin.style.top = `${curY}%`;
      const headingEl = document.getElementById("userHeadingArrow");
      if (headingEl) {
        headingEl.style.transform = `rotate(${angleDeg}deg)`;
      }
    }

    // HITUNG SISA JARAK JALUR ASLI (SECARA REAL-TIME & SMOOTH)
    const remainingPath = [{ x: curX, y: curY }, ...waypointsToWalk.slice(currentSegment + 1)];
    const remainingMeter = Math.max(0, Math.round(calculateTotalDistance(remainingPath)));
    document.getElementById("distanceValue").textContent = `${remainingMeter} m`;
    const remainingMinutes = Math.max(1, Math.ceil(remainingMeter / 75));
    document.getElementById("timeValue").textContent = `± ${remainingMinutes} mnt`;

    const pathD = pathToSvgD(remainingPath);
    routePath.setAttribute("d", pathD);
    routeOutline.setAttribute("d", pathD);
  }, 60);
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
// 8. GPS GEOLOCATION NYATA (WGS84 PROJECTION)
// ==========================================
function gpsToMapCoords(lat, lng) {
  const latRatio = (GPS_BOUNDS.north - lat) / (GPS_BOUNDS.north - GPS_BOUNDS.south);
  const lngRatio = (lng - GPS_BOUNDS.west) / (GPS_BOUNDS.east - GPS_BOUNDS.west);

  const x = Math.max(5, Math.min(95, lngRatio * 100));
  const y = Math.max(5, Math.min(95, latRatio * 100));
  return { x, y };
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toggleGpsTracking() {
  if (!("geolocation" in navigator)) {
    showToast("Perangkat Anda tidak mendukung geolokasi.");
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
    const accCircle = document.getElementById("userAccuracyCircle");
    if (accCircle) accCircle.style.display = "none";
    showToast("Pelacakan GPS dihentikan.");
    return;
  }

  statusEl.textContent = "Mencari GPS...";
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

      const distToSchool = haversineDistance(lat, lng, SCHOOL_COORDINATES.lat, SCHOOL_COORDINATES.lng);

      if (distToSchool <= 500) {
        let projected = gpsToMapCoords(lat, lng);
        
        // Smart Corridor Snapping: jika dekat dengan jalan koridor, kunci ke jalan agar tidak menabrak dinding
        const nearestNodeId = findNearestNode(projected);
        if (nearestNodeId && waypoints[nearestNodeId]) {
          const nearestPt = waypoints[nearestNodeId];
          const distToCorridor = metricDistance(projected, nearestPt);
          if (distToCorridor <= 5.5) {
            projected = { x: nearestPt.x, y: nearestPt.y };
          }
        }

        const accuracyLabel = accuracy <= 10 ? `Sangat Akurat (±${accuracy}m)` : `±${accuracy}m`;
        statusEl.textContent = `GPS: ${accuracyLabel}`;
        
        // Gunakan heading dari sensor GPS jika tersedia
        const headingDeg = (position.coords.heading !== null && !isNaN(position.coords.heading))
          ? position.coords.heading
          : 0;

        updateUserMarkerPosition(projected.x, projected.y, headingDeg, accuracy);
      } else {
        const km = (distToSchool / 1000).toFixed(1);
        statusEl.textContent = `${km} km dari sekolah (Mode Gerbang)`;
        updateUserMarkerPosition(schoolEntrance.x, schoolEntrance.y, 0, null);
      }
    },
    error => {
      locateBtn.classList.remove("loading");
      locateBtn.classList.remove("active");
      isGpsActive = false;
      watchId = null;
      statusEl.textContent = "Izin lokasi diperlukan";
      showToast("Gagal membaca GPS. Aktifkan izin lokasi pada browser.");
    },
    { enableHighAccuracy: true, maximumAge: 0, timeout: 12000 }
  );

  // Pasang kompas sensor putar perangkat jika tersedia di smartphone
  if (window.DeviceOrientationEvent && !window._compassBound) {
    window._compassBound = true;
    window.addEventListener("deviceorientation", (event) => {
      if (isGpsActive && event.alpha !== null) {
        // alpha adalah derajat kompas magnetik 0 - 360
        const compassHeading = 360 - event.alpha;
        const headingEl = document.getElementById("userHeadingArrow");
        if (headingEl) {
          headingEl.style.transform = `rotate(${compassHeading.toFixed(0)}deg)`;
        }
      }
    }, true);
  }
}

// ==========================================
// 9. ZOOM & PAN ENGINE
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

  // Touch pan & pinch zoom
  let touchStartDist = 0;
  mapViewport.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      isPanning = true;
      panStart = { x: e.touches[0].clientX - mapTranslate.x, y: e.touches[0].clientY - mapTranslate.y };
    } else if (e.touches.length === 2) {
      isPanning = false;
      touchStartDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    }
  }, { passive: true });

  mapViewport.addEventListener("touchmove", (e) => {
    if (isPanning && e.touches.length === 1) {
      mapTranslate.x = e.touches[0].clientX - panStart.x;
      mapTranslate.y = e.touches[0].clientY - panStart.y;
      updateMapTransform();
    } else if (e.touches.length === 2) {
      const newDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
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

  mapViewport.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.12 : 0.12;
    zoomMap(delta);
  }, { passive: false });
}

// ==========================================
// 10. MODAL & DRAWER SETUP
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

  const navBtn = document.getElementById("modalNavButton");
  if (navBtn) {
    navBtn.onclick = () => {
      modal.classList.remove("active");
      selectPlace(place, true);
    };
  }

  modal.classList.add("active");
}

function setupModalsAndDrawer() {
  // Modal Ruangan
  const roomModal = document.getElementById("roomModal");
  document.getElementById("closeRoomModal")?.addEventListener("click", () => roomModal.classList.remove("active"));

  // Modal Tentang
  const aboutModal = document.getElementById("aboutModal");
  document.getElementById("helpButton")?.addEventListener("click", () => aboutModal.classList.add("active"));
  document.getElementById("closeAboutModal")?.addEventListener("click", () => aboutModal.classList.remove("active"));

  // Modal Tiba
  const arrivalModal = document.getElementById("arrivalModal");
  document.getElementById("closeArrivalModal")?.addEventListener("click", () => arrivalModal.classList.remove("active"));
  document.getElementById("searchAnotherBtn")?.addEventListener("click", () => {
    arrivalModal.classList.remove("active");
    searchInput.focus();
  });

  // Drawer Petunjuk Arah
  const toggleDirectionsBtn = document.getElementById("toggleDirectionsBtn");
  const closeDirectionsBtn = document.getElementById("closeDirectionsBtn");
  if (toggleDirectionsBtn && directionsDrawer) {
    toggleDirectionsBtn.addEventListener("click", () => {
      directionsDrawer.classList.toggle("open");
    });
  }
  if (closeDirectionsBtn && directionsDrawer) {
    closeDirectionsBtn.addEventListener("click", () => {
      directionsDrawer.classList.remove("open");
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.classList.remove("active");
    }
  });

  document.getElementById("infoButton")?.addEventListener("click", () => {
    if (selectedPlace) openRoomDetailModal(selectedPlace);
  });
}

function setupRoleSelector() {
  const roleSelect = document.getElementById("userRoleSelect");
  const roleAvatar = document.getElementById("userAvatarIcon");
  if (!roleSelect) return;

  const roleMeta = {
    "Murid Baru": "M",
    "Wali Murid": "W",
    "Tamu Sekolah": "T",
    "Guru & Staff": "G"
  };

  roleSelect.addEventListener("change", (e) => {
    activeRole = e.target.value;
    if (roleAvatar) roleAvatar.textContent = roleMeta[activeRole] || "U";
    showToast(`Profil pengguna: ${activeRole}`);
  });
}

// ==========================================
// 11. INISIALISASI UTAMA
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  renderPlaceList();
  renderAllRoomLabels();
  setupMapPanAndZoom();
  setupModalsAndDrawer();
  setupRoleSelector();

  updateUserMarkerPosition(schoolEntrance.x, schoolEntrance.y);

  // Kategori Chips
  document.querySelectorAll(".category-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".category-chip.active")?.classList.remove("active");
      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      renderPlaceList();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", renderPlaceList);
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

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      renderPlaceList();
      searchInput.focus();
    });
  }

  document.getElementById("locateButton")?.addEventListener("click", toggleGpsTracking);
  document.getElementById("zoomIn")?.addEventListener("click", () => zoomMap(0.15));
  document.getElementById("zoomOut")?.addEventListener("click", () => zoomMap(-0.15));
  document.getElementById("resetFit")?.addEventListener("click", resetMapFit);

  document.getElementById("toggleLabelsBtn")?.addEventListener("click", () => {
    showAllRoomLabels = !showAllRoomLabels;
    allLabelsWrap.classList.toggle("show", showAllRoomLabels);
    document.getElementById("toggleLabelsBtn").classList.toggle("active", showAllRoomLabels);
    showToast(showAllRoomLabels ? "Label semua ruangan ditampilkan" : "Label ruangan disembunyikan");
  });

  document.getElementById("directionButton")?.addEventListener("click", () => {
    if (!selectedPlace) {
      showToast("Silakan pilih ruangan tujuan pada daftar atau denah.");
      return;
    }
    generateAndDrawRoute();
  });

  document.getElementById("simWalkButton")?.addEventListener("click", () => {
    if (isSimulating) {
      stopWalkingSimulation();
    } else {
      startWalkingSimulation();
    }
  });

  document.getElementById("resetUserToGateBtn")?.addEventListener("click", () => {
    updateUserMarkerPosition(schoolEntrance.x, schoolEntrance.y, 0, null);
    showToast("Posisi Anda diatur ke Gerbang Utama.");
    if (selectedPlace) generateAndDrawRoute();
  });

  document.getElementById("shareButton")?.addEventListener("click", async () => {
    const title = "Voc1Maps — SMKN 1 Cilegon";
    const text = selectedPlace
      ? `Lokasi ${selectedPlace.name} di SMKN 1 Cilegon (Koordinat: ${SCHOOL_COORDINATES.dms}).`
      : `Peta navigasi SMKN 1 Cilegon (Koordinat: ${SCHOOL_COORDINATES.dms}).`;

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
      showToast("Silakan bagikan tautan browser ini.");
    }
  });
});
