import React, { Component } from 'react';
import logo from '../image/logo.png';
export class Help extends Component {

    render() {
        return (
            <div className="bgimg">

                <img style={{
                    position:'absolute'}} src={logo}/>

                <div className="white"  style={{
                    position:'absolute',
                    width: '475px',
                    height: '540px',
                    backgroundColor: 'wheat',
                    marginLeft: '340px',
                    marginTop:'50px',
                    marginBottom:'100px',
                    borderRadius: '10%'
                }}>
                    <div className="button">
                            <h2 style={{
                                marginLeft:'130px'}}>Game Play</h2>
                        <p>1. There can be between 3 and 6 players.<br></br>
                            2. Players can be other users, or AI.<br></br>
                            3. The game commences when word of 2 or more letters (horizontally or vertically)
                            in placed in the center square.<br></br>
                            4. The game continues in rounds, where each player gets to take an action; place a word,
                            skip their turn, or swap their tiles out for new ones from the tile bag.<br></br>
                            5. In the case where two players try and place a word in the same place, either the first
                            person to place a word gets the spot or if they placed at the same time, the word
                            with the highest score gets the position.<br></br>
                            6. Placing a word will happen all at once; no one will see you placing tiles until you click
                            'play'and your entire word will appear on their screen..<br></br>
                            7. New words must be at least of length 2, and must create words from left to right or
                            from top to bottom with any tiles that the new word’s tiles are adjacent to.<br></br>
                            8. No tile may be replaced after it has been played.<br></br>
                            9. The game ends when all letters have been drawn from the bag and one player
                            uses the last letter, or all possible plays have been made.</p>

                    </div>
                </div>
                <div className="white"  style={{
                    position:'absolute',
                    width: '475px',
                    height: '540px',
                    backgroundColor: 'wheat',
                    marginLeft: '830px',
                    marginTop:'50px',
                    marginBottom:'100px',
                    borderRadius: '10%'
                }}>
                    <h2 style={{
                        marginLeft:'175px'}}>Scoring</h2>
                    <p>1. The score box on the game page shows each player’s score. The score value of
                        each letter is indicated by a number at the bottom of the tile.<br></br>
                        2. The score for each turn is the sum of the letter values in each word(s) formed or
                        modified on that turn. If the letter is placed on the bonus squares, the score of letter or
                        word will be doubled or tripled.<br></br>
                        3. Letter and word premiums count only on the turn in which they are played. On later
                        turns, letters already played on premium squares count at face value.<br></br>
                        4. When two or more words are formed in the same play, each is scored. The common
                        letter is counted (with full premium value)for each word.<br></br>
                        5. Unplayed letters: when the game ends, each player’s score is reduced by the sum of the
                        unplayed letters. In addition, if a player has used all of his or her letters, the sum
                        of the other players’ unplayed letters are added to that player’s score.<br></br>
                        6. The player with the highest score wins the game. In the case of a tie, the player
                        with the highest score before adding or deducting unplayed letters wins.</p>
                </div>
            </div>
        );
    }

}
