

class elementMover {

/**
 * Moves a DOC element.
 * @param {string} idMoving Document ID of the element (moving from).
 * @param {string} idMovingTo Document ID of the element (moving to).
 */  
  moveElement(idMoving, idMovingTo) {
    const moving = document.getElementById(idMoving);
    const moveToRect = document.getElementById(idMovingTo).getBoundingClientRect();

    moving.style.left = `${moveToRect.left}px`;
    moving.style.top = `${moveToRect.top}px`;


  }
}
