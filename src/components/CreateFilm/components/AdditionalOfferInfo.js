import CountryTab from "../../CountryTab/CountryTab";
import {useEffect, useRef, useState} from "react";
import DpUploadFile from "../../UploadFile/DpUploadFile";
import DpInput from "../../Input/DpInput";
import loadFieldsInfo from "../shared/loadFieldsInfo";
import saveFieldsData from "../shared/saveFieldsData";
import isOfferDataValid from "../shared/isOfferDataValid";

function AdditionalOfferInfo ({offerInfo, loadCompleteStep, loadNextStep, loadPreviousStep, saveStepContent}) {
    const reqOfferInfo = offerInfo.additionalInfo;

    const KEY_IN_STORE = 'additionalInfo';
    const FILMOGRAPHY_REGEX = {
        exp: /^\w+$/,
        msg: ''
    };

    const navLineRef = useRef();
    const [isOfferDataReady, setOfferDataReady] =  useState(false);

    const [currentCountryTab, setCurrentCountryTab] = useState('ru');
    const [countryTabsInfo, setCountryTabsInfo] = useState(JSON.parse(JSON.stringify(reqOfferInfo)));
    const [isNeededRefreshFields, setNeededRefreshFields] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    // Fields
    const [videoMaterial, setVideoMaterial] = useState([]);
    const [videoMaterialLink, setVideoMaterialLink] = useState('');
    const [presentationLink, setPresentationLink] = useState('');

    const [directors, setDirectors] = useState('');
    const [directorsFilmography, setDirectorsFilmography] = useState('');
    const [directorsFiles, setDirectorsFiles] = useState([]);

    const [screenwriters, setScreenwriters] = useState('');
    const [screenwritersFilmography, setScreenwritersFilmography] = useState('');
    const [screenwritersFiles, setScreenwritersFiles] = useState([]);

    const [operators, setOperators] = useState('');
    const [operatorsFilmography, setOperatorsFilmography] = useState('');
    const [operatorsFiles, setOperatorsFiles] = useState([]);

    const [artists, setArtists] = useState('');
    const [artistsFilmography, setArtistsFilmography] = useState('');
    const [artistsFiles, setArtistsFiles] = useState([]);

    const [actors, setActors] = useState('');
    const [actorsFilmography, setActorsFilmography] = useState('');
    const [actorsFiles, setActorsFiles] = useState([]);

    const [producers, setProducers] = useState('');
    const [producersFilmography, setProducersFilmography] = useState('');
    const [producersFiles, setProducersFiles] = useState([]);

    const [conceptArts, setConceptArts] = useState([]);


    const fields = {
        videoMaterial: {
            id: 'video-material',
            getter: videoMaterial,
            setter: setVideoMaterial,
            title: '?????????????????? ????????????????????????????',
            fileSize: 16000000000,
            isRequired: false,
            acceptFiles: 'video/mp4',
            marginBottom: 1,
        },
        videoMaterialLink: {
            id: 'video-material-link',
            getter: videoMaterialLink,
            setter: setVideoMaterialLink,
            subtitle: '??????????????, ??????????, ???????????????????? ?? ??.??.',
            isRequired: false,
            placeholder: '?????? ???????????????????? ????????????'
        },
        presentationLink: {
            id: 'presentation-link',
            getter: presentationLink,
            setter: setPresentationLink,
            regex: {
                exp: /^\w+$/,
                msg: ''
            },
            styles: {
              inputWrapper: {
                  marginTop: 24,
              }
            },
            placeholder: '???????????? ???? ?????????????????????????? ?????????????????????? ??????????????'
        },
        conceptArts: {
            id: 'contept-arts',
            getter: conceptArts,
            setter: setConceptArts,
            fileSize: 160000000,
            title: '?????????????????? ??????????????-????????',
            acceptFiles: 'image/png, image/jpg, image/jpeg',
            subtitle: '???? 5 ??????????????????????',
            inputWidth: 278,
            marginBottom: 60
        }
    };
    const teamMembersFields = {
        directors: {
            id: 'directors',
            getter: directors,
            setter: setDirectors,
            styles: {
                inputWrapper: {
                    marginBottom: 1
                },
                input: {
                    background: '#222222'
                }
            },
            additionalFields: {
                filmography: 'directorsFilmography',
                files: 'directorsFiles',
            },
            regex: {
                exp: /^\w+$/,
                msg: ''
            },
            placeholder: '??????????????',
        },
        screenwriters: {
            id: 'screenwriters',
            getter: screenwriters,
            setter: setScreenwriters,
            styles: {
                inputWrapper: {
                    marginBottom: 1
                },
                input: {
                    background: '#222222'
                }
            },
            additionalFields: {
                filmography: 'screenwritersFilmography',
                files: 'screenwritersFiles',
            },
            regex: {
                exp: /^\w+$/,
                msg: ''
            },
            placeholder: '??????????????????',
        },
        operators: {
            id: 'operators',
            getter: operators,
            setter: setOperators,
            styles: {
                inputWrapper: {
                    marginBottom: 1
                },
                input: {
                    background: '#222222'
                }
            },
            additionalFields: {
                filmography: 'operatorsFilmography',
                files: 'operatorsFiles',
            },
            regex: {
                exp: /^\w+$/,
                msg: ''
            },
            placeholder: '????????????????',
        },
        artists: {
            id: 'artists',
            getter: artists,
            setter: setArtists,
            styles: {
                inputWrapper: {
                    marginBottom: 1
                },
                input: {
                    background: '#222222'
                }
            },
            additionalFields: {
                filmography: 'artistsFilmography',
                files: 'artistsFiles',
            },
            regex: {
                exp: /^\w+$/,
                msg: ''
            },
            placeholder: '??????????????????',
        },
        actors: {
            id: 'actors',
            getter: actors,
            setter: setActors,
            styles: {
                inputWrapper: {
                    marginBottom: 1
                },
                input: {
                    background: '#222222'
                }
            },
            additionalFields: {
                filmography: 'actorsFilmography',
                files: 'actorsFiles',
            },
            regex: {
                exp: /^\w+$/,
                msg: ''
            },
            placeholder: '????????????',
        },
        producers: {
            id: 'producers',
            getter: producers,
            setter: setProducers,
            styles: {
                inputWrapper: {
                    marginBottom: 1
                },
                input: {
                    background: '#222222'
                }
            },
            additionalFields: {
                filmography: 'producersFilmography',
                files: 'producersFiles',
            },
            regex: {
                exp: /^\w+$/,
                msg: ''
            },
            placeholder: '????????????????',
        }
    };
    const additionalFields = {
        directorsFilmography: {
            getter: directorsFilmography,
            setter: setDirectorsFilmography
        },
        directorsFiles: {
            fieldType: 'commonFile',
            getter: directorsFiles,
            setter: setDirectorsFiles
        },
        screenwritersFilmography: {
            getter: screenwritersFilmography,
            setter: setScreenwritersFilmography
        },
        screenwritersFiles: {
            fieldType: 'commonFile',
            getter: screenwritersFiles,
            setter: setScreenwritersFiles
        },
        operatorsFilmography: {
            getter: operatorsFilmography,
            setter: setOperatorsFilmography
        },
        operatorsFiles: {
            fieldType: 'commonFile',
            getter: operatorsFiles,
            setter: setOperatorsFiles
        },
        artistsFilmography: {
            getter: artistsFilmography,
            setter: setArtistsFilmography
        },
        artistsFiles: {
            fieldType: 'commonFile',
            getter: artistsFiles,
            setter: setArtistsFiles
        },
        actorsFilmography: {
            getter: actorsFilmography,
            setter: setActorsFilmography
        },
        actorsFiles: {
            fieldType: 'commonFile',
            getter: actorsFiles,
            setter: setActorsFiles
        },
        producersFilmography: {
            getter: producersFilmography,
            setter: setProducersFilmography
        },
        producersFiles: {
            fieldType: 'commonFile',
            getter: producersFiles,
            setter: setProducersFiles
        },
    };
    const fieldsArr = [fields, teamMembersFields, additionalFields];

    useEffect(() => {
        loadFieldsInfo('store', countryTabsInfo, reqOfferInfo, setFormErrors, currentCountryTab, fieldsArr);
        setOfferDataReady(isOfferDataValid(offerInfo.requiredInfo));
    }, [])

    useEffect(() => {
        loadFieldsInfo('local', countryTabsInfo, reqOfferInfo, setFormErrors, currentCountryTab, fieldsArr);
        setTimeout(() => {
            refreshFields();
        })
    }, [currentCountryTab])

    function onCountryTabClick (targetCountry) {
        saveFieldsData(KEY_IN_STORE, 'local', setCountryTabsInfo, reqOfferInfo, currentCountryTab, fieldsArr);
        setCurrentCountryTab(targetCountry);
        setNeededRefreshFields(false);
    }

    function refreshFields () {
        setFormErrors([]);
        setNeededRefreshFields(true);
    }

    function goToNextStep (evt) {
        evt.preventDefault();
        saveFieldsData(KEY_IN_STORE, 'store', setCountryTabsInfo, reqOfferInfo, currentCountryTab, fieldsArr, loadNextStep);
    }

    function goToCompleteStep (evt) {
        evt.preventDefault();
        saveFieldsData(KEY_IN_STORE, 'store', setCountryTabsInfo, reqOfferInfo, currentCountryTab, fieldsArr, loadCompleteStep);
    }

    function goToPreviousStep (evt) {
        evt.preventDefault();
        saveFieldsData(KEY_IN_STORE, 'store', setCountryTabsInfo, reqOfferInfo, currentCountryTab, fieldsArr, loadPreviousStep);
    }

    function generateTeamMembers () {
        return Object.values(teamMembersFields).map((field, id) => {
            return (
                <div key={id} className="offer-content__block__team-member">
                    <DpInput
                        inputId={field.id}
                        regex={field.regex}
                        getter={field.getter}
                        setter={field.setter}
                        styles={field?.styles || {}}
                        placeholder={field.placeholder}
                        errorStack={setFormErrors}
                        isNeededRefresh={isNeededRefreshFields}
                        countryTab={currentCountryTab}
                        isRequired={false}
                    />
                    <DpInput
                        inputId={field.id + '-filmography'}
                        regex={FILMOGRAPHY_REGEX}
                        getter={additionalFields[field.additionalFields.filmography].getter}
                        setter={additionalFields[field.additionalFields.filmography].setter}
                        placeholder={'????????????????????????, ?????????? ??????????????'}
                        errorStack={setFormErrors}
                        isNeededRefresh={isNeededRefreshFields}
                        countryTab={currentCountryTab}
                        isRequired={false}
                    />
                    <DpUploadFile
                        inputId={field.id + '-upload-image'}
                        regex={FILMOGRAPHY_REGEX}
                        fileSize={160000000}
                        acceptFiles={'image/png, image/jpg, image/jpeg'}
                        isMultiply={true}
                        maxFiles={2}
                        getter={additionalFields[field.additionalFields.files].getter}
                        setter={additionalFields[field.additionalFields.files].setter}
                        errorStack={setFormErrors}
                        isNeededRefresh={isNeededRefreshFields}
                        countryTab={currentCountryTab}
                        isRequired={false}
                    >
                        <label htmlFor={field.id + '-upload-image'}>
                            <p className="offer-content__block__team-member__upload-files-title" style={{marginTop: 16}}>???????????????????? ????????</p>
                        </label>
                    </DpUploadFile>
                </div>
            )
        })
    }

    return (
        <div className="offer-content additional-offer-info">
            <div className="offer-content__title">???????????????????????????? ????????????????????</div>
            <div className="offer-content__country-tab-wrapper">
                <CountryTab activeTab={currentCountryTab} onTabClick={onCountryTabClick}/>
            </div>
            <div className="offer-content__form-wrapper">
                <form>
                    <DpUploadFile
                        inputId={fields.videoMaterial.id}
                        fileSize={fields.videoMaterial.fileSize}
                        title={fields.videoMaterial.title}
                        acceptFiles={fields.videoMaterial.acceptFiles}
                        getter={fields.videoMaterial.getter}
                        setter={fields.videoMaterial.setter}
                        marginBottom={fields.videoMaterial.marginBottom}
                        isRequired={false}
                        isMultiply={true}
                        maxFiles={2}
                        isNeededRefresh={isNeededRefreshFields}
                        errorStack={setFormErrors}
                        countryTab={currentCountryTab}
                    />
                    <DpInput
                        inputId={fields.videoMaterialLink.id}
                        regex={fields.videoMaterialLink.regex}
                        getter={fields.videoMaterialLink.getter}
                        setter={fields.videoMaterialLink.setter}
                        placeholder={fields.videoMaterialLink.placeholder}
                        subtitle={fields.videoMaterialLink.subtitle}
                        isRequired={false}
                        isNeededRefresh={isNeededRefreshFields}
                        errorStack={setFormErrors}
                        countryTab={currentCountryTab}
                    />
                    <DpInput
                        inputId={fields.presentationLink.id}
                        regex={fields.presentationLink.regex}
                        getter={fields.presentationLink.getter}
                        setter={fields.presentationLink.setter}
                        placeholder={fields.presentationLink.placeholder}
                        styles={fields.presentationLink.styles}
                        isRequired={false}
                        isNeededRefresh={isNeededRefreshFields}
                        errorStack={setFormErrors}
                        countryTab={currentCountryTab}
                    />
                    <div className="offer-content__block-wrapper">
                        <div className="offer-content__block mb-40">
                            <p className="offer-content__block__title mb-12">???????????? ??????????????</p>
                            {generateTeamMembers()}
                        </div>
                    </div>
                </form>
                <div className="offer-content__block offer-content__additional-info">
                    <p className="offer-content__block__title">?????????? ???????????????????? ??????????</p>
                    <p className="offer-content__block__subtitle">???????? ???????? ???????????? ???????????????? ??????????????????, ???? ?????????????????? ???? ?????????? ?????????????????? ???????????????? ?????????????? ?????? ?????????????????????? ????????????????????. ?????? ???????????????????? ???????????? ?????????????????????????????? ???? ???????? ????????????: ????????????????????, ?????????????????? ?? ??????????????. ???????? ?????? ???? ?????????????? ???????????????????????? ?????? ???????????????????? ???????????????? ????????????????????, ???? ?????????????? ???????????????????? ???? ?????????????? ?? ?????????????? Deep.movie (?????????????? ????????????) ?????? ?? ???????????????????? ?????????????? (??????????????????). ?????????????????? ???????????????????? ???????????????? ??????????????: $250 ?????? ?????????????? ??????, $800 ?????? ???????????????????????? ????????????????</p>
                </div>
            </div>
            <DpUploadFile
                inputId={fields.conceptArts.id}
                fileSize={fields.conceptArts.fileSize}
                title={fields.conceptArts.title}
                acceptFiles={fields.conceptArts.acceptFiles}
                getter={fields.conceptArts.getter}
                setter={fields.conceptArts.setter}
                subtitle={fields.conceptArts.subtitle}
                marginBottom={fields.conceptArts.marginBottom}
                inputWidth={fields.conceptArts.inputWidth}
                isRequired={false}
                errorStack={setFormErrors}
                isNeededRefresh={isNeededRefreshFields}
                countryTab={currentCountryTab}
            />
            <div className="offer-content__separator"></div>
            <div className="offer-content__buttons">
                <button style={{width: 204}} className="offer-content__buttons__button dp-button dp-button__default dp-button__color--gray" onClick={goToPreviousStep}>??????????</button>
                <button
                    style={{width: 318}}
                    className="offer-content__buttons__button dp-button dp-button__default dp-button__color--light-blue"
                    onClick={goToNextStep}
                >?????????????????? ??????????????????</button>
                <button
                    style={{width: 318}}
                    className="offer-content__buttons__button dp-button dp-button__default dp-button__outline"
                    onClick={goToCompleteStep}
                    disabled={isOfferDataReady === false}
                >?????????????????? ????????????</button>
            </div>
            <div className="offer-content__bottom-alert">
                ?????????????? ???? ???????????? ???????????????????? ??????????????, ???? ?????????????????????????? <a href="#" target="_blank" className="dp-text__blue">???????????????? ???? ?????????????????????????????? ???? ?????????????????????????????? ????????????</a>
            </div>
        </div>
    )
}

export default AdditionalOfferInfo
