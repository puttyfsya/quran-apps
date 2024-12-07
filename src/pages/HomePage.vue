<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const isDarkMode = ref(false);

// Navigasi ke halaman Surah
const navigateToReadQuran = () => {
  router.push('/surahPage');
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center px-6 overflow-hidden transition-colors duration-300 dark:bg-gray-900 dark:text-white">
    
    <!-- efek cahaya -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-teal-400 opacity-50 blur-[150px] rounded-full animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-300 opacity-40 blur-[100px] rounded-full animate-ping"></div>
    </div>

    <div class="text-center space-y-8">      
      <!-- Logo -->
      <img src="/public/logo.png" alt="Logo" class="w-32 md:w-48 mx-auto animate-bounce">

      <!-- Judul -->
      <h1 class="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
        Baca Quran
      </h1>

      <!-- Tombol Navigasi -->
      <div class="space-y-4">
        <button 
          @click="navigateToReadQuran" 
          class="bg-teal-700 hover:bg-teal-800 py-3 px-6 rounded-full text-lg font-bold shadow-lg flex items-center justify-center w-full md:w-64 mx-auto transition-transform hover:scale-105">
          <img class="w-6 h-6 mr-3" src="/public/open-book.png" alt="Read Quran">
          Read Quran
        </button>

        <button 
          @click="toggleDarkMode" 
          class="bg-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-800 transition-transform hover:scale-105">
            Dark Mode
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
