import Link from "next/link";
import {useEffect, useState} from "react";
import _ from 'lodash';

type Props = {
    page: number;
    totalPage: number;
}
export const usePager = (props: Props) => {
    const {page, totalPage} = props
    const [pages, setPages] = useState([])
    useEffect(() => {
        let temp = []
        temp.push(1)
        for (let i = page - 2; i <= page + 2; i++) {
            temp.push(i)
        }
        temp.push(totalPage)
        //排序并过滤不符合
        temp = _.uniq(temp).sort().filter(item => item >= 1 && item <= totalPage)
        // 增加占位符
        temp = temp.reduce((pre, current) => {
            if (pre.length && current - pre[pre.length - 1] > 1) {
                pre.push(-1)
            }
            pre.push(current)
            return pre
        }, [])
        setPages(temp)
    }, [page, totalPage])
    const pager = (
        <div className='pager'>
            {page > 1 && <Link href={`/?page=${page - 1}`}><a>上一页</a></Link>}
            {pages.map((p,index) => p===-1 ? <span key={index}>...</span> : <Link href={`/?page=${p}`} key={index}><a>{p}</a></Link>)}
            {page < totalPage && <Link href={`/?page=${page + 1}`}><a>下一页</a></Link>}
            <style jsx>{`
              .pager{
                padding-top: 20px;
                & >*{
                  margin-right: 10px;
                  padding: 8px;
                  border: 1px solid #eee;
                }
              } 
            `}</style>
        </div>
    )

    return {pager}
}