"use strict";

var numbers = [];
var words = "";

$("#submitBtn").on("click", submitForm);
$("#resetBtn").on("click", resetForm);

function submitForm() {
  event.preventDefault();
  var inputValue = $("#inputField").val();
  if (isNaN(Number(inputValue))) {
    words = words + inputValue + " ";
    displayConcatenation();
    displayWordFrequency();
  } else {
    if (inputValue !== "") {
      numbers.push(Number(inputValue));  
    } 
    displayStats();
  }
  $("#inputField").val("");
}

function resetForm() {
  event.preventDefault();
  numbers = [];
  words = "";
  $("#inputField").val("");
  displayStats();
  displayConcatenation();
  displayWordFrequency();
}

function displayStats() {
  var sum = 0;
  for (var i = 0; i < numbers.length; i++) {
    sum += Number(numbers[i]);
  }
  $("#count").html(numbers.length);
  $("#sum").html(sum);
  if (numbers.length === 0) {
    $("#average").html("0");
  } else {
    $("#average").html(sum / numbers.length);
  }
}

function displayConcatenation() {
  $("#concatenatedWords").html(words);
}

function displayWordFrequency() {
  var wordCounter = {};
  var arrayOfWords = words.split(" ");   
  for (var i = 0; i < arrayOfWords.length; i++) {
    var word = arrayOfWords[i].trim(); 
    if (word !== "") {
      if (word in wordCounter) {
        ++wordCounter[word];
      } else {
        wordCounter[word] = 1;
      }      
    }
  }
  
  var sortedWordsByCount = Object.keys(wordCounter).sort(function(a, b) {
    return wordCounter[b] - wordCounter[a];
  });
  
  var tbody = $("#word-counter-tbody");
  tbody.html("");
  for (var i = 0; i < sortedWordsByCount.length; i++) {
    var tr = $("<tr>");
    var td = $("<td>").text(sortedWordsByCount[i]);
    tr.append(td);
    td = $("<td>").text(wordCounter[sortedWordsByCount[i]]);
    tr.append(td); 
    tbody.append(tr);
  }
}


