import { DotLottie } from '@lottiefiles/dotlottie-web';

const canvas = document.getElementById('splash-lottie-canvas');

if (canvas instanceof HTMLCanvasElement) {
    const dotLottie = new DotLottie({
        autoplay: true,
        canvas: canvas,
        src: '/animations/BRSplashAnimDark.lottie',
    });

    dotLottie.addEventListener('complete', () => {
        const splash = document.getElementById('br_splash');
        if (!splash) return;

        setTimeout(() => {
            splash.classList.add('br_splash--hidden');
            
            setTimeout(() => {
                splash.remove();
            }, 600); // CSS transition duration
        }, 1000);
    });
}