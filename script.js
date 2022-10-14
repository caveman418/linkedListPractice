const display = document.querySelector('.print');

const NodeFactory = (value = null) => {
    let next = null;
    let prev = null;
    return {value, next, prev}
}

const LinkedListFactory = () => {
    let _list = {head: null, tail: null};

    const updateDisplay = () => display.textContent = toString();

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
        updateDisplay();
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
        updateDisplay();
    }

    const size = () => {
        if (!_list.head) return 0;
        let count = 1;
        let current = _list.head;
        while (current.next) {
            current = current.next;
            count++;
        }
        return count;
    }

    const head = () => (!_list.head) ? {}:_list.head;

    const tail = () => (!_list.head) ? {}:_list.tail;

    const at = (index) => {
        if (index > size()-1) return 'index exceeds list length!';
        if (index < 0) return 'invalid input: negative index';
        let current = _list.head;
        while (index > 0) {
            index--;
            current = current.next;
        }
        return current;
    }

    const pop = () => {
        if (!_list.head) return 'list is already empty!';
        const returnValue = _list.tail.value; //store final value before removing it
        _list.tail.prev.next = null;
        _list.tail = _list.tail.prev;
        return returnValue;
    }

    const contains = (value) => {
        if (!_list.head) {
            return 'list is empty!';
        } else {
            let current = _list.head;
            if (current.value === value) return true;
            while (current.next) {
                if (current.next.value === value) return true;
                current = current.next;
            }
            return false;
        }
    }

    const find = (value) => {
        let index = 0; //initial counter
        if (!_list.head) {
            return 'list is empty!';
        } else {
            let current = _list.head;
            if (current.value === value) return index;
            while (current.next) {
                index++;
                if (current.next.value === value) return index;
                current = current.next;
            }
            return null;
        }
    }

    const toString = () => {
        let string = '';
        if (!_list.head) {
            string = 'list is empty!';
        } else {
            string = `( ${_list.head.value} )`;
            let current = _list.head;
            while (current.next) {
                string += ` <--> ( ${current.next.value} )`;
                current = current.next;
            }
        }
        return string;
    }

    const insertAt = (value, index) => {
        if (index < 0) return 'invalid input: negative index';
        if (index === 0) return prepend(value);
        if (index >= size() || !_list.head) return append(value); //if index > list size OR list is empty, then append the value

        let current = _list.head;
        while (index > 0) {
            current = current.next;
            index--;
        }
        current = {value: value, next: current, prev: current.prev};
        current.prev.next = current;
        current.next.prev = current;

        updateDisplay();
    }

    const removeAt = (index) => {
        if (index < 0) return 'invalid input: negative index';
        if (index >= size()) return 'invalid input: index greater than list length';
        if (index === 0) {
            if (size() === 1) {
                _list.head = null;
                _list.tail = null;
                updateDisplay();
                return;
            }
            _list.head = _list.head.next;
            _list.head.prev = null;
            updateDisplay();
            return;
        }
        if (index === size() - 1) {
            _list.tail = _list.tail.prev;
            _list.tail.next = null;
            updateDisplay();
            return;
        }
        let current = _list.head;
        while (index > 0) {
            current = current.next;
            index--;
        }
        current.prev.next = current.next;
        current.next.prev = current.prev;

        updateDisplay();
    }

    return {
        updateDisplay, append, prepend, size, head, tail, at, pop, contains, find, toString, insertAt, removeAt
    }
}

let list = LinkedListFactory();
list.append(2);
list.append(3);
list.prepend(0);
list.insertAt(1,1);
list.append('remove');
list.removeAt(4);
list.updateDisplay();