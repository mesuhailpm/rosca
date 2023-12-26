import React, { FormEvent } from 'react'
import OTPInput from 'react-otp-input'
type Props = {
    email: string,
    expiresIn: number,
    otp: string,
    numberOfInputs: number,
    handleChange: (otp: string)=>void,
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
}

const OTPInputField = ({ email, expiresIn, otp, numberOfInputs, handleChange, handleSubmit }: Props) => {

    if(!email) return(
    <>
    <h1 className='text-center font-serif md:text-2xl m-2'><strong>Oops!</strong> We determined that this is page is unavailable right now 🙂.</h1>
    <h2 className='text-center font-serif md:text-xl'> Please let us know if you think that this is wrong!</h2>
    <h2 className='text-center font-serif font-bold md:text-3xl m-4'>Thank you 😊</h2>
    </>)
    return (
        <>
            <h1 className="text-xl font-bold">Enter the OTP</h1>
            <form
                className="p-4 m-2 flex flex-col items-center"
                onSubmit={handleSubmit}
            >
                <h2 className="text-xl text-center">{`Please check your email for the OTP: `}<strong>'{`${email}`}'</strong> </h2>
                <h2 className="font-bold text-center">{`The OTP will expire in ${expiresIn} minutes`} </h2>
                <OTPInput
                    value={otp.toString()}
                    onChange={handleChange}
                    numInputs={numberOfInputs}
                    renderInput={(props) => (
                        <input {...props} className="m-2" inputMode="numeric" />
                    )}
                    inputStyle={{
                        width: "20px"
                    }}
                    shouldAutoFocus={true}
                />
                <button
                    className="bg-blue-800 text-fuchsia-100 p-2 m-2 hover:bg-blue-700  rounded-md"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </>
    )
}

export default OTPInputField
