# express-parse-formdata

## About this package
**An express middleware to parse formdata,
you can parse formdata fields and files with this pakage using express middleware.**

this awesome following package is used in this package
[busboy](https://www.npmjs.com/package/busboy)


## Note

 - This middleware is meant to be used for express.js
 - The request "content-type" must be "multipart/form-data"
 - The request "method" must be "POST"

## Get started

	npm i express-parse-formdata --save

## Examples

**we use express server for examples.**

```javascript
const { parsFormData } = require('express-parse-formdata');

app.use(parsFormData);

app.post('/test', (req, res) => {

	console.log(req.body);
	// { foo: 'bar' }

	console.log(req.files);
	// [
	// 	{
	// 		fieldName: 'file',
	// 		fileName: 'something.png',
	// 		encoding: '7bit',
	// 		mimeType: 'image/png',
	// 		buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 04 d8 00 00 02 bc 08 06 00 00 00 3d 03 02 0a 00 00 00 09 70 48 59 73 00 00 0b 13 00 00 0b 13 01 ... 491283 more bytes>
	// 	}
	// ]
});
```

**or you can use it just for one request**

```javascript
const { parsFormData } = require('express-parse-formdata');

app.post('/test', parsFormData, (req, res) => {

	console.log(req.body);
	// { foo: 'bar' }

	console.log(req.files);
	// [
	// 	{
	// 		fieldName: 'file',
	// 		fileName: 'something.png',
	// 		encoding: '7bit',
	// 		mimeType: 'image/png',
	// 		buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 04 d8 00 00 02 bc 08 06 00 00 00 3d 03 02 0a 00 00 00 09 70 48 59 73 00 00 0b 13 00 00 0b 13 01 ... 491283 more bytes>
	// 	}
	// ]
});
```

## Front-end Examples

```javascript
const [file] = document.querySelector('.file').files;
const  formData = new  FormData();

formData.append('file', file);
formData.append('foo', 'bar');

$.ajax({
	url:  `/test`,
	type:  'POST',
	data:  formData,
	cache:  false,
	enctype:  'multipart/form-data',
	contentType:  false,
	processData:  false,
}).done(data  => {
	console.log(data);
});

// or with fetch

fetch('/test', {
	method:  'POST',
	body:  formData
}).then(res  =>  res.json()).then(data  =>  console.log(data)); 

```

or with html form 

```html
<form  enctype="multipart/form-data"  action="/test"  method="post">
	<input  type="text"  name="foo">
	<input  type="file"  name="file">
	<input  type="submit"  value="Submit">
</form>
```