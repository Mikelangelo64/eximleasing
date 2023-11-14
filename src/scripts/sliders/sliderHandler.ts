import Swiper from 'swiper';
import {
  Navigation,
  Thumbs,
  Pagination,
  EffectFade,
  Autoplay,
  Manipulation
} from 'swiper/modules';
import { PaginationOptions } from 'swiper/types/modules/pagination';
import { SwiperOptions } from 'swiper/types/swiper-options';

interface IMakeSlider {
  container: HTMLElement | null;
  className: string;
  isThumb?: boolean;
  thumb?: Swiper | undefined;
  config?: SwiperOptions | undefined;
  paginationType?: PaginationOptions['type'];
  renderBullets?: (index: number, className: string) => string;
}

const makeSlider = ({
  container,
  className,
  isThumb = false,
  thumb = undefined,
  config,
  paginationType = 'bullets',
  renderBullets
}: IMakeSlider) => {
  if (!container || !className) {
    return undefined;
  }

  const slider =
    (container.querySelector(
      `.${className}-slider${isThumb ? '-thumb' : ''}.swiper`
    ) as HTMLElement) || null;

  if (!slider) {
    return undefined;
  }

  const pagination: HTMLElement | null = container.querySelector(
    `.${className}-slider-pagination`
  );

  const arrowPrev = container.querySelector(
    `.${className}-slider${
      isThumb ? '-thumb' : ''
    }-controls .${className}-slider-prev`
  ) as HTMLElement | null;

  const arrowNext = container.querySelector(
    `.${className}-slider${
      isThumb ? '-thumb' : ''
    }-controls .${className}-slider-next`
  ) as HTMLElement | null;

  const sliderInit = new Swiper(slider, {
    modules: [
      Navigation,
      Thumbs,
      Pagination,
      EffectFade,
      Autoplay,
      Manipulation
    ],
    thumbs: {
      swiper: thumb
    },
    pagination: {
      el: pagination,
      clickable: true,
      type: paginationType,
      renderBullet: renderBullets
    },
    navigation: {
      nextEl: arrowNext,
      prevEl: arrowPrev
    },

    slidesPerView: 1,
    spaceBetween: 30,

    ...config
  });

  return sliderInit;
};

export default makeSlider;
