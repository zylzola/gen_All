/**
 * 
 * @param {ListNode} l1 
 * @param {ListNode} l2 
 * @returns {ListNode}
 */
/*function addTwoNumbers(l1, l2) {
    let c = new ListNode(0);
    let result = c;
    let carry = 0;
    while (l1 != null || l2 != null) {
        let a = (l1 == null) ? 0 : l1.val;
        let b = (l2 == null) ? 0 : l2.val;
        let sum = (a+b+carry) % 10;
        carry = (a+b+carry) > 9 ? 1 : 0;
        result.next = new ListNode(sum);
        result = result.next;
        if(l1 != null) l1 = l1.next;
        if(l2 != null) l2 = l2.next;
    }
    if (carry > 0) {
        result.next = new ListNode(carry);
    } 
    return c.next;
};
let l1 = [2, 4, 3];
let l2 = [5, 6, 4];
console.log(addTwoNumbers(l1, l2));*/

/*给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
示例 1:

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
*/
/*function checkMaxLengthStr(s) {
    if(s.length <= 0) return 0;
    let left = 0;
    let right = 1;
    let max = 1;
    let newStr = "";
    while(right < s.length) {
        newStr = s.slice(left, right);
        let rChar = s.charAt(right);
        if(newStr.indexOf(rChar) > -1) {
            left++;
            continue;
        }else{
            right++;
        }
        max = Math.max(max, right-left);
    }
    return max;
}
console.log("无重复字符=", checkMaxLengthStr("abcabcbbpwkertwertdbnmm,,"));
*/

/*给你一个字符串 s，找到 s 中最长的回文子串。
如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。
示例 1：
输入：s = "babad" dabab
    
    b a[0][0]=0
      a[0][1]=0
      a[0][2]=1 be=2 len=0
      a[0][3]=0
      a[0][4]=1 be=0 len=1 end=0

    a a 1 0=0
      a 1 1=1
      a 1 2=0
      a 1 3=2 be=1 len=1 end=0
      a 1 4=0

    b a 2 0=0
      a 2 1=0
      a 2 2=2 be=2 len=1 end-0
      a 2 3=0
      a 2 4=3 be=0 len=3 end=2
    
    a a 3 0=0
      a 3 1=1
      a 3 2=0
      a 3 3=3
      a 3 4=0

    d a 4 0=1
      a 4 1=0
      a 4 2=0 
      a 4 3=0
      a 4 4=0 
输出："bab"
解释："aba" 同样是符合题意的答案。
示例 2：
输入：s = "cbbd"
输出："bb"
0 1 2 3 4
*/
/*
function longestPalindrome(s) {
    let len = 0;
    let start = 0;
    let size = s.length;
    //回味串个数是偶数
    for (let i = 0; i < size; i++) {
        let leftIdx = i;
        let rightIdx = i+1;
        while (s[rightIdx] && s[leftIdx] && s[leftIdx]==s[rightIdx]) {
            leftIdx--;
            rightIdx++;
            console.log("while:",i)
        }
        console.log("for:",i)
        let offset = rightIdx-leftIdx-1;
        if(offset > len) {
            len = offset;
            start = leftIdx+1;
        }
    }
    //回文串个数是奇数
    for (let i = 0; i < size; i++) {
        let leftIdx = i-1;
        let rightIdx = i+1;
        while (s[rightIdx] && s[leftIdx] && s[leftIdx]==s[rightIdx]) {
            leftIdx--;
            rightIdx++;
        }
        let offset = rightIdx-leftIdx-1;
        if(offset > len) {
            len = offset;
            start = leftIdx+1;
        }
    }

    return s.slice(start, start+len);
};

console.log(longestPalindrome("cbbtaggatbb"), longestPalindrome("cbbtagjgatbb"))
*/
/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

    有效字符串需满足：

    左括号必须用相同类型的右括号闭合。
    左括号必须以正确的顺序闭合。
    每个右括号都有一个对应的相同类型的左括号。
 */
