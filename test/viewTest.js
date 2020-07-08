var assert = chai.assert;


describe('view.js', function () {
  before(function () {
    ctx.clearRect(0, 0, 900, 600);
  });

  describe('view()', function() {
    it('Should execute list of model commands', function() {
      var modelCommands = [
        { "name":"insert", "value":1, "nodeID":0 }
      ]; 

      console.log(modelCommands);

      assert.isTrue(view(modelCommands), 'returned true');
    });
  });
});

