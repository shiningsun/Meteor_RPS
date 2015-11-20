if (Meteor.isClient) {
  Template.player2.helpers({
	//game message
    message: function () {
	  var play2 = Rps.findOne({'_id':'2'});
	  if(play2==null||play2.play==null) return "Player 2 make your move";
	  var play1 = Rps.findOne({'_id':'1'});
	  if(play1==null||play1.play==null) return "You have played "+play1.play+" waiting on player 2";
	  //game logic
	  if(play2.play=="rock"&&play1.play=="rock")return "tie";
	  if(play2.play=="rock"&&play1.play=="paper")return "you lose";
	  if(play2.play=="rock"&&play1.play=="scissors")return "you win!";
	  if(play2.play=="paper"&&play1.play=="rock")return "you win!";
	  if(play2.play=="paper"&&play1.play=="paper")return "tie";
	  if(play2.play=="paper"&&play1.play=="scissors")return "you lose";
	  if(play2.play=="scissors"&&play1.play=="rock")return "you lose";
	  if(play2.play=="scissors"&&play1.play=="paper")return "you win!";
	  if(play2.play=="scissors"&&play1.play=="scissors")return "tie";
	  return "something went wrong player 1: "+play1.play+" player 2: "+play2.play;
    }
  });
  //handles buttons and calls updatedb to update the mongo database
  Template.player2.events({
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
  var play2 = db.findOne({'_id':'2'});
  if(play2==null){
    db.insert({
	  _id:'2',
	  play:move
    });
  }
  else{
    db.update(
	  {'_id' : '2'}, 
	  {$set:{'play':move}}	
    );  
  }
}