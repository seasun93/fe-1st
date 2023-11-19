import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function BdUpdate() {
    const user = useSelector((state)=> state.user);
    const navigate = useNavigate();
    const location = useLocation()

    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    const [Tag, setTag] = useState('')
    const [TagList, setTagList] = useState([]); // 초기 배열 상태 설정

    const [post, setPost] = useState('');
    const path = location.pathname.split('/');
    const boardType = path[1];
    const postNum = path[3];
    const inputTt = useRef(null);
    const author = useRef(null);
    const inputCt = useRef(null);
    const tagName = useRef(null);

    const tagArr = [];
    const tag = post.boardTag
    const originTagList =  String(tag).split(',');
    tagArr.push(originTagList)
    
    const viewData = async (e) => {
        const result = await axios.get(`/api/board/view/${postNum}`).then((res)=>{
            setPost(res.data.data[0])
        })
        return result;
    }
    useEffect(() => {
        viewData();
        // 기존데이터 덮어쓰기
        // inputTt.current.value = post.boardTitle
        setTitle(post.boardTitle)
        setContent(post.boardContent)
        setTagList(tagArr[0])

    },[postNum])
    
    console.log(post)

    const onTitleHandler = (e) => {
        setTitle(e.target.value);
    }
    
    const onTagHandler = (e) => {
        setTag(e.target.value);
    }

    const onEnterHandler = (e)=>{   
        if(e.keyCode === 13){
            setTagList(tag => [...tag, Tag])
            setTag('')
        }
    }

    const onCloseHandler = (tag)=>{
        //닫기 클릭 후 tagList에서 삭제
        setTagList((deleteTag) => {
            return deleteTag.filter((list)=> list !== tag)
        })
    }

    const onResetHandler = (e) => {
        setTag('')
    }

    const onCancelHandler = (e) => {
        e.preventDefault();
        navigate(-1)
    }

    const onSubmitHandler = async (e) => {

        await axios.post

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
                <input type="text" value={(user.isLoggedIn) && post.author} name="author" ref={author} readOnly />
            </label>
        </div>
        <div className="markarea">
            <div data-color-mode="white">
                <MDEditor height={865} value={Content} onChange={setContent} ref={inputCt} />
            </div>
        </div>
        <div className="write-tag">
            <div className="tag-name" ref={tagName}>
                {
                    TagList.map((el,i)=>{
                        return (
                            <em className={el} key={i}>{el}<span onClick={()=>onCloseHandler(el)}>닫기</span></em>
                        )
                    })
                }
            </div>
            <input text="text" value={Tag} onKeyDown={onEnterHandler} onChange={onTagHandler} onClick={onResetHandler}/>
        </div>
        <button onClick={onCancelHandler}>취소</button>
        <button onClick={onSubmitHandler}>수정</button>
    </div>
    )
}

export default BdUpdate