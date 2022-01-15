import {useEffect, useRef, useState} from "react";
import UserService from "../../../../services/user";
import {useDispatch, useSelector} from "react-redux";
import * as userActions from "../../../../store/actions/user";
import DpInput from "../../../../components/Input/DpInput";

import "./profile-data.scss"

function ProfileData () {
    const dispatch = useDispatch();
    const userProfileData = useSelector((store) => store.user.profileData);

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
    const [userAddresses, setUserAddresses] = useState(userProfileData.userDelivery);

    // Response for user password data
    const [userOldPassword, setUserOldPassword] = useState('');
    const [userNewPassword, setUserNewPassword] = useState('');

    // Inputs store
    const [profileInputs, setProfileInputs] = useState({
        userData: [
            {id: 'user-name', width: 432, regex: /\w/, type: 'text', value: '', getter: userName, setter: setUserName, placeholder: 'Имя и Фамилия'},
            {id: 'user-phone', width: 204, regex: /\w/, type: 'text', value: '', getter: userPhone, setter: setUserPhone, placeholder: 'Телефон'}
        ],
        userDelivery: [
            {id: 'user-address-title', width: 1002, value: '', getter: newAddressTitle, setter: setNewAddressTitle, placeholder: 'Название адреса'},
            {id: 'user-country', width: 318, value: '', getter: userCountry, setter: setUserCountry, placeholder: 'Страна', useSelect: true},
            {id: 'user-street', width: 318, regex: /\w/, type: 'text', value: '', getter: userStreet, setter: setUserStreet, placeholder: 'Улица'},
            {id: 'user-zipcode', width: 318, regex: /\w/, type: 'text', value: '', getter: userZipcode, setter: setUserZipcode, placeholder: 'Почтовый индекс'},
            {id: 'user-city', width: 318, regex: /\w/, type: 'text', value: '', getter: userCity, setter: setUserCity, placeholder: 'Город'},
            {id: 'user-home', width: 147, regex: /\w/, type: 'text', value: '', getter: userHome, setter: setUserHome, placeholder: 'Дом'},
            {id: 'user-home-number', width: 147, regex: /\w/, type: 'text', value: '', getter: userHomeNumber, setter: setUserHomeNumber, placeholder: 'Квартира'}
        ],
        userPassword: [
            {id: 'user-password', width: 318, regex: /\w/, type: 'password', value: '', getter: userOldPassword, setter: setUserOldPassword, placeholder: 'Текущий пароль'},
            {id: 'user-re-password', width: 318, regex: /\w/, type: 'password', value: '', getter: userNewPassword, setter: setUserNewPassword, placeholder: 'Новый пароль'}
        ]
    });

    useEffect(() => {
        if (userProfileData.userData
            && Object.keys(userProfileData.userData).length > 0
            && userProfileData.userDelivery
            && userProfileData.userDelivery.length > 0) {
            loadProfileInputsData();
            loadProfileAddresses();
        }

        UserService.getUserProfileData()
            .then((response) => {
                dispatch(userActions.updateUserProfileData(response.data));
            })
            .catch((error) => {
                console.error('cannot get user profile data', error)
            })
    }, []);

    useEffect(() => {
        loadProfileInputsData();
        loadProfileAddresses();
    }, [userProfileData])

    function loadProfileInputsData () {

        // сделать изначальную загрузку стейтов

        const userPassword = profileInputs.userPassword;
        const userDeliveryFields = profileInputs.userDelivery;
        const userDelivery = userProfileData.userDelivery;
        const userData = profileInputs.userData

        userData.map((data) => {
           if (data.id === 'user-name') {
               data.value = userProfileData.userData.name;
           }
            if (data.id === 'user-phone') {
                data.value = userProfileData.userData.phone;
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

    }

    function saveProfileData () {
        const userData = {
            name: userName,
            phone: userPhone,
            email: userProfileData.userData.email
        }

        // dispatch(userActions.changeUserProfilePersonalData({userData: userData}))
        dispatch(userActions.updateUserProfileData({userData, userDelivery: userProfileData.userDelivery}))
    }

    function loadProfileAddresses () {
        setUserAddresses(userProfileData.userDelivery);
    }

    function saveProfileAddresses () {
        const newAddress = {
            title: newAddressTitle,
            country: userCountry,
            street: userStreet,
            home: userHome,
            homeNumber: userHomeNumber,
            city: userCity,
            zipcode: userZipcode,
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

        console.log(userProfileData)
    }

    function onEditSaveClick (editorData, editorSetter) {
        onEditDataClick('', editorSetter)

        if (editorData === 'userData') {
            saveProfileData();
        }

        if (editorData === 'userDelivery') {
            saveProfileAddresses();
        }

        if (editorData === 'userPassword') {

        }

        saveData();
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
            setUserZipcode(targetAddress.zipcode);
            setUserCity(targetAddress.city);
            setUserHome(targetAddress.home);
            setUserHomeNumber(targetAddress.homeNumber);
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
                Профиль
                <span className="profile-data__title__user-name"> {userName}</span>
            </div>
            <div className="profile-data__block block">
                <p className="block__title">Личный данные</p>
                {isUserDataEdit
                    ? <>
                        <div className="block__input__wrapper">
                            {profileInputs.userData.map((input, id) => (
                                <div className="block__input" key={id}>
                                    <DpInput
                                        inputWidth={input.width}
                                        inputId={input.id}
                                        inputValue={input.value}
                                        regex={input.regex}
                                        type={input.type}
                                        getter={input.getter}
                                        setter={input.setter}
                                        placeholder={input.placeholder}
                                    />
                                </div>
                            ))}
                        </div>
                        {isUserDataEdit && !isUserDeliveryEdit && !isUserPasswordEdit
                            ? <>
                                <button
                                    className="profile-data__save-btn dp-button dp-button__default dp-button__color--blue"
                                    onClick={() => onEditSaveClick('userData', setUserDataEdit)}>Сохранить изменения</button>
                                <button
                                    className="profile-data__cancel-btn dp-button dp-button__default dp-button__color--gray"
                                    onClick={() => onEditDataClick('', setUserDataEdit)}>Отмена</button>
                            </>
                            : ''
                        }
                    </>
                    : <div className="block__description__wrapper">
                        <div className="block__description__inner">
                            <div className="block__description">
                                <span className="block__description--strong">Контактная информация</span>
                                <div>
                                    <p>{userProfileData.userData.name}</p>
                                    <p>{userProfileData.userData.phone}</p>
                                    <p>{userProfileData.userData.email}</p>
                                </div>

                            </div>
                            <div className="block__change-info dp-text__blue" onClick={() => onEditDataClick('userData')}>Изменить</div>
                        </div>
                        <div className="block__description__inner">
                            <div className="block__description">
                                <span className="block__description--strong">Подписка на e-mail новости</span>
                                <p>Вы не подписаны на наши новости</p>
                            </div>
                            <div className="block__change-info dp-text__blue">Подписаться</div>
                        </div>
                    </div>
                }
            </div>
            <div className="profile-data__block block">
                <p className="block__title">
                    Адреса
                    {!isUserDeliveryEdit
                        ? <span className="block__title__subtitle dp-text dp-text__blue" onClick={() => onEditAddressClick()}>Добавить адрес</span>
                        : ''
                    }
                </p>
                {isUserDeliveryEdit
                    ? <>
                        <div className="block__input__wrapper">
                            {profileInputs.userDelivery.map((input, id) => (
                                <div className="block__input" key={id}>
                                    <DpInput
                                        inputWidth={input.width}
                                        inputId={input.id}
                                        inputValue={input.value}
                                        regex={input.regex}
                                        type={input.type}
                                        getter={input.getter}
                                        setter={input.setter}
                                        placeholder={input.placeholder}
                                    />
                                </div>
                            ))}
                        </div>
                        {isUserDeliveryEdit && !isUserDataEdit && !isUserPasswordEdit
                            ? <>
                                <button
                                    className="profile-data__save-btn dp-button dp-button__default dp-button__color--blue"
                                    onClick={() => onEditSaveClick('userDelivery', setUserDeliveryEdit)}>{isUserDeliveryAdding ? 'Добавить адрес' : 'Сохранить изменения'}</button>
                                <button
                                    className="profile-data__cancel-btn dp-button dp-button__default dp-button__color--gray"
                                    onClick={() => onEditDataClick('', setUserDeliveryEdit)}>Отмена</button>
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
                                            <p>{address.street}, {address.home} {address.homeNumber ? `, ${address.homeNumber}` : ''}</p>
                                            <p>{address.city}, {address.zipcode}</p>
                                            <p>{userPhone}</p>
                                        </div>
                                    </div>
                                    <div className="block__change-info dp-text__blue" onClick={() => onEditAddressClick(address)}>Изменить</div>
                                </div>
                            ))
                            : ''
                        }
                    </div>
                }
            </div>
            <div className="profile-data__block block">
                <p className="block__title">Пароль</p>
                {isUserPasswordEdit
                    ? <div style={{flexDirection: 'column'}} className="block__input__wrapper">
                        {profileInputs.userPassword.map((input, id) => (
                            <div className="block__input" key={id}>
                                <DpInput
                                    inputWidth={input.width}
                                    inputId={input.id}
                                    regex={input.regex}
                                    type={input.type}
                                    getter={input.getter}
                                    setter={input.setter}
                                    placeholder={input.placeholder}
                                />
                            </div>
                        ))}
                    </div>
                    : <div className="block__description__wrapper">
                        <div className="block__description__inner">
                            <div style={{marginBottom: 24}} className="block__change-info dp-text__blue" onClick={() => onEditDataClick('userPassword')}>Изменить</div>
                        </div>
                    </div>
                }
            </div>
            {(isUserDataEdit && isUserDeliveryEdit) || isUserPasswordEdit
                ? <>
                    <button className="profile-data__save-btn profile-data__save-btn--mt-20 dp-button dp-button__default dp-button__color--blue">Сохранить изменения</button>
                    <button
                        className="profile-data__cancel-btn profile-data__save-btn--mt-20 dp-button dp-button__default dp-button__color--gray"
                        onClick={() => onEditDataClick('', setUserPasswordEdit)}
                    >Отмена</button>
                </>
                : ''
            }
        </div>
    )
}

export default ProfileData
