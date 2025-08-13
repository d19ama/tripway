import { createApp } from 'vue';
import App from '@/App.vue';
import { router } from '@/app/router';

import '@/app/assets/styles/index.scss';

const app = createApp(App);

app.use(router);
app.mount('#app');
