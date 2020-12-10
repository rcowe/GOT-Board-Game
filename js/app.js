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
function playMusic() {
  const music = document.getElementById('audio');
  music.play();
  setTimeout(function () {
    music.currentTime = 0;
    music.pause();
  }, 15000);
}

// ***** global scope ***** //

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

// ***** jquery ***** //

$(() => {
  //************** New Section

  // ***** game set-up ***** //

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

  // game instructions button
  const $buttonGameIns = $('#game-instructions-btn');

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

  //************** New Section

  // ***** game play ***** //

  /* DOM cache */

  // start the game button
  const $embarkBtn = $('#game-play-Btn'); // This is the button to start the game function at stage / location 0

  // house information modal, for game play
  const $houseInformationModal = $('#modal-house-info');
  const $texbox3 = $('#modal-textbox3'); // This is the textbox in the modal *** maybe unnecessary***
  const $closeHouseInfoModal = $('#close3');

  // game play  buttons
  // changing background buttons and triggering game functions
  const $baratheonBtn = $('#land-baratheon-Btn');
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
  const $soldiersAccept = $('.accept-soldier-btn'); 
  const $requestSoldiers = $('.request-more-soldiers-btn');
  const $goldAccept = $('.accept-gold-btn');
  const $requestGold = $('.request-more-gold-btn');
  const $houseGoalAccept = $('.accept-goal-btn');
  const $declineGoal = $('.decline-goal-btn');

  /* event handlers */

  // stage, game works in stages aligned with Array of objects, starting point is 0
  let stage = 0;

  // show house information modal on screen
  const openHouseModal = (event) => {
    $houseInformationModal.css('display', 'flex');
  };

  const closeHouseModal = (event) => {
    /// may not need this
    $closeHouseInfoModal.css('display', 'none');
  };

  /*  manipulating the DOM */

  // stage 0, house baratheon modal
  $embarkBtn.on('click', (event) => {
    closeInsModal();

    // Change Background Image
    const mapBaratheon = $('.img-container')
      .removeClass('empty-westeros-bg')
      .addClass('map-baratheon');

    setTimeout(() => {
      console.log(`baratheon`);

      $('#modal-house-baratheon').css('display', 'flex');

      console.log(`baratheon show modal`);

      $('.baratheon-accept').on('click', () => {
        // console.log(allHouses[stage].soldiers, 'line 240');
        // console.log(allHouses[stage].gold, 'line 241');
        populateScoreBoard(
          stage + 1,
          allHouses[stage].soldiers,
          allHouses[stage].gold
        );

        $('#modal-house-baratheon').css('display', 'none');

        mapBaratheon.removeClass('map-baratheon').addClass('empty-westeros-bg');
      });

    }, 2000);

    stage++
  });

  // soldiers and gold amounts randomizer
  let army = Math.floor(Math.random() * soldiers + 1);
  let coins = Math.floor(Math.random() * gold + 1);

  // populating the scoreboard
  const populateScoreBoard = (house, soldiers, gold) => {
    // console.log(gold);
    // console.log(soldiers);

    if (house === 1) {
      $('.number-of-houses').text(house);
      $('.number-of-soldiers').text(soldiers);
      $('.number-of-gold').text(gold);
    } else if (house !== 1) {
      army();
      coins();
      let totalSoldiers;
      let totalGold;
      totalSoldiers += army;
      totalGold += coins;
      $('.number-of-houses').text(house);
      $('.number-of-soldiers').text(totalSoldiers);
      $('.number-of-gold').text(totalGold);
    } else {
      alert(`You have found a bug!`);
    }
  };


// const populate house modal info not for scoreboard 
const houseModalInformation = (allSoldiers, allGold) => {
  $('.')
}

// house martell button

const martellBtn = () => {
    // Change Background Image && arrived at house
    const changeImage =  $('.img-container')
    .removeClass('.empty-westeros-bg')
    .addClass('.map-martell');
    
    
    setTimeout(() => {
      openHouseModal();
      console.log(`show modal`);
      $('.house-name').text(allHouses[stage].house);
      $('.house-namee').text(allHouses[stage].house);
      $('.number-of-soldiers').text(allHouses[stage].soldiers);
      $('.amount-of-gold').text(allHouses[stage].gold);
      $('.number-of-soldiers-given').text(`${army()}`);
      $('.amount-of-gold-given').text(`${coins()}`);
      $('.goal').text(allHouses[stage].goal)


       // *add button* Accept All, IF user accepts all house soldiers, gold and goal. Add all counts to the scoreboard.
      if($acceptAll.on('click', (event) => {
        populateScoreBoard(
          stage + 1,
          allHouses[stage].soldiers,
          allHouses[stage].gold
        );
      }));

    }, 2000);
  };
  // soldiers
  // if user hits accept soldiers, scoreboard soldiers count is populated
  // if user hits request more, display random response from house rejecting request and stating they will not give soldiers
  // OR have house accept request and populate scoreboard ** random **
  // gold
  // if user hits accept gold, scoreboard gold count is populated
  // if user hits request more, display random response from house rejecting request and stating they will not give gold
  // OR have house accept request and populate scoreboard ** random **
  // goal
  // if user hits accept, display modal with gendry stating yes i will give you this, or no i wont, random.
  // if user hits deny, display modal with gendry stating i cannot grant you this -  do not add ANY points to scoreboard

      // display modal template with how many soldiers and gold it has AND how many soldiers and gold they can give (plus buttons) AND show the goal of the house with buttons


      // $('.baratheon-accept').on('click', () => {
      //   // console.log(allHouses[stage].soldiers, 'line 240');
      //   // console.log(allHouses[stage].gold, 'line 241');
      //   populateScoreBoard(
      //     stage + 1,
      //     allHouses[stage].soldiers,
      //     allHouses[stage].gold
      //   );
        // exit modal screen and display empty map
      //   closeHouseModal();

      //   mapBaratheon.removeClass('map-baratheon').addClass('empty-westeros-bg');
      // });
    }, 2000);
}











  // create function for house user selections 
  // create function for changing image
  // finish game function(s) by calling the above two



  // plaing game through buttons
  const gamePlay = () => {
    stage++;
    // Change Background Image && arrived at house
    const changeImage = (removing, adding) => {
      $('.img-container').removeClass(`${removing}`).addClass(`${adding}`);
    };
    setTimeout(() => {
      openHouseModal();

      console.log(`show modal`);

      // create

      // display modal template with how many soldiers and gold it has AND how many soldiers and gold they can give (plus buttons) AND show the goal of the house with buttons


      // $('.baratheon-accept').on('click', () => {
      //   // console.log(allHouses[stage].soldiers, 'line 240');
      //   // console.log(allHouses[stage].gold, 'line 241');
      //   populateScoreBoard(
      //     stage + 1,
      //     allHouses[stage].soldiers,
      //     allHouses[stage].gold
      //   );
        // exit modal screen and display empty map
      //   closeHouseModal();

      //   mapBaratheon.removeClass('map-baratheon').addClass('empty-westeros-bg');
      // });
    }, 2000);
  };

  
  


  
  // running buttons 
   // $martellBtn.on('click', () => {
  //   gameButtons().changeImage(arg1, arg2, arg3)
  // });

  // ***** jquery ending ***** //

 
});

// scraps

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
