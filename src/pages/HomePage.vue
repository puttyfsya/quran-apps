<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateToReadQuran() {
  router.push('/surahPage');
}
</script>

<template>
  <div class="bg-teal-500 flex items-center justify-center min-h-screen text-white px-4">
    <div class="text-center space-y-6">
      <!-- Logo -->
      <img src="/public/logo.png" alt="Logo" class="w-32 md:w-48 mx-auto">

      <!-- Judul -->
      <div class="text-white text-3xl md:text-4xl font-extrabold leading-tight font-sans">
        Baca Quran
      </div>

      <!-- Tombol Navigasi -->
      <div class="space-y-4">
        <button 
          @click="navigateToReadQuran" 
          class="bg-teal-600 mt-3 py-2 px-4 rounded font-semibold flex items-center justify-center w-full md:w-64 mx-auto transition-transform hover:scale-105">
          <img class="w-6 h-6 mr-2" src="/public/open-book.png" alt="Read Quran">
          Read Quran
        </button>

        <button 
          @click="navigateToSetting" 
          class="bg-teal-600 mt-3 py-2 px-4 rounded font-semibold flex items-center justify-center w-full md:w-64 mx-auto transition-transform hover:scale-105">
          <img class="w-6 h-6 mr-2" src="/public/open-book.png" alt="Setting">
          Setting
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
</style>
