// console.log('$');

/* sudo, self steps */
/* 
Set-up
Step 1. In html add background -- done. 
Step 2. Write storyline into html (Modals, Buttons, etc) -- done 
Step 3. Create modal, that shows up upon loading page (figure out how to add images within modal) -- done, went with button to initialize 
Step 4. In HTML, write DIVs for each house, add sigil image -- done 
Step 5. Add css standard items -- done 
Step 6. Position house sigils in correct locations -- done 
Step 7. Make the sigils click-able OR place sigils and have user image show up when button is clicked to move through each location done, went with 2 
Step 8. Generate text box for user to interact with houses at location -- created modals 
Step 9. Create user scoreboard image/box -- done 

Game play
Step 1. When user arrives at house, generate text box/modal?, within this:
  - computer will randomly select how many soldiers the house will give [present number]
  - computer will randomly select how much gold the house will give [present number]
  - computer will show the houses's goal, [show goal]
Step 2: User interactions
  - accept all, modal closes and scoreboard gets populated 
  - make choices, below buttons show up
  - User can see buttons
    - Accept Soldiers, if user hits accept soldiers, scoreboard soldiers count is populated
    - Request More Soldiers, if user hits request more, display random response from house rejecting request and stating they will not give soldiers
    - Accept Gold, if user hits accept gold, scoreboard gold count is populated
    - Request More Gold, if user hits request more, display random response from house rejecting request and stating they will not give gold
    - Accept Goal, If goal is accepted, then add gold,  soliders and house support to score board
    - Decline Goal, if goal is denied, warn user that they may not get enough support to defeat queen. Do not add score.
Step 3: Alert that user must now go to next house // close modal
*/

/** Game Data  **/

// array of objects to hold information for the houses
const allHouses = [
  {
    house: 'Baratheon',
    soldiers: 500,
    gold: 10000,
    goal: 'peace to Kingdom',
  },

  {
    house: 'Martell',
    soldiers: 250,
    gold: 20000,
    goal: 'place in court',
  },

  {
    house: 'Tyrell',
    soldiers: 150,
    gold: 5000,
    goal: 'strong allegiance',
  },

  {
    house: 'Lannister',
    soldiers: 75,
    gold: 5000,
    goal: 'place in court',
  },

  {
    house: 'Tully',
    soldiers: 400,
    gold: 3000,
    goal: 'strong allegiance',
  },

  {
    house: 'Arryn',
    soldiers: 5000,
    gold: 10000,
    goal: 'place in court',
  },

  {
    house: 'GreyJoy',
    soldiers: 300,
    gold: 1000,
    goal: 'strong allegiance',
  },

  {
    house: 'Stark',
    soldiers: 10000,
    gold: 4000,
    goal: 'place in court',
  },
];

const readyBattleSoldiers = 2100;
const readyBattleGold = 6500;

// DOM cache html items

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

// game instructions button
const $buttonGameIns = $('#game-instructions-btn');

// start the game button
const $embarkBtn = $('#game-play-Btn'); // This is the button to start the game function at stage / location 0

// house information modal, for game play
const $houseInformationModal = $('#modal-house-info');
const $closeHouseInfoModalTag = $('#close3');

// game play  buttons
// changing background buttons and triggering game functions

const $martellBtn = $('#land-martell-Btn');
const $tyrellBtn = $('#land-tyrell-Btn');
const $lannisterBtn = $('#land-lannister-Btn');
const $tullyBtn = $('#land-tully-Btn');
const $arrynBtn = $('#land-arryn-Btn');
const $greyjoyBtn = $('#land-greyjoy-Btn');
const $starkBtn = $('#land-targaryan-Btn');

// battle button
const $battle = $('#battle');

// house modal buttons
const $acceptAll = $('.modal-house-acceptAll-btn');
const $makeChoices = $('.house-select-options');
const $soldiersAccept = $('.accept-soldier-btn');
const $requestSoldiers = $('.request-more-soldiers-btn');
const $goldAccept = $('.accept-gold-btn');
const $requestGold = $('.request-more-gold-btn');
const $houseGoalAccept = $('.accept-goal-btn');
const $declineGoal = $('.decline-goal-btn');

//*** global functions // initialization ***//

// stage, game works in stages aligned with Array of objects, starting point is 0
let stage = 0;

