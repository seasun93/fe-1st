import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getList } from '../_reducers/postSlice';

export default function withListAdd(SpecificComponent, type) {
    function ListAdd(props){
        const dispatch = useDispatch();

        useEffect( () => {
            let types = type;
            if(type === 1) {
                return types = 'board';

            } else if(type === 2) {
                return types = 'portfolio'
            }
                dispatch(getList(types))
        }, [type, SpecificComponent]);

        return (
            <SpecificComponent />
        )
    }

    return ListAdd;
}
