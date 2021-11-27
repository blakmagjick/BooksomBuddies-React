export default function LoginButton (props) {
    const button = props.button
    const loggedIn = props.loggedIn
    if (button === false && loggedIn === false)
    return (
        <button onClick={props.setButton}>Login</button>
    )
    else 
    return (
        <></>
    )
}