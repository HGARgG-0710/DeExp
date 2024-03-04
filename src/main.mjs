import { reExp, deExp, addExp } from "./api.mjs"
import { readFile, writeFile } from "fs/promises"

const contents = await readFile(process.argv[1])
const [modeInd, writeInd] = [2, 3].map((x) => (x + process.argv.length > 4 ? 4 : 0))

const mode = process.argv[modeInd]
const command = ["delete", "de"].includes(mode)
	? deExp
	: ["replace", "re"].includes(mode)
	? reExp
	: addExp
const args = process.argv.slice(modeInd, writeInd)
writeFile(process.argv[writeInd], command(contents, ...args))
