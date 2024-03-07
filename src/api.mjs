// ? Once the 'math-expressions.mjs' has been properly completed, make this a dependency of its...;

export function reExp(string, replaced, replaceWith = "") {
	return string.replaceAll(replaced, replaceWith)
}

export function deExp(string, regexp) {
	return reExp(string, regexp)
}

function strinsert(string, inserted, i, j = i) {
	return `${string.slice(0, i)}${inserted}${string.slice(j)}`
}

// ? Refactor?
export function addExp(string, stradd, regafter = null, regbefore = null) {
	const afterCollections = [regafter, regbefore].map((x) =>
		x
			? (() => {
					const final = []
					let arr
					while ((arr = x.exec(string))) final.push(arr.index)
					return final
			  })()
			: []
	)
	const [afterInds, beforeInds] = afterCollections
	const expsCollections = [afterInds, beforeInds].map((collection) =>
		collection.map((si) => string[si])
	)
	const beforeExps = expsCollections[1]
	for (const i of beforeExps.keys()) beforeInds[i] += beforeExps[i].length
	if (afterInds.length) {
		if (!beforeInds.length) {
			for (const aindk of afterInds.keys()) {
				string = strinsert(string, stradd, afterInds[aindk] + 1)
				for (const i of Array.from(afterInds.keys()).slice(aindk))
					afterInds[i] += stradd.length
			}
		}
		if (beforeInds.length) {
			for (const aindk of afterInds.keys()) {
				if (aindk >= beforeInds.length) break
				string = strinsert(
					string,
					stradd,
					afterInds[aindk],
					beforeInds[aindk] - beforeExps.length
				)
				for (const i of Array.from(afterInds.keys()).slice(aindk))
					afterInds[i] += stradd.length
			}
		}
	}
	if (!afterInds.length && beforeInds.length) {
		for (const aindk of beforeInds.keys()) {
			string = strinsert(
				string,
				stradd,
				beforeInds[aindk] - beforeExps[aindk].length
			)
			for (const i of Array.from(beforeInds.keys()).slice(aindk))
				beforeInds[i] += stradd.length
		}
	}
	return string
}
