let wordsTable = document.querySelector("#tableItems"),
    subjectTitle = document.querySelector(".tableTitle"),
    playersTable = document.querySelector("#playersTable"),
    playerNameInput = document.querySelector("#popupInput"),
    popupContainer = document.querySelector(".popupContainer"),
    currentPlayers = [],
    clientPlayer,
    socket = io()