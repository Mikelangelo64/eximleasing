import accordionInit from './accordion/init';
import headerHandler from './headerHandler/init';
import initPopups from './popup/init';
import projectToggle from './projectToggle/init';
import scrollUpHandler from './scrollUp/init';
import scrollBarInit from './scrollbar';
import slidersInit from './sliders/init';
import submenuToggle from './submenu/init';

export const init = () => {
  scrollBarInit();
  slidersInit();
  submenuToggle();
  accordionInit();

  headerHandler();
  scrollUpHandler();

  const popups = initPopups();

  const formArr = document.querySelectorAll('form');
  const hasError = false;

  if (formArr.length !== 0) {
    formArr.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const inputs = Array.from(
          form.querySelectorAll('input, textarea') as NodeListOf<
            HTMLInputElement | HTMLTextAreaElement
          >
        );

        popups.forEach(({ timeline, isThanks, isError }) => {
          if (isThanks && !hasError) {
            timeline?.play();

            if (inputs.length !== 0) {
              inputs.forEach((inputProp) => {
                const input = inputProp;
                console.log(input, input.value);

                // if (input.type === 'tel') {
                //   return;
                // }

                input.value = '';
              });
            }

            // if (inputMaskArray) {
            //   inputMaskArray.forEach((inputMaskProp) => {
            //     const inputMask = inputMaskProp;
            //     inputMask.value = '';
            //     inputMask.updateValue();
            //   });
            // }
          } else if (isError && hasError) {
            timeline?.play();
          } else {
            timeline?.reverse();

            setTimeout(() => {
              document.querySelector('html')?.classList.add('lock');
              document.querySelector('body')?.classList.add('lock');
            }, 300);
          }
        });
      });
    });

    // document.addEventListener(
    //   'wpcf7mailsent',
    //   function () {
    //     popups.forEach(({ timeline, isThanks, isError }) => {
    //       if (isThanks && !hasError) {
    //         timeline?.play();

    //         formArr.forEach((form) => {
    //           const inputs = Array.from(
    //             form.querySelectorAll('input, textarea') as NodeListOf<
    //               HTMLInputElement | HTMLTextAreaElement
    //             >
    //           );

    //           if (inputs.length !== 0) {
    //             inputs.forEach((inputProp) => {
    //               const input = inputProp;
    //               if (input.type === 'tel') {
    //                 return;
    //               }
    //               input.value = '';
    //             });
    //           }

    //           if (inputMaskArray) {
    //             inputMaskArray.forEach((inputMaskProp) => {
    //               const inputMask = inputMaskProp;
    //               inputMask.value = '';
    //               inputMask.updateValue();
    //             });
    //           }
    //         });
    //       } else if (isError && hasError) {
    //         timeline?.play();
    //       } else {
    //         timeline?.reverse();

    //         setTimeout(() => {
    //           document.querySelector('html')?.classList.add('lock');
    //           document.querySelector('body')?.classList.add('lock');
    //         }, 300);
    //       }
    //     });
    //   },
    //   false
    // );
  }

  projectToggle();
};
