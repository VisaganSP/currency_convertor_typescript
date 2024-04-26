// coins is an array of Coin objects,
// mouse is an object used to track the X and Y position
// of the mouse, set with a mousemove event listener below
var coins = [],
  mouse = {
    x: 0,
    y: 0,
  };

// The Coin object used to scaffold the coins
var Coin = function (emoji) {
  this.x = -100; // Initial x position off-screen
  this.y = -100; // Initial y position off-screen
  this.node = (function () {
    var n = document.createElement("div");
    n.className = "coin";
    n.innerHTML = emoji; // Replace dot with coin emoji
    document.body.appendChild(n);
    return n;
  })();
};

// The Coin.prototype.draw() method sets the position of
// the object's <div> node
Coin.prototype.draw = function () {
  this.node.style.left = this.x + "px";
  this.node.style.top = this.y + "px";
};

// Creates the Coin objects, populates the coins array
var moneyEmojis = ["💰", "💸", "🪙", "🤑", "💵"];
for (var i = 0; i < 5; i++) {
  var c = new Coin(moneyEmojis[i]);
  coins.push(c);
}

// This is the screen redraw function
function draw() {
  // Make sure the mouse position is set everytime
  // draw() is called.
  var x = mouse.x,
    y = mouse.y;

  // This loop is where all the 90s magic happens
  coins.forEach(function (coin, index, coins) {
    var nextCoin = coins[index + 1] || coins[0];

    coin.x = x;
    coin.y = y;
    coin.draw();
    x += (nextCoin.x - coin.x) * 0.8;
    y += (nextCoin.y - coin.y) * 0.8;
  });
}

var container = document.querySelector(".container");

container.addEventListener("mousemove", function (event) {
  //event.preventDefault();
  mouse.x = event.pageX;
  mouse.y = event.pageY;
});

// animate() calls draw() then recursively calls itself
// everytime the screen repaints via requestAnimationFrame().
function animate() {
  draw();
  requestAnimationFrame(animate);
}

// And get it started by calling animate().
animate();
