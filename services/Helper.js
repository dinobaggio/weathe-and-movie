/* eslint-disable */
import jwt from 'jsonwebtoken';
import swal from 'sweetalert2';
import queryString from 'querystring'

export const showSwalLoading = function (text = '') {
    swal.fire({
        text,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
    });
    return swal.showLoading();
}

export const showError = async function (err) {
    if (err.response) {
        if (err.response.status === 401) {
            await swal.fire('Oops...', err.response.data.message, 'error');
            return false
        }
        return swal.fire('Oops...', err.response.data.message, 'error');
    } else if (err.message) {
        return swal.fire(...[
            'Oops...',
            err.message,
            'error'
        ])
    }
    
    return swal.fire(
        'Oops...',
        'No Internet Connection, please try again later',
        'error'
    );
}
export const funcSleep = function(timer) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, timer);
    });
};

export const objToParams = function (obj) {
    let params = [];
    if (obj && typeof obj === 'object') {
        let arrQuery = Object.keys(obj);
        for (let i = 0; i < arrQuery.length; i++) {
            let element = arrQuery[i];
            params.push(`${element}=${obj[element]}`);
        }
    } else {
        throw new Error('obj must be an object, expected ' + typeof obj);
    }
    return encodeURI(params.join('&'));
};

export const showSwalConfirmation = function ({
    text, 
    title, 
    confirmText, 
    cancelText
  }) {
    let confirm = confirmText || 'Ok'
    let cancel = cancelText || 'Cancel'
    return new Promise((resolve, reject) => {
      swal({
        title,
        text,
        type: 'warning',
        confirmButtonColor: '#d33',
        confirmButtonText: confirm,
        cancelButtonColor: '#3085d6',
        cancelButtonText: cancel,
        showCancelButton: true
      })
        .then((res) => resolve(res.value))
        .catch((err) => reject(err))
    })
}
  
export const paramsToObj = function (params) {
    return queryString.parse(String(params).replace('?', ''))
}

const Helper = {
    showError,
    showSwalLoading,
    funcSleep,
    objToParams,
    showSwalConfirmation,
    paramsToObj
};

export default Helper;
