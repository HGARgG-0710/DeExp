//!/usr/bin/env node

// ? Add an actual cmd-utility? Pray do...
import { reExp, deExp, addExp } from "./api.mjs"
import { readFile, writeFile } from "fs/promises"

const regexpFromArg = (x) => {
	const dashSplit = x.split("/")
	return RegExp(
		x.slice(
			...("/" === x[0]
				? [1, x.length - 1 - dashSplit[dashSplit.length - 1].length]
				: [])
		),
		dashSplit[dashSplit.length - 1].split("").concat(["g"])
	)
}

const commands = [deExp, reExp, addExp]

const mode = ["delete", "de"].includes(process.argv[4])
	? 0
	: ["replace", "re"].includes(process.argv[4])
	? 1
	: ["add", "ad"].includes(process.argv[4])
	? 2
	: (() => {
			throw new Error(`Unknown command ${process.argv[4]} passed`)
	  })()

await writeFile(
	process.argv[3],
	commands[mode](
		(await readFile(process.argv[2])).toString(),
		...process.argv
			.slice(5)
			.map(
				!mode
					? regexpFromArg
					: mode === 1
					? (x, i) => (i ? x : regexpFromArg(x))
					: (x, i) => (i > 0 ? regexpFromArg(x) : x)
			)
	)
)
