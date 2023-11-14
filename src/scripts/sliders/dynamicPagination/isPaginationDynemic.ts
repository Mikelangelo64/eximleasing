import Swiper from 'swiper';

const isShouldBeDynamic = (slider: Swiper) => {
  const paginationDom = slider.pagination.el;
  const paginationContainer = paginationDom.parentElement;

  if (!paginationContainer) {
    return false;
  }

  const sliderContainer = paginationContainer.parentElement;

  if (!sliderContainer) {
    return false;
  }

  const elementWidth = paginationDom.getBoundingClientRect().width;
  const containerWidth = sliderContainer.getBoundingClientRect().width;

  return elementWidth > containerWidth;
};

export default isShouldBeDynamic;
