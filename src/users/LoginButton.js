export default function LoginButton (props) {
    const button = props.button
    if (button === false)
    return (
        <button onClick={props.setButton}>Login</button>
    )
    else 
    return (
        <></>
    )
}