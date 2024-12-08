<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getSurahDetail } from '@/services/DaftarSurahApi';
import TafsirModal from './TafsirModal.vue';

const route = useRoute();
const router = useRouter();
const surah = ref(null);
const surahId = ref(parseInt(route.params.id));
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true');
//Popup modal tafsir tombol
const isTafsirModalOpen = ref(false);
const tafsirSurahName = ref(''); 
const tafsirContent = ref('');

const backgroundStyle = ref({
  backgroundImage: 'url("/public/bgr.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

// Toggle Dark Mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', isDarkMode.value);
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};

// Initialize Dark Mode
onMounted(() => {
  document.documentElement.classList.toggle('dark', isDarkMode.value);
});

// Fetch Surah Details
const fetchSurahDetail = async (id) => {
  try {
    const data = await getSurahDetail(id);
    if (data) {
      surah.value = data;
      tafsirSurahName.value = data.name.transliteration.id;
      tafsirContent.value = data.tafsir.id;
    }
  } catch (error) {
    console.error('Error fetching surah detail:', error);
  }
};

// Navigation
const totalSurahCount = 114;
const goBack = () => router.push('/surahPage');
const goToPreviousSurah = () => {
  if (surahId.value > 1) {
    navigateSurah(-1);
  }
};
const goToNextSurah = () => {
  if (surahId.value < totalSurahCount) {
    navigateSurah(1);
  }
};

const navigateSurah = (step) => {
  surahId.value += step;
  router.push(`/surah/${surahId.value}`);
};

// Watch for Route Changes
watch(() => route.params.id, (newId) => {
  surahId.value = parseInt(newId);
  fetchSurahDetail(surahId.value);
});

// Initial Fetch
onMounted(() => {
  fetchSurahDetail(surahId.value);
});

// Open Tafsir Modal
const openTafsirModal = () => {
  isTafsirModalOpen.value = true;
};
</script>

<template>
  <div class="relative min-h-screen bg-cover bg-center w-full mx-auto px-5 py-5" :style="backgroundStyle">
    <div v-if="surah" 
      :class="{'bg-gray-900 text-white': isDarkMode, 'bg-white text-black': !isDarkMode}" 
      class="rounded-2xl p-4 md:p-8 h-auto md:h-[90vh] overflow-y-auto shadow-md mb-6"
    >
      <!-- Header -->
      <div class="relative flex items-center justify-center mb-4">
        <button @click="goBack" class="absolute left-4 text-teal-500 hover:text-teal-300">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="h-6 w-6" />
        </button>

        <h2 class="text-xl md:text-2xl font-bold text-center">{{ surah.name.transliteration.id }}</h2>

        <div class="absolute right-4">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" :checked="isDarkMode" @change="toggleDarkMode" />
            <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-teal-500 dark:peer-focus:ring-gray-900 transition"></div>
            <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></div>
          </label>
        </div>
      </div>

      <p class="text-center text-sm md:text-base">{{ surah.name.translation.id }}</p>
      <p class="text-center text-sm md:text-base">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
      <p class="mt-4 text-sm md:text-base">Jumlah Ayat: <span class="font-semibold">{{ surah.numberOfVerses }}</span></p>
      <p class="text-sm md:text-base">Tempat Turun: <span class="font-semibold">{{ surah.revelation.id }}</span></p>

      <!-- Ayat List -->
      <div v-for="ayah in surah.verses" :key="ayah.number.inSurah" class="mt-4 p-4 border-b-2">
        <div class="text-lg md:text-xl font-bold text-right">{{ ayah.text.arab }}</div>
        <p class="text-left text-sm md:text-base">Artinya:</p>
        <div class="text-left text-sm md:text-base">{{ ayah.translation.id }}</div>
      </div>
    </div>

    <div v-else>
      <p class="text-center text-gray-600">Loading surah details...</p>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex flex-col md:flex-row justify-between mt-4 md:mt-6 mb-4 space-y-2 md:space-y-0">
      <button @click="goToPreviousSurah" 
      :disabled="surahId <= 1" 
      :class="{'opacity-50 cursor-not-allowed': surahId <= 1}" 
      class="bg-teal-600 py-2 px-6 rounded-full hover:bg-teal-700 transition-all">Previous</button>

        <!--Tafsite buytton-->
      <button @click="openTafsirModal" 
      class="bg-teal-600 py-2 px-6 rounded-full 
      hover:bg-teal-700 transition-all">Tafsir</button>

      <!--Next button-->
      <button @click="goToNextSurah" 
      :disabled="surahId >= totalSurahCount" 
      :class="{'opacity-50 cursor-not-allowed': surahId >= totalSurahCount}" 
      class="bg-teal-600 py-2 px-6 rounded-full hover:bg-teal-700 transition-all">Next</button>
    </div>

    <!-- Tafsir Modal -->
    <TafsirModal 
    :isOpen="isTafsirModalOpen" 
    :isDarkMode="isDarkMode" 
    :surahName="tafsirSurahName" 
    :tafsirContent="tafsirContent"
    @update:isOpen="isTafsirModalOpen = $event" />
  </div>
</template>

<style scoped>
.bg-teal-500 { background-color: #2dd4bf; }
.bg-teal-600 { background-color: #16a085; }
.bg-teal-700 { background-color: #1abc9c; }
.bg-teal-800 { background-color: #1f4f4f; }
.bg-gray-900 { background-color: #1a202c; }
.bg-white { background-color: white; }
.text-black { color: black; }
.text-white { color: white; }
</style>
