const express = require('express')
const app = express()
const fileupload = require('express-fileupload')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(fileupload())

// app.get('/', (req, res) => {
//   res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
// })

app.get('/images', (req, res) => {
  const data = fs.readFileSync(`${__dirname}/data.json`)
  const images = JSON.parse(data)
  res.json(images)
})

app.use('/', express.static(path.join(`${__dirname}/img`)))
console.log(path.join(`${__dirname}/`));

app.post("/upload", (req, res) => {

	const pictureUploadPath = path.join(`${__dirname}/../Frontend/img/${req.files.file.name}`)

	if (req.files) {
		const uploadedPicture = req.files.file;
		uploadedPicture.mv(pictureUploadPath, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
	}

	const fileData = JSON.parse(JSON.stringify(req.body))
	
	//const fileDataString = JSON.stringify(fileData, null, 2)
	const uploadPath = path.join(__dirname + "/data.json")

	const oldData = JSON.parse(fs.readFileSync(uploadPath))

	const newData = JSON.stringify([...oldData,fileData])

	console.log("newData",newData);

	fs.writeFileSync(uploadPath, newData, (err) => {
		if (err) {
			console.log(err);
			return res.status(500).send(err);
		}
	});

	return res.send(newData);
});

//configure the server port
app.listen(3000, (_) => {
    console.log('Server runs on localhost:3000')
})