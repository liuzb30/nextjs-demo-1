import path from "path";
import fs,{promises as fsPromise} from 'fs';
import matter from "gray-matter";
export const getPosts= async ()=>{
    const markdownDir = path.join(process.cwd(),'markdown')
    const filenames = await fsPromise.readdir(markdownDir)
    const posts = filenames.map(filename=>{
        const id = filename.split('.')[0]
        const fulPath = path.join(markdownDir,filename)
        const content = fs.readFileSync(fulPath,{encoding:'utf-8'})
        const {title,date} = matter(content).data
        return {id,title,date}
    })
    return posts
}