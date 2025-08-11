export const translations = {
  en: {
    title: "is it worth automating",
    heroTitle: "is it worth automating this task?",
    heroSubtitle:
      "calculate if building automation will actually save you time in the long run",

    formulaTitle: "the math",
    formula: "automation time ≤ manual time × repetitions",

    inputTitle: "your task",
    automationLabel: "time to build automation (minutes)",
    manualLabel: "time per manual execution (minutes)",
    repetitionsLabel: "how many times will you do this?",

    readyToCalculate: "ready to calculate",
    fillInputs: "fill out the numbers to see if it's worth it",

    share: "share result",
    copied: "copied!",

    worthResult: "worth it",
    notWorthResult: "not worth it",

    timeSaved: "time saved:",
    timeLost: "time wasted:",

    hours: "h ",
    minutes: "min",

    footerText: "simple math for automation decisions",
  },

  pl: {
    title: "is it worth automating",
    heroTitle: "czy warto to zautomatyzować?",
    heroSubtitle:
      "sprawdź czy napisanie automatyzacji rzeczywiście ci się opłaci",

    formulaTitle: "wzór",
    formula: "czas automatyzacji ≤ czas ręczny × powtórzenia",

    inputTitle: "twoje zadanie",
    automationLabel: "czas na napisanie automatyzacji (minuty)",
    manualLabel: "czas jednego ręcznego wykonania (minuty)",
    repetitionsLabel: "ile razy będziesz to robić?",

    readyToCalculate: "gotowe do obliczenia",
    fillInputs: "wpisz liczby żeby sprawdzić czy się opłaca",

    share: "udostępnij wynik",
    copied: "skopiowano!",

    worthResult: "opłaca się",
    notWorthResult: "nie opłaca się",

    timeSaved: "zaoszczędzisz:",
    timeLost: "stracisz:",

    hours: "h ",
    minutes: "min",

    footerText: "prosta matematyka dla decyzji o automatyzacji",
  },
};

export const detectLanguage = () => {
  const isPoland =
    navigator.language?.startsWith("pl") ||
    Intl.DateTimeFormat().resolvedOptions().timeZone === "Europe/Warsaw";
  return isPoland ? "pl" : "en";
};
