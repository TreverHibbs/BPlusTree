'use strict';

var assert = chai.assert;


describe('view-module', function () {
  describe('view.js', function() {
    //before(function () {
    //  ctx.clearRect(0, 0, 900, 600);
    //});





    describe('The rendering of inserting [1, 2, 3] when n = 1', function() {
      const modelCommands = [];
      const view = View();

      it('Should result in root being animated', function() {
        //const view = View();
        let command = { "name":"createNode", "values":[1] };
        modelCommands.push(command)

        command = { "name":"examineNode" };
        modelCommands.push(command)

        command = { "name":"changeNodeValues", "values":[1, 2, 3] };
        modelCommands.push(command)

        command = { "name":"splitNode", "values":[2], "leftValues":[1], "rightValues":[3] };
        modelCommands.push(command)

        view.animate(modelCommands);
      });
    });


    describe('renderAddValue()', function() {
      xit('Should execute list of model commands', function() {
        var animationCommands = [];
        command = { "name":"addValue", "value":1, "valueIndex":1 }

        assert.deepEqual(renderAddValue(animationCommands, command.value),
                         ["SetNumElements<;>0<;>2",
                          "SetText<;>0<;>1<;>1", "Step"],
                         'Should return anim commands');
      });
    });


    describe('View() given createNode command', function() {
      xit('Should execute createNode command', function() {
        var modelCommands = [
          { "name":"createNode", "value":1 }
        ]; 

        assert.isTrue(view.animate(modelCommands), 'should return true');
      });
    });
    
    describe('view() given createNode command and addValud command', function() {
      xit('Should execute createNode command and addValue command', function() {

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
      xit('Should create new BPlusTree and log its to string func', function() {
        bPlusTree = BPlusTree();
        console.log(bPlusTree);

        assert.isTrue(bPlusTree.get(), 'should return true');
      });
    });

    describe('create new BPlusTree for node testing', function() {
      xit('Should create new BPlusTree and log its root nodes to string', function() {
        bPlusTree = BPlusTree();
        console.log(bPlusTree.bPlusTreeRoot);

        assert.isTrue(bPlusTree.get(), 'should return true');
      });
    });

    describe('test getters and setters of BPlusTreeNode', function() {
      it('Should set and get the id of a node', function() {
        const myBTreeNode = BPlusTreeNode([1], 0);
        console.log(myBTreeNode.getID());
      });

      it('Should set and get values of a BPlusTreeNode', function() {
        const myBTreeNode = BPlusTreeNode([1, 2], 0);
        myBTreeNode.setValues([1, 2, 3]);
        console.log(myBTreeNode.getValues());
      });

      it('should set and then get the postion of the node', function() {
        const testPosition = [0, 0];
        const myBTreeNode = BPlusTreeNode([1, 2], 0, testPosition);

        console.log(myBTreeNode.getPosition());
        assert.equal(myBTreeNode.getPosition(), testPosition);
      });

      it('Should return number of children of parent node', function() {
        const testPosition = [0, 0];
        const firstChildIndex = 0;
        const secondChildIndex = 1;
        const firstValues = [1];
        const secondValues = [3];

        let objectIndex = 0;


        const selectedNode = BPlusTreeNode([1, 2, 3],
                                           objectIndex++,
                                           testPosition);

        createChild(selectedNode, firstValues, firstChildIndex,
                    objectIndex++, objectIndex++);
        createChild(selectedNode, secondValues, secondChildIndex,
                    objectIndex++, objectIndex++);

        const childNum = selectedNode.getChildAmount();
        console.log(childNum);
        assert.equal(2, childNum);
      });

      it('Should determine the postion of children nodes in a row', function() {
        const childrenAmount = 2;
        const firstChildPosition = 0;

        const childrenPositions = getChildPositions(childrenAmount, firstChildPosition);
        console.log(childrenPositions);

        assert.deepEqual(childrenPositions, [0, NODE_SPACING]);
      });

      it('Should update the position of children', function() {
        const testPosition = [0, 0];
        const firstChildIndex = 0;
        const secondChildIndex = 1;
        const firstValues = [1];
        const secondValues = [3];
        const childPositions = [0, 15];

        let objectIndex = 0;


        const selectedNode = BPlusTreeNode([1, 2, 3],
                                           objectIndex++,
                                           testPosition);

        const firstChild = createChild(selectedNode, firstValues, firstChildIndex,
                    objectIndex++, objectIndex++);
        const secondChild = createChild(selectedNode, secondValues, secondChildIndex,
                    objectIndex++, objectIndex++);

        updateChildPositions(selectedNode, childPositions);
        console.log(selectedNode);
        console.log(firstChild.getPosition());
        console.log(secondChild.getPosition());


        assert.deepEqual(secondChild.getPosition(), childPositions[secondChildIndex]);
        assert.deepEqual(firstChild.getPosition(), childPositions[firstChildIndex]);
      });
    });

    describe.skip('test createChild() and getChild()', function() {
      let objectIndex = 0;
      const firstChildIndex = 0;
      const secondChildIndex = 1;
      const firstValues = [1];
      const secondValues = [3];
      const selectedNode = BPlusTreeNode([1, 2, 3], objectIndex++);
      it('Should create a parent node and give it two children', function() {


        console.log(selectedNode);

        createChild(selectedNode, firstValues, firstChildIndex,
                    objectIndex++, objectIndex++);
        createChild(selectedNode, secondValues, secondChildIndex,
                    objectIndex++, objectIndex++);

        console.log(selectedNode);
      });

      it('Should return the specified child of the selected node', function() {
        console.log(getChild(selectedNode, firstChildIndex));
      });
    });
  });
});

