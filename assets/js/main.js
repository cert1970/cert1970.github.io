document.addEventListener('DOMContentLoaded', () => {
  // Top App Bar
  mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar'));

  let searchForm = document.querySelector('.page-search-form');
  document.querySelector('.mdc-top-app-bar__action-item[aria-label="Search"]').addEventListener('click', () => {
    searchForm.classList.add('page-search-form--open');
  })
  document.querySelector('.page-search-form__close').addEventListener('click', () => {
    searchForm.classList.remove('page-search-form--open');
  });

  // Tab
  [].forEach.call(document.querySelectorAll('.mdc-tab'), (tab) => {
    mdc.tab.MDCTab.attachTo(tab);
  });

  // Card
  [].forEach.call(document.querySelectorAll('.mdc-card__primary-action'), (card) => {
    mdc.ripple.MDCRipple.attachTo(card);
  });

  // Chips
  [].forEach.call(document.querySelectorAll('.mdc-chip-set'), (chip) => {
    mdc.chips.MDCChipSet.attachTo(chip);
  });

  // Fab
  const fabElement = document.querySelector('.post-fab');
  const fabIconElement = document.querySelector('.post-fab__icon');
  if (fabElement) {
    const fab = mdc.ripple.MDCRipple.attachTo(fabElement);
    let lastPosition = document.body.scrollHeight;
    fabElement.addEventListener('click', () => {
      if (window.scrollY != 0) {
        lastPosition = window.scrollY;
        window.scroll({ top: 0, behavior: 'smooth' });
      } else {
        window.scroll({ top: lastPosition, behavior: 'smooth' });
      }
    });
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        fabIconElement.classList.add('post-fab--rotated');
      } else {
        fabIconElement.classList.remove('post-fab--rotated');
      }
    });
  }

  // Search
  SimpleJekyllSearch({
    searchInput: document.querySelector('.page-search-form__input'),
    resultsContainer: document.querySelector('.page-search-form__result'),
    json: '/search.json',
    searchResultTemplate: `
      <li class="mdc-list-item">
        <a href={url}>
          <span class="mdc-list-item__text">{title}</span>
          <span class="mdc-list-item__meta">{date}</span>
        </a>
      </li>`,
    templateMiddleware: function(prop, value, template) {
      // console.log(prop, value, template);
      if (prop === 'date') {
        // return new Date(value).toLocaleDateString();
        return value.split('+')[0].replace('T', ' ').slice(0, -3);
      }
    },
    noResultsText: `
      <li class="mdc-list-item js-no-search-result">
        <span class="mdc-list-item__text">No results found</span>
      </li>`,
    limit: 10,
    fuzzy: false
  });

  (function() {
    let formResult = document.querySelector('.page-search-form__result');
    var callback = function(mutationsList, observer) {
      for(var mutation of mutationsList) {
        if (formResult.querySelector('.js-no-search-result')) {
          formResult.classList.add('mdc-list--non-interactive');
        } else {
          formResult.classList.remove('mdc-list--non-interactive');
        }
      }
    };
    let observer = new MutationObserver(callback);
    observer.observe(formResult, { childList: true });
  }());
});
