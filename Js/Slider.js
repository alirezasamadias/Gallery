// START
// site loader
const bodyEl = document.querySelector('body');
const siteLoaderEl = document.querySelector('.site-loader');
// panel
const panelImg = document.querySelectorAll('.panel-image');
// modal
const modalImg = document.querySelector('.modal-img');
const btnPerv = document.querySelector('.btn-perv');
const btnNext = document.querySelector('.btn-next');

// site loader
document.onreadystatechange = ()=>{
    if (document.readyState !== "complete") {
        bodyEl.style.visibility = "hidden";
        siteLoaderEl.style.visibility = "visible";
    } else {
        siteLoaderEl.style.opacity = "0";
        siteLoaderEl.style.visibility = "hidden";
        bodyEl.style.visibility = "visible";
    }
};

// panel img face
const setPanelImg = ()=>{
    for (const image of panelImg){
        image.classList.remove('bold');
    }
    for (const image of panelImg){
        if (modalImg.getAttribute('src') === image.getAttribute('src')) {
            image.classList.add('bold');
        }
    }
};

// chang image
const changImg = (image,index)=>{
    modalImg.style.opacity = '0';
    setTimeout(()=>{
        modalImg.setAttribute('src',image.getAttribute('src'));
        modalImg.style.opacity = '1';

        // panel img face
        setPanelImg();

        localStorage.setItem('src',image.getAttribute('src'));
        localStorage.setItem('index',index);
    },300);
};

// local img
modalImg.setAttribute('src',localStorage.getItem('src'));
modalImg.setAttribute('alt',localStorage.getItem('alt'));
// panel img face
setPanelImg();
let indexLocal = localStorage.getItem('index');
btnPerv.addEventListener('click',()=>{
    --indexLocal;

    indexLocal < 0 ? indexLocal = panelImg.length - 1 : false;

    // chang image
    changImg(panelImg[indexLocal],indexLocal);
});
btnNext.addEventListener('click',()=>{
    ++indexLocal;

    indexLocal === panelImg.length ? indexLocal = 0 : false;

    // chang image
    changImg(panelImg[indexLocal],indexLocal);
});

// now img
panelImg.forEach((img,index)=>{
    img.addEventListener('click',()=>{
        let indexNow = index;
        // chang image
        changImg(img,index);

        // perv img
        const pervImg = ()=>{
            --indexNow;

            indexNow < 0 ? indexNow = panelImg.length - 1 : false;

            // chang image
            changImg(panelImg[indexNow],indexNow);
        };

        // next img
        const nextImg = ()=>{
            ++indexNow;

            indexNow === panelImg.length ? indexNow = 0 : false;

            // chang image
            changImg(panelImg[indexNow],indexNow);
        };

        // slider
        btnPerv.addEventListener('click',()=>{
            pervImg();
        });
        btnNext.addEventListener('click',()=>{
            nextImg();
        });

        // keyboard
        window.addEventListener('keyup',(e)=>{
            e.keyCode === 37 ? pervImg() : false;
            e.keyCode === 39 ? nextImg() : false;
        });
    });
});
// THE END