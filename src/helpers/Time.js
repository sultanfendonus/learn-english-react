import moment from "moment";

export const renderLocalFromNow = (time)=>{
    let local = moment(time).format()
    return moment(local).startOf('second').fromNow()
}
