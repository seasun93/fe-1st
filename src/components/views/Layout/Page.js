import React from 'react';
import { Link } from 'react-router-dom';

function Page({total, limit, page, type}) {
    const items = Math.ceil(total / limit);
    const intPage = parseInt(page)

    const pagination = () =>{
        const htmlTag = [];        
        if(intPage < 3 ){
            if(items <= 5 ){
                console.log('page 1,2 / items 5이하')
                for(let i = 1; i <items + 1 ; i++){
                    htmlTag.push(<Link key = {i} to={`/${type}/list/${i}`} className={intPage == i ? 'page-btn page-active' : 'page-btn'}>{i}</Link>)
                }
            } else {
                console.log('page 1,2 / items 5이상')
                for(let i = 1; i < 6 ; i++){
                    htmlTag.push(<Link key = {i} to={`/${type}/list/${i}`} className={intPage == i ? 'page-btn page-active' : 'page-btn'}>{i}</Link>)
                }
            }
            return htmlTag
        }
        if(intPage >= 3){
            if(intPage == items){
                console.log('page == total')
                for(let i = items-5; i < items; i++){
                    htmlTag.push(<Link key = {i} to={`/${type}/list/${i+1}`} className={intPage -1 == i ? 'page-btn page-active' : 'page-btn'}>{i+1}</Link>)
                }
                return htmlTag
            }
            if(items <= 5 ){
                console.log('page 3이상, items 5이하')
                for(let i = 1; i < items + 1; i++){
                    htmlTag.push(<Link key = {i} to={`/${type}/list/${i}`} className={intPage == i ? 'page-btn page-active' : 'page-btn'}>{i}</Link>)
                }
            } else {
                if(items - intPage >= 2 ){
                    console.log('page 3이상, items 5이상, page와 items차이가 2보다 같거나 클 때')
                    htmlTag.push(<Link key = {intPage - 2 } to={`/${type}/list/${intPage - 2 }`} className='page-btn'>{intPage - 2}</Link>)
                    htmlTag.push(<Link key = {intPage - 1 } to={`/${type}/list/${intPage - 1 }`} className='page-btn'>{intPage - 1}</Link>)
                    htmlTag.push(<Link key = {intPage} to={`/${type}/list/${intPage}`} className='page-btn page-active'>{intPage}</Link>)
                    htmlTag.push(<Link key = {intPage + 1 } to={`/${type}/list/${intPage + 1 }`} className='page-btn'>{intPage + 1}</Link>)
                    htmlTag.push(<Link key = {intPage + 2 } to={`/${type}/list/${intPage + 2 }`} className='page-btn'>{intPage + 2}</Link>)
                } else {
                    console.log('page 3이상, items 5이상인데 page와 items 차이가 2보다 작을 때')
                    for(let i = intPage - 3; i < items + 1; i++){
                        htmlTag.push(<Link key = {i} to={`/${type}/list/${i}`} className={intPage == i ? 'page-btn page-active' : 'page-btn'}>{i}</Link>)
                    }
                }
            }
            return htmlTag
        }
    }

    return (
        <div>
            <div className='arrow-btn'></div>
            <div>
                {page != 1 && (<Link to={`/${type}/list/1`} className='page-btn arrow-btn'>&lt;</Link>)}
                {pagination()}
                {page != items && (<Link to={`/${type}/list/${items}`} className='page-btn arrow-btn'>&gt;</Link>)}
                </div>
        </div>
    )
}

export default Page