/** Textual markov chain generator */


class MarkovMachine {

  constructor(text) {
    if(!text){
      throw new Error("Erorr! undefined, null or null string given"); 
    }
    
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c=> c !== '');
    if(this.words.length < 3){
      throw new Error("Text must have at least three words"); 
    } 

    this.makeChains();
    this.makeChainsBigrams();

  }

  makeChains() {
    this.chains = new Map(); 
    for(let i = 0; i < this.words.length; i++){
      let word = this.words[i]; 
      let nextWord = this.words[i + 1]; 
      if(!nextWord){
        nextWord = null; 
      }

      if(!this.chains.has(word)){
        this.chains.set(word, [nextWord]);
      }
      else{
        this.chains.get(word).push(nextWord); 
      }
    }

  }

  static randElm(n){
    return Math.floor(Math.random() * n); 
  } 

  makeChainsBigrams(){
    this.chainsBigrams = new Map(); 
    for(let i = 0; i < this.words.length; i++){
      let word1 = this.words[i]; 
      let word2 = this.words[i + 1]; 
      let word3 = this.words[i + 2];

      if(!word2){
        break;
      }
      
      if(!word3){
        word3 = null; 
      }

      if(!this.chainsBigrams.has(word1 + ' ' + word2)){
        this.chainsBigrams.set(word1 + ' ' +  word2, [word3]);
      }
      else{
        this.chainsBigrams.get(word1 + ' ' + word2).push(word3); 
      }
    }

  }

  // using bigrams
  makeText(numWords = 100) {
    if(numWords < 3){
      throw new Error('Error: Cannot request less than three words')
    }
    let stateArr = Array.from(this.chainsBigrams.keys());
    let j = MarkovMachine.randElm(stateArr.length); 
    let state = stateArr[j]; 
    let text = state;
    let pastOutcome = state.split(' ')[1]; 
    let outcome = null; 

    for(let i = 1; i < numWords; i++){
      let outcomes = this.chainsBigrams.get(state); 
      if(!outcomes){
        outcomes = this.chains.get((outcome) ? outcome : pastOutcome);  
      }
      let k = MarkovMachine.randElm(outcomes.length);

      outcome = outcomes[k];
      if(i + 1 === numWords){
        text += (outcome) ? ' ' + outcome + '.' : '.';
        break;
      }

      text += (outcome) ?  ' ' + outcome : '. '; 
      
      if(outcome){
        state = pastOutcome + ' ' + outcome; 
      }
      else{
        j = MarkovMachine.randElm(stateArr.length); 
        state = stateArr[j]; 
        pastOutcome = state.split(' ')[1]; 
      } 
    }
    return text; 
  }
 
  // This is the original i made before using bigrams
  makeTextNoBigrams(numWords = 100) {
    let stateArr = Array.from(this.chains.keys());
    let j = MarkovMachine.randElm(stateArr.length); 
    let state = stateArr[j]; 
    let text = state;

    for(let i = 1; i < numWords; i++){
      let outcomes = this.chains.get(state); 
      let k = MarkovMachine.randElm(outcomes.length);
      let outcome = outcomes[k];
      
      if(i + 1 === numWords){
        text += (outcome) ? ' ' + outcome + '.' : '.';
        break;
      }

      text += (outcome) ?  ' ' + outcome : '. '; 
      
      if(outcome){
        state = outcome; 
      }
      else{
        j = MarkovMachine.randElm(stateArr.length); 
        state = stateArr[j]; 
      } 
    }
    return text; 
  }
  

}

module.exports = {MarkovMachine}; 