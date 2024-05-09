export default () => {
    const OTP = Math.floor(Math.random() * 900000) + 100000
    console.log(OTP)
    return OTP;
}