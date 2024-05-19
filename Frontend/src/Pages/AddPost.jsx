import React, { useState, useRef, useEffect } from 'react'
import Input from '../tags/input'
import { useNavigate } from 'react-router'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'

function AddPost() {
  const editor = useRef(null)
  const output = useRef(null)
  const [content, setContent] = useState(null)
  const [date,setDate] = useState(null)

  useEffect(() => {
    async function EditorConfig() {
      console.log();
      const ed = new EditorJS({
        holder: editor.current,
        tools: {
          header: Header
        },
        onChange: async () => {
          let res = await ed.saver.save()
          console.log(res.blocks);
          setContent(res.blocks ? res.blocks : "")

        }
      })

    }
    let dt = new Date()
    setDate(dt.toLocaleDateString())
    console.log(dt.toLocaleDateString() );

    EditorConfig()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    let data = "";
    for (let out in content) {
      console.log(content[out].data.text);
      data += content[out].data.text
      data += "<br>"
    }
    output.current.innerHTML = data
    console.log(data);
  }
  const formRef = useRef(null)
  const [slug, setSlug] = useState(null)
  const [usernameError, setUsernameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [serverError, setServerError] = useState(true);
  const [fullnameError, setFullnameError] = useState(true);
  const navigate = useNavigate()

  const handleChange = (value) => {
    value = value.split(" ").join("-")
    setSlug(value)
  }
  return (
    <div className='flex justify-center my-10'>
      <div className='flex justify-center items-center flex-col w-1/2 mt-10 border rounded-lg mx-20 p-10'>

        <h1 className='text-4xl mb-10 font-extrabold'>Add Blog: Your Keyboard Needs Exercise</h1>
        <form className="space-y-6 w-full" ref={formRef}>

          <div>
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
            <div className="mt-2">
              <h2 className={`text-left text-l font-bold leading-9 tracking-tight text-red-600 ${fullnameError ? "block" : "hidden"}`}>{fullnameError}</h2>
              <input id="title" name="title" type="text" required className={`block w-full rounded-md border-0 text-gray-900 px-4 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 `} onChange={(e) => handleChange(e.target.value)} />
            </div>
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900">Slug</label>
            <div className="mt-2">
              <h2 className={`text-left text-l font-bold leading-9 tracking-tight text-red-600 ${fullnameError ? "block" : "hidden"}`}>{fullnameError}</h2>
              <Input id="slug" name="slug" value={slug} className='w-1/3' />
            </div>
            <div ref={output}>
            </div>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">Content</label>
            <div className="mt-2">
              <h2 className={`text-left text-l font-bold leading-9 tracking-tight text-red-600 ${usernameError ? "block" : "hidden"}`}>{usernameError}</h2>
              <div ref={editor} className='w-full border rounded-xl p-1 h-auto' id='editor'>

              </div>
            </div>
          </div>

          <div className='flex justify-between'>
            <div>
              <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">Status</label>
              <div className="mt-2">
                <h2 className={`text-left text-l font-bold leading-9 tracking-tight text-red-600 ${emailError ? "block" : "hidden"}`}>{emailError}</h2>
                <select className='border rounded-xl px-4 py-2'>
                  <option>
                    Draft
                  </option>
                  <option>
                    Active
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="publishedAt" className="block text-sm font-medium leading-6 text-gray-900">Published Date</label>
              <div className="mt-2">
                <h2 className={`text-left text-l font-bold leading-9 tracking-tight text-red-600 ${emailError ? "block" : "hidden"}`}>{emailError}</h2>
               <Input id="publishedAt" name={"publishedAt"} disable={true} value={date}/>
              </div>
            </div>
          </div>

          <div className='flex justify-start'>
            <button onClick={(e) => handleSubmit(e)} type="submit" className="flex w-max justify-center rounded-md bg-indigo-600 px-4 py-2 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Blog</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddPost