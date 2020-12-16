import path from "path";
import fs, {promises as fsPromise} from 'fs';
import matter from "gray-matter";
import marked from "marked";

const markdownDir = path.join(process.cwd(), 'markdown')

export const getPosts = async () => {
    const filenames = await fsPromise.readdir(markdownDir)
    const posts = filenames.map(filename => {
        const id = filename.split('.')[0]
        const fulPath = path.join(markdownDir, filename)
        const content = fs.readFileSync(fulPath, {encoding: 'utf-8'})
        const {title, date} = matter(content).data
        return {id, title, date}
    })
    return posts
}

export const getPostIds = async () => {
    const filenames = await fsPromise.readdir(markdownDir)
    return filenames.map(filename => filename.replace(/.md$/, ''))
}

export const getPost = (id: string) => {
    const fulPath = path.join(markdownDir, id + '.md')
    try {
        const text = fs.readFileSync(fulPath, {encoding: 'utf-8'})
        const {
            data: {title, date},
            content
        } = matter(text)
        const htmlContent = marked(content)
        return {id, title, date, content, htmlContent}
    } catch (e) {
        return {}
    }

}