/*
var isValid = function(s) {
    let m = new Array();
    let size = s.length;
    let kuohao = {'(':')','{':'}','[':']'}
    for (let i = 0; i < size; i++) {
        let char = s[i];
        if(char == '(' || char=="{" || char=="[") {
            m.push(char);
        }else{
            let c = m.pop();
            if(char != kuohao[c]) {
                return false;
            }
        }
    }
    return m.length==0;
};
*/
/*
字符串里的括号能配上对，且是左右格式
var isValid2 = function(s) {
    let size = s.length;
    let kuohao = {'(':')','{':'}','[':']'};
    let arr = [];
    let rihgtArr = [];
    for (let i = 0; i < size; i++) {
        let char = s[i];
        if(char=="{" || char=="(" || char=="[") {
            arr.push(char);
        }else{
            let isSame = false;
            for (let index = 0; index < arr.length; index++) {
                let c = arr[index];
                if(kuohao[c] == char){
                    arr.splice(index, 1);
                    isSame = true;
                    break;
                }
            }
            if(!isSame){
                rihgtArr.push(char);
            }
        }
    }
    console.log(arr, rihgtArr);
    return arr.length==0 && rihgtArr.length==0;
};

console.log(isValid2("({[]})"))
*/
/**
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请

你返回所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。
示例 1：
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。
示例 2：

输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 。
示例 3：

输入：nums = [0,0,0]
输出：[[0,0,0]]
解释：唯一可能的三元组和为 0 。
 */
/*
function threeFun (arr) {
   let indexArr = [];
   for (let i = 0; i < arr.length; i++) {
    let one = arr[i];
    for (let j = 0; j < arr.length; j++) {
        let two = arr[j];
        for (let m = 0; m < arr.length; m++) {
            let three = arr[m];
            if(i!=j && j!=m && i!=m && one+two+three == 0) {
                console.log(i, j, m)
                let temp = [one, two, three];
                temp.sort((a, b)=>a-b);
                console.log(temp, indexArr.includes(temp.join(",")))
                if(!indexArr.includes(temp.join(","))){
                    indexArr.push(temp.join(","));
                }
            }
        }
    }
   }
   
    return indexArr.map((value)=>{
        return value.split(",");
    });
}
console.log(threeFun([-1,0,1,2,-1,-4]));
*/
/*
function threeFun(nums) {
    let len = nums.length;
    let arr = [];
    let seen = new Set();
    nums.sort((a, b)=>a-b)
    for (let i = 0; i < len-2; i++) {
        for (let j = i+1; j < len-1; j++) {
            for (let m = j+1; m < len; m++) {
                let temp = [nums[i],nums[j],nums[m]];
                if(nums[i]+nums[j]+nums[m] == 0 && !seen.has(temp)) {
                    seen.add(temp)
                    arr.push([nums[i],nums[j],nums[m]]);
                }   
            }
        }
    }
    return arr;
}
console.log(threeFun([-1,0,1,2,-1,-4]));
*/
/*
var threeSum = function(nums) {
    let arr = [];
    let len = nums.length;
    nums.sort((a, b)=>a-b);
    for (let i = 0; i < len; i++) {
        if(i>0&&nums[i] == nums[i-1]) continue;
        let left = i+1;
        let right = len-1;
        while(left < right) {
            const sum = nums[i]+nums[left]+nums[right];
            if(sum === 0) {
                arr.push([nums[i],nums[left],nums[right]]);
                while(left<right && nums[left] === nums[left+1]) left++;
                while(left<right && nums[right] === nums[right-1]) right--;
                left++;
                right--;
            }else if(sum<0){
                left++;
            }else{
                right--;
            }
        }
        
    }
    return arr;
};
console.log(threeSum([-1,0,1,2,-1,-4]));
*/
/*给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
示例 1：
输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
示例 2：
输入：digits = ""
输出：[]
示例 3：
输入：digits = "2"
输出：["a","b","c"]
提示：
0 <= digits.length <= 4
digits[i] 是范围 ['2', '9'] 的一个数字。
*/
/*
var letterCombinations = function(digits) {
    if(digits.length <= 0) return [];
    let englishGroup = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    let digitsArr = digits.split("");
    let endIndex = digits.length;
    let tempZimuArr = [""];
    for (let i = 0; i < endIndex; i++) {
        let sIdx = digitsArr[i];
        let zimu = englishGroup[sIdx];
        let newTempZimuArr = [];
        for (let m = 0; m < tempZimuArr.length; m++) {
            let comZimu = tempZimuArr[m];
            for (let n = 0; n < zimu.length; n++) {
                let z = zimu[n];
                newTempZimuArr.push(comZimu+z);
            }
        }
        tempZimuArr.splice(0, tempZimuArr.length, ...newTempZimuArr);
    }
    return tempZimuArr;
};
console.log(letterCombinations("2"));
*/
/**
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 *  输入：l1 = [1,2,4], l2 = [1,3,4]
    输出：[1,1,2,3,4,4]
    示例 2：
    输入：l1 = [], l2 = []
    输出：[]
    示例 3：
    输入：l1 = [], l2 = [0]
    输出：[0]
    提示：
    两个链表的节点数目范围是 [0, 50]
    -100 <= Node.val <= 100
    l1 和 l2 均按 非递减顺序 排列
 */
