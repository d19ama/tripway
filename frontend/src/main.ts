import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from '@/App.vue';
import { router } from '@/app/router';

import '@/app/assets/styles/index.scss';

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);

app.mount('#app');
