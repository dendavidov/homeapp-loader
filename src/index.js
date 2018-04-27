import MainLoader from './main-loader';

import './main-loader.css';

// STATIC_ASSETS

const LOADER_AUTO_HIDE_TIMEOUT = 600000;

const mainLoader = new MainLoader();

mainLoader.show();

window.MAIN_LOADER = mainLoader;

setTimeout(() => mainLoader.hide, LOADER_AUTO_HIDE_TIMEOUT);