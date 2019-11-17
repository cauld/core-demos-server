// Sample file types to return
const fileTypes = [
  "txt",
  "pdf",
  "csv",
  "xlsx"
];

// Returns random item from array
function getRandomItem(items) {
  return items[Math.floor(Math.random() *   items.length)];
}

// Builds a VFS breadcrumb
function generateVfsFileBreadcrumbs(filePath) {
	const fileParts = filePath.split("/");
	let stringBuilder = '';
  return fileParts.map(fp => {
		stringBuilder += fp.startsWith('/') ? fp : `/${fp}`;
    return { "path": stringBuilder.replace('//', '/') }
  });
}

// Builds a VFS folder entry
function generateVfsFolder(folderName, folderPath) {
  return {
		"fileName": `${folderName}`,
		"extension": "",
		"inherits": true,
		"isHidden": false,
		"onlyOwnerShares": false,
		"path": folderPath,
		"folderType": "GENERIC",
		"version": 1,
		"created": "2019-11-14T19:38:25.647Z",
		"versionCreated": "2019-11-14T19:38:25.647Z",
		"maxVersion": 1,
		"links": null,
		"location": "",
		"uuid": "22e6bfac-f5f5-4142-8c94-49f6853d1e15",
		"metadata": {
			"yxType": "FOLDER"
		},
		"contentHash": null,
		"contentId": null,
		"contentSize": null,
		"entryOwner": {
			"firstName": "Philip",
			"avatar": null,
			"email": "fry@planetexpress.com",
			"id": "03e32df2-4af4-44a8-9f69-8307ff3cf265",
			"lastName": "Fry",
			"name": "fry"
		},
		"md5Hash": null,
		"assetCategory": "FOLDER",
		"deleted": null,
		"breadcrumbs": generateVfsFileBreadcrumbs(folderPath)
	};
}

// Builds a VFS file entry
function generateVfsFile(fileName, fileExtension, parentPath) {
	const fileNameWithExtension = `${fileName}.${fileExtension}`;
	const fullFilePath = `${parentPath}/${fileNameWithExtension}`;
  return {
		"fileName": `${fileNameWithExtension}`,
		"extension": `${fileExtension}`,
		"inherits": true,
		"isHidden": false,
		"onlyOwnerShares": false,
		"path": fullFilePath,
		"folderType": null,
		"version": 1,
		"created": "2019-11-14T19:38:34.484Z",
		"versionCreated": "2019-11-14T19:38:34.484Z",
		"maxVersion": 1,
		"links": null,
		"location": "",
		"uuid": "42c932d8-131d-4343-8879-8382d21fbea9",
		"metadata": {
			"yxType": "OTHER",
			"size": "384"
		},
		"contentHash": "4f15d3ad5ca53bed6140f5addaa2172abae96e6b7bdd80dd76561a5fd0eb6cfd",
		"contentId": "492e92c2-73d2-4a0b-8f44-148da97ef6b2",
		"contentSize": 384,
		"entryOwner": {
			"firstName": "Philip",
			"avatar": null,
			"email": "fry@planetexpress.com",
			"id": "03e32df2-4af4-44a8-9f69-8307ff3cf265",
			"lastName": "Fry",
			"name": "fry"
		},
		"md5Hash": "478abaf41b1fa24a6bf70dc39e9bf550",
		"assetCategory": "OTHER",
		"deleted": null,
		"breadcrumbs": generateVfsFileBreadcrumbs(fullFilePath)
  }
}

/*
MAIN - Generate a sample file/directory structure
*/
const DEMO_USERS_HOME_DIR = "/users/fry";
const filesToGenerate = [];
["", "folder1", "folder2"].forEach(f => {
	const folder = (f === "") ? DEMO_USERS_HOME_DIR : `${DEMO_USERS_HOME_DIR}/${f}`;
	if (folder !== DEMO_USERS_HOME_DIR) {
		filesToGenerate.push(generateVfsFolder(f, folder));
	}
  for (let i=0; i<100; i++) {
    filesToGenerate.push(generateVfsFile(i, getRandomItem(fileTypes), folder));
  }
});

const sampleVFSResponse = {
	"totalCount": filesToGenerate.length,
	"assets": filesToGenerate
};

// Returns a sample VFS response
module.exports = { sampleVFSResponse };
