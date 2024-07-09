import React, { useRef, useState } from 'react'
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import { Panel } from 'primereact/panel';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import axios from "axios"
import { BASEURL } from '../App';
const EditorPanel = () => {
    const [text, setText] = useState('');
    const [formData, setformData] = useState({})
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const imgRef = useRef()
    const toast = useRef(null);

    const categories = [
        { name: 'General News', code: 'generalnews' },
        { name: 'Lifestyle/Travel', code: 'lifestyle' },
        { name: 'Entertainment', code: 'entertainment' }
    ];
    const levels = [
        { name: 'Default', code: 0 },
        { name: 'Main', code: 1 },
        { name: 'Submain 1', code: 2 },
        { name: 'Submain 2', code: 3 }
    ]

    const handleChangeEvent = (e) => {
        setformData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSave = async () => {


        try {
            const fd = new FormData()
            fd.append('title', formData?.title)
            fd.append('category', selectedCategory?.code)
            fd.append('summary', formData?.summary)
            fd.append('author', formData?.author)
            fd.append('date', formData?.date)
            fd.append('level', selectedLevel?.code)
            fd.append('text', text)
            fd.append('image', imgRef.current.files[0])
            const response = await axios.post(`${BASEURL}/posts`, fd)
            // console.log({ response })
            setformData({})
            setSelectedCategory(null)
            setSelectedLevel(null)
            toast.current.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
        } catch (error) {
            // console.log({ responseError: error });
        }

    }

    return (
        <main>
            <Toast ref={toast} />
            <section className='pt-20 lg:pt-20 pb-15'>
                <div className='max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0'>
                    <Panel header="New Blog">
                        <div className='flex flex-col mb-3' >
                            <label>Title</label>
                            <InputText style={{ border: "1px solid #ddd", padding: 8 }} name='title' value={formData?.title || ''} onChange={handleChangeEvent} />
                        </div>

                        <div className='flex  md:flex-row mb-3 gap-3 ' >
                            <div className='flex flex-col mb-3 ' >
                                <label>Category</label>
                                <Dropdown style={{ border: "1px solid #ddd", width: 300, height: 42 }} name='category' value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} options={categories} optionLabel="name"
                                    placeholder="Select a City" className="w-full md:w-14rem" />
                            </div>
                            <div className='flex flex-col mb-3' >
                                <label>Author</label>
                                <InputText style={{ border: "1px solid #ddd", padding: 8, width: 330, }} name='author' value={formData?.author || ''} onChange={handleChangeEvent} />
                            </div>
                            <div className='flex flex-col mb-3' >
                                <label>Date</label>
                                <InputText type='date' style={{ border: "1px solid #ddd", padding: 8, width: 300, }} name='date' value={formData?.date || ''} onChange={handleChangeEvent} />
                            </div>
                            <div className='flex flex-col mb-3 ' >
                                <label>Level</label>
                                <Dropdown style={{ border: "1px solid #ddd", height: 42 }} name='level' value={selectedLevel} onChange={(e) => setSelectedLevel(e.value)} options={levels} optionLabel="name"
                                    placeholder="Select Level" className="w-full md:w-14rem" />
                            </div>
                        </div>
                        <div className='flex flex-col mb-3'>
                            <label>Summary</label>
                            <InputTextarea className='p-2' style={{ border: "1px solid #ddd" }} name='summary' value={formData?.summary} onChange={handleChangeEvent} rows={2} cols={30} />

                        </div>

                        <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />

                        <div className='mt-4 flex flex-col'>
                            <label>Upload Cover Image</label>
                            <input type='file' ref={imgRef} mode="basic" accept="image/*" maxFileSize={1000000} />
                        </div>
                        <div className='flex justify-end '>
                            <Button onClick={handleSave} className='p-2 text-slate-500 w-28 text-center' style={{ background: "cyan" }}>Save</Button>
                        </div>

                    </Panel>



                </div>

            </section>

        </main>
    )
}

export default EditorPanel