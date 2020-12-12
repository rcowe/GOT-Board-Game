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
const $starkBtn = $('#land-stark-Btn');

// battle button
const $battleBtnDiv = $('.queen-battle-btn');
const $battleBtn = $('#battle-Btn');

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

// to store current house information
let currentHouseInfo = {};

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
        console.log(allHouses[stage]);
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
  const btnCallback = (stage, emptyBg, mapBg, emptyModalBg, sigilModalBg) => {
    // Change Background Image && arrived at house
    changeImageBackground(emptyBg, mapBg);
    console.log(`callback func,, 388`);
    setTimeout(() => {
      // opening house modal
      openHouseModal();
      // stage++;
      // changing house modal background
      changeModalBackgroundHouse(emptyModalBg, sigilModalBg);

      // storing math.random values to populate modal
      currentHouseInfo.thisHouseSoldiers = randomArmy(
        allHouses[stage].soldiers
      );
      currentHouseInfo.thisHouseCoin = randomCoins(allHouses[stage].gold);

      // checking current stage
      console.log(allHouses[stage]);

      // populating house modal information
      $('.house-name').text(allHouses[stage].house);
      $('.house-namee').text(allHouses[stage].house);
      $('.number-of-soldiers').text(allHouses[stage].soldiers);
      $('.amount-of-gold').text(allHouses[stage].gold);
      $('.number-of-soldiers-given').text(currentHouseInfo.thisHouseSoldiers);
      $('.amount-of-gold-given').text(currentHouseInfo.thisHouseCoin);
      $('.goal').text(allHouses[stage].goal);

      console.log('console before 411');
    }, 2000);
  };

  $acceptAll.on('click', (event) => {
    // event.preventDefault();
    console.log(`accessing accept all button, 416`);

    alert(
      `You have accepted all gold, soldiers and conditions, after modal closes you can move to next house! Scoreboard will be auto populated. Keep playing, go to the next house! 
      Hit the close button!`
    );
    console.log(stage, `line 422`);
    // populate scoreboard
    populateScoreBoard(
      currentHouseInfo.stage,
      currentHouseInfo.thisHouseSoldiers,
      currentHouseInfo.thisHouseCoin
    );

    // switch background to empty map
    changeImageBackground(currentHouseInfo.mapBg, currentHouseInfo.emptyBg);
    closeHouseModal();

    if (currentHouseInfo.mapBg === 'map-stark') {
      alert(`we are in house stark!!!`);
      $battleBtnDiv.css('display', 'flex');
    }
  });

  $makeChoices.on('click', (event) => {
    alert(
      `You will now need to select from below choices, Aceept or Request more. However, this house may choose to not give if you request more or decline their goal. Make wise choices!`
    );
  });

  $soldiersAccept.on('click', (event) => {
    alert(
      `You've made a wise choice, keep playing all soliders will be added!`
    );
    populateScoreBoard(
      currentHouseInfo.stage + 1,
      currentHouseInfo.thisHouseSoldiers,
      null
    );
  });

  $requestSoldiers.on('click', (event) => {
    alert(`Uh-oh! House says: ${randomCompAnswer()}`);
    closeHouseModal();
  });

  $goldAccept.on('click', (event) => {
    alert(`You've made a wise choice, keep playing all gold will be added!`);

    populateScoreBoard(null, null, currentHouseInfo.thisHouseCoin);
  });

  $requestGold.on('click', (event) => {
    alert(`Uh-oh! House says: ${randomCompAnswer()}`);
    closeHouseModal();
  });

  $houseGoalAccept.on('click', (event) => {
    alert(
      `This House believes in its true king, Gendry Baratheon of House Baratheon! May you have a long and prosperus reign!`
    );

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
    changeImageBackground(currentHouseInfo.mapBg, currentHouseInfo.emptyBg);

    // switch the modal background to nothing
    changeModalBackgroundHouse(
      currentHouseInfo.sigilModalBg,
      currentHouseInfo.emptyModalBg
    );
  });

  $('#close3').on('click', (event) => {
    // alert(
    //   `Uh-oh! You are now leaving the house, did you collect soldiers, gold and allegiances? Go to next house`
    // );
    closeHouseModal();
    // switch background to empty map
    changeImageBackground(currentHouseInfo.mapBg, currentHouseInfo.emptyBg);

    // switch the modal background to nothing
    changeModalBackgroundHouse(
      currentHouseInfo.sigilModalBg,
      currentHouseInfo.emptyModalBg
    );

    if (currentHouseInfo.sigilModalBg === 'modal-stark') {
      alert(`we are in house stark!`);
    }
  });

  $battleBtn.on('click', (event) => {});

  // switch case function

  const switchCaseFunc = (event) => {
    console.log(event.target.id);

    switch (event.target.id) {
      case 'land-martell-Btn':
        (currentHouseInfo.stage = 1),
          (currentHouseInfo.mapBg = 'map-martell'),
          (currentHouseInfo.emptyBg = 'empty-westeros-bg'),
          (currentHouseInfo.sigilModalBg = 'modal-martell'),
          (currentHouseInfo.emptyModalBg = 'empty-modal-background');
        btnCallback(
          1,
          'empty-westeros-bg',
          'map-martell',
          'empty-modal-background',
          'modal-martell'
        );
        break;
      case 'land-tyrell-Btn':
        (currentHouseInfo.stage = 1),
          (currentHouseInfo.mapBg = 'map-tyrell'),
          (currentHouseInfo.emptyBg = 'empty-westeros-bg'),
          (currentHouseInfo.sigilModalBg = 'modal-tyrell'),
          (currentHouseInfo.emptyModalBg = 'empty-modal-background');
        btnCallback(
          2,
          'empty-westeros-bg',
          'map-tyrell',
          'empty-modal-background',
          'modal-tyrell'
        );
        break;
      case 'land-lannister-Btn':
        (currentHouseInfo.stage = 1),
          (currentHouseInfo.mapBg = 'map-lannister'),
          (currentHouseInfo.emptyBg = 'empty-westeros-bg'),
          (currentHouseInfo.sigilModalBg = 'modal-lannister'),
          (currentHouseInfo.emptyModalBg = 'empty-modal-background');
        btnCallback(
          3,
          'empty-westeros-bg',
          'map-lannister',
          'empty-modal-background',
          'modal-lannister'
        );
        break;
      case 'land-tully-Btn':
        (currentHouseInfo.stage = 1),
          (currentHouseInfo.mapBg = 'map-tully'),
          (currentHouseInfo.emptyBg = 'empty-westeros-bg'),
          (currentHouseInfo.sigilModalBg = 'modal-tully'),
          (currentHouseInfo.emptyModalBg = 'empty-modal-background');
        btnCallback(
          4,
          'empty-westeros-bg',
          'map-tully',
          'empty-modal-background',
          'modal-tully'
        );
        break;
      case 'land-arryn-Btn':
        (currentHouseInfo.stage = 1),
          (currentHouseInfo.mapBg = 'map-arryn'),
          (currentHouseInfo.emptyBg = 'empty-westeros-bg'),
          (currentHouseInfo.sigilModalBg = 'modal-arryn'),
          (currentHouseInfo.emptyModalBg = 'empty-modal-background');
        btnCallback(
          5,
          'empty-westeros-bg',
          'map-arryn',
          'empty-modal-background',
          'modal-arryn'
        );
        break;
      case 'land-greyjoy-Btn':
        (currentHouseInfo.stage = 1),
          (currentHouseInfo.mapBg = 'map-greyjoy'),
          (currentHouseInfo.emptyBg = 'empty-westeros-bg'),
          (currentHouseInfo.sigilModalBg = 'modal-greyjoy'),
          (currentHouseInfo.emptyModalBg = 'empty-modal-background');
        btnCallback(
          6,
          'empty-westeros-bg',
          'map-greyjoy',
          'empty-modal-background',
          'modal-greyjoy'
        );
        break;
      case 'land-stark-Btn':
        (currentHouseInfo.stage = 1),
          (currentHouseInfo.mapBg = 'map-stark'),
          (currentHouseInfo.emptyBg = 'empty-westeros-bg'),
          (currentHouseInfo.sigilModalBg = 'modal-stark'),
          (currentHouseInfo.emptyModalBg = 'empty-modal-background');
        btnCallback(
          7,
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
    $('.score-number-of-houses').text(totalhouses);
    // console.log($('.score-number-of-houses').text(totalhouses), 'line 613');
    $('.score-number-of-soldiers').text(totalSoldiers);
    $('.score-number-of-gold').text(totalGold);
    checkForWinner();
    console.log(checkForWinner());
  };

  // check for winner
  checkForWinner = () => {
    // let elementId = $('.score-number-of-houses');
    // let elementText = elementId.text();

    if ($('.score-number-of-houses').text(totalhouses) >= 6) {
      alert(
        `!! Congratulations Gendry, You have raised enough support, soldiers and gold to face off the Queen! Select Battle Queen to get started!`
      );
      $('.queen-battle-btn').css('display', 'flex');
    }
    // create battle modal
    // have them battle each other, inside modal with some images!
    // button for easter eggs! (ned stark coming back, giving counsel, arya coming back and lastly, jon snow breaking it all up!)
  };

  // button listeners
  $martellBtn.on('click', () => {
    switchCaseFunc(event);
  });
  $tyrellBtn.on('click', () => {
    switchCaseFunc(event);
    $martellBtn.hide();
  });
  $lannisterBtn.on('click', () => {
    switchCaseFunc(event);
    $tyrellBtn.hide();
  });
  $tullyBtn.on('click', () => {
    switchCaseFunc(event);
    $lannisterBtn.hide();
  });
  $arrynBtn.on('click', () => {
    switchCaseFunc(event);
    $tullyBtn.hide();
  });
  $greyjoyBtn.on('click', () => {
    switchCaseFunc(event);
    $arrynBtn.hide();
  });
  $starkBtn.on('click', () => {
    switchCaseFunc(event);
    $greyjoyBtn.hide();
  });

  // ***** jquery ending ***** //
});
