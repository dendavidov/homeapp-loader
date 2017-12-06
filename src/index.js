import MainLoader from './main-loader';

import './main-loader.css';

// STATIC_ASSETS

const mainLoader = new MainLoader();

mainLoader.show();

window.MAIN_LOADER = mainLoader;
