export default function Register (props) {
    const regButton = props.regButton
    const loggedIn = props.loggedIn
    if (regButton === true && loggedIn === false) 
    return (
        <>
            <form className="bg-transparent shadow-md rounded px-3 pt-3 mb-3" id='regform'>
                <label>Username:</label>
                <input 
                    type='text'
                    id='regname'
                    name='username'
                    onChange={(event) => props.change(event)}
                />
                <label>Email:</label>
                <input 
                    type='text'
                    id='regemail'
                    name='email'
                    onChange={(event) => props.change(event)}
                />
                <label>Password:</label>
                <input 
                    type='password'
                    id='regpw'
                    name='password'
                    onChange={(event) => props.change(event)}
                />
                <input className='bg-gray-500 text-white font-bold py-1 px-1 rounded-full' type='button' value='Register' id='regsubmit' onClick={props.register} />
            </form>
        </>
    )
    else 
    return(
        <></>
    )
    // else 
    // return (
    //     <button onClick={props.setButton}>Register</button>
    // )
}