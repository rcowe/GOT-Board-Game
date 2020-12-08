// console.log('$');

// ***** sudo, self steps ***** //
/* 
Set-up
Step 1. In html add background -- done. 
Step 2. Write storyline into html (Modals, Buttons, etc) -- done 
Step 3. Create modal, that shows up upon loading page (figure out how to add images within modal) -- done, went with button to initialize 
Step 4. In HTML, write DIVs for each house, add sigil image -- done 
Step 5. Add css standard items -- done 
Step 6. Position house sigils in correct locations
Step 7. Make the sigils click-able OR place sigils and have user image show up when button is clicked to move through each location
Step 8. Generate text box for user to interact with houses at location
Step 9. Create user scoreboard image/box 

Game play
Step 1. When user arrives at house, generate text box/modal?, within this:
  - computer will randomly select how many soldiers the house will give [present number]
  - computer will randomly select how much gold the house will give [present number]
  - computer will show the houses's goal, [show goal]
Step 2: User interactions
  - User can see buttons
    - Accept Soldiers 
    - Request More Soldiers
    - Accept Gold 
    - Request More Gold
    - Accept Goal 
    - Decline Goal
      - If goal is accepted, then add gold,  soliders and house support to score board
      - if goal is denied, warn user that they may not get enough support to defeat queen. Do not add score.
Step 3: Alert that user must now go to next house
*/

// ***** audio file function ***** //
function playMusic() {
  const music = document.getElementById('audio');
  music.play();
  setTimeout(function () {
    music.currentTime = 0;
    music.pause();
  }, 15000);
}

// ***** game set-up ***** //

// array of objects to pull into class when generating houses
const allHouses = [
  {
    house: 'Baratheon',
    soldiers: 500,
    gold: 10000,
    goal: 'Peace to Kingdom',
  },

  {
    house: 'Martell',
    soldiers: 250,
    gold: 20000,
    goal: 'Place in court',
  },

  {
    house: 'Tyrell',
    soldiers: 150,
    gold: 5000,
    goal: 'Strong allegiance',
  },

  {
    house: 'Lannister',
    soldiers: 75,
    gold: 5000,
    goal: 'Place in court',
  },

  {
    house: 'Tully',
    soldiers: 400,
    gold: 3000,
    goal: 'Strong allegiance',
  },

  {
    house: 'Arryn',
    soldiers: 5000,
    gold: 10000,
    goal: 'Place in court',
  },

  {
    house: 'GreyJoy',
    soldiers: 300,
    gold: 1000,
    goal: 'Strong allegiance',
  },

  {
    house: 'Stark',
    soldiers: 10000,
    gold: 4000,
    goal: 'Place in court',
  },
];

// Hero Class, pulls from array of objects
class Hero {
  constructor(name) {
    this.name = name;
  }
  trade() {
    console.log(`you traded`);
  }
  moving_speech() {
    console.log(`Gendry moving speech`);
  }
  score() {
    console.log(`current score`);
  }
  currentObjects() {
    console.log(`Gendry has..`);
  }
}

// Houses Class, pulls from array
class Houses {
  constructor(name) {
    this.name = name;
  }
  soldiers() {
    console.log(`number of sodiers`);
  }
  goldAmount() {
    console.log(`amount of gold`);
  }
  houseGoal() {
    console.log(`house goal/desire`);
  }
}

// ***** jquery ***** //

$(() => {
  //*********************************//
  /* DOM cache */
  // container for page
  const $container = $('.container');

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

  //*********************************//
  /* event handlers */

  // story modal

  // adding inside container
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

  //*********************************//
  /* event listeners */

  // story modal
  $openModal1.on('click', openModal1);
  $closedModal1.on('click', closeModal1);
  // instructions modal
  $openModal2.on('click', openModal2);
  $closedModal2.on('click', closeModal2);
});
