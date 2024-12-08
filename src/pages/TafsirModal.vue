<script setup>
defineProps({
  isOpen: Boolean,
  isDarkMode: Boolean,
  tafsirContent: String,
  surahName: String,
});
const emit = defineEmits(['update:isOpen']);
const closeModal = () => {
  emit('update:isOpen', false);
};
</script>

<template>
  <div v-if="isOpen" @click.self="closeModal" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
    <div :class="{'bg-gray-900 text-white': isDarkMode, 'bg-white text-black': !isDarkMode}" class="p-8 rounded-xl shadow-xl w-full max-w-3xl">
      <h3 class="text-2xl text-center font-bold mb-4">Tafsir {{ surahName }}</h3> 
      <p class="text-lg mb-6 whitespace-pre-line">{{ tafsirContent }}</p> 
      <button @click="closeModal" class="bg-teal-600 py-2 px-6 rounded-full hover:bg-teal-700 transition-all">
        Close
      </button>
    </div>
  </div>
</template>
