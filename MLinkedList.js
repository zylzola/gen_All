/*反转链表 给定一个链表，进行反转
  1->2->3->4->5->null
  => 5->4->3->2->1->null
*/
function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    //获取当前节点的next
    let next = curr.next; // 2->3->4->5->null 3->4->5->null  4->5->null 
    //当前节点next 变为 之前已经调整好的节点
    curr.next = prev; //1->null     2-> 1->null        3->  2-> 1->null
    // prev 存储已经调整好的节点，为了下一轮使用
    prev = curr; // 1->null          2-> 1->null        3->  2-> 1->null
    // 继续处理链表剩下的节点
    curr = next; //2->3->4->5->null  3->4->5->null     4->5->null 
  }
  head = prev;
  return head;
}
//验证reverseList
let head = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null,
        },
      },
    },
  },
};
// console.log(reverseList(head));

function reverseList2(head) {
  let prev = null;
  let curr = head;
  while (curr && curr.next) {
    //获取当前节点的next
    let next = curr.next; // 2->3->4->5->null    4->5->null
    //当前节点next 变为 之前已经调整好的节点
    curr.next = next.next; // 1->3->4->5->null   3->5->null
    //
    next.next = curr; //  2->1->3->4->5->null    4->3->5->null
    // prev 存储已经调整好的节点，为了下一轮使用
    if (prev) {
      prev.next = next; //                       1->4->3->5->null
      console.log("prev if:", prev, "next if:", next);
    } else {
      head = next; // 2->1->3->4->5->null
      console.log("head:", head, "next if00:", next);
    }
    prev = curr; // 1->3->4->5->null             3->5->null
    console.log("prev", prev);
    curr = curr.next; // 3->4->5->null           5->null
    console.log('"CURR', curr);
  }
  console.log("prev111111", prev);
  console.log("curr111111", curr);

  return head;
}
function ListNode(val) {
  this.val = val;
  this.next = null;
}
/***
 * 给定一个链表，反转链表中相邻的两个节点
 * 1->2->3->4->5->null
 * */
function reverseList3(head) {
  if (!head || !head.next) return head;
  let dyTemp = new ListNode(0);
  dyTemp.next = head; // 0->1->2->3->4->5->null
  let temp1,
    temp2 = null;
  let curr = dyTemp;
  while (curr.next && curr.next.next) {
    temp1 = curr.next; //1
    temp2 = curr.next.next.next; // 3
    curr.next = curr.next.next; // 2
    curr.next.next = temp1; //1
    curr.next.next.next = temp2; //3
    curr = curr.next.next; //1
  }
  return dyTemp.next;
}


let head = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null,
        },
      },
    },
  },
};

let head2 = {
  val: 7,
  next: {
    val:9,
    next: {
      val: 6,
      next:{
        val:99,
        next:{
          val: 3,
          next: {
            val: 4,
            next: {
              val: 5,
              next: null,
            },
          },
        }
      }
    },
  },
};
function getIntersetctionNode2(headA, headB) {
  let currA = headA, currB = headB;
  while(!isSame(currA , currB)) {
    currA = currA==null ?headB  : currA.next;
    currB = currB==null ?headA  : currB.next;
  }
  return currA;
}

function isSame(headA, headB) {
  if (!headA || !headB) return false;
  while(headA) {
      if (headA && headB && headA.val != headB.val) {
        return false;
    }
    headA = headA.next;
    headB = headB.next;
  }
  return headA==null && headB == null;;
}

let cur = getIntersetctionNode2(head,head2);
