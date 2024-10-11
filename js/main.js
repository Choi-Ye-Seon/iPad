import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

// HEADER - 장바구니 드롭다운
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

// 함수 선언
function hideBasket() {
    basketEl.classList.remove('show');
}

function showBasket() {
    basketEl.classList.add('show');
}

// 함수 호출
basketStarterEl.addEventListener('click', function(event) {
    // 장바구니 아이콘만 클릭 시, show 클래스 추가/제거 (장바구니 아이콘이 포함되어있는 헤더 등 클릭할 때는 동작 x)
    event.stopPropagation();
    if (basketEl.classList.contains('show')) {
        hideBasket()
    } else {
        showBasket()
    }
});

// 장바구니 상세 div 영역 내를 클릭 시에는 닫히지 않도록.
basketEl.addEventListener('click', function(event) {
    event.stopPropagation();
});

window.addEventListener('click', function() {
    hideBasket()
});



// HEADER - 검색창
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu>li')];
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];

//함수선언
// html, head, menu, search-wrap
function showSearch() {
    // 1. header에 searching 클래스 추가
    headerEl.classList.add('searching');

    // 2. search-wrap 노출 시, html요소 부분에 fixed 클래스 추가
    stopScroll();

    // 3. search-wrap 노출 시, Menu 애니메이션 효과
    headerMenuEls.reverse().forEach(function(menu, index) {
        // 각각 li 요소에 0.4초씩 지연시간 설정
        menu.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    });

    // 4. search-wrap 노출 시, search-wrap 메뉴 애니메이션 효과
    searchDelayEls.forEach(function(search, index) {
        search.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    });

    // 5. search-wrap 노출 시, input 활성화(focus)
    setTimeout(function() {
        searchInputEl.focus()
    }, 600);
}

function hideSearch() {
    // 1. header에 searching 클래스 제거
    headerEl.classList.remove('searching');

    // 2. search-wrap 숨김 시, html요소 부분에 fixed 클래스 제거
    playScroll();

    // 3. search-wrap 숨김 시, 애니메이션 효과
    headerMenuEls.reverse().forEach(function(menu, index) {
        // 각각 li 요소에 0.4초씩 지연시간 설정
        menu.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    });

    // 4.search-wrap 숨김 시, search-wrap 메뉴 애니메이션 효과
    searchDelayEls.reverse().forEach(function(search, index) {
        search.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    });
    // 배열 정방향으로 돌려놓기
    searchDelayEls.reverse()

    // 5. search-wrap 숨김 시, input 검색어 입력 내용 초기화
    searchInputEl.value = '';
}

// 함수선언
// head에 fixed 클래스 추가/제거에 따른 search-wrap 스크롤 통제
function playScroll() {
    document.documentElement.classList.remove('fixed');
}

function stopScroll() {
    document.documentElement.classList.add('fixed');
}

// 함수 호출
// ① 검색아이콘 클릭 시, header에 searching 클래스 추가
searchStarterEl.addEventListener('click', showSearch);

// ② 검색닫기 아이콘 클릭 시, header에 searching 클래스 삭제
searchCloserEl.addEventListener('click', function(event) {
    // PC + 태블릿 모드와 모바일 모드의 검색 분리를 위해 이벤트 버블링 정지
    event.stopPropagation()
    hideSearch()
});

// ③ 검색 닫기 아이콘, search-wrap 외의 영역 클릭 시, header에 searching 클래스 삭제
searchShadowEl.addEventListener('click', hideSearch);




// HEADER (모바일) - 햄버거메뉴 토글, 스크롤 통제
const menuStarterEl = headerEl.querySelector('.menu-starter');

menuStarterEl.addEventListener('click', function() {
    if (headerEl.classList.contains('menuing')) {
        headerEl.classList.remove('menuing');
        searchInputEl.value = '';
        playScroll()
    } else {
        headerEl.classList.add('menuing');
        stopScroll()
    }
});

// HEADER (모바일) - 검색 input요소 애니메이션 + 취소 버튼 구현
const searchTextFieldEl = document.querySelector('header .textfield');
const searchCancelEl = document.querySelector('header .search-canceler');

searchTextFieldEl.addEventListener('click', function() {
    headerEl.classList.add('searching--mobile');
    searchInputEl.focus();
});

