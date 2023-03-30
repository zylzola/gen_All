/** 二叉树节点类 */
class BTNode<T> {
    //节点的值
    private _val: T;
    //左子树
    private _leftChild: BTNode<T> | null;
    //右子树
    private _rightChild: BTNode<T> | null;
    
    set val(newVal: T) {
        this._val = newVal;
    }
    get val(): T {
        return this._val;
    }
    set leftChild(newLeftChild: BTNode<T> | null) {
        this._leftChild = newLeftChild;
    }
    get leftChild(): BTNode<T> | null {
        return this._leftChild;
    }
    set rightChild(newRightChild: BTNode<T> | null) {
        this._rightChild = newRightChild;
    }
    get rightChild(): BTNode<T> | null {
        return this._rightChild;
    }
    //构造函数
    constructor(val: T) {
        this.val = val;
        this.leftChild = null;
        this.rightChild = null;
    }
    
}

/** 二叉树类 */
export default class BTree<T> {
    //root节点
    public root: BTNode<T> | null;

    //构造函数
    constructor() {
        this.root = null;
    }

    //添加节点
    public addBTNode(val: T): void {
        const node = new BTNode(val);
        //判断是否有root节点
        if (this.root === null) {
            this.root = node;
        } else {
            //创建节点为root节点
            let currNode: BTNode<T> | null = this.root;
            while (currNode) {
                //添加节点的值小于当前节点 放左子树
                if (node.val < currNode.val) {
                    //左子树不存在 插在左子树位置
                    if (!currNode.leftChild) {
                        currNode.leftChild = node;
                        return;
                    }
                    //如果左子树存在 继续遍历
                    currNode = currNode.leftChild;
                } else {
                    //如果值大，放入右子树，同上步骤
                    if(!currNode.rightChild) {
                        currNode.rightChild = node;
                        return;
                    }
                    currNode = currNode.rightChild;
                }
            }
        }
    }

    //查找节点
    public findBTNode(val: T): BTNode<T> | null {
        let currNode: BTNode<T> | null = this.root;
        while (currNode) {
            if (currNode.leftChild === val) {
                return currNode;
            } else if (currNode.val < val) {
                //范围在右子树
                currNode = currNode.rightChild;
            } else {
                //范围在左子树
                currNode = currNode.leftChild;
            }
        }
        return null;
    }

    /**
     * 
     * @param val 
     * @returns 
     *  1.如果被删除节点为叶子节点，则直接将其删除即可。
        2.如果被删除节点只有一个子节点，则将其父节点与其子节点连接起来即可。
        3.如果被删除节点有两个子节点，则需要找到其右子树中最小的节点，把它的值赋给被删除节点，然后再递归地删除右子树中的这个最小节点。
     */
    public removeBTNode(val: T): void {
        if (!this.root) {
            return;
        }
        let currNode: BTNode<T> | null = this.root;
        let parentNode: BTNode<T> | null = null;
        //找到删除的节点
        while (currNode && currNode.val !== val) {
            parentNode = currNode;
            if (currNode.val < val) {
                currNode = currNode.rightChild;
            } else {
                currNode = currNode.leftChild;
            }
        }

        //删除节点是叶子节点 或 只有一个子节点
        if (!currNode?.leftChild || !currNode?.rightChild) {
            //删除节点的子节点
            const childNode: BTNode<T> | null = currNode?.rightChild! ?? currNode?.leftChild!;
            if(!parentNode) {
                //如果是根节点 将其左右子树中存在的节点作为根节点
                this.root = childNode;
            } else if (parentNode.leftChild === currNode) {
                //删除节点是左子树 其父节点的左子树节点指向其的子节点 
                parentNode.leftChild = childNode;
            } else if (parentNode.rightChild === currNode) {
                //删除节点是右子树 其父节点的右子树节点指向其的子节点
                parentNode.rightChild = childNode;
            }
        }
        //要删除的节点有两个子节点
        else {
            //定义最小节点为删除节点的右子树
            let minNode: BTNode<T> = currNode.rightChild;
            let minNodeParent: BTNode<T> = currNode;
            //遍历出currNode右子树中的最小节点 作为删除节点的替换节点，这个最小节点可能是左子树，也有可能是右子树
            while (minNode?.leftChild) {
                minNodeParent = minNode;
                minNode = minNodeParent?.leftChild!;
            }
            //将最小节点的值赋值给要删除的节点
            currNode.val = minNode?.val;
            //删除最小节点
            if (minNodeParent.leftChild === minNode) {
                //父节点左子树指向最小节点右子树
                minNodeParent.leftChild = minNode?.rightChild;
            }else{
                //最小节点是右子树
                minNodeParent.rightChild = minNode?.rightChild;
            }
        }
    }

    //查找以某个节点为跟节点的最小节点
    findMinNode(root: BTNode<T> | null): BTNode<T> | null {
        while (root?.leftChild) {
            root = root.leftChild;
        }
        return root;
    }

    /**
         1  
        / \
       2   3
      /   / \
     4   5   6
     */

