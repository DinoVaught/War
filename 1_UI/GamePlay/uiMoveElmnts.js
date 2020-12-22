

class elementMover {

/**
 * Moves a DOC element.
 * @param {string} idMoving Document ID of the element (moving from).
 * @param {string} idMovingTo Document ID of the element (moving to).
 */  
  moveElement(idMoving, idMovingTo) {
    const moving = document.getElementById(idMoving);
    const moveToRect = document.getElementById(idMovingTo).getBoundingClientRect();


    if (moving.dataset.loc_offset == undefined) {
      moving.style.top = `${moveToRect.top}px`;
      moving.style.left = `${moveToRect.left}px`;
    } else {
      moving.style.top = `${moveToRect.top}px`;
      moving.style.left = parseFloat(moveToRect.left) + parseFloat(moving.dataset.loc_offset) + 'px';      
      // moving.dataset.loc_offset pass - num to move left, + num to move right

    }




  }
}
