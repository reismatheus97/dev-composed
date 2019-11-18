import * as compose from 'docker-compose'
import path from 'path'

const __COMPOSER_DIR = path.join(path.resolve() + '/src/database/compose_env')


console.log(__COMPOSER_DIR)

const upEnv = (services = []) => {
	console.log(services)
	return compose.upMany(
		services,
		{
			cwd: __COMPOSER_DIR, log: true
		}
	).then(
		() => {
			console.log('+ `up` done')
		},
			err => { console.log('something went wrong:', err)}
	)
}

const stop = (service = '') => compose.stopOne(
	service,
	{
		cwd: __COMPOSER_DIR, log: true
	}).then(
		() => {
			console.log('+ `upAll` done')
		},
			err => { console.log('something went wrong:', err.message)}
	);


const buildEnv = () => compose.buildAll({
		cwd: __COMPOSER_DIR, log: true
	}).then(
		res => {
			console.log('+ `upAll` done', res)
		},
			err => { console.log('something went wrong:', err.message)}
		);


const upAll = () => compose.upAll({
	cwd: __COMPOSER_DIR, log: true
}).then(
	res => {
		console.log('+ `upAll` done', res)
	},
		err => { console.log('something went wrong:', err.message)}
	);


const dropAll = () => compose.down({
	cwd: __COMPOSER_DIR, log: true
}).then(
	res => {
		console.log('+ `dropEnv` done', res)
	},
		err => { console.log('something went wrong:', err.message)}
	);

const checkEnv = (images = []) => compose.ps({
	cwd: __COMPOSER_DIR, log: true
}).then(
	(res) => {
		console.log('+ `checkEnv` done')
		let outImages = []
		res.out.split("\n").forEach((line, idx, arr) => {
			if (!([0, 1, arr.length - 1].some(it => it === idx))) {
				const imgName = line.split(" ")[0]
				console.log(imgName)
				let foundImg = images.find(it => imgName.includes(it.name + "_"))
				if (foundImg) {
					// foundImg.ports = foundImg.ports.join(",")
					console.log("found >>", foundImg.ports)
					foundImg.status = line.includes("Up") ? 1 : 0
					outImages.push(foundImg)
				}
			}
		})
		console.log(outImages)
		return outImages
	},
		err => { console.log('something went wrong:', err.message)}
	);


export {
	upEnv, stop, upAll, dropAll, checkEnv, buildEnv
}