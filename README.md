:dancer:
:upside_down_face:

# App Title: GOT-Board-Game
Game of Thrones Themed Board Game. I do not own rights to images or media utilized.

### App Demo: https://rcowe.github.io/GOT-Board-Game/

## Concept:

Single player click game. Ten years have passed since the Burning of King's Landing. Queen Cersei is presumed dead. Queen Daenerys lived, she and King Ageon Targaryan (formerly Jon Snow) of Crown House Targaryan, now rule the 6 kingdoms. Winterfell is independent of the crown, and is ruled by the Queen in the North, Sansa Stark of House Stark. Almost all houses have been re-established, all except house Frey. The Twins are home to an Inn for wary travelers. Since that fateful day, Queen Daenerys's actions have been questionable. She is cruel, unjust and paranoid. Someome must stop her. I, Gendry Baratheon (formerly, Rivers) of House Baratheon will rise against her. 
I am embarking on a journey to obtain support for my cause, will you help me?

TLDR: GOT with a better ending...


## Technologies Used:

* HTML
* CSS
* JavaScript 
* jQuery

##### Credits:

    https://www.hbo.com/game-of-thrones


## Approach:

#### Overview

Sudo Text to guide myself:

##### Set-up

Step 1. In html add background -- done.
Step 2. Write storyline into html (Modals, Buttons, etc) -- done
Step 3. Create modal, that shows up upon loading page (figure out how to add images within modal) -- done, went with button to initialize
Step 4. In HTML, write DIVs for each house, add sigil image -- done
Step 5. Add css standard items -- done
Step 6. Position house sigils in correct locations -- done
Step 7. Make the sigils click-able OR place sigils and have user image show up when button is clicked to move through each location done, went with 2
Step 8. Generate text box for user to interact with houses at location -- created modals
Step 9. Create user scoreboard image/box -- done

##### Game play

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

#### User stories

![alt text](/Users/rosa/all-code/projects/GOT-board-Game/GOT-UserStory.png)

#### Minimum Viable Product

* Built with HTML, CSS, JavaScript and jQuery (this game will be played using the DOM, not the console)
* Hosted on github pages
* Commits to github every day
* A **readme.md** with explanations of the technologies used, the approach taken, a link to your live site, installation instructions, unsolved problems, etc.



#### Stretch goals

TBC 
* Two player game, can be user against computer.
* Have a win state
* Have a lose state
* A way to keep playing if game is not over 

## Challenges:

So many. 

### App Demo: https://rcowe.github.io/GOT-Board-Game/
