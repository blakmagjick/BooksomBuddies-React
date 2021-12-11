export default function RegisterButton (props) {
    const button = props.button
    const loggedIn = props.loggedIn
    if (button === false && loggedIn === false)
    return (
        <button className='btn btn-secondary btn-sm' onClick={props.setButton}>Register</button>
    )
    else 
    return (
        <></>
    )
}