    //前序遍历 根左右
    /**
     * 
     * @param root 
     * @returns 1 -> 2 -> 4 -> 3 -> 5 -> 6
     * 1入栈[1] / 1出3,2入栈[3,2] / 2出4入[3,4] / 4出无入栈[3] / 3出5,6入栈[6,5] / 5出无入栈[6] / 6出无入栈[]
     */
    preOrderBTNode(root: BTNode<T> | null): Array<T> | [] {
        if (root === null) {
            return [];
        }
        //存放BTNode的值
        let BTNodeArr: Array<T> = [];
        //临时栈
        let stack: Array<BTNode<T>> = [];

        //根节点入栈
        stack.push(root);

        //遍历栈 注意左子树位于栈顶
        while (stack.length > 0) {
            const node: BTNode<T> = stack.pop()!;
            BTNodeArr.push(node?.val);
            
            //判断节点右子树 入栈
            if (node?.rightChild) {
                stack.push(node.rightChild);
            }

            //判断节点左子树 入栈
            if (node?.leftChild) {
                stack.push(node.leftChild);
            }
        }
        return BTNodeArr;
    }

    //中序遍历 左根右
    /**
     *
         1  
        / \
       2   3
      /   / \
     4   5   6
     * @param root 
     * @returns  4 -> 2 -> 1 -> 5 -> 3 -> 6
     * 遍历左边的，在遍历右边的
     * 1入栈[1] / 2入栈[1,2] / 4入栈[1,2,4] / 4出无右栈[1,2] / 2出无右栈[1] / 1出右3入左5入栈[3,5] / 5出无右栈[3] / 3出右6入栈[6] / 6出无入栈[]
     */
    middleOrderBTNode(root: BTNode<T> | null): Array<T> | [] {
        if(root === null) {
            return [];
        }
        //存放BTNode的值
        let BTNodeArr: Array<T> = [];
        //临时栈
        let stack: Array<BTNode<T>> = [];
        //左子树入栈
        while (root) {
            stack.push(root);
            root = root.leftChild;
        }

        while (stack.length) {
            const node = stack.pop()!;
            //栈顶元素
            BTNodeArr.push(node?.val);
            //遍历出右子树中的左子树
            let rNode = node?.rightChild;
            while (rNode) {
                stack.push(rNode);
                rNode = rNode.leftChild;
            }
        }
        return BTNodeArr;
    }

    //后序遍历 左右根
    /**
     *
         1  
        / \
       2   3
      /   / \
     4   5   6
     * @param root 
     * @returns 4->2->5->6->3->1
     * 根左右顺序入栈 pop的节点插入首位 满足左右根的遍历顺序
     * 1入栈[1] / 1出2入3入栈[2,3] / 3出5入6入栈[2,5,6] / 6出无入栈[2,5] / 5出无入栈[2] / 2出4入栈[4] / 4出无入栈[]
     */
    backOrderBTNode(root: BTNode<T> | null): Array<T> | [] {
        if(root === null) {
            return [];
        }
        //存放BTNode的值
        let BTNodeArr: Array<T> = [];
        //临时栈
        let stack: Array<BTNode<T>> = [];
        while (root) {
            stack.push(root);
        }
        while (stack.length) {
            const node = stack.pop();
            //出栈节点插入首位
            BTNodeArr.unshift(node?.val!);
            if (node?.leftChild) {
                stack.push(node.leftChild);
            }
            if (node?.rightChild) {
                stack.push(node.rightChild);
            }
        }
        return BTNodeArr;
    }

    //二叉树的最大深度
    maxDepth(root: BTNode<T> | null): number {
        if (root === null) {
            return 0;
        }
        let depth = 0;
        let stack: [BTNode<T>, number][] = [[root, 1]];
        while (stack.length) {
            let [node, dep] = stack.pop()!;
            depth = Math.max(depth, dep);
            if (node?.leftChild) {
                stack.push([node.leftChild, dep++]);
            }
            if (node?.rightChild) {
                stack.push([node.rightChild, dep++]);
            }
        }
        return depth;
    }

    //所有叶子节点 DFS深度优先搜索 先进后出
    findLeavesDFS(root: BTNode<T> | null): Array<T> {
        if(root === null) {
            return [];
        }
        const leaves: Array<T> = [];
        const stack: Array<BTNode<T>> = [];
        stack.push(root);
        while (stack.length) {
            const node = stack.pop();
            if (node?.leftChild) {
                stack.push(node.leftChild);
            }
            if (node?.rightChild) {
                stack.push(node.rightChild);
            }
            if (!node?.leftChild && !node?.rightChild) {
                leaves.push(node?.val!);
            }
        }

        return leaves;
    }

    //BFS广度优先搜索 先进先出
    findLeavesBFS(root: BTNode<T> | null): Array<T> {
        if (root === null) {
            return [];
        }
        const queue: Array<BTNode<T>> = [];
        const leaves: Array<T> = [];
        queue.push(root);
        while (queue.length) {
            //首位弹出
            const node = queue.shift();
            if (node?.leftChild) {
                queue.push(node.leftChild);
            }
            if (node?.rightChild) {
                queue.push(node.rightChild);
            }
            if (!node?.leftChild && !node?.rightChild) {
                leaves.push(node?.val!);
            }
        }
        return leaves;
    }
}
