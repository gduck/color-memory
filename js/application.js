(function () {

  var cwidth = 450;
  var cheight = 550;
  var ctx, canvas;

  var deck = [ ];
  var cardSelected = 12;

  var firstPick = false;
  var firstCard;
  var secondCard;
  var drawFront = false;
  var pickAgain = true;
  var canvasFocus = true;

  var score = 0; //counting scores
  var matched = 0;

  var NUM_COLS = 4;
  var NUM_ROWS = 4;
  var cardwidth = 80;
  var cardheight = 100;
  var margin = 30;

  var backImg = new Image();
  backImg.src = "../img/card_bg.gif";

  var pics = [
        "../img/colour1.gif",
        "../img/colour2.gif",
        "../img/colour3.gif",
        "../img/colour4.gif",
        "../img/colour5.gif",
        "../img/colour6.gif",
        "../img/colour7.gif",
        "../img/colour8.gif"
  ];

  ctx = document.getElementById('canvas').getContext('2d'); 
  canvas = document.getElementById('canvas');
  
  function Card(sx, sy, img, info) {
    this.sx = sx;
    this.sy = sy;
    this.info = info;
    this.img = img;

    this.selected = false;
    this.matched = false;

    // functions
    this.draw = drawImg;
    this.outline = drawOutline;
    this.clear = clearCard;
  }

  //generate deck of cards
  function makedeck() {
    var cardCounter = 0;
  
    for (var i = 0; i < NUM_COLS; i++) {
      for (var j = 0; j < NUM_ROWS; j++) {

        pic = new Image();

        var pairNumber = Math.floor(cardCounter/2);
        pic.src = pics[pairNumber];

        deck.push(new Card(20 + i * (cardwidth + margin), 30 + j * (cardheight + margin), pic, cardCounter));
        cardCounter++;
      }
    }

    for (var i = 0; i < deck.length; i++) {
      deck[i].draw();
      deck[i].outline();
    }  

    deck[cardSelected].selected = true;
    deck[cardSelected].outline();
  }

  function shuffle() {
  //swaps the changing information: the img and the info indicating the matching
    var j, k;
    var holderinfo;
    var holderimg;
    var max = deck.length;

    for (var i = 0; i < max * 3 ; i++) {  
      //do the swap 3 times deck.length times
      j = Math.floor(Math.random() * max);
      k = Math.floor(Math.random() * max);

      holderinfo = deck[j].info;
      holderimg = deck[j].img;

      deck[j].info = deck[k].info;
      deck[j].img = deck[k].img;

      deck[k].info = holderinfo;
      deck[k].img = holderimg;
    }
  }

  function drawImg() {
    var drawImg;

    if (drawFront || this.matched) {
      drawImg = this.img;
    } else {
      drawImg = backImg;
    }

    ctx.drawImage(drawImg,this.sx,this.sy, cardwidth, cardheight); 
    if (this.matched) {
      ctx.strokeStyle = "black";
      ctx.font = "18px serif";
      ctx.fillText("matched", this.sx + 8, this.sy + 55);
    }

  }

  function drawOutline() {
    ctx.lineWidth = 5;

    if (this.matched) {
      console.log("MATCHED!!");
      ctx.strokeStyle = '#00FF00';
    } 
    if (this.selected) {
      console.log("SELECTED!!");
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 5;
    }  else {
      console.log("NOT SELECTED or matched");
      ctx.strokeStyle = '#000000';
    }

    ctx.strokeRect(this.sx, this.sy, cardwidth, cardheight);    
  }

  function clearCard() {
    ctx.clearRect(this.sx - 5,this.sy - 5,cardwidth + 10,cardheight + 10);
  }

  $("#canvas").bind({
    keydown: function(e) {
      var key = e.keyCode;
      updateCards(e.keyCode);
    }
  });

  function updateCards(keyCode) {

    switch(keyCode) {
      case 37:
      // left
        console.log("left");
        if (cardSelected > 3) {

          deck[cardSelected].selected = false;
          deck[cardSelected].outline();
          cardSelected = cardSelected - 4;
          deck[cardSelected].selected = true;
          deck[cardSelected].outline();

        }
        break;

      case 38:
      // up
        console.log("up");
        if ((cardSelected != 0) &&
          (cardSelected != 4) &&
          (cardSelected != 8) &&
          (cardSelected != 12)) {

          deck[cardSelected].selected = false;
          deck[cardSelected].outline();
          cardSelected--;
          deck[cardSelected].selected = true;
          deck[cardSelected].outline();

        }
        break;

      case 39:
      // right
        console.log("right");
        if (cardSelected < 12) {
          deck[cardSelected].selected = false;
          deck[cardSelected].outline();
          cardSelected = cardSelected + 4;
          deck[cardSelected].selected = true;
          deck[cardSelected].outline();
        }
        break;

      case 40:
      // down
        console.log("down");
        if ((cardSelected != 3) &&
          (cardSelected != 7) &&
          (cardSelected != 11) &&
          (cardSelected != 15)) {

          deck[cardSelected].selected = false;
          deck[cardSelected].outline();
          cardSelected++;
          deck[cardSelected].selected = true;
          deck[cardSelected].outline();

        }
        break;

      case 9:
        console.log("tab");
        // toggle between start & canvas
        // didn't get to this
        if (canvasFocus) {
          $("#canvas").focus();
        } else {
          $("#playButton").focus();
        }
        canvasFocus != canvasFocus;
        break;

      case 13:
      // enter
        console.log("enter");

        // make sure all cards have been redrawn
        // can't select if already matched
        if ((!pickAgain) || (deck[cardSelected].matched) || (cardSelected == firstCard)) {
          break;
        }

        // firstPick starts off false
        firstPick = !firstPick;
        console.log("first pick " + firstPick);

        drawFront = true;
        deck[cardSelected].draw();
        drawFront = false;

        if (firstPick) {
          firstCard = cardSelected;
        } else {
          secondCard = cardSelected;

          score++;
          $('#score').val(score);

          if (deck[firstCard].img.src == deck[secondCard].img.src) {
            deck[firstCard].matched = true; 
            deck[firstCard].draw(); 

            deck[secondCard].matched = true;
            deck[secondCard].draw();

            msgAnimation('<span>Match!</span>');
            matched++;
            if (matched == 8) {
              wonGame();
            }
          } else {
            msgAnimation('<span>No Match!</span>');
            pickAgain = false;

            setTimeout(function() {
              deck[firstCard].draw();
              deck[firstCard].outline();
              deck[secondCard].draw();              
              deck[secondCard].outline();
              pickAgain = true;
            }, 1000);

          }
        }
        break;

      default:
        console.log("other");
    }
  }

  function msgAnimation(text){
    $("#msg").html(text);
    $('#msg').show().css({'left': '0px', 'top': '0px'});
    $('#msg').animate({left:'50%', top:'50%'}).animate({left:'0%', top:'0%'}).fadeOut(1000);
  }

  function wonGame() {
    $('#scoreInput').val(score);
    setTimeout(function() {
      msgAnimation('<span>Congratulations! You won the game!</span>');
    }, 1500);
    var name = prompt("Congratulations! Please enter your name");
    $('#nameInput').val(name);
    // simulate enter
    // bit of a hack sorry
    var e = jQuery.Event("keypress");
    e.keyCode = 13;
    $('#scoreInput').trigger(e);
  }  

  function init() {
    matched = 0;
    score = 0;
    ctx.clearRect(0, 0, cwidth, cheight);
    // $("#msg").empty();
    makedeck();
    shuffle();  
    $("#canvas").focus();
  }
  
  $('#tablescore input[type="button"]').click(function () {
    this.form.reset();
    init();
  });

}());