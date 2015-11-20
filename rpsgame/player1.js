if (Meteor.isClient) {
  Template.player1.helpers({
	//game message
    message: function () {
	  var play1 = Rps.findOne({'_id':'1'});
	  if(play1==null||play1.play==null) return "Player 1 make your move";
	  var play2 = Rps.findOne({'_id':'2'});
	  if(play2==null||play2.play==null) return "You have played "+play1.play+" waiting on player 2";
	  //game logic
	  if(play1.play=="rock"&&play2.play=="rock")return "tie";
	  if(play1.play=="rock"&&play2.play=="paper")return "you lose";
	  if(play1.play=="rock"&&play2.play=="scissors")return "you win!";
	  if(play1.play=="paper"&&play2.play=="rock")return "you win!";
	  if(play1.play=="paper"&&play2.play=="paper")return "tie";
	  if(play1.play=="paper"&&play2.play=="scissors")return "you lose";
	  if(play1.play=="scissors"&&play2.play=="rock")return "you lose";
	  if(play1.play=="scissors"&&play2.play=="paper")return "you win!";
	  if(play1.play=="scissors"&&play2.play=="scissors")return "tie";
	  return "something went wrong player 1: "+play1.play+" player 2: "+play2.play;
    }
  });
  //handles buttons and calls updatedb to update the mongo database
  Template.player1.events({
    'click .rock': function () {
	  updatedb(Rps, "rock");
    },
	'click .paper': function () {
      updatedb(Rps, "paper");
    },
	'click .scissors': function () {
	  updatedb(Rps, "scissors");
	}
  });
}
//insert if player not found, update if it is found
function updatedb(db, move){
  var play1 = db.findOne({'_id':'1'});
  if(play1==null){
    db.insert({
	  _id:'1',
	  play:move
    });
  }
  else{
    db.update(
	  {'_id' : '1'}, 
	  {$set:{'play':move}}	
    );  
  }
}