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

// ***** audio file function ***** // --------------Disabled for now
// function playMusic() {
//   const music = document.getElementById('audio');
//   music.play();
//   setTimeout(function () {
//     music.currentTime = 0;
//     music.pause();
//   }, 15000);
// }

// ***** game set-up ***** //

// array of objects to hold information for the houses
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

// // Hero Class, pulls from array of objectsv ---------- May only need this for end of game battle
// class Hero {
//   constructor(name) {
//     this.name = name;
//   }
//   trade() {
//     console.log(`you traded`);
//   }
//   moving_speech() {
//     console.log(`Gendry moving speech`);
//   }
//   score() {
//     console.log(`current score`);
//   }
//   currentObjects() {
//     console.log(`Gendry has..`);
//   }
// }

// // Houses Class, pulls from array ---------- May only need this for end of game battle
// class Houses {
//   constructor(name) {
//     this.name = name;
//   }
//   soldiers() {
//     console.log(`number of sodiers`);
//   }
//   goldAmount() {
//     console.log(`amount of gold`);
//   }
//   houseGoal() {
//     console.log(`house goal/desire`);
//   }
// }

// ***** jquery ***** //

$(() => {
  //*********************************//
  /* DOM cache */

  // container for page
  const $container = $('.container');

  // story modal
  const $storyModal = $('#modal-story'); // This is the story modal
  const $texbox1 = $('#modal-textbox1'); // This is the textbox in the modal *** maybe unnecessary***
  const $openStoryModal = $('#openModal-GameInit'); // This is the button that opens the intro story modal
  const $closeStoryModalTag = $('#close1'); // this is the anchor tag that closes the modal

  // game instructions button
  const $openInsModalBtn = $('#instructions'); // This is the button that opens the instruction modal

  // instructions modal
  const $InstructionsModal = $('#modal-instructions'); // This is the story modal
  const $texbox2 = $('#modal-textbox2'); // This is the textbox in the modal
  const $closeInsModalTag = $('#close2'); // this is the anchor tag that closes the modal

  // start the game button
  const $embarkBtn = $('#game-play'); // This is the button to start the game function at stage / location 0

  // house information modal, for game play
  const $houseInformationModal = $('#house-info');
  const $texbox3 = $('#modal-textbox3'); // This is the textbox in the modal *** maybe unnecessary***
  const $openHouseInfoModal = ''; // this will be each button created to play the game
  const $closeHouseInfoModal = $('#close3');

  // all buttons would be manipulated within modal function//

  // stage, game works in stages aligned with Array of objects, starting point is 0 ending is 8
  let stage = 0;

  //*********************************//
  /* event handlers */

  // story modal adding inside container
  $storyModal.appendTo($container);

  // instructions modal adding inside container
  $InstructionsModal.appendTo($container);

  // show story modal on screen
  const openStoryModal = (event) => {
    $storyModal.css('display', 'flex');
  };
  const closingStoryModal = (event) => {
    $storyModal.css('display', 'none');
  };

  // show instructions modal on screen
  const openInsModal = (event) => {
    $InstructionsModal.css('display', 'flex');
  };
  const closeInsModal = (event) => {
    $InstructionsModal.css('display', 'none');
  };

  // show house information modal on screen
  const openHouseModal = (event) => {
    $$openHouseInfoModal.css('display', 'flex');
  };
  const closeHouseModal = (event) => {
    $closeHouseInfoModal.css('display', 'none');
  };

  // populating the scoreboard
  const populateScoreBoard = (house, soldiers, gold) => {
    // math.floor and math.random to populate the board
    const availableSoldiers = Math.floor(Math.random() * soldiers + 1);
    const availableGold = Math.floor(Math.random() * gold + 1);

    // passing to scoreboard in dom
    $('.number-of-houses').text(house);
    $('.number-of-soldiers').text(availableSoldiers);
    $('.number-of-gold').text(availableGold);
  };

  // passing house information to modal **** need this to be triggered by button based on stage *****
  const manipulateHouseModal = (event) => {
    // populate house information from array of objects at stage
    $('.house-name').text(`${allHouses[stage].house}`);
    $('.house-namee').text(`${allHouses[stage].house}`);
    $('.number-of-soldiers').text(`${allHouses[stage].soldiers}`);
    $('.amount-of-gold').text(`${allHouses[stage].gold}`);
    $('.goal').text(`${allHouses[stage].goal}`);

    // **re-visit

    openHouseInfo();

    // calling populate scoreboard function
    populateScroreBoard(
      stage + 1,
      allHouses[stage].soldiers,
      allHouses[stage].gold
    );
  };

  //*********************************//
  /* event listeners */

  // buttons to open and close story modal
  $openStoryModal.on('click', openStoryModal);
  $closeStoryModalTag.on('click', closingStoryModal);

  // buttons to open and close instructions modal
  $openInsModalBtn.on('click', () => {
    openInsModal();
    closingStoryModal();
  });
  $closeInsModalTag.on('click', closeInsModal);

  // temporary button to open house info modal
  $embarkBtn.on('click', () => {
    closeInsModal();
    manipulateHouseModal();
  });
});
