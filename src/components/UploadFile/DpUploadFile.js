import {useEffect, useRef, useState} from "react";
import uniqid from 'uniqid';
import "./dp-upload-file.scss";
import UploadFileService from "../../services/UploadFileService";

function DpUploadFile ({title, isMultiply, acceptFiles, fileSize, inputId, maxFiles, getter, setter, inputWidth, subtitle, marginBottom, errorStack, isRequired, children, isNeededRefresh, countryTab}) {
    const isFieldRequired = isRequired !== undefined ? isRequired : true;
    const inputRef = useRef();
    const [loadingFile, setLoadingFile] = useState(false);
    const [loadingFailed, setLoadingFailed] = useState('');

    useEffect(() => {
        if (!getter.length) {
            addFieldError();
        }
    }, [])

    useEffect(() => {
        if (!getter.length) {
            addFieldError();
        } else {
            clearFieldError();
        }
    }, [getter])

    useEffect(() => {
        if (isNeededRefresh && !getter.length) {
            addFieldError();
        }
    }, [isNeededRefresh])

    function addFieldError () {
        if (!isFieldRequired) return;
        errorStack((prev) => [...prev, {id: inputId, fieldTitle: title}]);
    }

    function clearFieldError () {
        errorStack((prev) => prev.filter((error) => error.id !== inputId));
        setLoadingFailed('');
    }

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
        if (acceptFiles.includes('video')) {
            reader.readAsArrayBuffer(file);
        } else {
            reader.readAsDataURL(file);
        }

        const fileId = uniqid();
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
            setter((prev) => [...prev, {fileId, fileName, fileSize, fileResult, fileType}])

            if (maxFiles) {
                setter((prev) => prev.slice(0, maxFiles))
            }

            inputRef.current.value = '';
        };


        reader.onerror = function () {
            setLoadingFile(false);
            setLoadingFailed('Не удалось загрузить файл, попробуйте снова');
        };
    }

    function uploadFile (fileId, fileName, file) {
        const url = '/upload';
        setLoadingFile(true);

        UploadFileService.upload(url, fileName, file, inputRef.current)
            .then(() => {
                setLoadingFile(false)
            })
            .catch((error) => {
                console.error('cannot upload file', error)
                setter((prev) => prev.map((file) => {
                    if(file.fileId === fileId) {
                        file.isError = true;
                    }

                    return file;
                }))
            })
    }

    function convertFileSize (bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (+bytes === 0) return 'Не удалось определить размер';

        const i = parseInt(Math.floor(Math.log(+bytes) / Math.log(1024)), 10);
        if (i === 0) return `${bytes} ${sizes[i]}`;

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
        <div className="upload-file" style={{marginBottom}}>
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
            {children
                ? children
                : <label className="upload-file__wrapper" htmlFor={inputId} style={{width: inputWidth, opacity: 1}}>
                    <span className="upload-file__wrapper__title">
                        <span className="upload-file__wrapper__title__plus">+</span> {title}
                    </span>
                </label>
            }
            {getter.length
                ? <ul className="upload-file__file-list" style={{width: inputWidth}}>
                    {getter.map((file, id) => (
                        <li key={id} className="upload-file__file-list__file">
                            <img className="upload-file__file-list__file__file-icon" src="/img/file.svg" alt="file" width={16} height={20}/>
                            {loadingFile
                                ? <div className="upload-file__file-list__file__loading-wrapper loading-line">
                                    <span className={`loading-line__file-name ${file?.isError ? 'loading-line__file-name--error' : ''}`}>{file.fileName}{file?.isError ? ' - Ошибка загрузки' : ''}</span>
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
                : subtitle ? <p className="upload-file__subtitle">{subtitle}</p> : ''
            }
            {loadingFailed
                ? <p className="upload-file__file-load-error">{loadingFailed}</p>
                : ''
            }
        </div>
    )
}

export default DpUploadFile
