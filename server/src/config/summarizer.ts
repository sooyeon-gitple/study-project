import {ContentsModel} from '../model/contents';
let SummarizerManager = require("node-summarizer").SummarizerManager;


//text_to_summarize: is a String of the text you want summarized.
// number_of_sentences: is an Int of how many sentences you want in the summary.

const number_of_sentences = 1;
let text_to_summarize = "";

const getTop5 = async () =>{

    // contents 의 모든 title, text 모아서 string 으로
    for await (const doc of ContentsModel.find()){
        text_to_summarize = `${text_to_summarize}${doc.title}${doc.text}`
        
    }
    // summarize by rank
    let Summarizer = new SummarizerManager(
        text_to_summarize,number_of_sentences
        );
    const summary_object = await Summarizer.getSummaryByRank();
  
    // 키워드 전체 배열안에 모으고
    let valueArr = [...summary_object.nouns_and_adjactive_map.values()];
    // flatten
    let textArr:string[] = [];
    for(const value of valueArr){
        textArr = [...textArr, ...value];
    }

    // 사용 빈도 체크 
    const textMap = new Map();
    for(const text of textArr){
        const count = textMap.get(text);
        if(!count){
            textMap.set(text,1)
        }else{
             textMap.set(text,count+1);
        }
    }

    // 빈도순 정렬
    let sortedArr = [...textMap.entries()].sort((a, b) => b[1] - a[1]); 
    sortedArr = sortedArr.slice(0,10);

    // 상위 10개만 잘라서 보기좋게(?) 만들어 보내기
    let result: any[] = [];
    for(const item of sortedArr){
        let tempItem = { keyword:item[0], frequency:item[1] };
        result = [...result, tempItem]
    }

    return result;
}

export default getTop5;
