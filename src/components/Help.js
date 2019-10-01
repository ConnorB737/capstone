import React, { Component } from 'react';
import {Link} from "react-router-dom";
import logo from '../image/logo.png';
export class Help extends Component {

    render() {
        return (
            <div>
                <img style={{
                    position:'absolute'}} src={logo}/>

                <div className="white"  style={{
                    position:'absolute',
                    width: '370px',
                    height: '520px',
                    backgroundColor: 'white',
                    marginLeft: '400px',
                    marginTop:'50px',
                    marginBottom:'100px',
                    borderRadius: '10%'
                }}>
                    <div className="button">
                        {/*<Link to="/Help">*/}
                            {/*<button*/}
                                {/*style={{*/}
                                    {/*width: '580px',*/}
                                    {/*height: '120px',*/}
                                    {/*fontSize: '50px',*/}
                                    {/*backgroundColor: 'wheat',*/}
                                    {/*marginLeft: '78px',*/}
                                    {/*marginTop: '36px'*/}
                                {/*}}id="check">Check Rules</button>*/}
                            <h1 style={{
                                marginLeft:'85px'}}>Game Play</h1>
                        <p>1. There can be between 3 and 6 players
                            2. Players can be other users, or versus the computer
                            3. The game commences when word of 2 or more letters (horizontally or vertically,
                            diagonally now allowed) in placed in the center square. As turns can be taken in parallel,
                            this is merely the first person to place a word.4. The game continues in rounds, where each player gets to take an action; place a word,
                            skip their turn, or swap their tiles out for new ones from the tile bag. Once every player
                            has taken an action, the next round begins.
                            5. In the case where two players try and place a word in the same place, either the first
                            person to place a word gets the spot or if they placed at the exact same time, the word
                            with the highest score gets the position.
                            6. Placing a word will happen all at once; no one will see you placing tiles until you click
                            ‘play’ and your entire word will appear on their screen.
                            7. New words must be at least of length 2, and must create words from left to right or
                            from top to bottom with any tiles that the new word’s tiles are adjacent to.
                            8. No tile may be shifted or replaced after it has been played and scored
                            9. The game ends when all the letters have been drawn from the tile bag and one player
                            uses his or her last letter, or when all possible plays have been made.</p>
                        {/*</Link>*/}

                    </div>
                </div>
                <div className="white"  style={{
                    position:'absolute',
                    width: '370px',
                    height: '520px',
                    backgroundColor: 'white',
                    marginLeft: '830px',
                    marginTop:'50px',
                    marginBottom:'100px',
                    borderRadius: '10%'
                }}>
                    <h1 style={{
                        marginLeft:'120px'}}>Scoring</h1>
                    <p>1. The score box on the game page shows each player’s score. The score value of value of
                        each letter is indicated by a number at the bottom of the tile.
                        2. The score for each turn is the sum of the letter values in each word(s) formed or
                        modified on that turn. If the letter is placed on the bonus squares, the score of letter or
                        the whole word will be doubled or tripled.
                        3. Letter and word premiums count only on the turn in which they are played. On later
                        turns, letters already played on premium squares count at face value.
                        4. When two or more words are formed in the same play, each is scored. The common
                        letter is counted (with full premium value, if any) for each word.
                        5. Unplayed letters: when the game ends, each player’s score is reduced by the sum of his
                        or her unplayed letters. In addition, if a player has used all of his or her letters, the sum
                        of the other players’ unplayed letters are added to that player’s score.
                        6. The player with the highest final score wins the game. In the case of a tie, the player
                        with the highest score before adding or deducting unplayed letters wins.</p>
                </div>
            </div>
        );
    }

}
