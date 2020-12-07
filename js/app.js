// console.log('$');

// ***** sudo, self steps ***** //
/* 
Step 1. In html add background -- done. However, I want the image to be all in the page and locked in place. How can i do this?
Step 2. Write storyline into html (Modals, Buttons, etc)
Step 3. Create modal, that shows up upon loading page (figure out how to add images within modal)
Step 4. In HTML, write DIVs for each house, add sigil image. 
Step 5. Add css standard items 
*/

// ***** game set-up ***** //

// audio

function playMusic() {
  const music = document.getElementById('audio');
  music.play();
  setTimeout(function () {
    music.currentTime = 0;
    music.pause();
  }, 15000);
}

// ***** jquery ***** //
$(() => {
  /* DOM cache */

  // story modal
  const $modal = $('#modal-story'); // This is the story modal
  const $texbox = $('#modal-textbox1'); // This is the textbox in the modal
  const $openModal = $('#openModal-GameInit'); // This is the button that opens the modal
  const $closedModal = $('#close1'); // this is the anchor tag that closes the modal

  /* event handlers */

  // story modal
  const openModal = (event) => {
    $modal.css('display', 'flex');
  };
  const closeModal = (event) => {
    $modal.css('display', 'none');
  };

  /* event listeners */

  // story modal
  $openModal.on('click', openModal);
  $closedModal.on('click', closeModal);
});
