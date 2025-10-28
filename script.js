function Node(data, left=null, right=null) {
  return {data,left,right}
}

function Tree(array) {
  array = new Float64Array(array);
  let sortedArray = array.sort();
  let uniqueArray = [...new Set(sortedArray)];

  let start = 0;
  let end = uniqueArray.length-1;

  let root = buildTree(uniqueArray, start, end);


  function buildTree(array, start, end){
    if(start > end) return null;

    let mid = start + Math.floor((end - start) / 2);

    // Create root node
    let root = Node(array[mid]);

    // Create left subtree
    root.left = buildTree(array, start, mid - 1);

    // Create right subtree
    root.right = buildTree(array, mid + 1, end);

    return root;
  }

  function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  function insert(root, value) {
    let currentNode = root;

    while(currentNode.data !== value){
      if(value < currentNode.data){
        if(currentNode.left === null && currentNode.right === null){
          currentNode.left = Node(value);
          return;
        }
        currentNode = currentNode.left;
      }
      else if(value > currentNode.data){
        if(currentNode.left === null && currentNode.right === null){
          currentNode.right = Node(value);
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  function getSuccessor(currentNode){
    currentNode = currentNode.right;
    while(currentNode !== null && currentNode.left !== null){
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  function deleteItem(root,value){
    if (root === null){
      return root;
    }

    if (root.data < value){
      root.right = deleteItem(root.right, value);
    }
    else if (root.data > value){
      root.left = deleteItem(root.left, value);
    }
    else {
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }

      const succ = getSuccessor(root);
      root.data = succ.data;
      root.right = deleteItem(root.right, succ.data);
    }
    return root;
  }

  function find(root, value){
    let currentNode = root;
    while (currentNode !== null){
      if(currentNode.data === value){
        return currentNode;
      }
      else if(value > currentNode.data){
        currentNode = currentNode.right;
      }
      else if(value < currentNode.data){
        currentNode = currentNode.left;
      }
    }
    return null;
  }

  function printData(node){
    console.log(node.data);
  }

  function levelOrderForEach(root, callback){
    if(typeof callback !== "function"){
      throw new Error("A callback function is required.");
    }

    if(this.root === null){
      return;
    }

    const queue = [root];

    while(queue.length > 0){
      const currentNode = queue.shift();

      callback(currentNode);

      if(currentNode.left !== null) {
        queue.push(currentNode.left);
      }

      if(currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  function inOrderForEach(root, callback){
    if(typeof callback !== "function"){
      throw new Error("A callback function is required.");
    }

    if(root === null) {
      return;
    }

    inOrderForEach(root.left, callback);

    callback(root);

    inOrderForEach(root.right, callback);

  }

  function preOrderForEach(root, callback){
    if(typeof callback !== "function"){
      throw new Error("A callback function is required.");
    }

    if(root === null) {
      return;
    }

    callback(root);

    preOrderForEach(root.left, callback);

    preOrderForEach(root.right, callback);
  }

  function postOrderForEach(root, callback) {
    if(typeof callback !== "function"){
      throw new Error("A callback function is required.");
    }

    if(root === null) {
      return;
    }

    postOrderForEach(root.left, callback);

    postOrderForEach(root.right, callback);

    callback(root);
  }

  function height(root, value, callback) {

    const node = callback(root, value);

    if(node === null) {
      return null;
    }

    const queue = [node];
    let height = -1;

    while(queue.length > 0){
      height++;
      let levelSize = queue.length;

      for(let i = 0; i < levelSize; i++){
        const currentNode = queue.shift();

        if(currentNode.left !== null){
          queue.push(currentNode.left);
        }

        if(currentNode.right !== null){
          queue.push(currentNode.right);
        }
      }
    }
    return height;
  }

  function depth(root, value){
    let currentNode = root;
    let depth = 0;
    while (currentNode !== null){
      if(currentNode.data === value){
        return depth;
      }
      else if(value > currentNode.data){
        depth++;
        currentNode = currentNode.right;
      }
      else if(value < currentNode.data){
        depth++;
        currentNode = currentNode.left;
      }
    }
    return null;
  }

  function isBalanced(root) {
    
    
    function checkBalanceAndHeight(node) {
      
      if (node === null) {
        return -1;
      }

      
      const leftHeight = checkBalanceAndHeight(node.left);
      
      
      if (leftHeight === Infinity) {
        return Infinity;
      }

      
      const rightHeight = checkBalanceAndHeight(node.right);

      
      if (rightHeight === Infinity) {
        return Infinity;
      }

      
      if (Math.abs(leftHeight - rightHeight) > 1) {
        return Infinity;
      }

      return 1 + Math.max(leftHeight, rightHeight);
    }
    

    const result = checkBalanceAndHeight(root); 

    return result !== Infinity;
  }

  function rebalance(root) {
    const nodesArray = [];

    function pushData(node) {
      nodesArray.push(node.data);
    }

    inOrderForEach(root, pushData);

    const newStart = 0;
    const newEnd = nodesArray.length - 1;
    
    this.root = buildTree(nodesArray, newStart, newEnd);
  }

  return{
    root,
    prettyPrint,
    insert,
    deleteItem,
    find,
    printData,
    levelOrderForEach,
    inOrderForEach,
    preOrderForEach,
    postOrderForEach,
    height,
    depth,
    isBalanced,
    rebalance,
  }
}


let bst = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
bst.prettyPrint(bst.root);

console.log(bst.isBalanced(bst.root))
// console.log(bst.depth(bst.root, 324))
// console.log(bst.height(bst.root, 23, bst.find))
// bst.postOrderForEach(bst.root, bst.printData);
// bst.preOrderForEach(bst.root, bst.printData);
// bst.inOrderForEach(bst.root, bst.printData);
// bst.levelOrderForEach(bst.root, bst.printData);

//Unbalancing the tree
bst.insert(bst.root, 7000);
bst.insert(bst.root, 8000);
bst.insert(bst.root, 9000);

console.log(bst.isBalanced(bst.root)); 
bst.prettyPrint(bst.root); 

bst.rebalance(bst.root);

console.log(bst.isBalanced(bst.root));
bst.prettyPrint(bst.root);