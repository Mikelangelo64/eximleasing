import { ScrollBar } from 'vevet';
import vevet from './config/vevet';

const typographyTableScroll = () => {
  const containerArray = document.querySelectorAll<HTMLElement>(
    '.typography-article'
  );

  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((container) => {
    const elementArray =
      container.querySelectorAll<HTMLElement>('.typography table');

    if (elementArray.length === 0) {
      return;
    }

    elementArray.forEach((element) => {
      const scrollbar = new ScrollBar({
        container: element
      });

      // console.log(scrollbar);
      return scrollbar;
    });
  });
};

const scrollBarInit = () => {
  let scrollBar;
  if (!vevet.isMobile) {
    scrollBar = new ScrollBar({ container: window });

    typographyTableScroll();
  }

  return scrollBar;
};

export default scrollBarInit;
