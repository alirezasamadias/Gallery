// START
// site loader
const bodyEl = document.querySelector('body');
const siteLoaderEl = document.querySelector('.site-loader');
// panel
const panelImg = document.querySelectorAll('.panel-image');
// modal
const modalImg = document.querySelector('.modal-image');
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
const panelImgFace = (image)=>{
    for (const images of panelImg) {
        images.classList.remove('bold');
    };
    setTimeout(()=>{
        image.classList.add('bold');
    },250);
};

// chang image
const changImage = (image)=>{
    modalImg.style.opacity = '0';
    setTimeout(()=>{
        modalImg.setAttribute('src',image.getAttribute('src'));
        modalImg.style.opacity = '1';
    },250);
};

panelImg.forEach((img,index)=>{
    img.addEventListener('click',()=>{
        // panel image face
        panelImgFace(img);

        // chang image
        changImage(img);

        // slider
        btnPerv.addEventListener('click',()=>{
            --index;

            index < 0 ? index = panelImg.length - 1 : false;

            // chang image
            changImage(panelImg[index]);

            // panel image face
            panelImgFace(panelImg[index]);
        });
        btnNext.addEventListener('click',()=>{
            ++index;

            index === panelImg.length ? index = 0 : false;

            // chang image
            changImage(panelImg[index]);

            // panel image face
            panelImgFace(panelImg[index]);
        });
    });
});
// THE END