export const getSubstring = (start, end) => (original) => original.substring(start, end);
export const getSubstringUntil = (end) => getSubstring(0, end);
export const getSubstringAfter = (start) => getSubstring(start);

const asPixels = (value) => `${value}px`;

const toggleClass = (target, className) => {
  const saneClassName = className.startsWith('.') && getSubstringAfter(1);

  return target.classList.toggle(
     (saneClassName || className)
  );
};

class Menu {
  constructor() {

    this.state = {
      isActive: false
    };

    this.selectors = {
      mmContainer: '.mm-container',
      mmPanel: '.mm-panel',
      mmOverlay: '.mm-overlay',
      mmActive: '.is-active',
      mmLinks: '.mm-bar__group-link',
      mmItems: '.mm-bar__group-item',
      mmGroup: '.mm-bar__group',
      mmSideBtns:'.mm-panel__button',
      mmLinkItems: '.mm-bar__group-item',
    };

    this.mmContainer = document.querySelector(`${this.selectors.mmContainer}`);
    this.mmPanel = document.querySelector(`${this.selectors.mmPanel}`);
    this.mmPanels = document.querySelectorAll(`${this.selectors.mmPanel}`);
    this.mmOverlay = document.querySelector(`${this.selectors.mmOverlay}`);
    this.mmLinks = document.querySelectorAll(`${this.selectors.mmLinks}`);
    this.mmItems = document.querySelectorAll(`${this.selectors.mmItems}`);
    this.mmGroup = document.querySelector(`${this.selectors.mmGroup}`);
    this.mmMultiPanels = document.querySelectorAll(`${this.selectors.mmPanel}`);
    this.mmSideButtons = document.querySelectorAll(`${this.selectors.mmSideBtns}`);
    this.mmLinkItems = document.querySelectorAll(`${this.selectors.mmLinkItems}`);

    this.bindEvents();
  }

  bindEvents() {
    this.bindToggleSubMenu(
      this.mmLinks,
    );
    this.mmMultiPanels.forEach((mp)=>{

      mp.querySelectorAll('.mm-panel__side .mm-panel__group li button').forEach((btn)=>{
        btn.addEventListener('click',(e) => {
          let category = e.target.getAttribute('data-category');

          // this.mmSideButtons
          e.target.parentNode.parentNode.querySelectorAll(`${this.selectors.mmSideBtns}`).forEach((btn) => {
            if (category === btn.getAttribute('data-category')) {
              btn.classList.add('is-active');
            } else {
              btn.classList.remove('is-active')
            }
          });

          mp.querySelectorAll('.mm-panel__content').forEach((mpc) => {
            let panelCategory = mpc.getAttribute('data-panel');
            if(panelCategory === category){
              mpc.classList.add('is-active');

            }else{
              mpc.classList.remove('is-active');
            }
          });
        })
      });

    })
  }

  bindToggleSubMenu = (targets) => {
    targets.forEach((el) => {

      el.addEventListener('mouseover', (e) => {
       // this.resetItemActive(this.mmLinks);
       this.resetItemActive(this.mmLinkItems);
       this.resetItemActive(this.mmPanels);
       this.resetMenuItems(this.mmLinks);
       let menuItem = e.target.parentNode;
       let subPanel = menuItem.getElementsByClassName("mm-panel")[0];
       this.setActive(subPanel, true);
       this.setActive(e.target.parentNode, true);
       subPanel.addEventListener('mouseleave',(e)=>{
        e.target.classList.remove('is-active');
        e.target.parentNode.classList.remove('is-active');
        this.resetMenuItems(e.target.querySelectorAll('.mm-panel__button'));
       })
      });
    });
  }

  resetMenuItems(selectors) {
    
    console.log('value is firing');
    selectors.forEach((el, index) => {
      if (index === 0) {
        el.classList.add('is-active');
      } else {
        el.classList.remove('is-active');
      }
    });
  }

  resetItemActive(selectors) {
    selectors.forEach((el) => {
      el.classList.remove('is-active');
    });
  }

  setActive(selector, value) {
    if (value === true) {
      selector.classList.add('is-active');
      this.state.isActive = true;
    } else {
      selector.classList.remove('is-active');
      this.state.isActive = false;
    }
  }
}

export default Menu;
