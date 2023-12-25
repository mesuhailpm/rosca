const checkLoggedIn = async (startVerifyLoading?: () => void, endResponseLoading?:()=>void, setRedirectingLoading?: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        startVerifyLoading && startVerifyLoading()
        console.log('checking');
        const userObjectRaw = localStorage.getItem('userObject')
        if (!userObjectRaw)
        return false;
        const userObject = JSON.parse(userObjectRaw)
        const { token } = userObject
        console.log(token, ' is token in local storage');
        if (!token) return false
        // const isTokenValid = await verifyToken(token)
        const response = await fetch('/api/verifyToken', { method: 'POST', body: JSON.stringify(token) })

        const decodedData = await response.json()
        console.log(decodedData, ' is decoded data from jsonwebtoken');
        if (response.ok) {
            endResponseLoading && endResponseLoading();
            setRedirectingLoading && setRedirectingLoading(true)
            return true;
        } else {
            endResponseLoading && endResponseLoading()
            return false
        }

    } catch (error) {
        console.error(error)
        endResponseLoading && endResponseLoading()
        return false
    }finally{
        endResponseLoading && endResponseLoading()
    }
}

export default checkLoggedIn
