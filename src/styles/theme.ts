import '@polymer/polymer/polymer-legacy.js';
import '@polymer/paper-styles/color';

const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
  <style>
    html {
    
      --paper-font-common-base: {
        font-family: "Montserrat", sans-serif;
      }
      
      /*
       * Primary and accent colors.
       */
      --primary-color: var(--google-blue-500);
      --light-primary-color: var(--google-blue-100);
      --dark-primary-color: var(--google-blue-700);
      --accent-color: var(--google-blue-a200);
      --light-accent-color: var(--google-blue-a100);
      --dark-accent-color: var(--google-blue-a400);
      
      /*
       * Text colors.
       */
      --primary-text-color: var(--light-theme-text-color);
      --primary-background-color: var(--light-theme-background-color);
      --secondary-text-color: var(--light-theme-secondary-color);
      --disabled-text-color: var(--light-theme-disabled-color);
      --divider-color: var(--light-theme-divider-color);
      --error-color: var(--paper-deep-orange-a700);
      
      /*
       * Component specific styles.
       */
      --paper-tabs-selection-bar-color: var(--primary-color);
      --paper-tab-ink: var(--primary-color);
      
      color: var(--secondary-text-color);
    }
  </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
