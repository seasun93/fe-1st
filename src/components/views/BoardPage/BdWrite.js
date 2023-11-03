import MDEditor from '@uiw/react-md-editor';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

function BdWrite() {
    const user = useSelector((state)=> state.user);
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    const [Tag, setTag] = useState('')

    const inputTt = useRef(null);
    const tagName = useRef(null);

    
    const onTitleHandler = (e) => {
        setTitle(e.target.value);
    }
    
    const onTagHandler = (e) => {
        setTag(e.target.value);
    }

    const [TagList, setTagList] = useState([]); // 초기 배열 상태 설정

    function pushTag(Tag){
        const newTag = Tag;
        return setTagList(prevTag => [...prevTag, newTag]); // 이전 배열에 새로운 요소 추가
    };
    const onEnterHandler = (e)=>{   
        // if(e.keyCode === 13){

        //     pushTag();
        //     console.log(TagList)
        //     const tagArray = TagList.map((tag, idx)=>{
        //         console.log(tag, idx)
        //         return (
        //             <em className={`tag-${tag}`}> {tag} <span className="close" onClick={onCloseHandler}></span></em>
        //         )
        //     })
        //     // tagName.current.innerHTML = tagArray;
        //     setTag('');
        }
    }

    const onCloseHandler = (e)=>{
        console.log(e.target)
    }


    return (
        <div className="write-wrap">
            <div className="write-info">
                <label>
                    <span>제목</span>
                    <input type="text" value={Title} name="boardTitle" onChange={onTitleHandler} placeholder='책제목을 입력해주세요' ref={inputTt} />
                </label>
                <label>
                    <span>제목</span>
                    <input type="text" value={(user.isLoggedIn) && user.user.name} name="author" readOnly />
                </label>
            </div>
            <div className="markarea">
                <div data-color-mode="white">
                    <MDEditor height={865} value={Content} onChange={setContent} />
                </div>
            </div>
            <div className="write-tag">
                <div className="tag-name" ref={tagName}></div>
                <input text="text" value={Tag} onKeyDown={onEnterHandler} onChange={onTagHandler}/>
            </div>
        </div>
    )
}

export default BdWrite