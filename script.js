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

  return{
    root,
    prettyPrint,
    insert,
  }
}


let bst = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
bst.insert(bst.root, 2)
bst.prettyPrint(bst.root);