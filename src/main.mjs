//!/usr/bin/env node

// ? Add an actual cmd-utility? Pray do...
import { reExp, deExp, addExp } from "./api.mjs"
import { readFile, writeFile } from "fs/promises"

const regexpFromArg = (x) => RegExp(x.slice(...("/" === x[0] ? [1, x.length - 1] : [])))

const commands = [deExp, reExp, addExp]

const mode = ["delete", "de"].includes(process.argv[3])
	? 0
	: ["replace", "re"].includes(process.argv[3])
	? 1
	: ["add", "ad"].includes(mode)
	? 2
	: (() => {
			throw new Error(`Unknown command ${process.argv[3]} passed`)
	  })()
await writeFile(
	process.argv[2],
	commands[mode](
		await readFile(process.argv[1]),
		...process.argv
			.slice(4)
			.toString()
			.split("\n")
			.map(
				!mode
					? regexpFromArg
					: mode === 1
					? (x, i) => (i ? x : regexpFromArg(x))
					: (x, i) => (i > 0 ? regexpFromArg(x) : x)
			)
	)
)
