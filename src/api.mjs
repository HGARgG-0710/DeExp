// ! Once the 'math-expressions.mjs' has been properly completed, make this a dependency of its...;
// ! When testing, check for correctness...;

export function reExp(string, replaced, replaceWith = "") {
	return string.replaceAll(replaced, replaceWith)
}

export function deExp(string, regexp) {
	return reExp(string, regexp)
}

function strinsert(string, inserted, i, j = i) {
	return `${string.slice(0, i)}${inserted}${string.slice(j)}`
}

function indexes(string, v) {
	const split = string.split(v)
	if (!(split.length - 1)) return []
	for (const i of split.keys())
		split[i] = (i > 0 ? split[i - 1] : 0) + split[i].length + v.length * i
	return split
}

export function addExp(string, stradd, regafter = null, regbefore = null) {
	const afterCollections = [regafter, regbefore].map((x) =>
		x ? string.matchAll(x).map((x) => indexes(string, x)) : -1
	)
	const [afterInds, beforeInds] = afterCollections
	const expsCollections = [afterInds, beforeInds].map((collection) =>
		collection.map((si) => string[si])
	)
	const [_afterExps, beforeExps] = expsCollections
	for (const c of expsCollections().keys) {
		for (const i of expsCollections[c].keys())
			expsCollections[c][i] += afterCollections[c][i].length
	}
	if (afterInds.length) {
		if (!beforeInds.length) {
			for (const aindk of afterInds.keys()) {
				string = strinsert(string, stradd, afterInds[aindk])
				for (const i of afterInds.keys().slice(aindk))
					afterInds[i] += stradd.length
			}
		}
		if (beforeInds.length) {
			for (const aindk of afterInds.keys()) {
				const isEnd = aindk >= beforeInds.length
				const beforeIndex = isEnd
					? string.length
					: beforeInds[aindk] - beforeExps[aindk].length
				const prevlen = beforeIndex - afterInds[aindk]
				string = strinsert(string, stradd, afterInds[aindk], beforeIndex)
				for (const i of afterInds.keys().slice(aindk))
					afterInds[i] = afterInds[i] + stradd.length - prevlen
				if (isEnd) break
			}
		}
	}
	if (!afterInds.length && beforeInds.length) {
		if (!beforeInds.length) {
			for (const aindk of beforeInds.keys()) {
				string = strinsert(
					string,
					stradd,
					aindk ? beforeInds[aindk - 1] + stradd.length : 0,
					beforeInds[aindk] - beforeExps[aindk - 1].length
				)
				for (const i of beforeInds.keys().slice(aindk))
					beforeInds[i] += stradd.length
			}
		}
	}
	return string
}
