export default function LoginButton (props) {
    const button = props.button
    const loggedIn = props.loggedIn
    if (button === false && loggedIn === false)
    return (
        <button class='bg-gray-500 text-white font-bold py-1 px-1 rounded-full' onClick={props.setButton}>Login</button>
    )
    else 
    return (
        <></>
    )
}