document.addEventListener('DOMContentLoaded', () => {
  SimpleJekyllSearch({
    searchInput: document.querySelector('.site-search-form__input'),
    resultsContainer: document.querySelector('.site-search-form__result'),
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
    let formResult = document.querySelector('.site-search-form__result');
    var callback = function(mutationsList, observer) {
      console.log(new Date())
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
