// console.log('$');

// ***** sudo, self steps ***** //
/* 
Step 1. In html add background -- done. However, I want the image to be all in the page and locked in place. How can i do this?
Step 2. Write storyline into html (Modals, Buttons, etc) -- done 
Step 3. Create modal, that shows up upon loading page (figure out how to add images within modal) -- done, went with button to initialize 
Step 4. In HTML, write DIVs for each house, add sigil image -- done 
Step 5. Add css standard items -- done 
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
  // container for page
  const $container = $('container');

  // story modal
  const $modal1 = $('#modal-story'); // This is the story modal
  const $texbox1 = $('#modal-textbox1'); // This is the textbox in the modal
  const $openModal1 = $('#openModal-GameInit'); // This is the button that opens the intro story modal
  const $closedModal1 = $('#close1'); // this is the anchor tag that closes the modal

  // game instructions button
  const $openModal2 = $('#instructions'); // This is the button that opens the instruction modal

  // instructions modal
  const $modal2 = $('#modal-instructions'); // This is the story modal
  const $texbox2 = $('#modal-textbox2'); // This is the textbox in the modal
  const $closedModal2 = $('#close2'); // this is the anchor tag that closes the modal

  /* event handlers */

  // story modal

  // locking in container
  $modal1.appendTo($container);
  $modal2.appendTo($container);
  const openModal1 = (event) => {
    $modal1.css('display', 'flex');
  };
  const closeModal1 = (event) => {
    $modal1.css('display', 'none');
  };
  // instructions modal
  const openModal2 = (event) => {
    $modal2.css('display', 'flex');
  };
  const closeModal2 = (event) => {
    $modal2.css('display', 'none');
  };

  /* event listeners */

  // story modal
  $openModal1.on('click', openModal1);
  $closedModal1.on('click', closeModal1);
  // instructions modal
  $openModal2.on('click', openModal2);
  $closedModal2.on('click', closeModal2);
});
