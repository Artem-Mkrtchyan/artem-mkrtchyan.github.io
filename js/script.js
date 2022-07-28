document.addEventListener('DOMContentLoaded', function () {
  // Активация бургера
  const iconMenu = document.querySelector ('.burger');
  let menuBody = document.querySelector('.main-menu');
  if (iconMenu) {
    let body = document.querySelector ('body');
    iconMenu.addEventListener ('click', function(open){
      iconMenu.classList.toggle ('burger-active'),
      menuBody.classList.toggle ('main-menu--active')
      // body.classList.toggle ('body-lock')
    })
  }

  //Прокрутка к ссылке
  const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
  if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
      menuLink.addEventListener('click', onMenuLinkClick);
    });
    function onMenuLinkClick (e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto) ){
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

        if ( iconMenu.classList.contains('burger-active') ) {
          iconMenu.classList.remove ('burger-active'),
          menuBody.classList.remove ('main-menu--active')
        }

        window.scrollTo ({
          top: gotoBlockValue,
          behavior: 'smooth'
        });
        e.preventDefault();
      }
    }
  }



    // search
  const searchBtn = document.querySelector('.search-header__btn');

  if(searchBtn) {
    const searchInput = document.querySelector('.search-header__input');
    searchBtn.addEventListener('click',function(event) {
      searchInput.classList.toggle('search-header__input--active')
    })
  }

  //Активация плеера
   const iconPlay = document.querySelector ('.bot-header__player-mobi');
  if (iconPlay) {
    iconPlay.addEventListener ('click', function (){
    let playerHeader = document.getElementById('player-header');
    playerHeader.classList.toggle ('top-header__wrapper-players--active')
    console.log(playerHeader)
    })
  }

  //Активация тригера
  const triggerBtn = document.querySelector ('.trigger__btn');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', function(act) {
      let playerHeader = document.getElementById('trigger-player');
      playerHeader.classList.toggle ('bot-header__wrapper-players--active'),
      triggerBtn.classList.toggle ('trigger__btn--active')
    })
  }


  // Load more podcasts
  const loadMore = document.getElementById ('load-more');
  if (loadMore) {
    let currectItem = 8;
    if ( document.documentElement.clientWidth <= 522 ) {
      currectItem = 4;
    }

    loadMore.addEventListener ('click', function(open) {
      const listElement = document.querySelectorAll ('.podcasts__item');
      for (let i = currectItem; i < currectItem + 4; i++) {
        if (listElement[i]) {
          listElement[i].style.display = 'flex';
        }
      }
      currectItem += 4

      if (currectItem >= listElement.length) {
        event.target.style.display = 'none';
      }
    })
  }


  // Инитиализация select
  const element = document.querySelector('#Autor');
  const choices = new Choices(element, {
    allowHTML: true,
    searchEnabled: false
  })


  //Аккордион
  document.querySelectorAll('.accordion-guests__trigger').forEach((item) =>
  item.addEventListener('click', ()=>{
    const parent = item.parentNode;

    if (parent.classList.contains('accordion-guests__item--active')) {
      parent.classList.remove('accordion-guests__item--active');
    }
    else {
      document
      .querySelectorAll('.accordion-guests__item')
      .forEach((child) => child.classList.remove('accordion-guests__item--active'))

      parent.classList.add('accordion-guests__item--active')
    }
  })
  )

  // Табы в аккордионе
  document.querySelectorAll('.accordion-guests__link').forEach((item) =>
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const id = e.target.getAttribute('href').replace('#','');
      console.log(id);

      document.querySelector('.cards-guests').classList.add('cards-guests--active');

      document.querySelectorAll('.accordion-guests__link').forEach(
        (child) => child.classList.remove('accordion-guests__link--active')
        );

      document.querySelectorAll('.cards-guests__item').forEach(
        (child) => child.classList.remove('cards-guests__item--active')
        );

      item.classList.add('accordion-guests__link--active');
      document.getElementById(id).classList.add('cards-guests__item--active');

    })
  );

  //Инициализация Swiper.js
  const swiper = new Swiper('.filter-playlist__swiper', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 'auto',
    // grabCursor: true,
    spaceBetween: 15,
  });

  document.querySelectorAll('.swiper-filter__slide').forEach(function(filterBtn){
    filterBtn.addEventListener('click', function(event){
      filterBtn.classList.toggle('swiper-filter__slide--active');
    })
  })



  //Валидация формы

  new JustValidate('.form-question', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 20,


      },
      email: {
        required: true,
        email: true,
      }
    },


    messages: {
      name: {
        required: 'Поле обязательно для заполнения',
        minLength: 'Имя должно содержать от 2 до 20 символов'
      },
      email: {
        required: 'Поле обязательно для заполнения',
        email: 'Не правильно введен адрес электронной почты'
      }
    },
  });

})
