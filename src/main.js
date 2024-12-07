import './assets/style.css';
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Import pages
import HomePage from './pages/HomePage.vue'; 
import SurahPage from './pages/SurahPage.vue';
import DetilSurahPage from './pages/DetilSurahPage.vue';

// Konfigurasi rute 
const routes = [
  { path: '/', component: HomePage },
  { path: '/surahPage', component: SurahPage },
  { path: '/surah/:id', component: DetilSurahPage },  // Rute dengan parameter id
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faMagnifyingGlass, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faMagnifyingGlass, faArrowLeft);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router) 
  .mount('#app');
