// import { getUserSession } from '../local/PrefManager'
import axios from "axios"
const isDebugging = true
export default class WebHandler {
    postDataRequest(url, bodyParams, onSuccess, onFailure) {
        var bodyParams = bodyParams ? bodyParams : {}
        let headers = { 'Content-Type': 'application/json' }
        sendPostRequest(url, headers, bodyParams, onSuccess, onFailure)

        // getUserSession((sData) => {
        //     if (sData && sData.token) {
        //         headers.Authorization = "Bearer " + sData.token
        //     }
        //     if (sData && sData.data.id) {
        //         bodyParams.append('driver_id',sData.data.id)
        //     }
        //     sendPostRequest(url, headers, bodyParams, onSuccess, onFailure)
        // })
    }
    postFormDataRequest = (url, bodyParams, onSuccess, onFailure) => {
        let headers = { "Content-Type": "multipart/form-data" }
        bodyParams = bodyParams ? bodyParams : {}
        sendPostRequest(url, headers, bodyParams, onSuccess, onFailure)

        // getUserSession((sData) => {
        //     if (sData, sData.token) {
        //         headers.Authorization = "Bearer " + sData.token
        //     }
        //     sendPostRequest(url, headers, bodyParams, onSuccess, onFailure)
        // })
    }
    getDataRequest(url, headerParams, onSuccess, onFailure) {
        let headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
        sendGetRequest(url, headers, headerParams, onSuccess, onFailure)

        // getUserSession((sData) => {
        //     if (sData && sData.token) {
        //         headers.Authorization = 'Bearer ' + sData.token
        //     }
        //     sendGetRequest(url, headers, headerParams, onSuccess, onFailure)
        // })
    }
}
const sendPostRequest = (Url, headers, bodyParams, OnSuccess, OnError) => {
    if (isDebugging) {
        console.log("------------API POST REQUEST--------------")
        console.log("URL==>", Url)
        console.log("HEADER==>", headers)
        console.log("BODYPARAMS==>", JSON.stringify(bodyParams))
    }
    axios.post(Url, bodyParams, {
        headers: headers,
    }).then((response) => {
        if (isDebugging) {
            console.log("RESPOSNE==>", JSON.stringify(response.data, null, 5))
        }
        var responseData = response.data
        var responseStatus = response.status
        var responseJSON = { responseData, responseStatus }
        if (responseData && responseStatus==200) {
            //alert(responseJson)
            OnSuccess(responseJSON)
        } else {
            console.log('***************')
            OnError(response.data)
        }
    })
        .catch((error) => {
            OnError(error.response.data.detail)
            if (isDebugging) {
                // console.log("ERROR RESPOSNE==>", JSON.stringify(error));
                if (error.response) {
                    console.log("RESPOSNE1==>", error.response.data.detail);
                    console.log("RESPOSNE2==>", error.response.status);
                }
            }
        })
}

const sendGetRequest = (Url, headers, headerParams, OnSuccess, OnError) => {
    if (isDebugging) {
        console.log("------------API POST REQUEST--------------")
        console.log("URL==>", Url)
        console.log("HEADER==>", headers)
        console.log("HEADERPARAMS==>", JSON.stringify(headerParams))
    }
    axios.get(Url, {
        headers: headers,
        headerParams: headerParams
    }).then((res) => {
        if (isDebugging) {
            console.log('RESPONSE   ===> ' + JSON.stringify(res.data))
        }
        var responseJSON = res.data
        if (responseJSON && res.status) {
            OnSuccess(responseJSON)
        } else {
            OnError(responseJSON.message)
        }
    }).catch((error) => {
        OnError(error.message)
        console.log(error.message);
        if (isDebugging) {
            console.log("ERROR RESPOSNE==>", JSON.stringify(error));
            if (error.response) {
                console.log("RESPOSNE==>", error.response.data);
                console.log("RESPOSNE==>", error.response.status);
            }
        }
    })
}