var assert = chai.assert;


describe('view-module', function () {
  before(function () {
    ctx.clearRect(0, 0, 900, 600);
  });

  
  describe('render.js', function() {
    describe('renderInsert()', function() {
      it('Should execute list of model commands', function() {
        command = { "name":"insert", "value":1, "nodeID":0 }

        assert.isTrue(renderInsert(command), 'returned true');
      });
    });
  });


  describe('view.js', function() {
    describe('view()', function() {
      it('Should execute list of model commands', function() {
        var modelCommands = [
          { "name":"insert", "value":1, "nodeID":0 }
        ]; 

        assert.isTrue(view(modelCommands), 'returned true');
      });
    });
  });
});

