function drawNestedSetsTree(data, node) {
	const dataList = {};
	data.forEach(item => dataList[item.left] = item);

	// собираем данные в виде вложенного массива
	const tree = [];
	(function processItem(item, arr) {
		const children = [];
		arr.push({
			children,	
			title: item.title
		});

		if (item.right + 1 in dataList) { // обработать следующий соседний элемент
			processItem(dataList[item.right + 1], arr);
		}
		if (item.right - item.left > 1) { // обработать первый дочерний элемент
			processItem(dataList[item.left + 1], children);
        }
	})(dataList[1], tree);

	// рендерим списки из массива
	let output = '';
	(function renderList(list) {
		if (list.title == '' && list.children.length === 0) return; // игнорируем пустые списки/пункты
		
		output += '<li>' + list.title;
		
		if (list.children.length) {
			output += '<ul>';
			list.children.forEach(list => renderList(list));
			output += '</ul>';
        }

		output += '</li>';
	})(tree[0]);

	node.innerHTML = '<ul>' + output + '</ul>';
}
