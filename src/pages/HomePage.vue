  <script setup>
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';

  // Mengambil status mode gelap dari localStorage jika ada
  const isDarkMode = ref(localStorage.getItem('darkMode') === 'true'); 

  const router = useRouter();

  // Navigasi ke halaman Surah
  const navigateToReadQuran = () => {
    router.push('/surahPage');
  };

  // Fungsi Toggle Dark Mode
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value; // Mengubah status mode gelap
    localStorage.setItem('darkMode', isDarkMode.value); // Menyimpan status ke localStorage

    // Menambahkan atau menghapus kelas 'dark' pada elemen root
    document.documentElement.classList.toggle('dark', isDarkMode.value);
  };

  // Menambahkan class 'dark' pada root saat halaman pertama kali dimuat jika mode gelap aktif
  onMounted(() => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
  </script>

<template>
  <div 
    class="relative min-h-screen flex items-center justify-center px-6 overflow-hidden transition-colors duration-300"
    :class="isDarkMode ? 'dark bg-gray-900 text-white' : ''"
  >

    <!-- efek cahya muncul di mode terang -->
    <div v-if="!isDarkMode" class="absolute inset-0 -z-10">
      <div class="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-teal-400 opacity-50 blur-[150px] rounded-full animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-300 opacity-40 blur-[100px] rounded-full animate-ping"></div>
    </div>

    <!-- Konten Utama -->
    <div class="text-center space-y-8">
      <!-- Logo -->
      <img src="/public/logo.png" alt="Logo" class="w-32 md:w-48 mx-auto animate-bounce" />

      <!-- Judul -->
      <h1 class="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-teal-800 dark:text-teal-400">
        Baca Quran
      </h1>

      <!-- Tombol Navigasi dan Toggle -->
      <div class="space-y-6">
        <!-- Tombol Read Quran -->
        <button 
          @click="navigateToReadQuran" 
          class="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-full text-lg font-bold shadow-lg flex items-center justify-center w-full md:w-64 mx-auto transition-transform hover:scale-105"
        >
          <img class="w-6 h-6 mr-3 filter brightness-0 invert" src="/public/open-book.png" alt="Read Quran" />
          Read Quran
        </button>

        <!-- Toggle Dark Mode -->
        <div class="flex items-center justify-center">
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              class="sr-only peer" 
              :checked="isDarkMode" 
              @change="toggleDarkMode" 
            />
            <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-teal-500 peer-focus:ring-2 peer-focus:ring-teal-300 dark:peer-focus:ring-gray-900transition"></div>
            <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Warna latar belakang dan teks untuk mode gelap */
.dark {
  background-color: #1a202c; /* Warna latar gelap */
  color: white; /* Warna teks saat gelap */
}
</style>
