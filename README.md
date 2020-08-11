# BPlusTree view
This is a the view module of a BPlusTree visualization tool. It controls the animation objects
of the system.


## **Testing Framework Install**
To install the mocha/chai test frameworking install the **npm** tool
the run the following command in the root directory of the project...
```
npm install
```
Once you have installed the testing framework you can run the tests by opening
`testrunner.html` with a browser.

Not all tests a current

##Structure
there are three main files in the `js` directory. 

* The view file is the highest level of the three. It interfaces with model and
controls the cmdConverter and BPlusTree functions and structures.
* The cmdConverter is for generating animation commands for the animation library.
* The BPlusTree is for the creation and manipulation of the BPlusTree datastructures

##Conventions
* All functions should have a comment block specifing there purpose and the purposes of their return
values and parameters.

###Code Paradigms
Code follows the functional paradigm.
* No loops are used only recursion
* mutable state is kept to a minimum (for variables use `const` unless you 
  have to use `let`)
* everything is a function (factory functions instead of classes for object creation)

##References
Database System Concepts - This is the text book we are using as reference for BPlusTree insertion and
                           deletion algorithms.

Mocha docs - https://mochajs.org/
Chai docs - https://www.chaijs.com/

