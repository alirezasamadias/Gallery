// START
// site loader
const bodyEl = document.querySelector('body');
const siteLoaderEl = document.querySelector('.site-loader');
// header slide
const headerEl = document.getElementById('header');
// header btn
const headerBtns = document.querySelectorAll('#header .btn:not(.btn_back)');
const btnAll = document.getElementById('all');
// images
const images = document.querySelectorAll('.box img');
// modal
const modalEl = document.querySelector('.modal');
const modalChilds = document.querySelectorAll('.modal :nth-child(n)');
const modalImage = document.querySelector('.modal-img');
// modal btn
const btnClose = document.querySelector('.btn_close');
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
            }
            scrollNow = scrollPrimary;
        }
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

// show modal
for (const img of images) {
    img.addEventListener('click',()=>{
        modalEl.classList.add('modal-show');
        modalImage.setAttribute('src',img.getAttribute('src'));
        modalImage.parentElement.setAttribute('href',img.getAttribute('src'));
    });
}

// hide modal
const hideModal = ()=>{
    modalEl.classList.remove('modal-show');
};
modalEl.addEventListener('click',()=>{
    hideModal();
});
btnClose.addEventListener('click',()=>{
    hideModal();
});
// keyboard
window.addEventListener('keyup',(e)=>{
    e.key === 'Escape' ? hideModal() : false;
});
// debug
for (const modalChild of modalChilds) {
    modalChild.addEventListener('click',(e)=>{
        e.stopPropagation();
    });
}

// change image
const changeImage = (array)=>{
    array.forEach((img,index)=>{
        img.addEventListener('click',()=>{
            // perv Img
            const pervImg = ()=>{
                --index;
                index < 0 ? index = array.length - 1 : false;
                showImage(array[index]);
            };

            // next img
            const nextImg = ()=>{
                ++index;
                index === array.length ? index = 0 : false;
                showImage(array[index]);
                console.log('object');
            };
            
            // btn perv/next
            btnPerv.addEventListener('click',()=>{
                pervImg();
            });
            btnNext.addEventListener('click',()=>{
                nextImg();
            });

            // keyboard
            window.addEventListener('keyup',(e)=>{
                e.key === 'ArrowRight' ? nextImg() : false;
                e.key === 'ArrowLeft' ? pervImg() : false;
            });
        });
    });
};

// All images next/perv
changeImage(images);

// header btn
for (const img of images) {
    // show img target
    for (const headerBtn of headerBtns) {
        headerBtn.addEventListener('click',()=>{
            img.parentElement.style.opacity = '0';

            setTimeout(()=>{
                if (img.getAttribute('src').includes(headerBtn.textContent)){
                    img.parentElement.style.display = 'block';
                } else {
                    img.parentElement.style.display = 'none';
                }
            },400);

            setTimeout(()=>{
                img.parentElement.style.opacity = '1';
            },500);
        });
    }
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
}

// show image`
const showImage = (img)=>{
    // chang image
    modalImage.style.opacity = '0';
    setTimeout(()=>{
        modalImage.setAttribute('src',img.getAttribute('src'));
        modalImage.parentElement.setAttribute('href',img.getAttribute('src'));
        modalImage.style.opacity = '1';
    },250);
};

// image target
// new array images
const imagesArray = [...images];
for (const headerBtn of headerBtns) {
    headerBtn.addEventListener('click',()=>{
        const imgTarget = imagesArray.filter((img)=> img.getAttribute('src').includes(headerBtn.textContent));

        // target image next/perv
        changeImage(imgTarget);
    });
}
// THE END