import {
    SET_TODAYS_HISTORY,
    PUSH_TODAY_HISTORY,
    SET_ALL_HISTORY,
    REORDER_TODAY_HISTORY,
    SET_SHOULD_LEARN_HISTORY,
    SET_REVIEW_WORDS
} from '../actions/actions';

const INIT_STATE = {
    todaysHistory: [],
    allHistory: [],
    shouldLearnHistory: [],
    reviewWords: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_TODAYS_HISTORY:
            return { ...state, todaysHistory:action.payload};

        case SET_SHOULD_LEARN_HISTORY:
            return { ...state, shouldLearnHistory:action.payload};

            case SET_REVIEW_WORDS:
            return { ...state, reviewWords:action.payload};

        case REORDER_TODAY_HISTORY:

            console.log(action.payload._id)
            let index = state.todaysHistory.findIndex(x => x.word_id === action.payload._id);
            if(index === -1){
                return {...state, todaysHistory: state.todaysHistory};
            }
            let updatedArray = [];
            let tempElement;
            state.todaysHistory.map((e,i)=>{
                if(i === index){
                    tempElement = e;
                }else {
                    updatedArray.push(e)
                }

            })
            updatedArray.push(tempElement)
            return {...state, todaysHistory: updatedArray }

        case SET_ALL_HISTORY:
            return { ...state, allHistory:action.payload};

        case PUSH_TODAY_HISTORY:
            return { ...state, todaysHistory: [...state.todaysHistory, action.payload]};
        default: return { ...state };
    }
}
