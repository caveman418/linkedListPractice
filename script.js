const NodeFactory = (value = null) => {
    let next = null;
    let prev = null;
    return {value, next, prev}
}

const LinkedListFactory = () => {
    let _list = {head: null, tail: null};

    const append = (value) => {
        const node = NodeFactory(value);
        if (!_list.head) {
            _list.head = node;
            _list.tail = node;
        } else {
            _list.tail.next = node;
            _list.tail.next.prev = _list.tail;
            _list.tail = _list.tail.next;
        }
    }

    const prepend = (value) => {
        const node = NodeFactory(value);
        if (!_list.head) {
            _list.head = node;
            _list.tail = node;
        } else {
            _list.head = {value: node.value, next: _list.head, prev: null}
            _list.head.next.prev = _list.head;
        }
    }

    const size = () => {
        if (!_list.head) return 0;
        let count = 1;
        let prev = _list.head;
        while (prev.next) {
            prev = prev.next;
            count++;
        }
        return count;
    }

    const head = () => (!_list.head) ? {}:_list.head;

    const tail = () => (!_list.head) ? {}:_list.tail;

    const at = (index) => {
        if (index > size()-1) return 'index exceeds list length!';
        let currentNode = _list.head;
        while (index > 0) {
            index--;
            currentNode = currentNode.next;
        }
        return currentNode;
    }

    const pop = () => {
        if (!_list.head) return 'list is already empty!';
        const returnValue = _list.tail.value; //store final value before removing it
        _list.tail.prev.next = null;
        _list.tail = _list.tail.prev;
        return returnValue;
    }

    const contains = (value) => {

    }

    const find = (value) => {

    }

    const toString = () => {
        let string = '';
        if (!_list.head) {
            string = 'list is empty!';
        } else {
            string = `( ${_list.head.value} )`;
            let prev = _list.head;
            while (prev.next) {
                string += ` -> ( ${prev.next.value} )`;
                prev = prev.next;
            }
        }
        return string;
    }

    const insertAt = (value, index) => {

    }

    const removeAt = (index) => {

    }

    return {
        append, prepend, size, head, tail, at, pop, contains, find, toString, insertAt, removeAt, _list //remove _list when finished, only returned for testing purposes
    }
}

let list = LinkedListFactory();
list.append(2);
list.append(3);
list.prepend(1);
console.log(list._list, list.size());
document.querySelector('.print').textContent = list.toString();