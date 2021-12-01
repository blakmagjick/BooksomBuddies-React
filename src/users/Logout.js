export default function Logout (props) {
    const logoutbutton = props.loggedIn
    if (logoutbutton)
    return (
        <>
            <button className='bg-gray-500 text-white font-bold py-1 px-1 rounded-full' onClick={props.logout}>Logout</button>
        </>
    )
    else
    return (
        <></>
    )
}