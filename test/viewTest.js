var assert = chai.assert;


describe('view-module', function () {
  describe('view.js', function() {
    before(function () {
      ctx.clearRect(0, 0, 900, 600);
    });





    describe('renderCreateNode()', function() {
      it('Should execute list of model commands', function() {
        const view = View();
        command = { "name":"createNode", "value":1 };
        modelCommands = [];


        modelCommands.push(command)

    
        view.animate(modelCommands);     
      });
    });

    describe('renderCreateRoot()', function() {
      it('Should result in root being animated', function() {
        //const view = View();
        command = { "name":"createRoot", "value":1 };
        modelCommands = [];


        modelCommands.push(command)

    
        //view.animate(modelCommands);     
      });

      it('Should result in root being highlighted', function() {
        //const view = View();
        command = { "name":"examineNode" };


        modelCommands.push(command)

    
        //view.animate(modelCommands);     
      });

      it('Should result in value being added to root animation', function() {
        const view = View();
        command = { "name":"changeNodeValues", "values":[1, 2] };


        modelCommands.push(command)

    
        view.animate(modelCommands);     
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


    describe('View() given createNode command', function() {
      it('Should execute createNode command', function() {
        var modelCommands = [
          { "name":"createNode", "value":1 }
        ]; 

        assert.isTrue(view.animate(modelCommands), 'should return true');
      });
    });
    
    describe('view() given createNode command and addValud command', function() {
      it('Should execute createNode command and addValue command', function() {

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

    describe('create new BPlusTree for node testing', function() {
      it('Should create new BPlusTree and log its root nodes to string', function() {
        bPlusTree = BPlusTree();
        console.log(bPlusTree.bPlusTreeRoot);

        assert.isTrue(bPlusTree.get(), 'should return true');
      });
    });

    describe('test getters and setters of BPlusTreeNode', function() {
      it('Should set and get id and one value of BPlusTreeNode', function() {
        bPlusTreeNode = BPlusTreeNode();
        console.log(bPlusTreeNode);

        bPlusTreeNode.setID(0);
        bPlusTreeNode.pushValue(1);

        assert.deepEqual(bPlusTreeNode.getID(), 0, 'id should equal 0');
        assert.deepEqual(bPlusTreeNode.getValue(0), 1, 'value[0] should equal 1');
      });
    });
  });
});

