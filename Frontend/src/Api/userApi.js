class User{
    async login(data){
        const response = await fetch("http://localhost:8000/api/v1/user/login",{
            method:"Post",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body : JSON.stringify(data)
        })
        let res = await response.text()
        res = JSON.parse(res)
        return res
    }

    async RegisterUser(data){
        const response = await fetch("http://localhost:8000/api/v1/user/register",{
            method:"Post",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body : JSON.stringify(data)
        })
        let res = await response.text()
        res = JSON.parse(res)
        return res
    }
}

const userAuth = new User();

export default userAuth