// audio file function
function playMusic() {
  const music = document.getElementById('audio');
  music.play();
  setTimeout(function () {
    music.currentTime = 0;
    music.pause();
  }, 15000);
}

// ***** jquery start ***** //

$(() => {
  /* event handlers */

  // show story modal on screen
  const openStoryModal = (event) => {
    $storyModal.css('display', 'flex');
  };

  // hide story modal from screen
  const closingStoryModal = (event) => {
    $storyModal.css('display', 'none');
  };

  // show instructions modal on screen
  const openInsModal = (event) => {
    $InstructionsModal.css('display', 'flex');
  };

  // hide instructions modal from screen
  const closeInsModal = (event) => {
    $InstructionsModal.css('display', 'none');
  };

  // show house information modal on screen
  const openHouseModal = (event) => {
    $houseInformationModal.css('display', 'flex');
  };
  // hide house modal from screen
  const closeHouseModal = (event) => {
    $('#modal-house-info').css('display', 'none');
  };

  /* event listeners */

  // buttons to open and close story modal
  $openStoryModal.on('click', openStoryModal);
  $closeStoryModalTag.on('click', closingStoryModal);

  // buttons to open and close instructions modal (from inside story modal)
  $openInsModalBtn.on('click', () => {
    openInsModal();
    closingStoryModal();
  });
  $closeInsModalTag.on('click', closeInsModal);

  // buttons to open and close instructions modal (from game screen)
  $buttonGameIns.on('click', () => {
    openInsModal();
  });
  $closeInsModalTag.on('click', closeInsModal);

  $closeHouseInfoModalTag.on('click', closeHouseModal);

  // Game Play functions

  // soldiers and gold initialization
  let totalSoldiers = 0;
  let totalGold = 0;
  let totalhouses = 0;
  let army = 0;
  let coins = 0;

  // function to populate scoreboard
  const populateScoreBoard = (house, soldiers, gold) => {
    // console.log(gold);
    // console.log(soldiers);
    totalhouses += house;
    totalSoldiers += soldiers;
    totalGold += gold;
    $('.score-number-of-houses').text(house);
    $('.score-number-of-soldiers').text(totalSoldiers);
    $('.score-number-of-gold').text(totalGold);
  };

  // random soldiers and gold initialization
  let ranSoldiers;
  let ranGold;

  // function to generate random soldiers number
  let randomArmy = (ranSoldiers) => {
    army = Math.floor(Math.random() * ranSoldiers + 1);
    return army;
  };
  // function to generate random gold amount
  let randomCoins = (ranGold) => {
    coins = Math.floor(Math.random() * ranGold + 1);
    return coins;
  };

  // array for random responses from computer
  const randomAns = [
    `My lord, I'm afraid I have no more to give.. I no longer make this offer`,
    `This is a sizeable contribution! Ye would have been wise to take it.. I no longer make this offer`,
  ];

  // function for generating random computer answer
  const randomCompAnswer = () => {
    let compResponse = randomAns[Math.floor(Math.random() * randomAns.length)];
    return compResponse;
  };

  // initializing for background changes
  let westeros = '';
  let newBg = '';

  // change background picture
  const changeImageBackground = (westeros, newBg) => {
    // console.log(`accessing image`);
    $('.img-container').removeClass(westeros).addClass(newBg);
  };

  // change modal background picture

  const changeModalBackgroundBaratheon = (blankImage1, modalBg1) => {
    // add here
    $('.blank-modal-baratheon').removeClass(blankImage1).addClass(modalBg1);
  };
  const changeModalBackgroundHouse = (blankImage2, modalBg2) => {
    // add here
    $('.blank-modal-house').removeClass(blankImage2).addClass(modalBg2);
  };

  // hidebutton
  const hideButton = (buttonToHide) => {
    $(buttonToHide).hide();
  };

  // check for winner
  checkForWinner = () => {
    if ($('.score-number-of-houses').text(house) >= 6) {
      alert(
        `!! Congratulations Gendry, You have raised enough support, soldiers and gold to face off the Queen! Select Battle Queen to get started!`
      );
      $('.queen-battle-btn').css('display', 'flex');
    }
    // create battle modal
    // have them battle each other, inside modal with some images!
    // button for easter eggs! (ned stark coming back, giving counsel, arya coming back and lastly, jon snow breaking it all up!)
  };

  // Hero Class, pulls from array of objectsv ---------- May only need this for end of game battle
  class Hero {
    constructor(name) {
      this.name = name;
    }
    moving_speech() {
      // show div section in modal
      // give speech
      //close div section
      console.log(`Gendry moving speech`);
    }
    score() {
      console.log(`current score`);
    }
    easterEggs() {
      // these are buttons that trigger the above (ned stark coming back, giving counsel, arya coming back and lastly, jon snow breaking it all up!)
    }

    soldiers() {
      console.log(`number of sodiers`);
    }
    goldAmount() {}
    pledgedHouses() {}
  }

  // Houses Class, pulls from array ---------- May only need this for end of game battle
  class Queen {
    constructor(name) {
      this.name = name;
    }
    soldiers() {
      console.log(`number of sodiers`);
    }
    goldAmount() {
      console.log(`amount of gold`);
    }
    bringBackCersei() {
      // image of cersei coming back with a new gold company: ENDS here;
    }
  }

  // Game Play functions

  // stage 0, house baratheon modal
  $embarkBtn.on('click', (event) => {
    closeInsModal();

    // Change Background Image
    changeImageBackground('empty-westeros-bg', 'map-baratheon');

    setTimeout(() => {
      $('#modal-house-baratheon').css('display', 'flex');
      changeModalBackgroundBaratheon(
        'empty-modal-background',
        'modal-baratheon'
      );

      $('.baratheon-accept').on('click', () => {
        populateScoreBoard(
          stage + 1,
          allHouses[stage].soldiers,
          allHouses[stage].gold
        );

        $('#modal-house-baratheon').css('display', 'none');
        alert(`You've got House Baratheon's support! Move to the next house!`);

        changeImageBackground('map-baratheon', 'empty-westeros-bg');
      });
    }, 2000);

    $('#baratheon-close-btn').on('click', (event) => {
      $('#modal-house-baratheon').css('display', 'none');
      changeModalBackgroundBaratheon(
        'modal-baratheon',
        'empty-modal-background'
      );
    });
    $embarkBtn.hide();
  });

  // rest of buttons function
  const btnCallback = (emptyBg, mapBg, emptyModalBg, sigilModalBg) => {
    // Change Background Image && arrived at house
    changeImageBackground(emptyBg, mapBg);

    setTimeout(() => {
      openHouseModal();
      // $('#modal-house-info').css('display', 'flex');
      console.log(`accessing modal`);

      let thisHouseSoldiers = randomArmy(allHouses[stage].soldiers);
      let thisHouseCoin = randomCoins(allHouses[stage].gold);

      changeModalBackgroundHouse(emptyModalBg, sigilModalBg);

      console.log(stage, `line 343`);
      $('.house-name').text(allHouses[stage].house);
      $('.house-namee').text(allHouses[stage].house);
      $('.number-of-soldiers').text(allHouses[stage].soldiers);
      $('.amount-of-gold').text(allHouses[stage].gold);
      $('.number-of-soldiers-given').text(thisHouseSoldiers);
      $('.amount-of-gold-given').text(thisHouseCoin);
      $('.goal').text(allHouses[stage].goal);
      console.log(stage, `line 352`);
      // console.log(allHouses[stage].soldiers);

      $acceptAll.on('click', (event) => {
        alert(
          `You have accepted all gold, soldiers and conditions, after modal closes you can move to next house! Scoreboard will be auto populated. Keep playing, go to the next house!`
        );
        console.log(`accessing close modal1`);

        populateScoreBoard(stage + 1, thisHouseSoldiers, thisHouseCoin);

        // switch background to empty map
        changeImageBackground(mapBg, emptyBg);

        // hide martell button
        hidebutton(buttonToHide); // doesn't work

        // switch the modal background to nothing
        changeModalBackgroundHouse(sigilModalBg, emptyModalBg);
      });

      $makeChoices.on('click', (event) => {
        alert(
          `You will now need to select from below choices, Aceept or Request more. However, this house may choose to not give if you request more or decline their goal. Make wise choices!`
        );
        $makeChoices.hide();
      });

      $soldiersAccept.on('click', (event) => {
        alert(
          `You've made a wise choice, keep playing all soliders will be added!`
        );
        $soldiersAccept.hide();
        $requestSoldiers.hide();
        populateScoreBoard(stage + 1, thisHouseSoldiers, null);
      });
      $requestSoldiers.on('click', (event) => {
        alert(`Uh-oh! House says: ${randomCompAnswer()}`);
        $requestSoldiers.hide();
        $soldiersAccept.hide();
      });

      $goldAccept.on('click', (event) => {
        alert(
          `You've made a wise choice, keep playing all gold will be added!`
        );
        $goldAccept.hide();
        $requestGold.hide();
        populateScoreBoard(null, null, thisHouseCoin); // only way to not add more houses pledged was to null this..it deletes the stage info
      });
      $requestGold.on('click', (event) => {
        alert(`Uh-oh! House says: ${randomCompAnswer()}`);
        $requestGold.hide();
        $goldAccept.hide();
      });

      $houseGoalAccept.on('click', (event) => {
        alert(
          `This House believes in its true king, Gendry Baratheon of House Baratheon! May you have a long and prosperus reign!`
        );
        $houseGoalAccept.hide();
        $declineGoal.hide();
        alert(`Select the close button and move to next house!`);
        // need logic on if gold accept and soldier accept, then do the below.. this is a loophole
      });
      $declineGoal.on('click', (event) => {
        alert(
          `It is unfortunate we could not work together, perhaps in future. Best of luck.`
        );
        closeHouseModal();
        alert(`Keep playing, go to the next house!`);
        // switch background to empty map
        changeImageBackground(mapBg, emptyBg);

        // hide house  button
        hideButton(buttonToHide);

        // switch the modal background to nothing
        changeModalBackgroundHouse(sigilModalBg, emptyModalBg);
      });

      $('#close3').on('click', (event) => {
        alert(
          `Uh-oh! You are now leaving the house and will not receive any points! You must reload game! Or go to next house`
        );
        closeHouseModal();
        // switch background to empty map
        changeImageBackground(mapBg, emptyBg);

        // hide martell button
        hidebutton(buttonToHide);

        // switch the modal background to nothing
        changeModalBackgroundHouse(sigilModalBg, emptyModalBg);
      });
    }, 2000);
    // changeImageBackground(emptyBg, mapBg);
  };

  // switch case function

  const switchCaseFunc = (event) => {
    console.log(event.target.id);

    switch (event.target.id) {
      case 'land-martell-Btn':
        stage = 1;
        btnCallback(
          'empty-westeros-bg',
          'map-martell',
          'empty-modal-background',
          'modal-martell'
        );
        // deleteBtn('land-martell-Btn'); line 290, to create hide and show buttons
        hideButton(event.target.id);

        break;
      case 'land-tyrell-Btn':
        stage = 2;
        btnCallback(
          'empty-westeros-bg',
          'map-tyrell',
          'empty-modal-background',
          'modal-tyrell'
        );
        break;
      case 'land-lannister-Btn':
        stage = 3;
        btnCallback(
          'empty-westeros-bg',
          'map-lannister',
          'empty-modal-background',
          'modal-lannister'
        );
        break;
      case 'land-tully-Btn':
        stage = 4;
        btnCallback(
          'empty-westeros-bg',
          'map-tully',
          'empty-modal-background',
          'modal-tully'
        );
        break;
      case 'land-arryn-Btn':
        stage = 5;
        btnCallback(
          'empty-westeros-bg',
          'map-arryn',
          'empty-modal-background',
          'modal-arryn'
        );
        break;
      case 'land-greyjoy-Btn':
        stage = 6;
        btnCallback(
          'empty-westeros-bg',
          'map-greyjoy',
          'empty-modal-background',
          'modal-greyjoy'
        );
        break;
      case 'land-stark-Btn':
        stage = 7;
        btnCallback(
          'empty-westeros-bg',
          'map-stark',
          'empty-modal-background',
          'modal-stark'
        );
        break;
      default:
        alert('Uh-oh! Nothing matched! You found a bug');
    }
  };

  // button listeners
  $martellBtn.on('click', () => {
    switchCaseFunc(event);
  });
  $tyrellBtn.on('click', () => {
    switchCaseFunc(event);
  });
  $lannisterBtn.on('click', () => {
    switchCaseFunc(event);
  });
  $tullyBtn.on('click', () => {
    switchCaseFunc(event);
  });
  $arrynBtn.on('click', () => {
    switchCaseFunc(event);
  });
  $greyjoyBtn.on('click', () => {
    switchCaseFunc(event);
  });
  $starkBtn.on('click', () => {
    switchCaseFunc(event);
  });

  // ***** jquery ending ***** //
});
