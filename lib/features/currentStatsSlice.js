import { createSlice } from "@reduxjs/toolkit";

const currentStatsSlice = createSlice({
  name: "currentStats",
  initialState: {
    currentSentence: "",
    keyPressCounter: 0,
    keyPerMinute: 0,
    score: 0,
    accuracy: 0,
    errorsCounter: 0,
    time: {
      timer: 0,
      isRunning: false,
    },
    isCurrentScoreSaved: false,
    sentences: {
      it: [
        {
          sentence:
            "Ci sono due grandi tragedie nella vita: una è non ottenere ciò che si vuole, l'altra è ottenerlo.",
          author: "Oscar Wilde",
        },
        {
          sentence:
            "Ogni volta che la gente è d'accordo con me provo la sensazione di avere torto.",
          author: "Oscar Wilde",
        },
        {
          sentence:
            "Conversare sul tempo è l'ultimo rifugio di chi non ha immaginazione.",
          author: "Oscar Wilde",
        },
        {
          sentence:
            "Adoro i piaceri semplici. Sono l'ultimo rifugio delle persone complicate.",
          author: "Oscar Wilde",
        },
        {
          sentence:
            "Alcuni portano la felicità ovunque vadano. Altri quando se ne vanno.",
          author: "Oscar Wilde",
        },
        {
          sentence:
            "Non è nelle stelle che è conservato il nostro destino, ma in noi stessi.",
          author: "William Shakespeare",
        },
        {
          sentence:
            "Non esistono né il bene né il male, ma il pensiero che li rende tali.",
          author: "William Shakespeare",
        },
        {
          sentence:
            "Eretico non è colui che brucia nel fuoco, ma colui che lo accende.",
          author: "William Shakespeare",
        },
        {
          sentence:
            "La vera sostanza dell'ambizione è semplicemente l'ombra di un sogno.",
          author: "William Shakespeare",
        },
        {
          sentence:
            "Sappiamo ciò che siamo, ma non sappiamo quello che potremmo essere.",
          author: "William Shakespeare",
        },
        {
          sentence:
            "Vivere è soffrire, sopravvivere è trovare un senso nella sofferenza.",
          author: "Friedrich Nietzsche",
        },
        {
          sentence:
            "Che cos'è per te la cosa più umana? Risparmiare vergogna a qualcuno.",
          author: "Friedrich Nietzsche",
        },
        {
          sentence:
            "Il peggior nemico che tu possa incontrare sarà sempre te stesso.",
          author: "Friedrich Nietzsche",
        },
        {
          sentence:
            "Nella realtà non avviene nulla che corrisponda rigorosamente alla logica.",
          author: "Friedrich Nietzsche",
        },
        {
          sentence:
            "Nessuno è più inferiore di quelli che insistono per essere uguali.",
          author: "Friedrich Nietzsche",
        },
        {
          sentence:
            "Dimenticare il proprio scopo è la forma più comune di stupidità.",
          author: "Friedrich Nietzsche",
        },
        {
          sentence:
            "Ci vuole qualcosa di più che l'intelligenza per agire in modo intelligente.",
          author: "Fëdor Dostoevskij",
        },
        {
          sentence:
            "Fare un nuovo passo, pronunciare una nuova parola, è ciò che la gente teme di più.",
          author: "Fëdor Dostoevskij",
        },
        {
          sentence:
            "La vita è un paradiso, e noi tutti siamo in paradiso, ma ci rifiutiamo di vederlo.",
          author: "Fëdor Dostoevskij",
        },
        {
          sentence:
            "Se tutto sulla Terra fosse razionale, non accadrebbe nulla.",
          author: "Fëdor Dostoevskij",
        },
        {
          sentence: "Se vuoi battere il mondo intero, batti te stesso.",
          author: "Fëdor Dostoevskij",
        },
        {
          sentence:
            "Giusto o sbagliato che sia, è molto piacevole rompere qualcosa ogni tanto.",
          author: "Fëdor Dostoevskij",
        },
        {
          author: "Mark Twain",
          sentence: "Se dici sempre la verità, non devi ricordare nulla.",
        },
        {
          author: "Mark Twain",
          sentence:
            "Il miglioramento continuo è meglio della perfezione in ritardo.",
        },
        {
          author: "Mark Twain",
          sentence:
            "Quando ti trovi d'accordo con la maggioranza, è il momento di fermarti e riflettere.",
        },
        {
          author: "Mark Twain",
          sentence:
            "Non permettere a nessuno di essere la tua priorità intanto che permetti a te stesso di essere una delle sue opzioni.",
        },
        {
          author: "Emily Dickinson",
          sentence:
            "Quando sentiamo il bisogno di un abbraccio, dobbiamo correre il rischio di chiederlo.",
        },
        {
          author: "Emily Dickinson",
          sentence:
            "Se potrò impedire a un cuore di spezzarsi non avrò vissuto invano.",
        },
        {
          author: "Emily Dickinson",
          sentence:
            "Quello che non tornerà mai più è proprio ciò che rende la vita così dolce.",
        },
        {
          author: "Emily Dickinson",
          sentence:
            "La fortuna non è dovuta al caso ma alla fatica, il costoso sorriso della buona sorte si deve guadagnare.",
        },
        {
          author: "Emily Dickinson",
          sentence:
            "Il comportamento è ciò che conta di una persona, non ciò che pensa, sente o crede.",
        },
        {
          author: "Virginia Woolf",
          sentence:
            "Gli occhi degli altri sono le nostre prigioni; i loro pensieri le nostre gabbie.",
        },
        {
          author: "Virginia Woolf",
          sentence:
            "Crescere è perdere alcune illusioni, per acquisirne altre.",
        },
        {
          author: "Virginia Woolf",
          sentence:
            "Ho avuto un istante di grande pace. Forse è questa la felicità.",
        },
        {
          author: "Virginia Woolf",
          sentence:
            "Una persona che continua a cambiare è una persona che continua a vivere.",
        },
        {
          author: "Virginia Woolf",
          sentence:
            "Se non dici la verità su te stesso non potrai dirla neanche sulle altre persone.",
        },
      ],
      en: [
        {
          sentence:
            "There are only two tragedies in life: one is not getting what one wants, and the other is getting it.",
          author: "Oscar Wilde",
        },
        {
          sentence:
            "Whenever people agree with me I always feel I must be wrong.",
          author: "Oscar Wilde",
        },
        {
          sentence:
            "Conversation about the weather is the last refuge of the unimaginative.",
          author: "Oscar Wilde",
        },
        {
          sentence:
            "I adore simple pleasures. They are the last refuge of the complex.",
          author: "Oscar Wilde",
        },
        {
          sentence:
            "Some cause happiness wherever they go; others whenever they go.",
          author: "Oscar Wilde",
        },
        {
          sentence:
            "It is not in the stars to hold our destiny but in ourselves.",
          author: "William Shakespeare",
        },
        {
          sentence:
            "There is nothing either good or bad, but thinking makes it so.",
          author: "William Shakespeare",
        },
        {
          sentence:
            "It is an heretic that makes the fire, not she which burns in't.",
          author: "William Shakespeare",
        },
        {
          sentence:
            "The very substance of the ambitious is merely the shadow of a dream.",
          author: "William Shakespeare",
        },
        {
          sentence: "We know what we are, but know not what we may be.",
          author: "William Shakespeare",
        },
        {
          sentence:
            "To live is to suffer, to survive is to find some meaning in the suffering.",
          author: "Friedrich Nietzsche",
        },
        {
          sentence:
            "What do you regard as most humane? To spare someone shame.",
          author: "Friedrich Nietzsche",
        },
        {
          sentence: "The worst enemy you can meet will always be yourself.",
          author: "Friedrich Nietzsche",
        },
        {
          sentence:
            "Nothing happening in reality corresponds strictly to logic.",
          author: "Friedrich Nietzsche",
        },
        {
          sentence:
            "Nobody is more inferior than those who insist on being equal.",
          author: "Friedrich Nietzsche",
        },
        {
          sentence:
            "To forget one's purpose is the commonest form of stupidity.",
          author: "Friedrich Nietzsche",
        },
        {
          sentence:
            "It takes something more than intelligence to act intelligently.",
          author: "Fëdor Dostoevskij",
        },
        {
          sentence:
            "Taking a new step, uttering a new word, is what people fear most.",
          author: "Fëdor Dostoevskij",
        },
        {
          sentence:
            "Life is paradise, and we are all in paradise, but we refuse to see it.",
          author: "Fëdor Dostoevskij",
        },
        {
          sentence:
            "If everything on Earth were rational, nothing would happen.",
          author: "Fëdor Dostoevskij",
        },
        {
          sentence:
            "If you want to overcome the whole world, overcome yourself.",
          author: "Fëdor Dostoevskij",
        },
        {
          sentence:
            "Right or wrong, it's very pleasant to break something from time to time.",
          author: "Fëdor Dostoevskij",
        },
        {
          author: "Mark Twain",
          sentence:
            "If you tell the truth, you don't have to remember anything.",
        },
        {
          author: "Mark Twain",
          sentence: "Continuous improvement is better than delayed perfection.",
        },
        {
          author: "Mark Twain",
          sentence:
            "Whenever you find yourself on the side of the majority, it is time to pause and reflect.",
        },
        {
          author: "Mark Twain",
          sentence:
            "Never allow someone to be your priority while allowing yourself to be their option.",
        },
        {
          author: "Emily Dickinson",
          sentence:
            "When we feel the need of a hug, we must take the chance to ask.",
        },
        {
          author: "Emily Dickinson",
          sentence:
            "If I can stop one heart from breaking, I shall not live in vain.",
        },
        {
          author: "Emily Dickinson",
          sentence:
            "That it will never come again is what makes life so sweet.",
        },
        {
          author: "Emily Dickinson",
          sentence:
            "Luck is not chance, it's toil; fortune's expensive smile is earned.",
        },
        {
          author: "Emily Dickinson",
          sentence:
            "Behavior is what a man does, not what he thinks, feels, or believes.",
        },
        {
          author: "Virginia Woolf",
          sentence: "The eyes of others our prisons; their thoughts our cages.",
        },
        {
          author: "Virginia Woolf",
          sentence:
            "Growing up is losing some illusions, in order to acquire others.",
        },
        {
          author: "Virginia Woolf",
          sentence: "I had a moment of great peace. Maybe this is happiness.",
        },
        {
          author: "Virginia Woolf",
          sentence:
            "A self that goes on changing is a self that goes on living.",
        },
        {
          author: "Virginia Woolf",
          sentence:
            "If you do not tell the truth about yourself you cannot tell it about other people.",
        },
      ],
    },
    restarter: 0,
  },
  reducers: {
    restart: (state) => {
      state.score = 0;
      state.currentSentence = "";
      state.keyPressCounter = 0;
      state.accuracy = 0;
      state.errorsCounter = 0;
      state.keyPerMinute = 0;
      state.time = { timer: 0, isRunning: false };
      state.restarter += 1;
      state.isCurrentScoreSaved = false;
    },
    startTimer: (state) => {
      state.time.isRunning = true;
    },
    stopTimer: (state) => {
      state.time.isRunning = false;
    },
    incrementTimer: (state) => {
      state.time.timer += 1;
    },
    increaseKeyPressCounter: (state) => {
      state.keyPressCounter += 1;
    },
    increaseErrorsCounter: (state) => {
      state.errorsCounter += 1;
    },
    updateComplexStats: (state, action) => {
      const { accuracy, keyPerMinute, score } = action.payload;
      state.score = score;
      state.accuracy = accuracy;
      state.keyPerMinute = keyPerMinute;
    },
    saveScore: (state) => {
      state.isCurrentScoreSaved = true;
    },
  },
});
const { actions, reducer } = currentStatsSlice;
export const {
  restart,
  increaseKeyPressCounter,
  increaseErrorsCounter,
  incrementTimer,
  startTimer,
  stopTimer,
  updateComplexStats,
  saveScore,
} = actions;
export default reducer;
