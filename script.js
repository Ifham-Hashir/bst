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
  };

  return{
    root,
    prettyPrint,
  }
}


let bst = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
bst.prettyPrint(bst.root);