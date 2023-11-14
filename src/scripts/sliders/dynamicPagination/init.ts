import debounce from '@/scripts/config/debounce';
import { IInitializedSlider } from '../init';
import isShouldBeDynamic from './isPaginationDynemic';
import makeDynamicPagionation from './makeDynamicPagination';

const initPaginationChanger = (infoProp: IInitializedSlider) => {
  const info = infoProp;
  const { slider } = info;

  if (!slider) {
    return;
  }

  if (slider.pagination.el === null) {
    return;
  }

  const paginationContainer = slider.pagination.el.parentElement;

  if (!paginationContainer) {
    return;
  }

  info.isDynamicPagination = isShouldBeDynamic(slider);
  const listenerHandler = () => {
    makeDynamicPagionation(slider);
  };

  if (info.isDynamicPagination) {
    paginationContainer.classList.add('dynamic');

    slider.on('slideChange', listenerHandler);
  } else {
    paginationContainer.classList.remove('dynamic');

    slider.off('slideChange', listenerHandler);
  }

  window.addEventListener(
    'resize',
    debounce({
      callback: () => {
        const isDynamic = isShouldBeDynamic(slider);

        if (info.isDynamicPagination === isDynamic) {
          return;
        }

        info.isDynamicPagination = isDynamic;

        if (isDynamic) {
          paginationContainer.classList.add('dynamic');
          listenerHandler();

          slider.on('slideChange', listenerHandler);
          return;
        }

        paginationContainer.classList.remove('dynamic');
        slider.pagination.el.style.transform = '';

        slider.off('slideChange', listenerHandler);
      }
    })
  );
};

export default initPaginationChanger;
