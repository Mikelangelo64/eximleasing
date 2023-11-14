import Swiper from 'swiper';

const makeDynamicPagionation = (slider: Swiper) => {
  const pagination = slider.pagination;
  const paginationDom = slider.pagination.el;

  const bulletCssRem = getComputedStyle(paginationDom).getPropertyValue(
    '--pagination-bullet-width'
  );
  const bulletWidth =
    bulletCssRem === ''
      ? 0
      : +bulletCssRem.slice(0, bulletCssRem.length - 3) * 16;

  const gapCssRem =
    getComputedStyle(paginationDom).getPropertyValue('--pagination-gap');
  const gap =
    gapCssRem === '' ? 0 : +gapCssRem.slice(0, gapCssRem.length - 3) * 16;

  // slider.on('slideChange', () => {
  const activeIndex = pagination.bullets.findIndex((bullet) =>
    bullet.classList.contains('swiper-pagination-bullet-active')
  );

  paginationDom.style.transform = `translate(${
    -1 * activeIndex * (bulletWidth + gap)
  }px, 0)`;

  // console.log(activeIndex, slider.pagination);
  // });
};

export default makeDynamicPagionation;
