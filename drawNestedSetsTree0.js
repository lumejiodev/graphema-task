function drawNestedSetsTree(data, node) {
	const UL_OPENER = '<ul>';
	const UL_CLOSER = '</ul>';
	const LI_OPENER = '<li>';
	const LI_CLOSER = '</li>';

	let tree = [];
	data.forEach(item => {
		tree[ item.left ] = LI_OPENER + item.title;
		tree[ item.right ] = LI_CLOSER;
	});

	tree = tree.map((step, i) => {
		if (step.match( LI_OPENER ) && tree[i-1] !== LI_CLOSER) {
			return UL_OPENER + step;
        } else if (step.match( LI_CLOSER ) && tree[i+1] && !tree[i+1].match( LI_OPENER )) {
			return step + UL_CLOSER;
		} else {
			return step;
        }
	});

	tree.push( UL_CLOSER );

	node.innerHTML = tree.join('');
}
