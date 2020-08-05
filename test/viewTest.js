'use strict';

var assert = chai.assert;


describe('view-module', function () {
  describe('cmdConverter.js', function() {
    describe.skip('create two sibling nodes', function() {
      animationManager = new AnimationManager(objectManager);

      const commands = [];
      const leftChildNode = BPlusTreeNode([1], 0, STARTING_X, 0);
      const rightChildNode = BPlusTreeNode([1], 1, STARTING_X+100, 0);

      const leftChildValues = leftChildNode.getValues();
      const rightChildValues = rightChildNode.getValues();

      const view = View();

      it('should result in two sibling nodes begin animated', function() {
        let command = createCommand("CreateBTreeNode",
                                    leftChildNode.getID(),
                                    WIDTH_PER_ELEM,
                                    NODE_HEIGHT,
                                    leftChildValues.length,
                                    leftChildNode.getPosition(),
                                    determineNodeHeight(leftChildNode.getRow()),
                                    BACKGROUND_COLOR,
                                    FOREGROUND_COLOR);
        commands.push(command);

        command = createCommand("CreateBTreeNode",
                                rightChildNode.getID(),
                                WIDTH_PER_ELEM,
                                NODE_HEIGHT,
                                rightChildValues.length,
                                rightChildNode.getPosition(),
                                determineNodeHeight(rightChildNode.getRow()),
                                BACKGROUND_COLOR,
                                FOREGROUND_COLOR);
        commands.push(command);

        connectSiblingNodes(commands, leftChildNode, rightChildNode);
        addStep(commands);


        animationManager.StartNewAnimation(commands);
      });
    });
  });


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

        command = { "name":"changeNodeValues", "values":[1, 2] };
        modelCommands.push(command)

        command = { "name":"examineNode" };
        modelCommands.push(command)

        command = { "name":"changeNodeValues", "values":[1, 2, 3] };
        modelCommands.push(command)

        command = { "name":"splitNode", "values":[2], "leftValues":[1], "rightValues":[2, 3] };
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

    describe.skip('create new BPlusTree for node testing', function() { 
      xit('Should create new BPlusTree and log its root nodes to string', function() {
        bPlusTree = BPlusTree();
        console.log(bPlusTree.bPlusTreeRoot);

        assert.isTrue(bPlusTree.get(), 'should return true');
      });
    });

    describe('test positioning functions', function() { 
      let objectID = 0;
      let childIndex = 0;


      const myBTreeNode = BPlusTreeNode([2], objectID++, 0);
      const secondRow = myBTreeNode.getRow() + 1;
      const parentPosition = myBTreeNode.getPosition();


      xit('Should add single node poitioned correctly', function() {
        const childOne = createChild(myBTreeNode,
                                     [1],
                                     childIndex++,
                                     objectID++,
                                     parentPosition,
                                     secondRow); 
        assert.equal(childOne.getPosition(), 0);
      });

      it('Should add two children positioned correctly', function() {
        const childOne = createChild(myBTreeNode,
                                     [1],
                                     childIndex++,
                                     objectID++,
                                     parentPosition,
                                     secondRow); 
        const childTwo = createChild(myBTreeNode,
                                     [3, 4],
                                     childIndex++,
                                     objectID++,
                                     parentPosition,
                                     secondRow); 
        const childThree = createChild(myBTreeNode,
                                       [4, 5],
                                       1,
                                       objectID++,
                                       parentPosition,
                                       secondRow); 
        const childFour = createChild(myBTreeNode,
                                      [8],
                                      3,
                                      objectID++,
                                      parentPosition,
                                      secondRow); 
        console.log("child two position is" + " " + childTwo.getPosition());
        console.log("child three position is" + " " + childThree.getPosition());
        console.log("child one position is" + " " + childOne.getPosition());
        console.log("child four position is" + " " + childFour.getPosition());
      });
    });

    describe.skip('test getters and setters of BPlusTreeNode', function() {
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

      xit('Should determine the postion of children nodes in a row', function() {
        const childrenAmount = 2;
        const firstChildPosition = 0;

        const childrenPositions = getChildPositions(childrenAmount, firstChildPosition);
        console.log(childrenPositions);

        assert.deepEqual(childrenPositions, [0, NODE_SPACING]);
      });

      xit('Should update the position of children', function() {
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
      const selectedNode = BPlusTreeNode([1, 2, 3], objectIndex++, STARTING_X);
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

