export default function Logout (props) {
    const logoutbutton = props.loggedIn
    if (logoutbutton)
    return (
        <>
            <button onClick={props.logout}>Logout</button>
        </>
    )
    else
    return (
        <></>
    )
}