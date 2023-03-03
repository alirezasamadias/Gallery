// START
// site loader
const bodyEl = document.querySelector('body');
const siteLoaderEl = document.querySelector('.site-loader');
// header slide
const headerEl = document.getElementById('header');
// header btn
const headerBtns = document.querySelectorAll('#header .btn');
const btnAll = document.getElementById('all');
// images
const images = document.querySelectorAll('.box img');
// modal
const modalEl = document.querySelector('.modal');
const modalImage = document.querySelector('.modal-image');
// modal btn
const modalBtns = document.querySelectorAll('.modal-btn');
const btnPerv = document.querySelector('.btn_perv');
const btnNext = document.querySelector('.btn_next');

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

// header slide
const headerSlide = ()=>{
    let scrollNow = window.scrollY;
    window.addEventListener('scroll',()=>{
        const scrollPrimary = window.scrollY;
        if (headerEl.offsetHeight < scrollPrimary){
            if (scrollPrimary > scrollNow){
                headerEl.style.transform = 'translateY(-100%)';
            } else {
                headerEl.style.transform = 'translateY(0%)';
            };
            scrollNow = scrollPrimary;
        };
    });
};
const headerFix = ()=>{
    window.addEventListener('scroll',()=>{
        headerEl.style.transform = 'translateY(0%)';
    });
};
// by responsive
if (window.innerWidth <= 768){
    headerSlide();
} else {
    headerFix();
}
// by resize
window.addEventListener('resize',()=>{
    if (window.innerWidth <= 768){
        headerSlide();
    } else {
        headerFix();
    }
});

// header btn
images.forEach((img)=>{
    // show img target
    for (const headerBtn of headerBtns) {
        headerBtn.addEventListener('click',()=>{
            img.parentElement.style.opacity = '0';

            setTimeout(()=>{
                if (img.getAttribute('src').includes(headerBtn.textContent)){
                    img.parentElement.style.display = 'block';
                } else {
                    img.parentElement.style.display = 'none';
                };
            },400);

            setTimeout(()=>{
                img.parentElement.style.opacity = '1';
            },500);
        });
    };
    // show all image
    btnAll.addEventListener('click',()=>{
        setTimeout(()=>{
            img.parentElement.style.display = 'block';
        },400);
        
        setTimeout(()=>{
            img.parentElement.style.opacity = '1';
        },500);

        // debug
        changeImage(images);
    });
});

// show image
const showImage = (img)=>{
    // chang image
    modalImage.style.opacity = '0';
    setTimeout(()=>{
        modalImage.setAttribute('src',img.getAttribute('src'));
        modalImage.parentElement.setAttribute('href',img.getAttribute('src'));
        modalImage.style.opacity = '1';
    },250);
};

// change image
const changeImage = (array) =>{
    array.forEach((img,index)=>{
        img.addEventListener('click',()=>{
            // next
            btnNext.addEventListener('click',(e)=>{
                e.stopPropagation();
                ++index;
                index === array.length ? index = 0 : false;
                showImage(array[index]);
            });
                    
            // perv
            btnPerv.addEventListener('click',(e)=>{
                e.stopPropagation();
                --index;
                index < 0 ? index = array.length - 1 : false;
                showImage(array[index]);
            });
        });
    });
};

// show modal
images.forEach((img)=>{
    img.addEventListener('click',()=>{
        modalEl.classList.add('modal-show');
        showImage(img);
    });
});
// hide modal
modalEl.addEventListener('click',()=>{
    modalEl.classList.remove('modal-show');
});
// debug
modalImage.addEventListener('click',(e)=>{
    e.stopPropagation();
});

// All images next/perv
changeImage(images);

// image target
for (const headerBtn of headerBtns) {
    headerBtn.addEventListener('click',()=>{
        // new array images
        const imagesArray = [...images];
    
        const imgTarget = imagesArray.filter(img => img.getAttribute('src').includes(headerBtn.textContent));

        // target image next/perv
        changeImage(imgTarget);
    });
};
// THE END