import debounce from '../config/debounce';
import vevet from '../config/vevet';

const scrollUpHandler = () => {
  const buttonArray =
    document.querySelectorAll<HTMLButtonElement>('.scroll-up');

  if (buttonArray.length === 0) {
    return;
  }

  buttonArray.forEach((button) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });

  if (window.scrollY > vevet.viewport.height) {
    buttonArray.forEach((button) => {
      button.classList.add('visible');
    });
  }

  window.addEventListener(
    'scroll',
    debounce({
      callback: () => {
        if (window.scrollY < vevet.viewport.height) {
          buttonArray.forEach((button) => {
            button.classList.remove('visible');
          });

          return;
        }

        buttonArray.forEach((button) => {
          button.classList.add('visible');
        });
      }
    })
  );
};

export default scrollUpHandler;
