<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getSurahs } from '@/services/DaftarSurahApi';

const router = useRouter();
const surahs = ref([]);
const searchData = ref('');
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true');

const backgroundStyle = ref({
  backgroundImage: 'url("/public/bgr.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

// Fungsi Toggle Dark Mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value; // Mengubah status mode gelap
  localStorage.setItem('darkMode', isDarkMode.value); // Menyimpan status ke localStorage
  
  // Menambahkan atau menghapus kelas 'dark' pada elemen root
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};

// Menambahkan class 'dark' pada root saat halaman pertama kali dimuat
onMounted(() => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

const goBack = () => {
  router.push('/');
};

// Fungsi untuk mengambil data surah dari API
const fetchSurahs = async () => {
  try {
    const data = await getSurahs();
    surahs.value = data;
  } catch (error) {
    console.error('Error fetching surahs:', error);
  }
};

// Fungsi navigasi ke detail surah
const goToSurahDetail = (id) => {
  router.push(`/surah/${id}`);
};

// fungsi search
const search = () => {
  if (searchData.value.trim()) {
    surahs.value = surahs.value.filter(
      surah =>
        surah.name.transliteration.id.toLowerCase().includes(searchData.value.toLowerCase()) ||
        surah.name.translation.id.toLowerCase().includes(searchData.value.toLowerCase())
    );
  } else {
    fetchSurahs();
  }
};

// Mem-fetch data surah
onMounted(fetchSurahs);
</script>

<template>
  <div class="relative min-h-screen bg-cover bg-center" :style="backgroundStyle">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="container mx-auto px-4 py-3 relative z-10">
      <!-- Header -->
      <div :class="{'bg-teal-500': !isDarkMode, 'bg-teal-800': isDarkMode}" class="w-full py-4 mb-4 text-white rounded-xl">
        <div class="flex flex-wrap items-center justify-between px-4 gap-4 md:flex-nowrap">
          <!-- Tombol Back -->
          <button @click="goBack" class="text-white hover:text-gray-200">
            <font-awesome-icon :icon="['fas', 'arrow-left']" class="h-5 w-5" />
          </button>

          <!-- Search -->
          <div class="relative w-full md:w-64 max-w-full">
            <input 
              v-model="searchData" 
              @input="search"
              type="text" 
              placeholder="Search Surah..." 
              :class="{'text-white': isDarkMode, 'text-black': !isDarkMode}"
              class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition text-black"
            />
            <font-awesome-icon 
              :icon="['fas', 'magnifying-glass']" 
              class="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          <!-- Toggle Dark Mode -->
          <div class="flex items-center justify-center">
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                class="sr-only peer" 
                :checked="isDarkMode" 
                @change="toggleDarkMode" 
              />
              <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-teal-500 peer-focus:ring-2 peer-focus:ring-teal-300 dark:peer-focus:ring-gray-900 transition"></div>
              <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Daftar Surah -->
      <div 
        v-if="surahs.length > 0" 
        :class="{'bg-white': !isDarkMode, 'bg-gray-800': isDarkMode}" 
        class="rounded-2xl px-4 py-2 h-[80vh] w-full max-w-screen-lg lg:max-w-screen-xl overflow-y-auto shadow-md mx-auto"
      >
        <div
          v-for="surah in surahs"
          :key="surah.number"
          class="border-b py-4 cursor-pointer flex flex-col md:flex-row items-center justify-between gap-4"
          @click="goToSurahDetail(surah.number)"
        >
          <!-- Nomor Nama Surah -->
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center space-x-4">
              <div :class="{'bg-teal-500': !isDarkMode, 'bg-teal-700': isDarkMode}" class="text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                {{ surah.number }}
              </div>
              <h2 :class="{'text-teal-700': !isDarkMode, 'text-teal-300': isDarkMode}" class="text-xl font-bold truncate">
                {{ surah.name.transliteration.id }}
              </h2>
            </div>
            <!-- Teks Arab -->
            <h4 :class="{'text-teal-700': !isDarkMode, 'text-teal-300': isDarkMode}" class="font-semibold text-right">
              {{ surah.name.short }}
            </h4>
          </div>
        </div>
      </div>

      <!-- Pesan Loading -->
      <div v-else>
        <p class="text-center text-gray-600">Loading surahs...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-teal-500 {
  background-color: #2dd4bf;
}
.bg-slate-300 {
  background-color: #f1f5f9;
}

/* Warna latar belakang dan teks untuk mode gelap */
.dark {
  background-color: #1a202c; /* Warna latar gelap */
  color: white; /* Warna teks saat gelap */
}
</style>
