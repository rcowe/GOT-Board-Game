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
const $closeHouseInfoModal = $('#close3');

// game play  buttons
// changing background buttons and triggering game functions

const $martellBtn = $('#land-martell-Btn');
const $tyrellBtn = $('#land-tyrell-Btn');
const $lannisterBtn = $('#land-lannister-Btn');
const $tully = $('#land-tully-Btn');
const $arryn = $('#land-arryn-Btn');
const $greyjoy = $('#land-greyjoy-Btn');
const $stark = $('#land-targaryan-Btn');

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
    $closeHouseInfoModal.css('display', 'none');
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

  // Game Play functions

  // soldiers and gold initialization
  let totalSoldiers = 0;
  let totalGold = 0;
  let army = 0;
  let coins = 0;

  // function to populate scoreboard
  const populateScoreBoard = (house, soldiers, gold) => {
    // console.log(gold);
    // console.log(soldiers);
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
  const randomArmy = (ranSoldiers) => {
    army = Math.floor(Math.random() * ranSoldiers + 1);
    return army;
  };
  // function to generate random gold amount
  const randomCoins = (ranGold) => {
    coins = Math.floor(Math.random() * ranGold + 1);
    return coins;
  };

  // array for random responses from computer
  const randomAns = [
    `My lord, I'm afraid I have no more to give`,
    `This is a sizeable contribution! Ye would be wise to take it`,
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

  const changeModalBackground = (blankImage, modalBg) => {
    // add here
    $('.blank-modal').removeClass(blankImage).addClass(modalBg);
  };

  // Game Play functions

  // stage 0, house baratheon modal
  $embarkBtn.on('click', (event) => {
    closeInsModal();

    // Change Background Image
    changeImageBackground('empty-westeros-bg', 'map-baratheon');

    setTimeout(() => {
      $('#modal-house-baratheon').css('display', 'flex');
      changeModalBackground('empty-modal-background', 'modal-baratheon');

      $('.baratheon-accept').on('click', () => {
        populateScoreBoard(
          stage + 1,
          allHouses[stage].soldiers,
          allHouses[stage].gold
        );

        $('#modal-house-baratheon').css('display', 'none');

        changeImageBackground('map-baratheon', 'empty-westeros-bg');
      });
    }, 2000);

    $('#baratheon-close-btn').on('click', (event) => {
      $('#modal-house-baratheon').css('display', 'none');
    });
  });

  // // in order to access

  // house martell button
  $martellBtn.on('click', (event) => {
    console.log(`martell was triggered`);
    stage++;
    // console.log(stage, `current stage, 336`);
    // Change Background Image && arrived at house
    changeImageBackground('empty-westeros-bg', 'map-martell');

    setTimeout(() => {
      openHouseModal();
      // console.log(`show modal`);
      // console.log(allHouses[stage].soldiers);

      $('.house-name').text(allHouses[stage].house);
      $('.house-namee').text(allHouses[stage].house);
      $('.number-of-soldiers').text(allHouses[stage].soldiers);
      $('.amount-of-gold').text(allHouses[stage].gold);
      $('.number-of-soldiers-given').text(
        randomArmy(allHouses[stage].soldiers)
      );
      $('.amount-of-gold-given').text(randomCoins(allHouses[stage].gold));
      $('.goal').text(allHouses[stage].goal);

      // *add button* Accept All, IF user accepts all house soldiers, gold and goal. Add all counts to the scoreboard.
      if (
        $acceptAll.on('click', (event) => {
          alert(
            'You have accepted all, after modal closes you can move to next house! Scoreboard will be auto populated'
          );
        })
      ) {
        populateScoreBoard(
          stage + 1,
          randomArmy(allHouses[stage].soldiers),
          randomCoins(allHouses[stage].gold)
        );
        closeHouseModal();
      } else {
        $makeChoices.on('click', (event) => {
          alert(
            `You will now need to select from below choices, Aceept or Request more. However, this house may choose to not give if you request more or decline their ask. Make wise choices!`
          );
        });
        console.log('display all below buttons');
      }

      $soldiersAccept.on('click', (event) => {
        alert(
          `You've made a wise choice, keep playing all soliders will be added!`
        );
        console.log(
          'to hide soldiers accept button and populate scoreboard 1 at time? '
        );
      });

      $requestSoldiers.on('click', (event) => {
        alert(`Uh-oh! House says: ${randomCompAnswer()}`);
        console.log('do not add to scoreboard, hide button');
      });

      $goldAccept.on('click', (event) => {
        alert(
          `You've made a wise choice, keep playing all gold will be added!`
        );
        console.log(
          'to hide gold accept button and populate scoreboard 1 at time?'
        );
      });

      $requestGold.on('click', (event) => {
        alert(`Uh-oh! House says: ${randomCompAnswer()}`);
        console.log('do not add to scoreboard, hide button');
      });

      $houseGoalAccept.on('click', (event) => {
        alert(
          `House ${allHouses[stage].houses} believes in its true king, Gendry Baratheon of House Baratheon! May you have a long and prosperus reign!`
        );
      });

      $declineGoal.on('click', (event) => {
        alert(
          `It is unfortunate we could not work together, perhaps in future. Best of luck.`
        );
      });
      closeHouseModal();
    }, 2000);

    $('#close3').on('click', (event) => {
      closeHouseModal();
    });
  });

  // ***** jquery ending ***** //
});