searchCancelEl.addEventListener('click', function() {
    headerEl.classList.remove('searching--mobile');
});


// 화면 크기 변경될 때, 검색 활성화 충돌 방지
window.addEventListener('resize', function() {
    //innerWidth : 화면 가로 넓이 정보를 갖고 있는 JS 속성
    if (this.window.innerWidth <= 740) {
        headerEl.classList.remove('searching');
    } else {
        headerEl.classList.remove('searching--mobile');
    }
});


// NAV (모바일) - 네비게이션 토글
const navEl = document.querySelector('nav');
const navMenuToggleEl = navEl.querySelector('.menu-toggler');
const navShadowEl = navEl.querySelector('.shadow');

// 함수선언
function showNavMenu() {
    navEl.classList.add('menuing');
}

function hideNavMenu() {
    navEl.classList.remove('menuing');
}

// 함수호출
navMenuToggleEl.addEventListener('click', function() {
    if (navEl.classList.contains('menuing')) {
        hideNavMenu()
    } else {
        showNavMenu()
    }
});

// nav 영역에서 이벤트 버블링 정지
navEl.addEventListener('click', function(event) {
    event.stopPropagation();
});

navShadowEl.addEventListener('click', hideNavMenu);

window.addEventListener('click', hideNavMenu);

//Info 요소 애니메이션 

const io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (!entry.isIntersecting) {
            return
        }
        entry.target.classList.add('show');
    });
});

const infoEls = document.querySelectorAll('.info');
infoEls.forEach(function(info) {
    io.observe(info);
});



// Video 재생, 일시정지
const videoEl = document.querySelector('.stage video');
const videoPlayEl = document.querySelector('.stage .controller--play');
const videoPauseEl = document.querySelector('.stage .controller--pause');

videoPlayEl.addEventListener('click', function() {
    videoEl.play();
    videoPlayEl.classList.add('hide');
    videoPauseEl.classList.remove('hide');

});
videoPauseEl.addEventListener('click', function() {
    videoEl.pause()
    videoPlayEl.classList.remove('hide');
    videoPauseEl.classList.add('hide');

});

// Compare  랜더링
const itemsEl = document.querySelector('section.compare .items');

ipads.forEach(function(ipad) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    let colorList = ''
    ipad.colors.forEach(function(color) {
        colorList += /*html */ `
        <li style="background-color:${color};"></li>
        `
    });




    itemEl.innerHTML = /*html*/ `
    <div class="thumbnail">
        <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
        ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">￦${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>

    `;

    itemsEl.append(itemEl);
});



// Footer / Navigations
const navigationsEl = document.querySelector('footer .navigations');

navigations.forEach(function(nav) {
    const mapEl = document.createElement('div');
    mapEl.classList.add('map');

    let mapList = '';
    nav.maps.forEach(function(map) {
        mapList += `<li><a href="${map.url}">${map.name}</a></li>`
    });



    mapEl.innerHTML = /*html*/ `
    
    <h3>
        <span class="text">${nav.title}</span>
        <span class="icon">+</span>
    </h3>
    <ul>
        ${mapList}
    </ul>
    
    `
    navigationsEl.append(mapEl);
});

// 모바일 Navigations 토글
const mapEls = document.querySelectorAll('footer .navigations .map');
mapEls.forEach(function(mapEl) {
    const h3El = mapEl.querySelector('h3');
    h3El.addEventListener('click', function() {
        mapEl.classList.toggle('active');
    });
});




//Footer 년도
const thisYearEl = document.querySelector('span.this-year');

thisYearEl.textContent = new Date().getFullYear();

// 아이콘 애니메이션 좌표 계산
let x = 0;
let y = 0;
let frames = '';

for (let i = 0; i < 60; i += 1) {
    // 실행문
    frames += `${(100 / 60 * i).toFixed(2) }% {background-position: ${x}px ${y}px;}<br>`

    if (x <= -500) {
        x = 0;
        y -= 100; //x값이 리셋될 때마다 y는 -100씩 떨어짐
        continue
    }
    x -= 100; //반복할 때마다 x는 -100씩 떨어짐
}

//document.body.innerHTML = frames