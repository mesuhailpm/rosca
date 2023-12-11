export default async  (setVerifyLoading, setRedirectingLoading)=>  {
    try {
        //console.log'checking');
        const userObjectRaw = localStorage.getItem('userObject')
        if (!userObjectRaw) return false;
        const userObject = JSON.parse(userObjectRaw)
        const { token } = userObject
        //console.logtoken, ' is token in local storage');
        if (!token) return false
        // const isTokenValid = await verifyToken(token)
        const response = await fetch('/api/verifyToken', { method: 'POST', body: JSON.stringify(token) })

        const decodedData = await response.json()
        //console.logdecodedData, ' is decoded data from jsonwebtoken');
        if (response.ok) {
            setVerifyLoading && setVerifyLoading(false)
            setRedirectingLoading && setRedirectingLoading(true)
            return true;
        } else {
            setVerifyLoading && setVerifyLoading(false)
            return false
        }

    } catch (error) {
        console.error(error)
        setVerifyLoading && setVerifyLoading(false)
        return false
    } finally {
        setVerifyLoading && setVerifyLoading(false)
    }
}