// scraps

// // soldiers and gold holder
// let totalSoldiers = 0;
// let totalGold = 0;
// let army = 0;
// let coins = 0;

// const populateScoreBoard = (house, soldiers, gold) => {
//   // console.log(gold);
//   // console.log(soldiers);

//   if (house === 1) {
//     $('.score-number-of-houses').text(house);
//     $('.score-number-of-soldiers').text(soldiers);
//     $('.score-number-of-gold').text(gold);
//   } else if (house !== 1) {
//     army = Math.floor(Math.random() * soldiers + 1);
//     coins = Math.floor(Math.random() * gold + 1);

//     totalSoldiers += army;
//     totalGold += coins;
//     // console.log(totalSoldiers, `this is line 292`);
//     // console.log(totalGold, `this is line 293`);
//     $('.score-number-of-houses').text(house);
//     $('.score-number-of-soldiers').text(totalSoldiers);
//     $('.score-number-of-gold').text(totalGold);
//   } else {
//     alert(`You have found a bug!`);
//   }
// };

// House#2
// $(otherBtn) => {

//   // Go to the function for other houses
//     // populate house information from array of objects at stage
//     $('.house-name').text(`${allHouses[stage].house}`);
//     $('.house-namee').text(`${allHouses[stage].house}`);
//     $('.number-of-soldiers').text(`${allHouses[stage].soldiers}`);
//     $('.amount-of-gold').text(`${allHouses[stage].gold}`);
//     $('.goal').text(`${allHouses[stage].goal}`);

//     $(Modal).show

//     // calling populate scoreboard function
//     populateScoreBoard(
//       stage + 1,
//       allHouses[stage].soldiers,
//       allHouses[stage].gold
//     );

// }

// $(btn).on(click, otherBtn)
// $(btn1).on(click, otherBtn)
// $(btn2).on(click, otherBtn)
// $(btn3).on(click, otherBtn)

//*********************************//

/* event listeners */
// temporary button to open house info modal
// $embarkBtn.on('click', () => {
//   closeInsModal();
//   manipulateHouseModal();
// });

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

// passing house information to modal **** need this to be triggered by button based on stage *****
// $embarkBtn.on('click', (event) => {
//   const manipulateHouseModal = $(event.currentTarget);

//   closeInsModal();

//   $houseInformationModal.css('display', 'flex');

//   // populate house information from array of objects at stage
//   $('.house-name').text(`${allHouses[stage].house}`);
//   $('.house-namee').text(`${allHouses[stage].house}`);
//   $('.number-of-soldiers').text(`${allHouses[stage].soldiers}`);
//   $('.amount-of-gold').text(`${allHouses[stage].gold}`);
//   $('.goal').text(`${allHouses[stage].goal}`);

//   // calling populate scoreboard function
//   populateScoreBoard(
//     stage + 1,
//     allHouses[stage].soldiers,
//     allHouses[stage].gold
//   );
// });

//*********************************//

/* event listeners */
// temporary button to open house info modal
// $embarkBtn.on('click', () => {
//   closeInsModal();
//   manipulateHouseModal();
