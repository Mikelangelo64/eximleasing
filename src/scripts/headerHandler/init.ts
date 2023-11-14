import debounce from '../config/debounce';

const findTopHeight = (headerTop: HTMLElement) => {
  const height = headerTop.getBoundingClientRect().height;

  headerTop.style.setProperty('--header-top-height', `${height}px`);

  return height;
};

const findTotalHeight = (header: HTMLElement) => {
  const height = header.getBoundingClientRect().height;

  document.body.style.setProperty('--header-height', `${height}px`);

  return height;
};

const headerHandler = () => {
  const header = document.querySelector<HTMLElement>('.header__container');
  // const headerHeight = header ? header.offsetHeight : 0;
  let isScrolled = false;
  let heightTop = 20;

  if (!header) {
    return;
  }

  findTotalHeight(header);
  const headerTop = header.querySelector<HTMLElement>('.header-top');

  if (headerTop) {
    heightTop = findTopHeight(headerTop);

    window.addEventListener(
      'resize',
      debounce({
        callback: () => {
          findTotalHeight(header);
          heightTop = findTopHeight(headerTop);
        }
      })
    );
  }

  if (window.scrollY > heightTop) {
    header.classList.add('scrolled');
    isScrolled = true;
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > heightTop && !isScrolled) {
      header.classList.add('scrolled');
      isScrolled = true;
      return;
    }

    if (window.scrollY <= heightTop && isScrolled) {
      header.classList.remove('scrolled');
      isScrolled = false;
    }
  });
};

export default headerHandler;
