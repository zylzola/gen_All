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

/***
 * 给定一个链表，反转链表中相邻的两个节点
 * */
function reverseList2(head) {
  let prev = null;
  let curr = head;
  while (curr && curr.next) {
    let next = curr.next;
    curr.next = next.next;
    next.next = curr;
    if (prev) {
      prev.next = next;
    } else {
      head = next;
    }
    prev = curr;
    curr = curr.next;
  }
  return head;
}
//验证reverseList2
console.log(reverseList2(head));
