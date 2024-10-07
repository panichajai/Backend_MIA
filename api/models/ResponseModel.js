class ResponseModel {
    constructor(status, success, message, data = null, error = null) {
        this.status = status;
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}

module.exports = ResponseModel;