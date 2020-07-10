var assert = chai.assert;


describe('view-module', function () {
  before(function () {
    ctx.clearRect(0, 0, 900, 600);
  });

  
  describe('render.js', function() {
    describe('renderCreateNode()', function() {
      it('Should execute list of model commands', function() {
        var animationCommands = [];
        command = { "name":"createNode", "value":1 }

        assert.deepEqual(renderCreateNode(animationCommands, command.value),
                         ["CreateBTreeNode<;>0<;>40<;>20<;>1<;>450<;>30<;>#f4e5e8<;>#a82d43",
                         "SetText<;>0<;>1<;>0", "Step"],
                         'Should return anim commands');
      });
    });
    
    describe('renderAddValue()', function() {
      it('Should execute list of model commands', function() {
        var animationCommands = [];
        command = { "name":"addValue", "value":1, "valueIndex":1 }

        assert.deepEqual(renderAddValue(animationCommands, command.value),
                         ["SetNumElements<;>0<;>2",
                          "SetText<;>0<;>1<;>1", "Step"],
                         'Should return anim commands');
      });
    });
  });


  describe('view.js', function() {
    describe('View() given createNode command', function() {
      it('Should execute createNode command', function() {
        var modelCommands = [
          { "name":"createNode", "value":1 }
        ]; 

        const view = View();

        assert.isTrue(view.animate(modelCommands), 'should return true');
      });
    });
    
    describe('view() given createNode command and addValud command', function() {
      it('Should execute createNode command and addValue command', function() {
        const view = View();

        var modelCommands = [
          { "name":"createNode", "value":1 }
        ]; 
        assert.isTrue(view.animate(modelCommands), 'should return true');
        
        var modelCommands = [
          { "name":"addValue", "value":1, "valueIndex":1 }
        ]; 
        assert.isTrue(view.animate(modelCommands), 'should return true');
      });
    });
  });


  describe('BPlusTree.js', function() {
    describe('create new BPlusTree', function() {
      it('Should create new BPlusTree and log its to string func', function() {
        bPlusTree = BPlusTree();
        console.log(bPlusTree);

        assert.isTrue(bPlusTree.get(), 'should return true');
      });
    });
  });
});