/*
function ListNode (val, next){
    this.next = next;
    this.val = val;
}
var mergeTwoLists = function(list1, list2) {
    //创建一个新的链表
    let newListNode = new ListNode(0);
    let tail = newListNode;
    while (list1 && list2) {
        if(list1.val < list2.val) {
            tail.next = list1;
            list1 = list1.next;
        }else{
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next;
    }
    if(list1) {
        tail.next = list1;
    }else if(list2) {
        tail.next = list2;
    }
    return newListNode.next;
};
let l1 = new ListNode(1, new ListNode(2, new ListNode(4)));
let l2 = new ListNode(1, new ListNode(3, new ListNode(4)));
let mergedList = mergeTwoLists(l1, l2);
console.log(mergedList);
*/
/*
给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
算法的时间复杂度应该为 O(log (m+n)) 。
示例 1：
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
示例 2：
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
*/
/*
var findMedianSortedArrays = function(nums1, nums2) {
    let numArr = [...nums1, ...nums2];
    numArr.sort((a, b)=> a-b)
    let len = numArr.length/2;
    console.log(numArr);
    if(numArr.length % 2 == 0) {
        return (numArr[len] + numArr[len-1])/2;
    } else {
        let idx = Math.floor(len);
        return numArr[idx]; 
    }
};
let sum = findMedianSortedArrays([1,3], [2]);
*/
/*
var findMedianSortedArrays = function(nums1, nums2) {
    //nums1的长度小于nums2的长度
    if(nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1]
    }
    const m = nums1.length;
    const n = nums2.length;
    let imin = 0;
    let imax = m;
    //中位数的位置
    const halfLen = Math.floor((m+n+1) / 2);

    while(imin <= imax) {
        //nums1的中位数位置
        const i = Math.floor((imin + imax) / 2);
        const j = halfLen - i;
        
    }
};
*/
/** 二叉树中序遍历 ：左根右*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
//迭代实现
 var inorderTraversal = function(root) {
    let numArr = [];
    let stack = [];
    //压入左子树
    while(root) {
        stack.push(root);
        root = root.left;
    }
    //左子树出栈 遍历出右子树
    while(stack.length) {
        //栈顶节点出栈
        node = stack.pop();
        //放入numArr
        numArr.push(node.val);
        //节点的右子树
        rNode = node.right;
        while(rNode) {
            //放入节点的左子树
            stack.push(rNode);
            rNode = rNode.left;
        }
    }
    return numArr;
};
