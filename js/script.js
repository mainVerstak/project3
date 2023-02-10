"use strict";
document.addEventListener("DOMContentLoaded", function () {
  let wheelDisc = document.querySelector('.wheel__disc-outer');
  let wheelHightlite = document.querySelector('.wheel__hightlite');
  let sectorOffset = 36;
  let sectorSpinTime = 100;
  let prevAngle = 0;
  let currentSector = 0;
  let sectors = [33, 36]
  document.querySelectorAll('.js-spin').forEach(item => {
    item.addEventListener('click', function () {
      let btn = this
      let spinSector = sectors[0] || 0;
      if (spinSector == 0) return

      currentSector += spinSector;
      sectors.splice(0, 1)

      let angle = spinSector * sectorOffset;
      let spinTime = spinSector * sectorSpinTime;
      wheelDisc.style.transitionDuration = spinTime + 'ms';
      wheelDisc.style.transform = 'rotate(' + (prevAngle + angle) + 'deg)';
      wheelHightlite.style.opacity = '0';

      btn.disabled = true;
      prevAngle += angle;
      setTimeout(() => {
        btn.disabled = false;
        wheelHightlite.style.opacity = '1';
      }, spinTime + 100);
    })
  });

  //+modal
  document.querySelectorAll('[data-modal]').forEach(function (item) {
    item.addEventListener('click', function () {
      let modalId = this.getAttribute('href') || '#' + this.getAttribute('data-modal');
      if (!modalId) return;
      openModal(modalId)
    })
  })
  function openModal(modalId) {
    document.querySelector(modalId).classList.add('_active')
    document.body.classList.add('_modal-open');
  }

  document.querySelectorAll('.js-modal-hide').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      if (e.target.classList.contains('js-modal-hide')) {
        let modal = this.closest('.modal');
        closeModal(modal);
      }
    })
  })
  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('_active');
    } else {
      document.querySelectorAll('.modal._active').forEach(function (item) {
        item.classList.remove('_active')
      })
    }
    document.body.classList.remove('_modal-open');
  }
  //-modal
});