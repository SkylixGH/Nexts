import logger from '@nexts-stack/logger'
import https from 'https'
import crashError from '../../misc/crashError'

/**
 * A github tag
 */
export interface Tag {
	/**
	 * The tag name
	 */
	name: string;

	/**
	 * The zip release
	 */
	zipball_url: string;

	/**
	 * The tar release
	 */
	tarball_url: string;

	/**
	 * The commit info
	 */
	commit: {
		/**
		 * The commit sha
		 */
		sha: string;

		/**
		 * The commit url
		 */
		url: string;
	};

	/**
	 * The node ID
	 */
	node_id: string,
}

/**
 * Get all tags from a github repository
 * @param org The organization name
 * @param repo The repository name
 * @param page The page number
 * @returns All tags from the repository
 */
export default function getTags(org: string, repo: string, page = 1) {
	return new Promise<Tag[]>((resolve, reject) => {
		const url = `/repos/${org}/${repo}/tags?page=${page}`

		https.get({
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
			},
			host: 'api.github.com',
			path: url,
		}, (res) => {
			let data = ''

			res.on('data', (chunk) => {
				data += chunk
			})

			res.on('end', () => {
				let tags: Tag[] = []

				try {
					tags = JSON.parse(data)
				} catch (error) {
					logger.error('Github responded with an error: ')
					data.split('\n').forEach((line) => {
						logger.error(line)
					})

					process.exit(1)
				}

				if (tags.length === 0) {
					resolve([])
				} else {
					resolve(tags)
				}
			})
		}).on('error', (error) => {
			logger.error(`Failed to fetch tags from github repository '${org}/${repo}'`)
			crashError(error)

			process.exit(1)
		})
	})
}
