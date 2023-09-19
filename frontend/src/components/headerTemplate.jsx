import '../styles/headerTemp.css'
export default function HeaderTemplate(props){
    return(
        <div className='headerTemp'>
            <div>
                <p className='hard'>model by: </p>
                <p className='fdata'>{props.uploadername}</p>
                <p className='fview'>{props.view}</p>
            </div>
        </div>
    )
}