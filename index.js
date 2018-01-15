const puppeteer = require('puppeteer');
const fs = require('fs');

const fileName = 'banks.csv';
if (fs.existsSync(fileName)) {
	fs.truncateSync(fileName);
}

const allRows = [];
let startTime = new Date();
console.log(`Start to fetch data at [${startTime}]`);
startTime = startTime.getTime();

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	let index = 1

	while (true) {
		const now = new Date().getTime();
		await page.goto(`http://furhr.com/?page=${index}`);

		const rows = await page.evaluate(() => {
			const trs = Array.from(document.querySelectorAll('tr.gary ~ tr'));
			// console.log(trs);
			return trs.map(tr => {
				const tds = Array.from(tr.querySelectorAll('td'));
				return tds.map(td => td.textContent);
			});
		});
		rows.forEach(row => {
			// comments the following when write file in loop
			allRows.push(row);
			
			// uncomments the following when write file in loop
			// fs.appendFileSync(fileName, row.join('\t'), 'utf8');
			// fs.appendFileSync(fileName, '\r\n', 'utf8');
		})

		if (rows.length === 0) {
			break;
		}

		console.log(`Page[${index}] done, spent ${new Date().getTime() - now}ms.`);
		index++;
	}

	await browser.close();

	// comments the following when write file in loop
	console.log(`Start to write file [${fileName}]...`);
	allRows.forEach(row => {
		fs.appendFileSync(fileName, row.join('\t'), 'utf8');
		fs.appendFileSync(fileName, '\r\n', 'utf8');
	});

	console.log(`Totally spent ${(new Date().getTime() - startTime) / 1000}s.`)
})();