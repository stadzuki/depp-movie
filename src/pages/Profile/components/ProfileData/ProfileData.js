import {useEffect, useRef, useState} from "react";
import UserService from "../../../../services/user";
import {useDispatch, useSelector} from "react-redux";
import * as userActions from "../../../../store/actions/user";
import DpInput from "../../../../components/Input/DpInput";

import "./profile-data.scss"
import LoaderService from "../../../../services/LoaderService";

function ProfileData () {
    const dispatch = useDispatch();
    const userProfileData = useSelector((store) => store.user.profileData);

    const [errorMessage, setErrorMessage] = useState('');
    const [formErrors, setFormErrors] = useState([]);

    // Response for displaying editor mode
    const [isUserDataEdit, setUserDataEdit] = useState(false);
    const [isUserPasswordEdit, setUserPasswordEdit] = useState(false);
    const [isUserDeliveryEdit, setUserDeliveryEdit] = useState(false);
    const [isUserDeliveryAdding, setUserDeliveryAdding] = useState(false);

    // Response for user personal data
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');

    // Response for user address data
    const [newAddressTitle, setNewAddressTitle] = useState('');
    const [userCountry, setUserCountry] = useState('');
    const [userStreet, setUserStreet] = useState('');
    const [userZipcode, setUserZipcode] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userHome, setUserHome] = useState('');
    const [userHomeNumber, setUserHomeNumber] = useState('');

    // Addresses items
    const currentAddress = useRef(null);
    const [userAddresses, setUserAddresses] = useState(userProfileData.userDelivery || []);

    // Response for user password data
    const [userOldPassword, setUserOldPassword] = useState('');
    const [userNewPassword, setUserNewPassword] = useState('');

    // Inputs store
    const [profileInputs, setProfileInputs] = useState({
        userData: [
            {
                id: 'user-name',
                styles: {
                    inputWrapper: {
                        width: 432
                    }
                },
                regex: /\w/,
                type: 'text',
                getter: userName,
                setter: setUserName,
                placeholder: '?????? ?? ??????????????'},
            {
                id: 'user-phone',
                styles: {
                    inputWrapper: {
                        width: 204
                    }
                },
                regex: /\w/,
                type: 'text',
                getter: userPhone,
                setter: setUserPhone,
                placeholder: '??????????????'
            }
        ],
        userDelivery: [
            {
                id: 'user-address-title',
                styles: {
                    inputWrapper: {
                        width: 1002
                    }
                },
                getter: newAddressTitle,
                setter: setNewAddressTitle,
                placeholder: '???????????????? ????????????'},
            {
                id: 'user-country',
                styles: {
                    inputWrapper: {
                        width: 318
                    }
                },
                getter: userCountry,
                setter: setUserCountry,
                placeholder: '????????????',
                useSelect: true},
            {
                id: 'user-street',
                styles: {
                    inputWrapper: {
                        width: 318
                    }
                },
                regex: /\w/,
                type: 'text',
                getter: userStreet,
                setter: setUserStreet,
                placeholder: '??????????'},
            {
                id: 'user-zipcode',
                styles: {
                    inputWrapper: {
                        width: 318
                    }
                },
                regex: /\w/,
                type: 'text',
                getter: userZipcode,
                setter: setUserZipcode,
                placeholder: '???????????????? ????????????'},
            {
                id: 'user-city',
                styles: {
                    inputWrapper: {
                        width: 318
                    }
                },
                regex: /\w/,
                type: 'text',
                getter: userCity,
                setter: setUserCity,
                placeholder: '??????????'},
            {
                id: 'user-home',
                styles: {
                    inputWrapper: {
                        width: 147
                    }
                },
                regex: /\w/,
                type: 'text',
                getter: userHome,
                setter: setUserHome,
                placeholder: '??????'},
            {
                id: 'user-home-number',
                styles: {
                    inputWrapper: {
                        width: 147
                    }
                },
                regex: /\w/,
                type: 'text',
                getter: userHomeNumber,
                setter: setUserHomeNumber,
                placeholder: '????????????????'}
        ],
        userPassword: [
            {
                id: 'user-password',
                styles: {
                    inputWrapper: {
                        width: 318
                    }
                },
                regex: /\w/,
                type: 'password',
                getter: userOldPassword,
                setter: setUserOldPassword,
                placeholder: '?????????????? ????????????'},
            {
                id: 'user-re-password',
                styles: {
                    inputWrapper: {
                        width: 318
                    }
                },
                regex: /\w/,
                type: 'password',
                getter: userNewPassword,
                setter: setUserNewPassword,
                placeholder: '?????????? ????????????'}
        ]
    });

    useEffect(() => {
        if ((userProfileData.userData && Object.keys(userProfileData.userData).length > 0)
            || (userProfileData.userDelivery && userProfileData.userDelivery.length > 0)) {
            loadProfileInputsData();
            loadProfileAddresses();
            return;
        }

        LoaderService.show(true);
        UserService.getUserProfileData()
            .then((response) => {
                dispatch(userActions.updateUserProfileData(response.data));
                LoaderService.show(false);
            })
            .catch((error) => {
                console.error('cannot get user profile data', error)
            })
    }, []);

    useEffect(() => {
        // loadProfileInputsData();
        // loadProfileAddresses();
    }, [userProfileData])

    function loadProfileInputsData () {

        // ?????????????? ?????????????????????? ???????????????? ??????????????

        const userPassword = profileInputs.userPassword;
        const userDeliveryFields = profileInputs.userDelivery;
        const userDelivery = userProfileData.userDelivery;
        const userData = profileInputs.userData;

        userData.map((data) => {
           if (data.id === 'user-name') {
               data.setter(userProfileData.userData?.fio || '');
           }
            if (data.id === 'user-phone') {
                data.setter(userProfileData.userData?.phone || '');
            }
        });

        // userDelivery.map((delivery, id) => {
        //     userDelivery.map((data) => {
        //         if (data.id === 'user-address-title') {
        //             data.value = delivery.title;
        //         }
        //         if (data.id === 'user-country') {
        //             data.value = delivery.country;
        //         }
        //         if (data.id === 'user-street') {
        //             data.value = delivery.street;
        //         }
        //         if (data.id === 'user-zipcode') {
        //             data.value = delivery.zipcode;
        //         }
        //         if (data.id === 'user-city') {
        //             data.value = delivery.city;
        //         }
        //         if (data.id === 'user-home') {
        //             data.value = userProfileData.userDelivery[id].home;
        //         }
        //         if (data.id === 'user-home-number') {
        //             data.value = userProfileData.userDelivery[id].homeNumber;
        //         }
        //     });
        // })

        setProfileInputs((prev) => ({...prev, userData: userData, userDelivery: userDeliveryFields, userPassword}));
    }

    function saveData () {
        UserService.saveUserProfileData(userProfileData)
            .then((resp) => {
                console.log(resp)
            })
            .catch((error) => {
                console.error('cannot save user profile data', error)
            })
    }

    function saveProfileData () {
        const userData = {
            fio: userName,
            phone: userPhone,
            login: userProfileData?.userData.login,
            email: userProfileData?.userData.email
        }

        dispatch(userActions.updateUserProfileData({id: userProfileData.id, userData, userDelivery: userProfileData.userDelivery}));
    }

    function loadProfileAddresses () {
        setUserAddresses(userProfileData.userDelivery);
    }

    function changeUserProfile () {
        setErrorMessage('');

        UserService.changeUserPassword({oldPassword: userOldPassword, newPassword: userNewPassword})
            .then((response) => {
                if (!response.data?.isSuccessful) {
                    return setErrorMessage('???????????? ???? ?????????????????? ?????? ?????????????? ???????????? ???????????? ??????????????!');
                }

                onEditDataClick('', setUserPasswordEdit);
            })
            .catch((error) => {
                console.error('cannot set user password', error)
            })
    }

    function saveProfileAddresses () {
        const newAddress = {
            title: newAddressTitle,
            country: userCountry,
            street: userStreet,
            house: userHome,
            apartment: userHomeNumber,
            city: userCity,
            zipCode: userZipcode,
            phone: userPhone,
        }

        if (isUserDeliveryAdding) {
            newAddress.id = 'new_address' + (Math.floor(Math.random() * 100000) + 1) * (Math.floor(Math.random() * 100) + 1);

            setUserDeliveryAdding(false);
            setUserAddresses((prev) => [...prev, newAddress])
        } else if (!isUserDeliveryAdding && currentAddress.current) {
            newAddress.id = currentAddress.current.id;
            currentAddress.current = newAddress;

            setUserAddresses((prev) => {
                return prev.map((item) => {
                    if (item.id === currentAddress.current.id) {
                        item = currentAddress.current;
                    }

                    return item
                })
            })
        }

        dispatch(userActions.updateUserProfileData({userDelivery: userAddresses, userData: userProfileData.userData}))
    }

    function onEditSaveClick (editorData, editorSetter) {
        if (editorData === 'userData') {
            saveProfileData();
        }

        if (editorData === 'userDelivery') {
            saveProfileAddresses();
        }

        if (editorData === 'userPassword') {
            changeUserProfile();
            return;
        }

        saveData();
        onEditDataClick('', editorSetter);
    }

    function onEditDataClick (editorData, editorSetter) {
        if (!editorData && editorSetter) {
            if (isUserDataEdit) setUserDataEdit(false);
            if (isUserPasswordEdit) setUserPasswordEdit(false);
            if (isUserDeliveryEdit) setUserDeliveryEdit(false);
            return;
        }

        if (editorData === 'userData') {
            setUserDataEdit(true);
            return;
        }

        if (editorData === 'userDelivery') {
            setUserDeliveryEdit(true);
            return;
        }

        if (editorData === 'userPassword') {
            setUserPasswordEdit(true);
            return;
        }
    }

    function onEditAddressClick (targetAddress) {
        if (targetAddress) {
            currentAddress.current = targetAddress;

            setNewAddressTitle(targetAddress.title);
            setUserCountry(targetAddress.country);
            setUserStreet(targetAddress.street);
            setUserZipcode(targetAddress.zipCode);
            setUserCity(targetAddress.city);
            setUserHome(targetAddress.house);
            setUserHomeNumber(targetAddress.apartment);
        } else {
            currentAddress.current = null;
            setUserDeliveryAdding(true);

            setUserCountry('');
            setUserStreet('');
            setUserZipcode('');
            setUserCity('');
            setUserHome('');
            setUserHomeNumber('');
        }

        onEditDataClick('userDelivery');
    }

    return (
        <div className="profile-data">
            <div className="profile-data__title">
                ??????????????
                <span className="profile-data__title__user-name"> {userProfileData?.userData?.login}</span>
            </div>
            <div className="profile-data__block block">
                <p className="block__title">???????????? ????????????</p>
                {isUserDataEdit
                    ? <>
                        <div className="block__input__wrapper">
                            {profileInputs?.userData.map((input, id) => (
                                <div className="block__input" key={id}>
                                    <DpInput
                                        styles={input.styles}
                                        inputId={input.id}
                                        regex={input.regex}
                                        type={input.type}
                                        getter={input.getter}
                                        setter={input.setter}
                                        placeholder={input.placeholder}
                                        errorStack={setFormErrors}
                                    />
                                </div>
                            ))}
                        </div>
                        {isUserDataEdit && !isUserDeliveryEdit && !isUserPasswordEdit
                            ? <>
                                <button
                                    className="profile-data__save-btn dp-button dp-button__default dp-button__color--blue"
                                    onClick={() => onEditSaveClick('userData', setUserDataEdit)}>?????????????????? ??????????????????</button>
                                <button
                                    className="profile-data__cancel-btn dp-button dp-button__default dp-button__color--gray"
                                    onClick={() => onEditDataClick('', setUserDataEdit)}>????????????</button>
                            </>
                            : ''
                        }
                    </>
                    : <div className="block__description__wrapper">
                        <div className="block__description__inner">
                            <div className="block__description">
                                <span className="block__description--strong">???????????????????? ????????????????????</span>
                                <div>
                                    <p>{userProfileData?.userData?.fio || '-'}</p>
                                    <p>{userProfileData?.userData?.phone || '-'}</p>
                                    <p>{userProfileData?.userData?.email || '-'}</p>
                                </div>

                            </div>
                            <div className="block__change-info dp-text__blue" onClick={() => onEditDataClick('userData')}>????????????????</div>
                        </div>
                        <div className="block__description__inner">
                            <div className="block__description">
                                <span className="block__description--strong">???????????????? ???? e-mail ??????????????</span>
                                <p>???? ???? ?????????????????? ???? ???????? ??????????????</p>
                            </div>
                            <div className="block__change-info dp-text__blue">??????????????????????</div>
                        </div>
                    </div>
                }
            </div>
            <div className="profile-data__block block">
                <p className="block__title">
                    ????????????
                    {!isUserDeliveryEdit
                        ? <span className="block__title__subtitle dp-text dp-text__blue" onClick={() => onEditAddressClick()}>???????????????? ??????????</span>
                        : ''
                    }
                </p>
                {isUserDeliveryEdit
                    ? <>
                        <div className="block__input__wrapper">
                            {profileInputs.userDelivery.map((input, id) => (
                                <div className="block__input" key={id}>
                                    <DpInput
                                        styles={input.styles}
                                        inputId={input.id}
                                        regex={input.regex}
                                        type={input.type}
                                        getter={input.getter}
                                        setter={input.setter}
                                        placeholder={input.placeholder}
                                        errorStack={setFormErrors}
                                    />
                                </div>
                            ))}
                        </div>
                        {isUserDeliveryEdit && !isUserDataEdit && !isUserPasswordEdit
                            ? <>
                                <button
                                    className="profile-data__save-btn dp-button dp-button__default dp-button__color--blue"
                                    onClick={() => onEditSaveClick('userDelivery', setUserDeliveryEdit)}>{isUserDeliveryAdding ? '???????????????? ??????????' : '?????????????????? ??????????????????'}</button>
                                <button
                                    className="profile-data__cancel-btn dp-button dp-button__default dp-button__color--gray"
                                    onClick={() => onEditDataClick('', setUserDeliveryEdit)}>????????????</button>
                            </>
                            : ''
                        }
                    </>
                    : <div className="block__description__wrapper">
                        {userAddresses && userAddresses.length
                            ? userAddresses.map((address, id) => (
                                <div key={id} className="block__description__inner">
                                    <div className="block__description">
                                        <span className="block__description--strong">{address.title}</span>
                                        <div>
                                            <p>{address.country}</p>
                                            <p>{address.street}, {address.house} {address.apartment ? `, ${address.apartment}` : ''}</p>
                                            <p>{address.city}, {address.zipCode}</p>
                                            <p>{userPhone}</p>
                                        </div>
                                    </div>
                                    <div className="block__change-info dp-text__blue" onClick={() => onEditAddressClick(address)}>????????????????</div>
                                </div>
                            ))
                            : <p style={{marginTop: 15, opacity: 0.5}}>???????????? ??????????????????????</p>
                        }
                    </div>
                }
            </div>
            <div className="profile-data__block block">
                <p className="block__title">????????????</p>
                {isUserPasswordEdit
                    ? <div style={{flexDirection: 'column'}} className="block__input__wrapper">
                        {profileInputs.userPassword.map((input, id) => (
                            <div className="block__input" key={id}>
                                <DpInput
                                    styles={input.styles}
                                    inputId={input.id}
                                    regex={input.regex}
                                    type={input.type}
                                    getter={input.getter}
                                    setter={input.setter}
                                    placeholder={input.placeholder}
                                    errorStack={setFormErrors}
                                />
                            </div>
                        ))}
                    </div>
                    : <div className="block__description__wrapper">
                        <div className="block__description__inner">
                            <div style={{marginBottom: 24}} className="block__change-info dp-text__blue" onClick={() => onEditDataClick('userPassword')}>????????????????</div>
                        </div>
                    </div>
                }
            </div>
            {(isUserDataEdit && isUserDeliveryEdit) || isUserPasswordEdit
                ? <>
                    {errorMessage ? <p className="error-massage">{errorMessage}</p> : ''}
                    <button
                        className="profile-data__save-btn profile-data__save-btn--mt-20 dp-button dp-button__default dp-button__color--blue"
                        onClick={() => onEditSaveClick('userPassword', setUserPasswordEdit)}
                    >?????????????????? ??????????????????</button>
                    <button
                        className="profile-data__cancel-btn profile-data__save-btn--mt-20 dp-button dp-button__default dp-button__color--gray"
                        onClick={() => onEditDataClick('', setUserPasswordEdit)}
                    >????????????</button>
                </>
                : ''
            }
        </div>
    )
}

export default ProfileData
