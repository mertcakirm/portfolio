import React,{useState} from 'react';

const BlogComp = () => {
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [contents, setContents] = useState([]);

    const addContent = () => {
        setContents([
            ...contents,
            { id: Date.now(), title: "", description: "", image: "" },
        ]);
    };

    const updateContent = (id, field, value) => {
        setContents(
            contents.map((content) =>
                content.id === id ? { ...content, [field]: value } : content
            )
        );
    };

    const removeContent = (id) => {
        setContents(contents.filter((content) => content.id !== id));
    };
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);

        if (event.dataTransfer.files.length > 0) {
            setFile(event.dataTransfer.files[0]);
        }
    };
    return (
        <div className="container-fluid py-5">
            <div className="row">

                {/*<div style={{height:'100vh'}} className="col-12 row justify-content-center align-items-center">*/}
                {/*    <button className="col-12 row-gap-3 row bg-transparent border-0">*/}
                {/*        <svg xmlns="http://www.w3.org/2000/svg" className="col-12" width="50" fill="white" height="50"*/}
                {/*             viewBox="0 0 24 24">*/}
                {/*            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>*/}
                {/*        </svg>*/}
                {/*        <h2 className="col-12 text-center">Blog Ekle</h2>*/}
                {/*    </button>*/}
                {/*</div>*/}


                <div className="col-12 row justify-content-center">
                    <div style={{height:'fit-content'}} className="row col-4 row-gap-3 justify-content-center">
                        <h5 className="col-12 text-center">Genel Blog Yönetimi</h5>
                        <input type="text" className="col-12 login-inp" placeholder="Blog Başlığı"/>
                        <input type="text" className="col-12 login-inp" placeholder="Blog Açıklaması"/>
                        <div
                            className={`file-upload ${dragActive ? "drag-active" : ""}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <input type="file" id="fileInput" className="file-input" onChange={handleFileChange}/>
                            <label htmlFor="fileInput" className="file-label">
                                {file ? file.name : "Görselinizi buraya sürükleyin veya tıklayarak seçin"}
                            </label>
                        </div>
                    </div>

                    <div className="col-8" style={{height:'100vh',overflow:'hidden',overflowY:'visible'}}>
                        <button className="btn btn-light login-btn m-3" onClick={addContent}>
                            + İçerik Ekle
                        </button>
                        {contents.map((content) => (
                            <div key={content.id} className="content-box">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Başlık"
                                    value={content.title}
                                    onChange={(e) =>
                                        updateContent(content.id, "title", e.target.value)
                                    }
                                />
                                <textarea
                                    className="form-control mt-2"
                                    placeholder="Açıklama"
                                    value={content.description}
                                    onChange={(e) =>
                                        updateContent(content.id, "description", e.target.value)
                                    }
                                />
                                <input
                                    type="file"
                                    className="form-control mt-2"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.readAsDataURL(file);
                                            reader.onload = () =>
                                                updateContent(content.id, "image", reader.result);
                                        }
                                    }}
                                />
                                {content.image && (
                                    <img src={content.image} alt="Yüklenen" className="preview-img"/>
                                )}
                                <button
                                    className="btn btn-danger mt-2"
                                    onClick={() => removeContent(content.id)}
                                >
                                    Sil
                                </button>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default BlogComp;