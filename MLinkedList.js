/*反转链表 给定一个链表，进行反转
  1->2->3->4->5->null
  => 5->4->3->2->1->null
*/
function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
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
reverseList(head);
console.log(head);
