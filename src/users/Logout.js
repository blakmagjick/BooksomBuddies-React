export default function Logout (props) {
    const logoutbutton = props.loggedIn
    if (logoutbutton)
    return (
        <>
            <button className='btn btn-secondary btn-sm' onClick={props.logout}>Logout</button>
        </>
    )
    else
    return (
        <></>
    )
}