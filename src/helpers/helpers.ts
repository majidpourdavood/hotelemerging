export class Helpers {
  static sendJson(status, errors, message, action, data) {
    const response = {
      statusCode: status,
      errors: errors,
      message: message,
      action: action,
      data: data,
    };
    return response;
  }
}
