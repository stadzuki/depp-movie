import {useRef, useState} from "react";
import uniqid from 'uniqid';
import "./dp-upload-file.scss";

function DpUploadFile ({title, isMultiply, acceptFiles, fileSize, inputId, maxFiles, getter, setter, inputWidth, subtitle}) {

    const inputRef = useRef();
    const [loadingFile, setLoadingFile] = useState(false);
    const [loadingFailed, setLoadingFailed] = useState('');

    function onFileRemove (fileId) {
        setter((prev) => prev.filter((file) => file.fileId !== fileId));
    }

    function onFileUpload (evt) {
        const files = Array.from(evt.target.files);

        if (isMultiply) {
            files.forEach((file) => {
                saveFile(file)
            })
        } else {
            saveFile(files[0])
        }
    }

    function saveFile (file) {
        setLoadingFailed('');

        const reader = new FileReader();
        reader.readAsDataURL(file);

        const fileName = file.name;
        const fileSize = file.size;
        const fileType = file.type;
        let fileResult;

        reader.onloadstart = function () {
            setLoadingFile(true);
        };

        reader.onload = function () {
            setLoadingFile(false);

            getter.forEach((file) => {
                if (
                    file.fileSize === fileSize
                    && file.fileName === fileName
                    && file.fileType === fileType
                ) {
                    setLoadingFailed('Данный файл уже загружен');
                }
            })

            if (!acceptFiles.includes(fileType)) {
                setLoadingFailed('Файл с данным расширением не поддерживается');
                return;
            }

            if (loadingFailed) return;

            fileResult = reader.result;
            setter((prev) => [...prev, {fileId: uniqid()    , fileName, fileSize, fileResult, fileType}])

            inputRef.current.value = '';
        };


        reader.onerror = function (error) {
            setLoadingFile(false);
            setLoadingFailed('Не удалось загрузить файл, попробуйте снова');
        };
    }

    function convertFileSize (bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return 'Не удалось определить размер';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
        if (i === 0) return `${bytes} ${sizes[i]})`;
        return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
    }

    function isAvailableToFileLoad () {
        if (isMultiply) {
            return getter.length >= maxFiles;
        } else {
            return getter.length;
        }
    }

    return (
        <div className="upload-file">
            <input
                ref={inputRef}
                id={inputId}
                className="upload-file__wrapper__input"
                type="file"
                multiple={isMultiply || false}
                accept={acceptFiles}
                size={fileSize}
                disabled={isAvailableToFileLoad()}
                onChange={onFileUpload}
            />
            <label className="upload-file__wrapper" htmlFor={inputId} style={{width: inputWidth}}>
                <span className="upload-file__wrapper__title">
                    <span className="upload-file__wrapper__title__plus">+</span> {title}
                </span>
            </label>
            {getter.length
                ? <ul className="upload-file__file-list" style={{width: inputWidth}}>
                    {getter.map((file, id) => (
                        <li key={id} className="upload-file__file-list__file">
                            <img className="upload-file__file-list__file__file-icon" src="/img/file.svg" alt="file" width={16} height={20}/>
                            {loadingFile
                                ? <div className="upload-file__file-list__file__loading-wrapper loading-line">
                                    <div className="loading-line">
                                        <div className="loading-line__inner loading-line__inner--1"></div>
                                        <div className="loading-line__inner loading-line__inner--2"></div>
                                    </div>
                                </div>
                                : <div className="upload-file__file-list__file__text">
                                    <p className="upload-file__file-list__file__text__title">{file.fileName}</p>
                                    <p className="upload-file__file-list__file__text__subtitle">{convertFileSize(file.fileSize)}</p>
                                </div>
                            }
                            <div className="upload-file__file-list__file__close-btn" onClick={() => onFileRemove(file.fileId)}>
                                <img className="upload-file__file-list__file__close-btn__img" src="/img/close-btn.svg" alt="close" width={10} height={10}/>
                            </div>
                        </li>
                    ))}
                </ul>
                : <p className="upload-file__subtitle">{subtitle}</p>
            }
            {loadingFailed
                ? <p className="upload-file__file-load-error">{loadingFailed}</p>
                : ''
            }
        </div>
    )
}

export default DpUploadFile
