<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getSurahDetail } from '@/services/DaftarSurahApi';

const route = useRoute();
const router = useRouter();
const surah = ref(null);

const surahId = route.params.id;

// fetching detail data dari surah
const fetchSurahDetail = async () => {
  try {
    const data = await getSurahDetail(surahId);
    surah.value = data; 
  } catch (error) {
    console.error('Error fetching surah detail:', error);
  }
};

// Kembali ke halaman daftar surah
const goBack = () => {
  router.push('/surahPage');
};

// fetching data
onMounted(fetchSurahDetail);
</script>

<template>
    <div class="bg-slate-300 min-h-screen px-5 py-5">
      <div v-if="surah" class="bg-white rounded-2xl p-4 md:p-8">
        <!-- Header -->
        <div class="relative flex items-center justify-center mb-4">
          <button 
            @click="goBack" 
            class="absolute left-4 text-teal-500 hover:text-teal-300">
            <font-awesome-icon :icon="['fas', 'arrow-left']" class="h-6 w-6" />
          </button>
  
          <h2 class="text-xl md:text-2xl font-bold text-center">
            {{ surah.name.transliteration.id }}
          </h2>
        </div>
  
        <p class="text-gray-500 text-center text-sm md:text-base">
          {{ surah.name.translation.id }}
        </p>
        <p class="text-center text-sm md:text-base"> بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم </p>
  
        <p class="mt-4 text-gray-600 text-sm md:text-base">
          Jumlah Ayat: <span class="font-semibold">{{ surah.numberOfVerses }}</span>
        </p>
        <p class="text-gray-600 text-sm md:text-base">
          Tempat Turun: <span class="font-semibold">{{ surah.revelation.id }}</span>
        </p>
  
        <!-- Ayat List -->
        <div 
          v-for="ayah in surah.verses" 
          :key="ayah.number.inSurah" 
          class="mt-4 p-4 border-b-2">
          <div class="text-lg md:text-xl font-bold text-right text-gray-800 leading-relaxed">
            {{ ayah.text.arab }}
          </div>
          <div class="text-black text-left text-sm md:text-base"> Artinya:</div>
          <div class="text-gray-700 text-left text-sm md:text-base">
            {{ ayah.translation.id }}
          </div>
        </div>
      </div>
  
      <div v-else>
        <p class="text-center text-gray-600">Loading surah details...</p>
      </div>
    </div>
  </template>
  

<style scoped>
.bg-slate-300 {
  background-color: #f1f5f9;
}
.bg-teal-500 {
  background-color: #2dd4bf;
}
</style>
