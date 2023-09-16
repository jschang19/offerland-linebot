import csv from 'csv-parser';
import fs from 'fs';
import Fuse from 'fuse.js';


export async function searchInfo(userMessage) {
  const {university, universityCode, department} = await parseSearchTerms(userMessage);
  if(!universityCode){
    return [] // return empty array as no data is available
    }
    const allDepartments = await getAllDepartments(universityCode);
    const results = filterDepartments(allDepartments, department);
    return extractInfo(results);
}

// parse user message to get university and department
const parseSearchTerms = async (userMessage) => {
    let university = '';
    let department = '';
    let searchMode = 1; // 1: 個人申請, 2: 繁星推薦  3.分科測驗  4. 科技大學
    const universityRegex = /(.*?)大學/;
    const departmentRegex = /學系$|系$/;

    const universityMatch = userMessage.match(universityRegex);
    if (universityMatch) {
        university = universityMatch[0]; 
    } else {
        university = userMessage.slice(0, 2);
    }

    department = userMessage.slice(university.length).replace('大學', '');
    const departmentMatch = department.match(departmentRegex);
    if (departmentMatch) {
        department = department.slice(0, -departmentMatch[0].length);
    }
    
    const universityCode = await getUniversityCode(university);
    return {
        university,
        universityCode,
        department,
        searchMode
    }
};


const getUniversityCode = async (university) => {
    try {
      const results = await new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream('../data/code.csv')
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve(results))
          .on('error', reject);
      });
      const result = results.find((result) => {
        return result.search_word.includes(university);
      });
      return result ? result.code : null;
    } catch (err) {
      throw err;
    }
  };
  

const getAllDepartments = async (universityCode) => {
    // open csv file with universityCode
    // then parse the csv file to get the department info
    // return the department info
    try {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(`./data/${universityCode}.csv`)
              .pipe(csv())
              .on('data', (data) => results.push(data))
              .on('end', () => resolve(results))
              .on('error', reject);
        });
    }
    catch(err) {
        throw err;
    }
};

const filterDepartments = (allDepartments, department) => {
    if(!allDepartments || !department){
        throw new Error('allDepartments and department are required');
    }

	const options = {
		includeScore: true,
		keys: ['搜尋關鍵字'],
	};

	const fuse = new Fuse(allDepartments, options);
	const results = fuse.search(department);
	return results.filter((item) => {
		return item.score < 0.2;
	});
};

const extractInfo = (results) => {
	return results.map((result) => {
		return {
			name: result.item.校系名稱及代碼,
			numRecruit: result.item.招生名額,
			numReview: result.item.預計甄試人數,
			numIsland: result.item.離島外加名額,
			date: result.item.指定項目甄試日期,
			url: result.item.科系校系分則網址,
			unewsUrl: result.item.大學問網址,
		};
	});
}

async function main() {
    console.log('start');
    const results = await searchInfo('臺大資工');
    console.log(results);
}

main();