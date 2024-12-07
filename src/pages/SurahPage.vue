<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getSurahs } from '@/services/DaftarSurahApi';

const router = useRouter();
const surahs = ref([]);
const searchData = ref('');

// kembali ke halaman utama
const goBack = () => {
  router.push('/'); 
};

// get data surah dari API
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

// Fungsi search
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

// fetching data
onMounted(fetchSurahs);
</script>


<template>
  <div class="bg-slate-300 min-h-screen w-full px-4 py-4">
    <!-- Header -->
    <div class="bg-teal-500 w-full py-4 mb-4 text-white rounded">
      <div class="flex flex-wrap items-center justify-between px-4 gap-4">
        <!-- Tombol Back -->
        <button @click="goBack" class="text-white hover:text-gray-200">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="h-5 w-5" />
        </button>

        <!-- search -->
        <div class="relative w-full md:w-64 max-w-full">
          <input 
            v-model="searchData" 
            @input="search"
            type="text" 
            placeholder="Search Surah..." 
            class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition text-black"
          />
          <font-awesome-icon 
            :icon="['fas', 'magnifying-glass']" 
            class="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
    </div>

    <!-- Daftar Surah -->
    <div v-if="surahs.length > 0" class="bg-white rounded-2xl px-4 py-2">
      <div
        v-for="surah in surahs"
        :key="surah.number"
        class="border-b py-4 cursor-pointer flex flex-col md:flex-row items-center justify-between gap-4"
        @click="goToSurahDetail(surah.number)">
        
        <!-- nomor nama surah -->
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center space-x-4">
              <div class="bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                {{ surah.number }}
              </div>
              <h2 class="text-xl font-bold text-teal-700 truncate">{{ surah.name.transliteration.id }}</h2>
          </div>
          <!-- arab text -->
          <h4 class="text-teal-700 font-semibold text-right">
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
</template>



<style scoped>
.bg-slate-300 {
  background-color: #f1f5f9;
}
.bg-teal-500 {
  background-color: #2dd4bf;
}
</style>
