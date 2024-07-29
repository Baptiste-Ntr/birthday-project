import axios from "axios"
import { useEffect, useState } from "react"

function Footer() {

    const [birthdayFile, setBirthdayFile] = useState(null)
    const [quoteFile, setQuoteFile] = useState(null)

    const handleSubmitBirthday = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', birthdayFile)

        try {
            const response = await axios.post('http://localhost:3002/uploadCSVBirthday', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            console.log('Files uploaded successfully:', response.data)
        } catch(err) {
            console.error('Error uploading files:', err)
        }
    }

    const handleSubmitQuotes = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', quoteFile)

        try {
            const response = await axios.post('http://localhost:3002/uploadCSVQuotes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            console.log('Files uploaded successfully:', response.data)
        } catch(err) {
            console.error('Error uploading files:', err)
        }
    }

    useEffect(() => {
        console.log(birthdayFile)
    }, [birthdayFile])

    return (
        <footer className="footer">
            <form onSubmit={handleSubmitBirthday}>
                <input type="file" accept=".csv" onChange={(e) => setBirthdayFile(e.target.files[0])} />
                <button type="submit">Upload Birthday</button>
            </form>
            <form onSubmit={handleSubmitQuotes}>
                <input type="file" accept=".csv" onChange={(e) => setQuoteFile(e.target.files[0])} />
                <button type="submit">Upload Quote</button>
            </form>
        </footer>
    )
}

export default Footer