import logger from '@nexts-stack/logger'
import fs from 'fs/promises'
import path from 'path'
import crashError from '../misc/crashError'

/**
 * Write a cache record.
 * @param relativeCWDPath The path to the project root relative to the CWD.
 * @param recordPathRelative The path to the record relative from the .nexts folder.
 * @param content The file contents.
 * @returns Nothing.
 */
export default async function cacheWrite(relativeCWDPath: string, recordPathRelative: string, content: string) {
	const recordPath = path.join(process.cwd(), relativeCWDPath, '.nexts', recordPathRelative)

	try {
		await fs.mkdir(path.dirname(recordPath), {recursive: true})
		await fs.writeFile(recordPath, content)
	} catch (error) {
		logger.error(`Failed to write cache record to '${recordPath}`)
		crashError(error)

		process.exit(1)
	}
}
